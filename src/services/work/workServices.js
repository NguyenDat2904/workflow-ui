const { default: BaseServices } = require('../baseServices');

const URL = 'https://workflow-sever.onrender.com';
class WorkService extends BaseServices {
   constructor() {
      super(URL);
   }
   //    GetAll
   getListProject(bool) {
      return this.get(`/projects/list?deleteProject=${bool}`);
   }
   listWork(nameProject) {
      return this.get(`/projects/list-work?nameProject=${nameProject}`);
   }
   //    Sort
   sortProject(key, order) {
      return this.get(`/projects/list-work?&sortKey=${key}&sortOrder=${order}&deleteProject=false`);
   }
   //    Sort
   paginationProject(limit = 15, page = 1) {
      return this.get(`/projects/list-work?&page=${page}&limit=${limit}&deleteProject=false`);
   }
}
export default WorkService;
