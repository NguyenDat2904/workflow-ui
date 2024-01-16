const { default: BaseServices } = require('../baseServices');

const URL = 'https://workflow-sever-7c28.onrender.com';
class IssueService extends BaseServices {
   constructor() {
      super(URL);
   }
   getIssue(id, param) {
      return this.get(`/issues/${id}`, { params: { ...param } });
   }
   searchIssue(param) {
      return this.get(`/issues/search`, { params: { ...param } });
   }
   getIssueDetail(key, param) {
      return this.get(`issues/${key}/detail`, { params: { ...param } });
   }
   createIssue(key, data) {
      return this.post(`/issues/${key}/add`, data);
   }
   updateIssue(key, id, fillName) {
      return this.patch(`/issues/${key}/edit-information/${id}`, fillName);
   }
   getIssueSearch(){
      return this.get(`/issues/search`)
   }
}
export default IssueService;
