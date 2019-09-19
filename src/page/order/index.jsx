import React from 'react';
import { Link } from 'react-router-dom'
import MUtil from '../../util/mm.jsx'
import Order from '../../service/order-service.jsx'
import PageTitle from '../../components/page-title/index.jsx'
import ListSearch from './index-list-search.jsx'
import TableList from '../../util/table-list/index.jsx'
import Pagination from '../../util/pagination/index.jsx';
// import './index.css'
const _mm = new MUtil();
const _order = new Order();
class OrderList extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         pageNum: 1,
         list: [],
         listType:'list'

      }

   }
   componentDidMount() {
      this.loadOrderList()
   }
   //搜索
   onSearch(orderNumber){
    
      let listType = orderNumber===''?'list':'search';
      this.setState({
         listType:listType,
         pageNum:1,
         orderNumber:orderNumber
      },()=>{
         this.loadOrderList()
      })

   }
   //页数发生变化的时候
   onPageNumChange(pageNum) {
      this.setState({
         pageNum: pageNum
      }, () => {
         //回调
         this.loadOrderList()
      })
   }
   //加载商品列表
   loadOrderList() {
    let listParam = {};
    listParam.listType = this.state.listType;
    listParam.pageNum = this.state.pageNum;
    //如果是搜索，传入参数
    if(this.state.listType === 'search'){
       listParam.orderNo = this.state.orderNumber;
     
    }
    //请求接口
      _order.getOrderList(listParam).then(res => {
         this.setState(res)
      }, errMsg => {
         this.setState({
            list: []
         })
         _mm.errorTips(errMsg)
      })
   }
//    //改变商品的转态，上架或者下架
//    onSetProductStatus(e, productId, currentStatus) {
//       let newStatus = currentStatus == 1 ? 2 : 1,
//          confirmTips = currentStatus == 1 ? '确定要下架该商品' : '确定要下架该商品'

//       if (window.confirm(confirmTips)) {
//          _order.setProductStatus({
//             productId: productId,
//             status: newStatus
//          }).then(res => {
//             _mm.successTips(res)
//             this.loadProductList();
//          }, errMsg => {
//             _mm.errorTips(errMsg);
//          })
//       }
//    }

   render() {
      let tableHeads = [ '订单号','收件人','订单状态','订单总价','创建时间','操作'
      ]
      // 这里对表格做了一次封装，头部，内容的 作为参数传过去
      return (
         <div id="page-wrapper">

            <div className="row">
               <PageTitle title="订单列表">

               </PageTitle>
               {/* 搜索 */}
               <ListSearch onSearch={(orderNumber)=>{this.onSearch(orderNumber)}}></ListSearch>
                        <TableList tableHeads={tableHeads}>
                           {
                              this.state.list.map((order, index) => {
                                 return (
                                    <tr key={index}>
                                       <td>   <Link  to={`/order/detail/${order.orderNo}`}>{order.orderNo}</Link>
                                     </td>
                                       <td> {order.receivreName}</td>
                                       <td> {order.statusDesc}</td>
                                       <td>￥{order.payment}</td>
                                       <td>{order.createTime}</td>
                                      
                                       <td>
                                          <Link  to={`/order/detail/${order.orderNo}`}>
                                             详情
                         </Link>
                                          {/* <Link className="opear" to={`/product/save/${product.id}`}>
                                             编辑
                         </Link> */}
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
        
        export default OrderList;
