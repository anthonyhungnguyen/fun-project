import { useCallback, useState } from 'react';
import useGlobal from 'stores/globalStore';
import CryptoUtils from 'utils/CryptoUtils';
import AuthenticationWrapper from '../../components/AuthenticationWrapper';
import Button from '../../components/Button';
import Input from '../../components/Input';
import LoginApi from './api';

function Login() {
  const publicKey = useGlobal((state) => state.publicKey);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const { login } = useAuth();

  const handleLogin = useCallback(() => {
    if (username && password && publicKey) {
      const loginInfoStr = JSON.stringify({
        username,
        password,
      });
      const encryptedLoginInfo = CryptoUtils.encryptRSA(
        loginInfoStr,
        publicKey,
      );
      if (encryptedLoginInfo) {
        console.log(encryptedLoginInfo);
        LoginApi.login(encryptedLoginInfo);
      }
    }
  }, [username, password, publicKey]);

  return (
    <AuthenticationWrapper>
      <Input onChange={setUsername} placeholder="Username" />
      <Input onChange={setPassword} placeholder="Password" />
      <Button onClick={handleLogin}>Login</Button>
    </AuthenticationWrapper>
  );
}

export default Login;
