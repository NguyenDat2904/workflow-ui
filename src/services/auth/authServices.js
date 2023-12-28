const { default: BaseServices } = require('../baseServices');

const URL = 'https://workflow-sever.onrender.com';
class AuthService extends BaseServices {
   constructor() {
      super(URL);
   }
   verifyRegister(email, userName, fullName) {
      return this.post(`/auth/verify`, { email, userName, fullName });
   }
}
export default AuthService;
