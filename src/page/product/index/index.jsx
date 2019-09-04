import React from 'react';
import { Link } from 'react-router-dom'
import MUtil from '../../../util/mm.jsx'
import Product from '../../../service/product-service.jsx'
import PageTitle from '../../../components/page-title/index.jsx'
import ListSearch from './index-list-search.jsx'
import TableList from '../../../util/table-list/index.jsx'
import Pagination from '../../../util/pagination/index.jsx';
import './index.css'
const _mm = new MUtil();
const _product = new Product();
class ProductList extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         pageNum: 1,
         list: [],
         listType:'list'

      }

   }
   componentDidMount() {
      this.loadProductList()
   }
   //搜索
   onSearch(searchType,searchKeyword){
    
      let listType = searchKeyword===''?'list':'search';
      this.setState({
         listType:listType,
         pageNum:1,
         searchType:searchType,
         searchKeyword:searchKeyword
      },()=>{
         this.loadProductList()
      })

   }
   //页数发生变化的时候
   onPageNumChange(pageNum) {
      this.setState({
         pageNum: pageNum
      }, () => {
         //回调
         this.loadProductList()
      })
   }
   //加载商品列表
   loadProductList() {
    let listParam = {};
    listParam.listType = this.state.listType;
    listParam.pageNum = this.state.pageNum;
    //如果是搜索，传入参数
    if(this.state.listType === 'search'){
       listParam.searchType = this.state.searchType;
       listParam.keyword = this.state.searchKeyword
    }
    //请求接口
      _product.getProductList(listParam).then(res => {
         this.setState(res)
      }, errMsg => {
         this.setState({
            list: []
         })
         _mm.errorTips(errMsg)
      })
   }
   //改变商品的转态，上架或者下架
   onSetProductStatus(e, productId, currentStatus) {
      let newStatus = currentStatus == 1 ? 2 : 1,
         confirmTips = currentStatus == 1 ? '确定要下架该商品' : '确定要下架该商品'

      if (window.confirm(confirmTips)) {
         _product.setProductStatus({
            productId: productId,
            status: newStatus
         }).then(res => {
            _mm.successTips(res)
            this.loadProductList();
         }, errMsg => {
            _mm.errorTips(errMsg);
         })
      }
   }

   render() {
      let tableHeads = [
         { name: '商品ID', width: '10%' },
         { name: '商品信息', width: '50%' },
         { name: '价格', width: '10%' },
         { name: '状态', width: '15%' },
         { name: '操作', width: '15%' }
      ]
      // 这里对表格做了一次封装，头部，内容的 作为参数传过去
      return (
         <div id="page-wrapper">

            <div className="row">
               <PageTitle title="商品列表">
                  <div className="page-header-right">
                     <Link to="/product/save" className="btn btn-primary">
                        <i className="fa fa-plus"></i>
                        <span>添加商品</span>
                     </Link>
                  </div>
               </PageTitle>
               {/* 搜索 */}
               <ListSearch onSearch={(searchType,searchKeyword)=>{this.onSearch(searchType,searchKeyword)}}></ListSearch>
                        <TableList tableHeads={tableHeads}>
                           {
                              this.state.list.map((product, index) => {
                                 return (
                                    <tr key={index}>
                                       <td>{product.id}</td>
                                       <td>
                                          <p>
                                             {product.name}
                                          </p>

                                          <p>
                                             {product.subtitle}
                                          </p>
                                       </td>
                                       <td>￥{product.price}</td>
                                       <td>
                                          <p>{product.status == 1 ? '在售' : '已下架'}</p>
                                          <button className="btn btn-xs btn-warning" onClick={(e) => { this.onSetProductStatus(e, product.id, product.status) }}>{product.status == 1 ? '下架' : '上架'}</button>
                                       </td>
                                       <td>
                                          <Link className="opear" to={`/product/detail/${product.id}`}>
                                             查看详情
                         </Link>
                                          <Link className="opear" to={`/product/save/${product.id}`}>
                                             编辑
                         </Link>
                                       </td>
                                    </tr>
                                 );
                              })
                           }
                        </TableList>
            
           </div>
                     <Pagination current={this.state.pageNum} total={this.state.total}
                        onChange={(pageNum) => this.onPageNumChange(pageNum)} />
                  </div>
                  )
           }
        
        }
        
        export default ProductList;