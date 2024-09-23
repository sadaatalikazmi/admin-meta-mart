import React from 'react';
import { connect } from 'react-redux';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

// core components
import { routes, superAdminRoutes } from '../routes.js';
import Loader from '../components/Loader';
import Footer from '../components/Footer/Footer.jsx';
import Sidebar from '../components/Sidebar/Sidebar.jsx';
import AdminNavbar from '../components/Navbars/AdminNavbar.jsx';
import jwt_decode from 'jwt-decode';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: 'blue'
    };
  }

  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle('nav-open');
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };

  getRoutes = routes => {
    return (
      <Router>
        <Switch>
          {routes.map((prop, key) => {
            if (prop.layout === '/home') {
              return (
                <Route
                  exact={true}
                  path={prop['layout'] + prop['path']}
                  component={prop['component']}
                  key={key}
                />
              );
            } else return null;
          })}
          <Redirect to='/home' />
        </Switch>
      </Router>
    );
  };

  selectTab = activeTab => this.setState({ activeTab });
  handleBgClick = color => this.setState({ backgroundColor: color });

  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };

  render() {
    let { activeTab } = this.state;
    let { isLoader } = this.props;
    return (
      <div className='wrapper'>
        {isLoader && <Loader />}
        <Sidebar
          {...this.props}
          routes={this.props.role === 'super-admin' ? superAdminRoutes : routes}
          activeTab={activeTab}
          bgColor={this.state.backgroundColor}
          logo={{
            outterLink: '#',
            text: 'BitDandy'
          }}
          toggleSidebar={this.toggleSidebar}
        />
        <div
          className='main-panel'
          ref='mainPanel'
          data={this.state.backgroundColor}
        >
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
            toggleSidebar={this.toggleSidebar}
            sidebarOpened={this.state.sidebarOpened}
          />
          {this.getRoutes(this.props.role === 'super-admin' ? superAdminRoutes : routes)}
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ Auth }) => {
  let { auth, isLoader, auth: token } = Auth;
  try {
    const decoded = jwt_decode(token)

    return { auth, isLoader, role: decoded['role'] };
  }
  catch (e) {
    return { auth, isLoader, role: null }
  }

};

export default connect(mapStateToProps)(Admin);