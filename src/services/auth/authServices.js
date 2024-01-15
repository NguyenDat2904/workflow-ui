const { default: BaseServices } = require('../baseServices');

const URL = 'https://workflow-sever-7c28.onrender.com';
class AuthService extends BaseServices {
   constructor() {
      super(URL);
   }
   login(data) {
      return this.post('/users/login', data);
   }
   loginGoogle(token) {
      return this.post(
         '/users/loginGoogle',
         {},
         {
            headers: {
               tokengoogle: token,
            },
         },
      );
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
   forgotPassword(email) {
      return this.post('/users/forgot', {
         email: email,
      });
   }
   verifyChangePassword(id, password, tokenUSer) {
      return this.patch(
         `/users/forgot/changePassword/${id}`,
         { passWord: password },
         {
            headers: {
               'verify-token': tokenUSer,
            },
         },
      );
   }
}
export default AuthService;
