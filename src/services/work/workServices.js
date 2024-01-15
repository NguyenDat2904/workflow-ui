const { default: BaseServices } = require('../baseServices');

const URL = 'https://workflow-sever-7c28.onrender.com';
class WorkService extends BaseServices {
   constructor() {
      super(URL);
   }
   // GetAll
   getListProject(param) {
      return this.get(`/projects/list`, { params: { ...param } });
   }

   getIssues(idProject) {
      return this.get(`/issues/${idProject}`);
   }

   // Details
   projectDetail(id) {
      return this.get(`/projects/project-detail/${id}`);
   }

   getListIssuesOfBoard(codeProject, param) {
      return this.get(`/issues/broad/${codeProject}`, { params: { ...param } });
   }

   // Delete Project
   deleteProject(id, userID) {
      return this.patch(`projects/delete-project/${id}`, { _idUser: userID });
   }

   // Restore project

   restoreProject(codeProject) {
      return this.patch(`/projects/${codeProject}/restore-project`);
   }

   deleteDirectProject(codeProject) {
      return this.delete(`/projects/${codeProject}/delete`);
   }

   // ChangeProject
   changeProject(id, name, key, userID) {
      return this.patch(`/projects/edit-project/${id}`, { nameProject: name, codeProject: key, _idUser: userID });
   }

   // Get Member
   getMember(codeProject, param) {
      return this.get(`/projects/list-member?codeProject=${codeProject}`, { params: { ...param } });
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
