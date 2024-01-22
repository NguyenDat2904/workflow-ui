const { default: BaseServices } = require('../baseServices');

const URL = 'https://workflow-sever-7c28.onrender.com';
class WorkService extends BaseServices {
   constructor() {
      super(URL);
   }
   // Create a new project
   createProject(data) {
      return this.post(`/projects/create`, data);
   }
   getListIssuesOfBoard(codeProject, param) {
      return this.get(`/issues/broad/${codeProject}`, { params: { ...param } });
   }

   // Get all projects
   getListProject(param) {
      return this.get(`/projects/list`, { params: { ...param } });
   }

   getIssues(idProject) {
      return this.get(`/issues/${idProject}`);
   }
   getIssuesYourWork() {
      return this.get(`/issues/yourWork`);
   }

   // Details
   projectDetail(id) {
      return this.get(`/projects/project-detail/${id}`);
   }

   // Delete Project
   deleteProject(codeProject) {
      return this.patch(`projects/${codeProject}/delete`);
   }

   // Restore project
   restoreProject(codeProject) {
      return this.patch(`/projects/${codeProject}/restore`);
   }

   // DeleteProject
   deleteDirectProject(codeProject) {
      return this.delete(`/projects/${codeProject}/deleteDirectly`);
   }

   // ChangeProject
   changeProject(id, name, key, userID) {
      return this.patch(`/projects/edit-project/${id}`, { nameProject: name, codeProject: key, _idUser: userID });
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

   // delete Member
   deleteMember(codeProject, idMember) {
      return this.delete(`/projects/${codeProject}/members/${idMember}`);
   }
}
export default WorkService;
