// 工具类
import $ from  'jquery'
class MUtile{
  request(param){
      return  new Promise((resolve,reject)=>{       
        console.log(param)
        $.ajax({
              type:     param.type  ||   'get',
              url:      param.url   ||    '',
              dataType: param.dataType       ||   'json',
              data:     param.data  ||    null,
              success:res=>{
                console.log(res,'///')
               //请求成功
               if(0===res.status){
                 typeof resolve ==='function' && resolve(res.data,res.msg)
               }else if(10===res.status){
                   //登录,没有登陆转态，强制登录
                   this.doLogin()
               }else{
                typeof reject ==='function' && reject(res.mag||res.data)   
               }
              },
              error:err=>{
                typeof reject ==='function' && reject(err.statusText)   
                console.log(err,123)
              }
              
          })
      })
  }
  //跳到登录
  doLogin(){
      //带上原来的参数，表明是从哪里跳回来的    ,传过来的可能有 特殊字符，这里转化一下
      window.location.herf='/login?redirect=' + encodeURIComponent(window.location.pathname)
  }
  //获取url参数
  getUrlParms(name){
    // xxxx.com?para,=123&param1 =456
    let queryString = window.location.search.split('?')[1]||'';
    // ^或者&开头  [^&]*只要不是&符就能匹配到  (&|$)是&或者是结束符
    let reg = new RegExp("(^|&)"+name +"=([^&]*)(&|$)"),
        result = queryString.match(reg)

        // result 的结果是 ['param=123','','123','&']
        return result? decodeURIComponent(result[2])  :null



  }
  //错误显示
  errorTips(errMsg){
    alert(errMsg ||'好像哪里不对了') 
  }
  setStorage(name,data){
    let dataType = typeof data;
    if(dataType==='object'){
      window.localStorage.setItem(name,JSON.stringify(data))
    }
    else if(['number','string','boolean'].indexOf(data)){
    window.localStorage.setItem(name,data);
    } 
    //其他不支持的类型
    else{
       alert('该类型不能用于本地存储')
    }
  }
  getStorage(name){
    let data = window.localStorage.getItem(name)
    console.log(data)
    if(data){
      return JSON.parse(data)
    }
    else {
      return ''
    }
  }
  //remove 
  removeStorage(name){
    window.localStorage.removeItem(name);

  }

 
}
export default MUtile;