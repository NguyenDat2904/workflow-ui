const {default:BaseServices}=require('../baseServices')

const URL='https://workflow-sever.onrender.com';
class UserService extends BaseServices{
    constructor(){
        super(URL);
    }
    getUserProfile(id){
        return this.get(`/users/${id}`)
    }
}
export default UserService