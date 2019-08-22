import React from 'react';
import './index.css'
import MUtil from '../../util/mm.jsx'
import User   from '../../service/user-service.jsx'
//因为这里是一个class。所以要 new一个出来
const _mm = new MUtil();
const _user =new User();
class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            redirect:_mm.getUrlParms('redirect')||'/'
        }
    }
    componentWillMount(){
        document.title = '登录 --MMALL  ADMIN'
    }
    //如果写一个事件名对应一个方法，太麻烦了
    // onUsernameChange(e){
    //       console.log(e.target.value)
    //       this.setState({
    //           username:e.target.value
    //       });
    // }

    //统一使用一个事件 给input添加name属性，达成对应关系
    onInputChange(e){
   let inputValue = e.target.value,
       inputName = e.target.name;
       this.setState({
           [inputName]:inputValue
       })
    }

    //回车键提交
    onInputKeyUp(e){
        if(e.keyCode==13){
            this.onSubmit();
        }
    }
    //用户提交表单
    onSubmit(){

        let loginInfo ={
            username:this.state.username,
            password:this.state.password
        },
        checkResult = _user.checkLoginInfo(loginInfo)
        //验证通过
        if(checkResult.status){
            _user.login(loginInfo).then((res)=>{
                console.log(this.state.redirect)
              _mm.setStorage('userInfo',res)            
                 this.props.history.push(this.state.redirect)
             },(errMsg)=>{
                  _mm.errTips(errMsg)
             })
        }
        //验证不通过
        else{
            _mm.errorTips(checkResult.msg)
        }
    
    }
   render(){
          return(
         
                  <div className="col-md-4 col-md-offset-4">
                  <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登陆 --MMALL管理系统</div>
                    <div className="panel-body">
                       <div>
                            <div className="form-group">
                                <input type="text" 
                                name="username"
                                className="form-control" 
                                 placeholder="请输入用户名"
                                 onKeyUp={e=>this.onInputKeyUp(e)}
                                 onChange={e =>this.onInputChange(e)}
                                 />
                            </div>
                            <div className="form-group">
                              
                                <input type="password"  
                                 name="password"
                                className="form-control"
                                placeholder="请输入密码"
                                onKeyUp={e=>this.onInputKeyUp(e)}
                                onChange={e =>this.onInputChange(e)}
                                />
                            </div>
                           
                            
                            <button  
                            className="btn btn—lg btn-primary btn-block"
                            onClick={e=>{this.onSubmit(e)}}
                            >登陆</button>
                            </div>
                    </div>
          </div>
                  </div>
            
      
          
          
          )
   }

}

export default Login;
