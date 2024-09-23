import { connect } from "react-redux";
import React, { Component } from "react";
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Link } from "react-router-dom";

import './index.css';
import logo from '../../assets/img/logo.png';
import { login, loginLoader } from "../../store/actions/Auth";

class Login extends Component {
  
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  };

  // Edit Imput Fields
  handleEditChange = (e) => this.setState({ [e.target.name]: e.target.value });

  // Submit Login
  handleLogin = async () => {
    let { history } = this.props;
    let { email, password } = this.state;

    let data = { email, password };
    this.props.loginLoader(true);
    this.props.login({ data, history });
  };


  render() {
    let { isLoader } = this.props;
    let { email, password } = this.state;

    return (
      <div className="login-page">
        <div className="row">
          <div className="col-md-12 col-sm-12 d-flex justify-content-center">
            <div className="login-form login-form-field">
              <img className="login-page-logo" src={logo} alt='logo' />
              <p className="login-title">Login</p>
              {/* LOGIN FORM */}
              <ValidatorForm className="validator-form mt-4" onSubmit={this.handleLogin}>
                <div className="row">
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
                  <div className='login-field text-center'>
                    <Button type="Submit" className='submit-btn'>
                      {isLoader
                        ? <i className="fa fa-spinner fa-spin fa-fw"></i>
                        : 'LOGIN'
                      }
                    </Button>
                  </div>
                </div>
              </ValidatorForm>

              <p>Don't have an account? <Link className="register-link" to="../Register">Register</Link></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  login, loginLoader
};

const mapStateToProps = ({ Auth }) => {
  let { isLoader } = Auth
  return { isLoader }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);