import React from 'react';
import {Link} from 'react-router-dom' 

import MUtil from '../../../util/mm.jsx'
import Product   from '../../../service/product-service.jsx'
import PageTitle from '../../../components/page-title/index.jsx'
import TableList from '../../../util/table-list/index.jsx'
const _mm = new MUtil();
const _product =new Product();
class CategoryList extends React.Component {
   constructor(props){
      super(props)
      this.state={
       parentCategoryId:this.props.match.params.categoryId ||0,
        list:[],
       
      }

   }
   componentDidMount(){
       this.loadCategoryList()
   }
  //加载品类列表
   loadCategoryList(){
         _product.getCategoryList(this.state.parentCategoryId).then(res=>{
           this.setState({
               list:res
           })
       },errMsg=>{
           this.setState({
               list:[]
           })
        _mm.errorTips(errMsg)
        })
   }
   //更新品类的名字
   onUpdateName(categoryId,categoryName){
   let newName = window.prompt('请输入新的品类名称',categoryName)
   if(newName){
       _product.updateCategoryName({
           categoryId:categoryId,
           categoryName:categoryName
       }).then(res =>{
           _mm.successTips(res)
       },errMsg =>{
           _mm.errorTips(errMsg)
       })
   }
   }

   render(){
      let  listBody=this.state.list.map((category,index)=>{
        return (
            <tr key={index}>
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>
                <a className="opear" 
                onClick={(e)=>this.onUpdateName(category.id,category.name)}>
                    修改名称
                </a>
            </td>
            
     
            </tr>
        );
       })
          return(
            <div id="page-wrapper">
            <PageTitle title="品类列表" />
           <div className="row">
          <div className="col-md-12">
              <p>父品类ID：{this.state.parentCategoryId}</p>
          </div>
            <TableList tableHeads={['品类ID','品类名称','操作']} >
                {listBody}
            </TableList>
           </div>
         
        </div>
          )
   }

}

export default CategoryList;
