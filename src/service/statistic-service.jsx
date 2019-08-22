import MUtil from '../util/mm.jsx'
const _mm = new MUtil();
class Statistic{
    getHomeCount(){
      return  _mm.request({
           
            url:'/manage/statistic/base_count.do',
           
        })
    }
   
   
}
export default Statistic;
// 这里返回的是一个promise对象，所以支持后续的链式操作