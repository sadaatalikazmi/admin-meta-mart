import React from "react";
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import { PropTypes } from "prop-types";
import SalesCharts from '../../views/Statistics/SalesCharts.js';
import ItemsCategoriesCharts from '../../views/Statistics/ItemsCategoriesCharts/index.js';
import Demographics from '../../views/Statistics/Demographics.js';

import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Nav } from "reactstrap";

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    if (routeName === '/Statistics' && this.props.location.pathname === '/home') return 'active';

    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  linkOnClick = () => {
    document.documentElement.classList.remove("nav-open");
  };
  handleStatsNavLinkClick = () => {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  };
  handleOthersNavLinkClick = () => {
    this.setState({ active: false });
  };

  render() {
    const { role, bgColor, routes, rtlActive, logo } = this.props;
    const { active } = this.state;

    return (
      <div className="sidebar" data={bgColor}>
        <div className="sidebar-wrapper" ref="sidebar">
          <div className="logo text-center text-white" style={{ padding: '15px 0px' }}>
            <a href={logo.outterLink} to="/home">
              <img style={{ width: '80%' }} alt="..." src={require('../../assets/img/logo.png')} />
            </a>
          </div>
          <Nav>
            {routes.map((prop, key) => {
              return (
                <React.Fragment>
                  {!prop['hidden'] &&
                    <li
                      className={
                        this.activeRoute(prop.path) +
                        (prop.pro ? "active-pro" : "")
                      }
                      key={key}
                    >
                      <NavLink
                        to={prop.layout + prop.path}
                        className="nav-link"
                        activeClassName="active"
                        onClick={prop.name === 'Statistics' ? this.handleStatsNavLinkClick : this.handleOthersNavLinkClick}
                      >
                        <i className={prop.icon} />
                        <p className="text-white">{rtlActive ? prop.rtlName : prop.name}</p>
                      </NavLink>
                      {
                        prop['name'] == 'Statistics' && (
                          <ul className={active ? "dropdown active-dropdown" : "dropdown"}>
                            <li>
                              <NavLink
                                to="/home"
                                className="nav-link"
                                activeClassName="active"
                              >
                                <p className="text-white">Value Sales</p>
                              </NavLink>
                            </li>
                            {/* <li>
                            <NavLink
                                to="/home/ValueSales"
                                className="nav-link"
                                activeClassName="active"
                              >
                                <p className="text-white">Value Sales</p>
                              </NavLink>
                            </li> */}
                            <li>
                              <NavLink
                                to="/home/ItemsCategoriesCharts"
                                className="nav-link"
                                activeClassName="active"
                              >
                                <p className="text-white">Items & Categories</p>
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/home/Demographics"
                                className="nav-link"
                                activeClassName="active"
                              >
                                <p className="text-white">Demographics</p>
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/home/BannersCharts"
                                className="nav-link"
                                activeClassName="active"
                              >
                                <p className="text-white">Advertisement Stats</p>
                              </NavLink>
                            </li>
                          </ul>
                        )
                      }
                    </li>}
                </React.Fragment>
              );
            })}
          </Nav>
        </div>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  rtlActive: false,
  bgColor: "primary",
  routes: [{}]
};

Sidebar.propTypes = {
  // if true, then instead of the routes[i].name, routes[i].rtlName will be rendered
  // insde the links of this component
  rtlActive: PropTypes.bool,
  bgColor: PropTypes.oneOf(["primary", "blue", "green"]),
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the text of the logo
    text: PropTypes.node,
    // the image src of the logo
    imgSrc: PropTypes.string
  })
};

// export default Sidebar;


const mapDispatchToProps = {};

const mapStateToProps = ({ Auth }) => {
  let { role } = Auth;
  return { role };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);