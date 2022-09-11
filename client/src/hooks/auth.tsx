import { createContext, useCallback, useContext, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import useGlobal from 'stores/globalStore';
import CryptoUtils from 'utils/CryptoUtils';
import api from '../services/api';

const UserContext = createContext({
  cookies: {
    token: '',
    name: '',
  },
  login: async () => {},
  logout: () => {},
} as {
  cookies: { [key: string]: string };
  login: ({
    username = '',
    password = '',
  }: {
    username: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
});

const COOKIE_ITEMS: string[] = ['token', 'name'];
export function UserProvider({ children }: any): any {
  const publicKey = useGlobal((state) => state.publicKey);
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies(COOKIE_ITEMS);

  const login = useCallback(
    async ({
      username = '',
      password = '',
    }: {
      username: string;
      password: string;
    }) => {
      if (publicKey) {
        const loginInfoStr = JSON.stringify({
          username,
          password,
        });
        const encryptedLoginInfo = CryptoUtils.encryptRSA(
          loginInfoStr,
          publicKey,
        );
        await api
          .post('/login', {
            encryptedLoginInfo,
          })
          .then(({ data }) => {
            Object.keys(data).forEach((k_) => setCookies(k_, data[k_]));
            navigate('/home');
          });
      }
    },
    [setCookies, navigate, publicKey],
  );

  const logout = useCallback(() => {
    COOKIE_ITEMS.forEach((item) => removeCookie(item));
  }, [removeCookie]);

  const value = useMemo(
    () => ({
      cookies,
      login,
      logout,
    }),
    [cookies, login, logout],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useAuth = () => useContext(UserContext);
