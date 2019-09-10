import React from 'react';

import ProductList from '../../../page/product/index/index.jsx'
import ProductSave from '../../../page/product/index/save.jsx'
import ProductDetail from '../../../page/product/index/detail.jsx'
import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom' 


class ProductRouter extends React.Component {
   render(){
      
          return(
          <Router>
             <Switch>
                <Route path="/product/index" component={ProductList}></Route>
                {/* jia ?表示是可选的，都匹配到该路径 */}
                <Route  path="/product/save/:pid?" component={ProductSave}></Route>  
                <Route  path="/product/detail/:pid" component={ProductDetail}></Route>
                <Redirect exact from="/product" to="/product/index"></Redirect>
               
             </Switch>
           
          </Router>
          )
   }

}

export default ProductRouter;
