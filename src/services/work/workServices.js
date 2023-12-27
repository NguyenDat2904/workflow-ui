const {default:BaseServices}=require('../baseServices')

const URL='https://workflow-sever.onrender.com';
class WorkService extends BaseServices{
    constructor(){
        super(URL);
    }
    getListProject(id){
        return this.post(`/work/project/${id}`,{ deleteProject:false })
    };
    listWork(nameProject){
       return this.post('/work/listwork',{nameProject}) 
    }
}
export default WorkService