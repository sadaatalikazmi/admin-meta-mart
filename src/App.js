import EventBus from 'eventing-bus';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { ToastContainer, toast } from 'react-toastify';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './store/PrivateRoute.js';
import { logout } from './store/actions/Auth.js';

import './App.css'
import Login from './views/Login/index.js';
import Register from './views/Register/index.js';
import Admin from './layouts/Admin.jsx';
import Advertiser from './layouts/Advertiser.jsx';

const hist = createBrowserHistory();

export class App extends Component {
  async componentDidMount() {
    EventBus.on('info', e => toast.info(e));
    EventBus.on('error', e => toast.error(e));
    EventBus.on('error-login', e => {
      toast.error(e)
    });
    EventBus.on('success', e => toast.success(e));
    EventBus.on('tokenExpired', () => {
      this.props.logout();
    });
  }

  render() {

    return (
      <div>
        <ToastContainer />
        <Router history={hist}>
          <Switch>
            <PrivateRoute path='/home' component={props => <Admin {...props} />} />
            <PrivateRoute path='/advertiser' component={props => <Advertiser {...props} />} />
            <Route path='/register' render={props => <Register {...props} />} />
            <Route path='/login' render={props => <Login {...props} />} />
            <Redirect to='/login' />
          </Switch>
        </Router>
      </div>
    );
  }
}
const mapDispatchToProps = {
  logout
};

const mapStateToProps = ({ Auth }) => {
  let { } = Auth;
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);