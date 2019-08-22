import React from 'react';
import {Link} from 'react-router-dom' 
import Mutil  from '../../util/mm.jsx'
import User from '../../service/user-service.jsx'
const _mm = new Mutil();
const _user = new User();
class TopNav extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:_mm.getStorage('userInfo').username ||''
        }
    }
    onLogout(){
        //退出登录
        _user.logout().then(res =>{
             _mm.removeStorage('userInfo');
            //  this.props.history.push('/login')
            window.location.href ='/login'
        },errMsg =>{
            _mm.errorTips(errMsg)
        })
    }
    render(){
        return(

                <div className="navbar navbar-default top-navbar" role="navigation">
            <div className="navbar-header">
               
                <Link className="navbar-brand" to="/"><b>Happy</b>mmall</Link>
            </div>

            <ul className="nav navbar-top-links navbar-right">
                <li className="dropdown open">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">
                        <i className="fa fa-envelope fa-fw"></i> <i className="fa fa-caret-down">
                            {
                                this.state.username?  <span>欢迎：{this.state.username}</span>
                                :<span>欢迎您</span>
                            }
                          
                        </i>
                    </a>
                    <ul className="dropdown-menu dropdown-tasks">
                        <li>
                            <a onClick={()=>{this.onLogout()}}>
                            <i className="fa fa-sign-out fa-fw"></i> <i className="fa fa-caret-down"> </i>
                            <span>退出登录</span>
                       
                            </a>
                        </li>
                 
                          
                    </ul>
                  
                </li>
           
            
            </ul>
        </div>
               
          
        )
    }
}
export default TopNav;