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
   //在更新 阶段，判断路径发生变化，展示子品类数据
   componentDidUpdate(prevProps,prevState){
    //    console.log(this.props.match.params.categoryId)
    let oldPath = prevProps.location.pathname,
        newPath = this.props.location.pathname,
        newId = this.props.match.params.categoryId ||0
   if(oldPath !== newPath){
       this.setState({
           parentCategoryId:newId
       },()=>{
          this.loadCategoryList()
       })
   }
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
           this.loadCategoryList()
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
                {
                    category.parentId ===0?
                    <Link to={`/product-category/index/${category.id}`}>查看子品类</Link>
                    :null
                }
                {/* 组件不变化，不会重新加载，但是会触发组件的更新 ，所以更新事件里捕获*/}
            </td>
            
     
            </tr>
        );
       })
          return(
            <div id="page-wrapper">
            <PageTitle title="品类列表" />
            <div className="page-header-right">
                <Link to="/product-category/add" className="btn btn-primary">
                    <i className="fa fa-plus" ></i>
                    <span>添加品类</span>
                </Link>
            </div>
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
