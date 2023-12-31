const { default: BaseServices } = require('../baseServices');

const URL = 'https://workflow-sever.onrender.com';
class WorkService extends BaseServices {
   constructor() {
      super(URL);
   }
   //    GetAll
   getListProject(param) {
      return this.get(`/projects/list`, { params: { ...param } });
   }
   listWork(nameProject) {
      return this.get(`/projects/list-work?nameProject=${nameProject}`);
   }
   //    Pagination
   paginationProject(id, limit = 15, page = 1) {
      return this.get(`/work/project/${id}?&page=${page}&limit=${limit}`, { deleteProject: false });
   }
   // Details
   projectDetail(id) {
      return this.get(`/projects/project-detail/${id}`);
   }
   // Delete Project
   deleteProject(id, userID) {
      return this.patch(`work/delete-project/${id}`, { _idUser: userID });
   }

   // ChangeProject
   changeProject(id, name, key, userID) {
      return this.patch(`/work/edit-project/${id}`, { nameProject: name, codeProject: key, _idUser: userID });
   }
}
export default WorkService;
