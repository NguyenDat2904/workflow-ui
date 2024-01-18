const { default: BaseServices } = require('../baseServices');

const URL = 'https://workflow-sever-7c28.onrender.com';
class UserService extends BaseServices {
   constructor() {
      super(URL);
   }
   getUserProfile() {
      return this.get(`/users`);
   }
   updateUser(nameFill, contenEditing) {
      return this.patch(`/users/updateUser`, { nameFill, contenEditing });
   }
   updateBackground(backgroundProfile, contentProfile) {
      return this.patch(`/users/updateUser/background`, { backgroundProfile, contentProfile });
   }
   uploadImg(formData) {
      return this.patchUpload(`/users/uploadimg`, formData);
   }
   changePassword(currentPassword, password) {
      return this.patch(`/users/profile/changePassword`, {
         oldPassword: currentPassword,
         newPassword: password,
      });
   }
}
export default UserService;
