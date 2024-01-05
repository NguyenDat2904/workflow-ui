const { default: BaseServices } = require('../baseServices');

const URL = 'https://workflow-sever.onrender.com';
class SprintService extends BaseServices {
   constructor() {
      super(URL);
   }
   getSprint(id, param) {
      return this.get(`/sprints/list/${id}`, { params: { ...param } });
   }

   createSprint(key, data) {
      return this.post(`/sprints/${key}/add`, data);
   }
}
export default SprintService;
