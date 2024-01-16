const { default: BaseServices } = require('../baseServices');

const URL = 'https://workflow-sever-7c28.onrender.com';
class WorkService extends BaseServices {
   constructor() {
      super(URL);
   }
   //    GetAll
   createProject(data) {
      return this.post(`/projects/create`, data);
   }
   //    GetAll
   getListProject(param) {
      return this.get(`/projects/list`, { params: { ...param } });
   }
   getIssues(idProject, param) {
      return this.get(`/issues/${idProject}`, { params: { ...param } });
   }
   // Details
   projectDetail(id) {
      return this.get(`/projects/project-detail/${id}`);
   }
   // Delete Sort Project
   sortDeleteProject(id) {
      return this.patch(`/projects/${id}/delete`);
   }

   // Restore proejct
   restoreProject(codeProject) {
      return this.patch(`/projects/${codeProject}/restore`);
   }
   // Delete  Project Per
   deleteDirectProject(codeProject) {
      return this.delete(`/projects/${codeProject}/deleteDirectly`);
   }

   // ChangeProject
   changeProject(id, data) {
      return this.patch(`/projects/${id}`, data);
   }

   // Get Member
   getMember(param) {
      return this.get(`/projects/list-member`, { params: { ...param } });
   }

   // Check add Member
   addMember(key, data) {
      return this.post(`/projects/${key}/send-email`, data);
   }

   // Accept add Member
   acceptMember(key, token) {
      return this.patch(
         `/projects/${key}/member/add`,
         {},
         {
            headers: {
               'verify-token': `${token}`,
            },
         },
      );
   }
}
export default WorkService;
