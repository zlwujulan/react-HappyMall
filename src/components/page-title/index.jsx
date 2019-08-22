import React from 'react';

class Layout extends React.Component{
    constructor(props){
        super(props)
    }
    componentWillMount(){
        document.title = this.props.title +'-HAPPY MMALL'
    }
    render(){
        return(
            <div id="row">
             <div className="col-md-12">
                 <h1 className="page-header">{this.props.title}</h1>
                 {this.props.children}
             </div>
              
            </div>
        )
    }
}
export default Layout;