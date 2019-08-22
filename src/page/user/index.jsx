import React from 'react';
import {Link} from 'react-router-dom' 

import MUtil from '../../util/mm.jsx'
import User   from '../../service/user-service.jsx'
import PageTitle from '../../components/page-title/index.jsx'
import Pagination from '../../util/pagination/index.jsx';
const _mm = new MUtil();
const _user =new User();
class UserList extends React.Component {
   constructor(props){
      super(props)
      this.state={
        pageNum:1,
        list:[]
      }

   }
   componentDidMount(){
       this.loadUserList()
   }
   //页数发生变化的时候
   onPageNumChange(pageNum){
    this.setState({
        pageNum:pageNum
    },()=>{
        //回调
        this.loadUserList()
    })
   }
   loadUserList(){
       _user.getUserList(this.state.pageNum).then(res=>{
           this.setState(res)
       },errMsg=>{
        _mm.errorTips(errMsg)
        })
   }
 
   render(){
          return(
            <div id="page-wrapper">
           
           <div className="row">
           <PageTitle title="用户列表"/>
             <div className="col-md-12">
               <table className="table table-striped">
                   <thead>
                       <tr>
                           <td>ID</td>
                           <td>用户名</td>
                           <td>邮箱</td>
                           <td>电话</td>
                           <td>注册时间</td>
                       </tr>
                   </thead>
                   <tbody>
                       {
                           this.state.list.map((user,index) =>{
                               return (
                                   <tr key={index}>
                                   <td>{user.id}</td>
                                   <td>{user.name}</td>
                                   <td>{user.email}</td>
                                   <td>{user.phone}</td>
                                   <td>{user.createTime}</td>
                                   </tr>
                               );
                           })
                       }
                      
                   </tbody>
               </table>
             </div>
           </div>
          <Pagination current={this.state.pageNum} total={this.state.total}
           onChange={(pageNum)=>this.onPageNumChange(pageNum)}/>
        </div>
          )
   }

}

export default UserList;
