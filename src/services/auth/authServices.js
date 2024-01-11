const { default: BaseServices } = require('../baseServices');

const URL = 'https://work-flow-n27c.onrender.com';
class AuthService extends BaseServices {
   constructor() {
      super(URL);
   }
   verifyRegister(email, userName, fullName) {
      return this.post(`/auth/verify`, { email, userName, fullName });
   }
   register(email, fullName, userName, password, token) {
      return this.post(
         `/auth/register`,
         { email, fullName, userName, password },
         {
            headers: {
               'verify-token': `${token}`,
            },
         },
      );
   }
}
export default AuthService;
