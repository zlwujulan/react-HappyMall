import MUtil from '../util/mm.jsx'
const _mm = new MUtil();
class Product {
    //获取用户列表
    getProductList(listParam) {
        console.log(listParam)
        let url = '',
            data = {};
        if (listParam.listType === 'list') {
            url = '/manage/product/list.do';
            data.pageNum = listParam.pageNum;
        } else if (listParam.listType === 'search') {
            url = '/manage/product/search.do';
            data.pageNum = listParam.pageNum;
            data[listParam.searchType] = listParam.keyword;
        }

        return _mm.request({
            type: 'post',
            url: url,
            data: data

        })
    }
    //变更商品销售状态
    setProductStatus(productInfo) {
        return _mm.request({
            type: 'post',
            url: '/manage/product/set_sale_status.do',
            data: productInfo
        })
    }
    //检查保存商品的表单数据
    checkProduct(product) {
        let result = {
            status: true,
            msg: '验证通过'
        };
        //判断用户名为空
        if (typeof product.name !== 'string' || product.name.length == 0) {
            return {
                status: false,
                msg: '商品名不能为空'
            }
        }

        //判断描述不能为空
        if (typeof product.subtitle !== 'string' || product.subtitle.length == 0) {
            return {
                status: false,
                msg: '请输入正确的商品'
            }
        }
        //判断商品价格为数字且大于零
        if (typeof product.price !== 'number' || product.price.length <= 0) {
            return {
                status: false,
                msg: '商品价格为数字且大于零'
            }
        }
        //判断库存为数字，且大于或等于0
        if (typeof product.stock !== 'number' || product.stock < 0) {
            return {
                status: false,
                msg: '请输入正确的库存数量！'
            }
        }
        //品类的ID
        if (typeof product.productId !== 'number' || product.productId < 0) {
            return {
                status: false,
                msg: '请选择商品品类'
            }
        }
        return result
    }
    //保存商品
    /*
    * 品类相关
    */
    getCategoryList(parentCategoryId) {
        return _mm.request({
            type: 'post',
            url: '/manage/category/get_category.do',
            data: {
                categoryId: parentCategoryId || 0
            }
        })
    }

}
export default Product;
// 这里返回的是一个promise对象，所以支持后续的链式操作