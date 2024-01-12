const { default: BaseServices } = require('../baseServices');

const URL = 'https://workflow-sever-7c28.onrender.com';
class SprintService extends BaseServices {
   constructor() {
      super(URL);
   }
   getSprint(id, param) {
      return this.get(`/sprints/list/${id}`, { params: { ...param } });
   }

   createSprint(key) {
      return this.post(`/sprints/${key}/add`);
   }
   updateSprint(key, id, data) {
      return this.put(`/sprints/${key}/update/${id}`, data);
   }
   deleteSprint(key, id) {
      return this.delete(`/sprints/${key}/${id}`);
   }
}
export default SprintService;
