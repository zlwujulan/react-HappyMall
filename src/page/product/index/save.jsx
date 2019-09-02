import React from 'react';
import PageTitle from '../../../components/page-title/index.jsx'
import MUtil from '../../../util/mm.jsx'
import Product from '../../../service/product-service.jsx'
import CategorySelector from './category-selector.jsx'
import FileUploader from '../../../util/file-uploader/index.jsx'
const _mm = new MUtil();
const _product = new Product();
class ProductSave extends React.Component {
    constructor(props){
        super(props);
        this.state={
            categoryId:0,
            parentCategoryId:0,
            subImages:[]
        }
    }
    //品类选择器的变化
    onCategoryChange(categoryId,parentCategoryId){
     
    }
    //上传图片陈宫
    onUploadSuccess(res){
     this.setState({
        subImages:this.state.subImages.push(res)
     })
    }
    //上传图片失败
    onUploadError(error){
       _mm.errorTips(error.message||'上传图片失败')
    }
    render() {

        return (
            <div id="page-wrapper">
                <PageTitle title="添加商品" />

                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-10">
                            <input type="text" className="form-control"  placeholder="请输入商品名称" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-10">
                            <input type="text" className="form-control"  placeholder="请输入商品描述" />
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
                        <input type="number" className="form-control"  placeholder="请输入商品价格" />
                            <span className="input-group-addon">元</span>
                        </div>

                           
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-3">

                        <div className="input-group">
                        <input type="number" className="form-control"  placeholder="请输入商品库存" />
                            <span className="input-group-addon">件</span>
                        </div>
                           
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10">

                          {
                              this.state.subImages.length?this.state.subImages.map(
                                  (image,index)=>(<img key={index} src={image.url}/>)

                              ):(<div>请上传图片</div>)
                          }
                           
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10">
                           <FileUploader onSuccess={(res)=>{this.onUploadSuccess(res)}}
                           onError={(res)=>{this.onUploadError(res)}}
                           />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10">
                          ccc
                        </div>
                    </div>
                   
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-primary">提交</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default ProductSave;
