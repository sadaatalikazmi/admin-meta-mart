import { Chart } from 'chart.js';
import { CSVLink } from 'react-csv';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import { Autocomplete, TextField } from '@mui/material';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import React, { Fragment, useState, useEffect } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import './index.css';
import countries from './countries';
import EnhancedTable from '../../components/table';
import SubmitButton from '../../components/Button';
import { setLoader } from '../../store/actions/Auth';
import { getAllOrders } from '../../store/actions/Order';
import { addUser, getAllUsers, updateUser } from '../../store/actions/User';
import ImportDataModal from '../../components/Modal/index';

const User = props => {

  const initialFilters = {
    email: '',
    name: '',
    location: '',
    role: '',
    totalOrders: '',
    totalSpending: '',
  }

  // STATES 
  const [state, setState] = useState({
    formData: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      address: '',
      country: '',
      zip: '',
      role: null
    }
  });
  const [selected, setSelected] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFilteredUsers(props.allUsers || []);
  }, [props.allUsers]);

  useEffect(() => {
    if (!props.allUsers) return;
    setFilteredUsers(props.allUsers.filter(el => {
      let condition = true;
      if (filters.name) condition = condition && el.username.toLowerCase().includes(filters.name.toLowerCase())
      if (filters.email) condition = condition && el.email && el.email.toLowerCase().includes(filters.email.toLowerCase())
      if (filters.location) condition = condition && el.location && el.location.toLowerCase().includes(filters.location.toLowerCase())
      if (filters.role) condition = condition && el.role && el.role.toLowerCase().includes(filters.role.toLowerCase())
      if (filters.totalOrders) condition = condition && +el.totalOrders === +filters.totalOrders
      if (filters.totalSpending) condition = condition && +el.totalSpending === +filters.totalSpending
      return condition;
    }));
  }, [filters])

  useEffect(() => {
    if (props.allOrders && props.allOrders.length === 0)
      props.getAllOrders();
  }, [props.allOrders]);

  useEffect(() => {
    if (props.allUsers && props.allUsers.length === 0)
      props.getAllUsers();
  }, [props.allUsers]);

  useEffect(() => {
    updateCharts();
  }, [props.allUsers]);

  const updateCharts = () => {
    const { allUsers } = props;
    const userCount = allUsers.length;

    // Pie Chart Data
    const pieLabels = ['Total Users'];
    const pieData = [userCount];
    const pieColors = ['rgba(75, 192, 192, 0.6)'];

    // Line Chart Data
    const lineLabels = ['January', 'February', 'March', 'April', 'May', 'June'];
    const lineData = [12, 19, 3, 5, 2, 3];

    // Pie Chart
    const pieChartCanvas = document.getElementById('userPieChart');
    if (pieChartCanvas) {
      const pieCtx = pieChartCanvas.getContext('2d');
      new Chart(pieCtx, {
        type: 'pie',
        data: {
          labels: pieLabels,
          datasets: [
            {
              data: pieData,
              backgroundColor: pieColors
            }
          ]
        }
      });
    }

    // Line Chart
    const lineChartCanvas = document.getElementById('userLineChart');
    if (lineChartCanvas) {
      const lineCtx = lineChartCanvas.getContext('2d');
      new Chart(lineCtx, {
        type: 'line',
        data: {
          labels: lineLabels,
          datasets: [
            {
              label: 'User Count',
              data: lineData,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 1
            }
          ]
        }
      });
    }
  };

  // SUBMIT ADD USER
  const handleSubmit = async () => {
    const { formData, selectedUser } = state;
    setIsSubmitting(true)
    if (selectedUser === '' || selectedUser === null || selectedUser === undefined) {
      props.addUser({
        formData,
        successCallback: () => {
          setSelected([])
          setFilters(initialFilters)
          setState(st => ({ ...st, isUserModal: false }));
          setIsSubmitting(false)
        },
        failCallBack: () => {
          setIsSubmitting(false)
        },
      });
    } else {
      props.updateUser({
        formData,
        successCallback: () => {
          setSelected([])
          setFilters(initialFilters)
          setState(st => ({ ...st, isUserModal: false, selectedUser: null }));
          setIsSubmitting(false)
        },
        failCallBack: () => {
          setIsSubmitting(false)
        },
      });
    }
  };

  // EDIT INPUT FILED
  const handleChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  };

  const toggleUserModal = () =>
    setState(prevState => ({
      ...prevState,
      isUserModal: false,
      formData: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        address: '',
        country: '',
        zip: '',
        role: null,
        isDeleteShelfModal: false
      }
    }));

  const { allOrders } = props;
  const { formData, isUserModal, isDeleteShelfModal } = state;
  const { username, firstName, lastName, email, address, zip } = formData;

  // USER TABLE COLUMNS
  const columns = [
    {
      label: 'id',
      accessor: 'id',
      id: 'id',
    },
    {
      label: 'User Name',
      accessor: 'username',
      id: 'username',
    },
    {
      label: 'Email',
      accessor: 'email',
      id: 'email'
    },
    {
      label: 'Location',
      accessor: 'location',
      id: 'location'
    },
    {
      label: 'Role',
      accessor: 'role',
      id: 'role'
    },
    {
      label: 'Orders',
      accessor: 'totalOrders',
      id: 'totalOrders'
    },
    {
      label: 'TotalSpending',
      accessor: 'totalSpending',
      id: 'totalSpending'
    },

  ];

  return (
    <div className='content'>
      <div className='main-container mintedNFT'>
        {/* CSV DOWNLOAD */}
        <div className='top-heading-area'>
          <h3>All Users</h3>
          <div className='btn-group'>
            <CSVLink data={filteredUsers} >
              <button className="btn-style-one">Export Data</button>
            </CSVLink>
            <button onClick={() => setOpenModal(true)} className="btn-style-one">
              Import Data
            </button>
            <ImportDataModal isOpen={openModal} closeModal={() => setOpenModal(false)} />
          </div>
        </div>
        <Fragment>
          <div className='main-container-head mb-3'>
            {/* USER TABLE */}
            <EnhancedTable
              selected={selected}
              setSelected={setSelected}
              rows={filteredUsers}
              columns={columns}
              fetching={props.fetching}
              count={filteredUsers.length}

              showFilters
              filters={[
                {
                  isSpace: true,
                },
                {
                  label: 'Name',
                  name: 'name',
                  value: filters.name,
                  type: 'text',
                  id: 'name.name',
                  handleChange: (e) => {
                    setFilters(st => ({
                      ...st, [e.target.name]: e.target.value
                    }))
                  }
                },
                {
                  label: 'Email',
                  name: 'email',
                  value: filters.email,
                  type: 'text',
                  id: 'email.email',
                  handleChange: (e) => {
                    setFilters(st => ({
                      ...st, [e.target.name]: e.target.value
                    }))
                  }
                },
                {
                  label: 'Location',
                  name: 'location',
                  value: filters.location,
                  type: 'text',
                  id: 'location.location',
                  handleChange: (e) => {
                    setFilters(st => ({
                      ...st, [e.target.name]: e.target.value
                    }))
                  }
                },
                {
                  label: 'Role',
                  name: 'role',
                  value: filters.role,
                  type: 'text',
                  id: 'role.role',
                  handleChange: (e) => {
                    setFilters(st => ({
                      ...st, [e.target.name]: e.target.value
                    }))
                  }
                },

                {
                  label: 'Orders',
                  name: 'totalOrders',
                  value: filters.totalOrders,
                  type: 'text',
                  id: 'totalOrders.name',
                  handleChange: (e) => {
                    setFilters(st => ({
                      ...st, [e.target.name]: e.target.value
                    }))
                  }
                },
                {
                  label: 'TotalSpending',
                  name: 'totalSpending',
                  value: filters.totalSpending,
                  type: 'text',
                  id: 'totalSpending.name',
                  handleChange: (e) => {
                    setFilters(st => ({
                      ...st, [e.target.name]: e.target.value
                    }))
                  }
                }
              ]}
            />
          </div>
        </Fragment>
      </div>

      {/* ---------------ADD USER MODAL--------------- */}
      <Modal
        isOpen={isUserModal}
        toggle={toggleUserModal}
        className='main-modal Shelf-modal'>
        <ModalHeader toggle={toggleUserModal}>
          <div className='modal-logo'>
            <img src={require('../../assets/img/logo.png')} alt='modal-logo' />
          </div>
        </ModalHeader>
        <ModalBody className='modal-body'>
          <ValidatorForm className='form' onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col-12'>
                <div className='form-group'>
                  <label htmlFor='name'>Email: </label>
                  <TextValidator
                    type='email'
                    id='email'
                    name='email'
                    value={email}
                    disabled
                    className='form-control'
                    onChange={handleChange}
                    validators={['required']}
                    errorMessages={['Email is required']}
                  />
                </div>
              </div>


              <div className='col-lg-6 col-md-12'>
                <div className='form-group'>
                  <label htmlFor='shelfId'>First Name: </label>
                  <TextValidator
                    type='text'
                    id='firstName'
                    name='firstName'
                    value={firstName}
                    className='form-control'
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className='col-lg-6 col-md-12'>
                <div className='form-group'>
                  <label htmlFor='shelfId'>Last Name:</label>
                  <TextValidator
                    type='text'
                    id='lastName'
                    name='lastName'
                    value={lastName}
                    className='form-control'
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className='col-lg-6 col-md-12'>
                <div className='form-group'>
                  <label htmlFor='name'>User Name: </label>
                  <TextValidator
                    type='text'
                    id='username'
                    name='username'
                    value={username}
                    disabled
                    className='form-control'
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className='col-lg-6 col-md-12'>
                <div className='form-group'>
                  <label htmlFor='name'>Role: </label>
                  <Autocomplete
                    value={state.formData.role || ''}
                    onChange={(event, newValue) => {
                      setState(st => ({
                        ...st,
                        formData: {
                          ...st.formData,
                          role: newValue || ''
                        }
                      }));
                    }}
                    getOptionLabel={option => option || ''}
                    inputValue={state.formData.role}
                    onInputChange={(event, newInputValue) => {
                      setState(st => ({
                        ...st,
                        formData: {
                          ...st.formData,
                          role: newInputValue || ''
                        }
                      }));
                    }}
                    id='role'
                    options={
                      [
                        'superadmin',
                        'admin',
                        'user'
                      ]
                    }
                    sx={{ width: 300 }}
                    renderInput={params => <TextField {...params} />}
                  />
                </div>
              </div>

              <div className='col-lg-6 col-md-12'>
                <div className='form-group'>
                  <label htmlFor='countries'>Countries:</label>
                  <Autocomplete
                    value={state.formData.country || ''}
                    onChange={(event, newValue) => {
                      setState(st => ({
                        ...st,
                        formData: {
                          ...st.formData,
                          country: newValue || ''
                        }
                      }));
                    }}
                    getOptionLabel={option => option || ''}
                    inputValue={state.formData.country}
                    onInputChange={(event, newInputValue) => {
                      setState(st => ({
                        ...st,
                        formData: {
                          ...st.formData,
                          country: newInputValue || ''
                        }
                      }));
                    }}
                    id='countries'
                    options={
                      countries
                    }
                    sx={{ width: 300 }}
                    renderInput={params => <TextField {...params} />}
                  />
                </div>
              </div>

              <div className='col-lg-6 col-md-12'>
                <div className='form-group'>
                  <label htmlFor='name'>Zip Code: </label>
                  <TextValidator
                    type='text'
                    id='zip'
                    name='zip'
                    value={zip}
                    className='form-control'
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className='col-12'>
                <div className='form-group'>
                  <label htmlFor='name'>Address: </label>
                  <TextValidator
                    type='text'
                    id='address'
                    name='address'
                    value={address}
                    className='form-control'
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group text-center'>
                  <SubmitButton loading={isSubmitting} />
                </div>
              </div>
            </div>
          </ValidatorForm>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = {
  setLoader,
  addUser,
  getAllUsers,
  updateUser,
  getAllOrders
};

const mapStateToProps = ({ User, Customer }) => {
  let { allUsers, count, fetching } = User;
  let { allOrders } = Customer;
  return { allUsers, allOrders, count, fetching };
};
export default connect(mapStateToProps, mapDispatchToProps)(User);
