import React from 'react';
import PageTitle from '../../components/page-title/index.jsx'
import MUtil from '../../util/mm.jsx'
// import RichEditor from '../../../util/rich-editor/index.jsx'
import Order from '../../service/order-service.jsx'
// import CategorySelector from './category-selector.jsx'
// import FileUploader from '../../../util/file-uploader/index.jsx'
import './detail.css'
import TableList from '../../util/table-list/index.jsx'
// import { of } from 'rxjs';
const _mm = new MUtil();
const _order = new Order();
class OrderDetail extends React.Component {
    constructor(props){
        super(props);
        this.state={
            orderNumber:this.props.match.params.orderNumber,  //路由传过来的id
            orderInfo:{}

        }
    }
    componentDidMount(){
        this.loadOrderDetail()
    }
    //加载商品详情
    loadOrderDetail(){
       
        // if(this.state.id){
          
            _order.getOrderDetail(this.state.orderNumber).then((res)=>{
            
             this.setState({orderInfo:res})
            },(errMsg) =>{
                _mm.errorTips(errMsg)
            })
        // }
    }
    //发货操作
    onSendGoods(){
        if(window.confirm('是否该订单已经发货？')){
            _order.sendGoods(this.state.orderNumber).then((res)=>{
                this.successTips('发货成功')
                this.loadOrderDetail()
            },(errMsg)=>{
                _mm.errorTips(errMsg)
            })
        }
    }
 
    
    render() {
  let receiverInfo = this.state.orderInfo.shippingVo ||{},
  productList  = this.state.orderInfo.orderItemVoList || [];
        return (
            <div id="page-wrapper">
                <PageTitle title="订单详情" />

                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单号</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.orderNumber}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">创建时间</label>
                        <div className="col-md-10">
                        <p className="form-control-static">{this.state.orderInfo.createTime}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">收件人</label>
                        <div className="col-md-10">
                        <p className="form-control-static">
                            {receiverInfo.receiverName}
                            {receiverInfo.receiverProvice}
                            {receiverInfo.receiverCity}
                            {receiverInfo.receiverAddress}
                            {receiverInfo.receiverMobile || receiverInfo.receiverPhone} 
                        </p>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">订单状态</label>
                        <div className="col-md-10">
                        <p className="form-control-static">
                        {this.state.orderInfo.statusDesc}
                        {
                            this.state.orderInfo.status ==20?<button className="btn btn-default btn-sm btn-send-goods"
                            onClick={(e)=>this.onSendGoods(e)} >立即发货</button>:""
                        }
                        </p>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">支付方式</label>
                        <div className="col-md-10">
                        <p className="form-control-static">{this.state.orderInfo.paymentTypeDesc}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单金额</label>
                        <div className="col-md-10">
                        <p className="form-control-static">￥{this.state.orderInfo.payment}</p>
                        </div>
                    </div>
          

                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10">
                        <TableList  tableHeads={['商品图片','商品信息','单价','数量','合计']}>
                           {
                             productList.map((product, index) => {
                                 return (
                                    <tr key={index}>
                                       <td> <img  className="p-img" alt ={product.productName}  src={`${this.state.orderInfo.imageHost}${product.productImage}`} />
                                     </td>
                                       <td> {product.productName}</td>
                                       <td> ￥{product.currentUnitPrice}</td>
                                       <td>{product.quantity}</td>
                                       <td>{product.totalPrice}</td>
                                      
                           
                                    </tr>
                                 );
                              })
                           }
                        </TableList>
                        </div>
                    </div>
                
                </div>
            </div>
        )
    }

}

export default OrderDetail;
