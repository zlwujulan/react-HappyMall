import MUtil from '../util/mm.jsx'
const _mm = new MUtil();
class Product{
    //获取用户列表
    getProductList(pageNum){
      return  _mm.request({
            type:'post',
            url:'/manage/product/list.do',
            data:{
                pageNum:pageNum
            }
           
        })
    }
    //变更商品销售状态
    setProductStatus(productInfo){
        return _mm.request({
            type:'post',
            url:'/manage/product/set_sale_status.do',
            data:productInfo
        })
    }
   
   
}
export default Product;
// 这里返回的是一个promise对象，所以支持后续的链式操作