const { default: BaseServices } = require('../baseServices');

const URL = 'https://workflow-sever.onrender.com';
class UserService extends BaseServices {
   constructor() {
      super(URL);
   }
   getUserProfile(id) {
      return this.get(`/users/${id}`);
   }
   updateUser(id, nameFill, contenEditing) {
      return this.patch(`/users/updateUser/${id}`, { nameFill, contenEditing });
   }
   updateBackground(id, backgroundProfile, contentProfile) {
      return this.patch(`/users/updateUser/background/${id}`, { backgroundProfile, contentProfile });
   }
   uploadImg(id, formData) {
      return this.patchUpload(`/users/uploadimg/${id}`, formData);
   }
}
export default UserService;
