import api from 'services/api';

const LoginApi = {
  login: function (encryptedLoginInfo: string) {
    if (encryptedLoginInfo) {
      return api.post('/login', { encryptedLoginInfo });
    }
  },
};

export default LoginApi;
