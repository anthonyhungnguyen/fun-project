import React, { useCallback, useState } from 'react';
import useGlobal from 'stores/globalStore';
import AuthenticationWrapper from '../../components/AuthenticationWrapper';
import Button from '../../components/Button';
import Input from '../../components/Input';
import CryptoUtils from '../../utils/CryptoUtils';
import RegisterApi from './api';

function Register() {
  const publicKey = useGlobal((state) => state.publicKey);
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordAgain, setPasswordAgain] = useState<string>();

  const handleRegister = useCallback(async () => {
    if (username && password && passwordAgain && publicKey) {
      const registerInfoStr = JSON.stringify({
        username,
        password,
        passwordAgain,
      });
      const encryptedInfo = CryptoUtils.encryptRSA(registerInfoStr, publicKey);

      if (encryptedInfo) {
        RegisterApi.register(encryptedInfo)
          ?.then(({ data }) => {
            console.log(data);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        console.log('Cannot encrypt register information');
      }
    }
  }, [username, password, passwordAgain, publicKey]);

  return (
    <AuthenticationWrapper>
      <Input onChange={setUsername} placeholder="Username" />
      <Input onChange={setPassword} placeholder="Password" />
      <Input onChange={setPasswordAgain} placeholder="Password Again" />
      <Button onClick={handleRegister}>Register</Button>
    </AuthenticationWrapper>
  );
}

export default React.memo(Register);
