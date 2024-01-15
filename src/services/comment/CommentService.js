const { default: BaseServices } = require('../baseServices');

const URL = 'https://work-flow-n27c.onrender.com';
class CommentService extends BaseServices {
   constructor() {
      super(URL);
   }
   getComment(id, param) {
      return this.get(`/comments/list/${id}`, { params: { ...param } });
   }
   addComment(data) {
      return this.post(`/comments/add`, data);
   }
   editComment(id, data) {
      return this.patch(`/comments/edit/${id}`, data);
   }
   deleteComment(id) {
      return this.delete(`/comments/delete/${id}`);
   }
}
export default CommentService;
