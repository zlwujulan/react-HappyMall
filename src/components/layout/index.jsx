import React from 'react';
import TopNav from '../../components/nav-side/index.jsx';
import SideNav from '../../components/nav-top/index.jsx';
import './theme.css'
import './index.css'
class Layout extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div id="wrapper">
                
                 <TopNav/>
                <SideNav/>
                {/* 这里一定要加这样一行代码，不知道为什么？？？ */}
               {this.props.children}
              
            </div>
        )
    }
}
export default Layout;