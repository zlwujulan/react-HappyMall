import React from 'react';
import PageTitle from '../../../components/page-title/index.jsx'
import MUtil from '../../../util/mm.jsx'
import RichEditor from '../../../util/rich-editor/index.jsx'
import Product from '../../../service/product-service.jsx'
import CategorySelector from './category-selector.jsx'
import FileUploader from '../../../util/file-uploader/index.jsx'
import './save.css'
import { of } from 'rxjs';
const _mm = new MUtil();
const _product = new Product();
class ProductDetail extends React.Component {
    constructor(props){
        super(props);
        this.state={
            id:this.props.match.params.pid,  //路由传过来的id
            name:'',
            subtitle:'',
            categoryId:0,
            parentCategoryId:0,
            subImages:[],
            price:'',
            stock:'',
            detial:"",
            status:1  //商品状态1为在售

        }
    }
    componentDidMount(){
        this.loadProduct()
    }
    //加载商品详情
    loadProduct(){
        if(this.state.id){
            //有id的表示编辑，需要表单回填
            _product.getProduct(this.state.id).then((res)=>{
             let images = res.subImages.split(',');
             res.subImages = images.map((imgUri) =>{
                 return {
                     uri:imgUri,
                     url:res.imageHost + imgUri
                 }
             });
             res.defaultDetail = res.detail;
             this.setState(res)
            },(errMsg) =>{
                _mm.errorTips(errMsg)
            })
        }
    }
 
    
    render() {

        return (
            <div id="page-wrapper">
                <PageTitle title="添加商品" />

                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.name}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-10">
                        <p className="form-control-static">{this.state.subtit}</p>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CategorySelector 
                        ReadOnly
                        categoryId = {this.state.categoryId}
                        parentCategoryId = {this.state.parentCategoryId}
                        />
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                        <div className="input-group">
                        <input type="number"
                         className="form-control" 
                         value={this.state.price} readOnly
                        />
                            <span className="input-group-addon">元</span>
                        </div>

                           
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-3">

                        <div className="input-group">
                        <input type="number" 
                        className="form-control"
                          placeholder="请输入商品库存"
                          value={this.state.stock} readOnly
                          name="stock" 
                        
                          />
                            <span className="input-group-addon">件</span>
                        </div>
                           
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10">

                          {
                              this.state.subImages.length>0?this.state.subImages.map(
                                  (image,index)=>(
                                 <div className="img-con">
                                      <img className="img"  key={index}  src={image.url}/>
                                 </div>
                                  )

                              ):(<div>暂无图片</div>)
                          }
                           
                        </div>
                        <div className="col-md-offset-2 col-md-10 file-upload-con">
                           <FileUploader onSuccess={(res)=>{this.onUploadSuccess(res)}}
                           onError={(res)=>{this.onUploadError(res)}}
                           />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10">
                          <RichEditor 
                          detail = {this.state.detail}
                         
                       />
                        </div>
                    </div>
                   
                    {/* <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-primary" onClick={(e)=>this.onSubmit(e)}>提交</button>
                        </div>
                    </div> */}
                </div>
            </div>
        )
    }

}

export default ProductDetail;
