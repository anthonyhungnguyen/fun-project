import api from '../../services/api';

const RegisterApi = {
  register(encryptedRegisterInfo: string) {
    if (encryptedRegisterInfo) {
      return api.post('/register', { encryptedRegisterInfo });
    }
  },
};

export default RegisterApi;
