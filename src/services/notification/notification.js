const { default: BaseServices } = require('../baseServices');

const URL = 'https://workflow-sever-7c28.onrender.com';

class NotificationService extends BaseServices {
   constructor() {
      super(URL);
   }
   getNotification(read) {
      return this.get(`/notifications?read=${read}`);
   }
   createNotification(key, data) {
      return this.post(`/notifications/${key}/add`, data);
   }
   updateNotification(id) {
      return this.patch(`/notifications/edit/${id}`);
   }
}

export default NotificationService;
