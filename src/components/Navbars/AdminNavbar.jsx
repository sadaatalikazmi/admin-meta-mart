import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import classNames from "classnames";
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from '@mui/material/Tooltip';
import EmailIcon from '@mui/icons-material/Email';
import DraftsIcon from '@mui/icons-material/Drafts';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";


import './index.css';
import { logout, setAddress, } from '../../store/actions/Auth';
import { uploadProducts } from '../../store/actions/Product';
import { getUnreadNotifications, getUserNotifications, markAsRead } from "../../store/actions/Banner";
import BannerNotificationModal from "../BannerNotificationModal";
import constants from "../utils/constants";

const AdminNavbar = props => {
  const dispatch = useDispatch();
  const { unreadNotifications, userNotifications } = useSelector(st => st.Banners);
  const { formatWord, formatMoment } = constants;

  const [isNotificationSidebar, setIsNotificationSidebar] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const [notificationClass, setNotificationClass] = useState('side-modal');
  const [openedNotification, setOpenedNotification] = useState(null);
  const [isNotificationModal, setIsNotificationModal] = useState(false);
  const [state, setState] = useState({
    collapseOpen: false,
    modalSearch: false,
    color: "navbar-transparent",
    role: localStorage.getItem('role'),
  });

  useEffect(() => {
    dispatch(getUnreadNotifications());
  }, []);

  useEffect(() => {
    if (unreadNotifications) setUnreadNotificationsCount(unreadNotifications.length);
  }, [unreadNotifications]);

  useEffect(() => {
    if (isNotificationSidebar) {
      dispatch(getUserNotifications());
      setNotificationClass('side-modal side-modal-open');
    } else setNotificationClass('side-modal');
  }, [isNotificationSidebar]);

  useEffect(() => {
    if (userNotifications) setNotifications(userNotifications);
  }, [userNotifications]);

  const toggleModalSearch = () => {
    setState({
      modalSearch: !state.modalSearch
    });
  };

  const logout = () => {
    props.logout();
    props.history.push('/login');
  };

  const toggleNotificationSidebar = () => setIsNotificationSidebar(!isNotificationSidebar);
  const toggleNotificationModal = () => setIsNotificationModal(!isNotificationModal);
  const handleMarkAsRead = (notificationId) => dispatch(markAsRead(notificationId));

  const redirectToEditBanner = (campaignId) => {
    toggleNotificationModal();
    setNotificationClass('side-modal');
    props.history.push(`/advertiser/editBanner/${campaignId}`);
  };

  const openNotificationHandler = (notification) => {
    setOpenedNotification(notification);
    handleMarkAsRead(notification.id);
    toggleNotificationModal();
  };

  return (
    <div className="nav-bar">
      <Navbar
        className={classNames("navbar-absolute", state.color)}
        expand="lg"
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: props.sidebarOpened
              })}
            >
              <button
                className="navbar-toggler"
                type="button"
                onClick={props.toggleSidebar}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand className="mt-2" href="#" target="_blank">
              {/* <img alt="..." src={require('../../assets/img/icon.png')} style={{ width: '20%'}} /> */}
            </NavbarBrand>
          </div>
          <Box display={'flex'}>
            {/* <Button variant='contained' onClick={() => setOpen(true)} startIcon={<UploadIcon />} size='small'>
              Import Data
            </Button> */}
            <Collapse navbar isOpen={state.collapseOpen}>
              <Nav className="ml-auto" navbar>
                {props?.history?.location?.pathname?.startsWith('/advertiser') && (
                  <>
                    <Tooltip title='Help'>
                      <div className="notfication-icon">
                        <HelpOutlineIcon />
                      </div>
                    </Tooltip>
                    <Tooltip title='Notifications'>
                      <div className="notfication-icon">
                        <Badge badgeContent={unreadNotificationsCount} onClick={() => toggleNotificationSidebar()}>
                          <NotificationsIcon />
                        </Badge>
                      </div>
                    </Tooltip>
                  </>
                )}
                <li className="separator d-lg-none" />
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    caret
                    color="default"
                    data-toggle="dropdown"
                    nav
                    onClick={e => e.preventDefault()}
                  >
                    <div className="photo">
                      <img alt="..." src={require('../../assets/img/icon.png')} />
                    </div>
                    <b className="caret d-none d-lg-block d-xl-block" />
                    <p className="d-lg-none">Logout</p>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-navbar" right tag="ul">
                    <DropdownItem divider tag="li" />
                    <NavLink tag="li" onClick={logout}>
                      <DropdownItem className="nav-item">Logout</DropdownItem>
                    </NavLink>
                    <DropdownItem divider tag="li" />
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Box>
        </Container>
      </Navbar>

      <div className={notificationClass}>
        <button className="close-sidebar" onClick={() => toggleNotificationSidebar()}><CloseIcon /></button>
        <div className="sidemodal-content">
          <h2>Notifications</h2>
          {notifications && notifications.map(notification => {
            return (
              <div className="notfication-block">
                <div className="massage-arae">
                  <p className='notification-headline' onClick={() => openNotificationHandler(notification)}>
                    {`${notification.bannerName} Ad ${formatWord(notification.status)}`}
                  </p>
                  <div className="msg-icons">
                    {
                      notification.isRead === 0
                        ? <span className="msg-icon msg-unread" onClick={() => handleMarkAsRead(notification.id)}><EmailIcon /></span>
                        : <span className="msg-icon msg-read"><DraftsIcon /></span>
                    }
                  </div>
                </div>
                <span className="timedate">{formatMoment(notification.createdAt)}</span>
              </div>
            )
          })}

        </div>
      </div>

      <BannerNotificationModal
        isNotificationModal={isNotificationModal}
        toggleNotificationModal={toggleNotificationModal}
        notification={openedNotification}
        redirectToEditBanner={redirectToEditBanner}
      />

      <Modal
        modalClassName="modal-search"
        isOpen={state.modalSearch}
        toggle={toggleModalSearch}
      >
        <div className="modal-header">
          <Input id="inlineFormInputGroup" placeholder="SEARCH" type="text" />
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={toggleModalSearch}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </div>
      </Modal>


    </div>
  );
}

const mapDispatchToProps = { logout, setAddress, uploadProducts };

const mapStateToProps = ({ Auth }) => {
  let { role, balance, address } = Auth;
  return { role, balance, address };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminNavbar);