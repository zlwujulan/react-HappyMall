import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import Home from './page/home/index.jsx'
import Login from './page/login/index.jsx'
import ProductRouter from './page/product/index/router.jsx'
import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom' 
import Layout  from './components/layout/index.jsx'
import ErrorPage from './page/error/index.jsx'
import UserList from './page/user/index.jsx'
class App extends React.Component {
   render(){
      let LayoutRouter=(
         <Layout>
               <Switch>
                        <Route path="/" exact component={Home}></Route>
                        <Route path="/product"  component={ProductRouter}></Route>
                        <Route path="/product-category"  component={ProductRouter}></Route>
                        <Route path="/user/index"  component={UserList}></Route>
                        <Redirect exact from="/user" to="/user/index"></Redirect>
                        <Route path="/order"  component={Home}></Route>
                        <Route path="/kind"  component={Home}></Route>
                        {/* <Route path="/user"  component={Home}></Route> */}

                        {/* <Redirect from="*" to="/" /> */}
                        <Route component={ErrorPage}></Route>
               </Switch>
      </Layout>
      )
          return(
          <Router>
             <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/" render={ props=> LayoutRouter}/>
             </Switch>
           
          </Router>
          )
   }

}

export default App;
