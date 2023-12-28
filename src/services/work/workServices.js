const { default: BaseServices } = require('../baseServices');

const URL = 'https://workflow-sever.onrender.com';
class WorkService extends BaseServices {
   constructor() {
      super(URL);
   }
   //    GetAll
   getListProject(id) {
      return this.post(`/work/project/${id}`, { deleteProject: false });
   }
   listWork(nameProject) {
      return this.post('/work/listwork', { nameProject });
   }
   //    Sort
   sortProject(id, key, order) {
      return this.post(`/work/project/${id}?&sortKey=${key}&sortOrder=${order}`, { deleteProject: false });
   }
   //    Sort
   paginationProject(id, limit = 15, page = 1) {
      return this.post(`/work/project/${id}?&page=${page}&limit=${limit}`, { deleteProject: false });
   }
}
export default WorkService;
