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
class ProductSave extends React.Component {
    constructor(props){
        super(props);
        this.state={
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
    //简单字符的改变，如商品名称 ,描述价格，存库
    onValueChange(e){
        let name = e.target.name,
           value = e.target.value;
           this.setState({
               [name]:value
           })
   
    }
    //品类选择器的变化
    onCategoryChange(categoryId,parentCategoryId){
       this.setState({
           categoryId:categoryId,
           parentCategoryId:parentCategoryId
       })
    }
    //上传图片陈宫
    onUploadSuccess(res){
       let subImages = this.state.subImages;
       subImages.push(res)
     this.setState({
        subImages:subImages
        // subImages:this.state.subImages.push(res)  //这样写只是做了一个数组的推送，返回的是数组的长度
     })
    //  console.log(this.state.subImages,typeof(this.state.subImages))
    }
    //上传图片失败
    onUploadError(error){
       _mm.errorTips(error.message||'上传图片失败')
    }
    onImageDelete(e){
        // let index = e.target.index, //这里不能取到,因为index不是自带的属性
        let index = parseInt(e.target.getAttribute('index')),
            subImages = this.state.subImages;
            subImages.splice(index,1);
            this.setState({
                subImages:subImages
            })
    }
    //富文本编辑器
    onDetainValueChange(value){
      this.setState({
          detail:value
      })
    }
    getSubImagesString(){
        return this.state.subImages.map((image)=>image.uri).join(',')
    }
    // 提交表单
    onSubmit(){
     let product = {
         name:this.state.name,
         subtitle:this.state.subtitle,
         categoryId:this.state.categoryId,
         subImages:this.getSubImagesString(),
         detail:this.state.detail,
         price:this.state.price,
         stock:this.state.stock,
         status:this.state.status

     },
     productCheckResult = _product.checkProduct(product);
     //表单验证成功
         if(productCheckResult.status){
           _product.saveProduct().then((res) =>{
               _mm.successTips(res);
               this.props.history.push('./product/index')
           },(errMsg) =>{
               _mm.errorTips(errMsg )
           })
           //验证失败
         }else{
         _mm.errorTips(productCheckResult.msg);
         }
     }
   
    
    render() {

        return (
            <div id="page-wrapper">
                <PageTitle title="添加商品" />

                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-10">
                            <input type="text" 
                              className="form-control"
                            //   value={this.state.name}
                             name="name"
                             onChange={(e)=>{this.onValueChange(e)}} placeholder="请输入商品名称" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-10">
                            <input type="text" name="subtitle" 
                            className="form-control" 
                            // value={this.state.subtitle}
                            onChange={(e)=>{this.onValueChange(e)}}
                             placeholder="请输入商品描述" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CategorySelector  onCategoryChange = {(categoryId,parentCategoryId) =>
                            this.onCategoryChange(categoryId,parentCategoryId)
                        }/>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                        <div className="input-group">
                        <input type="number"
                         className="form-control" 
                        //  value={this.state.price}
                         name="price" 
                         onChange={(e)=>{this.onValueChange(e)}}
                         placeholder="请输入商品价格" />
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
                        //   value={this.state.stock}
                          name="stock" 
                          onChange={(e)=>{this.onValueChange(e)}}
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
                                      <i className="fa fa-close" index={index} onClick={(e)=>this.onImageDelete(e)}></i>
                                 </div>
                                  )

                              ):(<div>请上传图片</div>)
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
                          <RichEditor onValueChange = {(value)=>{this.onDetainValueChange(value)}}/>
                        </div>
                    </div>
                   
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-primary" onClick={(e)=>this.onSubmit(e)}>提交</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default ProductSave;
