import React from 'react';

import ProductList from '../../../page/product/index/index.jsx'
import ProductSave from '../../../page/product/index/save.jsx'
import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom' 


class ProductRouter extends React.Component {
   render(){
      
          return(
          <Router>
             <Switch>
                <Route path="/product/index" component={ProductList}></Route>
                <Route  path="/product/save" component={ProductSave}></Route>
                <Redirect exact from="/product" to="/product/index"></Redirect>
               
             </Switch>
           
          </Router>
          )
   }

}

export default ProductRouter;
