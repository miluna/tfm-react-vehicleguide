import React, {Component} from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from './components/Footer';
import Login from './layout/Login';
import AdminPanel from './layout/admin/AdminPanel';
import Product from './layout/Product';
import Search from './layout/Search';
import Header from "./components/Header";
import SimpleHome from "./layout/SimpleHome";


const routes = (
    <Switch>
        <Route exact path="/" component={SimpleHome}/>
        <Route path="/products/:id" component={Product}/>
        <Route exact path="/search" component={Search}/>
        <Route exact path="/login" component={Login}/>
        <ProtectedRoute exact path="/admin" component={AdminPanel}/>
    </Switch>
);

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Header/>
                {routes}
                <Footer author="Miguel Angel Luna" year="2018"/>
            </React.Fragment>
        );
    }
}

export default withRouter(App);
