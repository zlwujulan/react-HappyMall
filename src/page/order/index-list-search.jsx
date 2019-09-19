import React from 'react';



class ListSearch extends React.Component {
   constructor(props){
      super(props)
      this.state={
      orderNumber:''

      }
     
     
   }
   onValueChange(e){
       let name = e.target.name,
       value = e.target.value.trim();
           this.setState({
              [name]:value
           })  
   }
   //點擊搜索按鈕
   onSearch(){
   this.props.onSearch(this.state.orderNumber)
   }
   //输入关键字后按回车，自动提交
   onSearchKeywordKeyUp(e){
      if(e.keyCode==13){
          this.onSearch();
      }
     
   }
   render(){
          return(
            <div className="row search-wrap">
            <div className="col-md-12">
            <div className="form-inline">
                  <div className="form-group">
                    <select className="form-control"
                    name="searchType"
                    onChange={(e) =>this.onValueChange(e)}
                    >
                       <option value="productId">按订单号查询</option>
                    
                    </select>
                    
                 </div>
                     <div className="form-group">
                        <input type="text" className="form-control" 
                        name="orderNumber"
                        onKeyUp={(e)=>this.onSearchKeywordKeyUp(e)}
                        onChange={(e) =>this.onValueChange(e)}
                        id="exampleInputPassword3" placeholder="请输入订单号"/>
                  </div>
                       
                           <button type="submit" onClick={(e)=>this.onSearch()} className="btn btn-primary">Sign in</button>
                   </div>
             </div>
                  </div>
          )
   }

}

export default ListSearch;
