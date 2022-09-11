import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CryptoUtils from 'utils/CryptoUtils';
import Wrapper from './components/Wrapper';
import { ProtectedRoutes } from './hooks/protectedRoutes';
import Home from './pages/Home';
import Login from './pages/Login/index';
import Register from './pages/Register/index';
import api from './services/api';
import useGlobal from './stores/globalStore';

function App() {
  const { setPublicKey } = useGlobal();
  useEffect(() => {
    api.get('/authentication/publicKey').then(({ data }: { data: string }) => {
      setPublicKey(CryptoUtils.decodeBase64(data));
    });
  }, [setPublicKey]);
  return (
    <Wrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="login" />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="home" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Wrapper>
  );
}

export default React.memo(App);
