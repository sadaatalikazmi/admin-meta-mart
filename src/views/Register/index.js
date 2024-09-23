import { connect } from "react-redux";
import React, { Component } from "react";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import './index.css';
import logo from '../../assets/img/logo.png';
import { register, registerLoader } from "../../store/actions/Auth";

class Register extends Component {
  
  constructor() {
    super();
    this.state = {
      name: '',
      username: '',
      email: '',
      password: '',
      role: 'advertiser',
      vendor: '',
    };
  };

  // Edit Imput Fields
  handleEditChange = (e) => this.setState({ [e.target.name]: e.target.value });

  // Submit Register
  handleRegister = async () => {
    let { history } = this.props;
    let { name, username, email, password, role, vendor } = this.state;

    let data = { name, username, email, password, role, vendor };
    this.props.registerLoader(true);
    this.props.register({ data, history });
  };


  render() {
    let { isLoader } = this.props;
    let { name, username, email, password, vendor } = this.state;

    return (
      <div className="login-page register-page">
        <div className="row">
          <div className="col-md-12 col-sm-12 d-flex justify-content-center">
            <div className="login-form login-form-field">
              <img className="login-page-logo" src={logo} alt='logo' />
              <p className="login-title">Register</p>
              {/* REGISTER FORM */}
              <ValidatorForm className="validator-form mt-4" onSubmit={this.handleRegister}>
                <div className="row">
                  <div className="col-lg-6 col-md-12">
                    <div className='login-field'>
                      <TextValidator
                        fullWidth
                        type='name'
                        name='name'
                        value={name}
                        id='standard-full-width'
                        className='form-input-field'
                        onChange={this.handleEditChange}
                        label={<label>Name <span>*</span></label>}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className='login-field'>
                      <TextValidator
                        fullWidth
                        type='username'
                        name='username'
                        value={username}
                        id='standard-full-width'
                        className='form-input-field'
                        onChange={this.handleEditChange}
                        label={<label>Username <span>*</span></label>}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className='login-field'>
                      <TextValidator
                        fullWidth
                        type='email'
                        name='email'
                        value={email}
                        id='standard-full-width'
                        className='form-input-field'
                        onChange={this.handleEditChange}
                        label={<label>Email <span>*</span></label>}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className='login-field'>
                      <TextValidator
                        fullWidth
                        type='password'
                        name='password'
                        value={password}
                        id='standard-full-width'
                        className='form-input-field'
                        onChange={this.handleEditChange}
                        label={<label>Password <span>*</span></label>}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className='login-field'>
                      <TextValidator
                        fullWidth
                        type='text'
                        name='vendor'
                        value={vendor}
                        id='standard-full-width'
                        className='form-input-field'
                        onChange={this.handleEditChange}
                        label={<label>Vendor <span>*</span></label>}
                      />
                    </div>
                  </div>
                  <div className='login-field text-center'>
                    <Button type="Submit" className='submit-btn'>
                      {isLoader
                        ? <i className="fa fa-spinner fa-spin fa-fw"></i>
                        : 'REGISTER'
                      }
                    </Button>
                  </div>
                </div>
              </ValidatorForm>
              <p>Have an account? <Link className="register-link" to="../Login">Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  register, registerLoader
};

const mapStateToProps = ({ Auth }) => {
  let { isLoader } = Auth
  return { isLoader }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);