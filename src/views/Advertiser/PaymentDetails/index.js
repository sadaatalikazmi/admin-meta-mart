
import { connect } from 'react-redux';
import { Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import MenuItem from '@mui/material/MenuItem';
import React, { useEffect, useState } from 'react';
import Person2Icon from '@mui/icons-material/Person2';
import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Select from '@mui/material/Select';

import './index.css';
import PaymentMethodModal from '../../../components/PaymentMethodModal';
import {
  togglePaymentsProfileModal,
  togglePaymentMethodModal,
  toggleAddCardModal,
  toggleChangePaymentModal,
  setIsLoading,
  createPaymentProfile,
  updatePaymentProfile,
  deletePaymentProfile,
  getPaymentProfiles,
} from '../../../store/actions/Payments';


const PaymentDetails = (props) => {
  const dispatch = useDispatch();

  const { isLoading, paymentProfiles } = useSelector(st => st.Payments);

  const [paymentProfile, setPaymentProfile] = useState({});
  const [paymentProfileMode, setPaymentProfileMode] = useState('');

  useEffect(() => {
    dispatch(getPaymentProfiles());
  }, []);

  const handleProfileChange = (e) => setPaymentProfile({ ...paymentProfile, [e.target.name]: e.target.value });

  const openCreatePaymentProfile = () => {
    setPaymentProfileMode('create');
    props.togglePaymentsProfileModal(true);
  };

  const openEditPaymentProfile = (profile) => {
    setPaymentProfileMode('edit');
    setPaymentProfile(profile);
    props.togglePaymentsProfileModal(true);
  };

  const closePaymentProfileModal = () => {
    props.togglePaymentsProfileModal(false);
    setPaymentProfileMode('');
    setPaymentProfile({});
  };

  const savePaymentProfile = () => {
    setIsLoading(true);

    if (paymentProfileMode === 'create') dispatch(createPaymentProfile({ paymentProfile }));
    else if (paymentProfileMode === 'edit') dispatch(updatePaymentProfile({ paymentProfile }));
  };

  return (
    <div className='content'>
      <div className='top-heading-area home-header'>
        <h3>Payment Details</h3>
      </div>
      <div className='payment-box'>
        <div>
          <div className='payment-block'>
            <div class="radio-buttons card-select-area card-payment-check">
              {paymentProfiles && paymentProfiles.length > 0 && paymentProfiles.map(profile => {
                return (
                  <div className='radio-btns-area'>
                    <label class="custom-radio">
                      <input type="radio" name="radio" />
                      <span class="radio-btn">
                        <div class="hobbies-icon">
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0724 4.02447C15.1063 3.04182 13.7429 2.5 12.152 2.5C10.5611 2.5 9.19773 3.04182 8.23167 4.02447C7.26636 5.00636 6.73644 6.38891 6.73644 8C6.73644 10.169 7.68081 11.567 8.8496 12.4062C9.07675 12.5692 9.3115 12.7107 9.54832 12.8327C8.24215 13.1916 7.18158 13.8173 6.31809 14.5934C4.95272 15.8205 4.10647 17.3993 3.53633 18.813C3.43305 19.0691 3.55693 19.3604 3.81304 19.4637C4.06914 19.567 4.36047 19.4431 4.46375 19.187C5.00642 17.8414 5.78146 16.4202 6.98653 15.3371C8.1795 14.265 9.82009 13.5 12.152 13.5C14.332 13.5 15.9058 14.1685 17.074 15.1279C18.252 16.0953 19.0453 17.3816 19.6137 18.6532C19.9929 19.5016 19.3274 20.5 18.2827 20.5H6.74488C6.46874 20.5 6.24488 20.7239 6.24488 21C6.24488 21.2761 6.46874 21.5 6.74488 21.5H18.2827C19.9348 21.5 21.2479 19.8588 20.5267 18.2452C19.9232 16.8952 19.0504 15.4569 17.7087 14.3551C16.9123 13.7011 15.9603 13.1737 14.8203 12.8507C15.43 12.5136 15.9312 12.0662 16.33 11.5591C17.1929 10.462 17.5676 9.10016 17.5676 8C17.5676 6.38891 17.0377 5.00636 16.0724 4.02447ZM15.3593 4.72553C16.1144 5.49364 16.5676 6.61109 16.5676 8C16.5676 8.89984 16.2541 10.038 15.544 10.9409C14.8475 11.8265 13.7607 12.5 12.152 12.5C11.5014 12.5 10.3789 12.2731 9.43284 11.5938C8.51251 10.933 7.73644 9.83102 7.73644 8C7.73644 6.61109 8.18963 5.49364 8.94477 4.72553C9.69916 3.95818 10.7935 3.5 12.152 3.5C13.5105 3.5 14.6049 3.95818 15.3593 4.72553Z" fill="#000000" />
                          </svg>
                        </div>
                        <div className='text-box'>
                          <h3>{profile?.profileType}</h3>
                          <p className='mt-1'>{profile?.organizationName}</p>
                        </div>
                        <div className='card-detail-area actions-section'>
                          <IconButton onClick={() => openEditPaymentProfile(profile)}>
                            <Edit fontSize='small' />
                          </IconButton>
                          <IconButton onClick={() => dispatch(deletePaymentProfile(profile.id))}>
                            <Delete fontSize='small' />
                          </IconButton>
                        </div>
                      </span>
                    </label>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='payment-block'>
          <div className='group-form' onClick={() => openCreatePaymentProfile()}>
            <label>Payments profile</label>
            <i className='icon'><Person2Icon /></i>
            <input type='text' value='Create new payments profile' />
            <button className='plus-btn'>+</button>
            <p>Your payment information is saved in a payments profile, which is associated with your Google Account and shared across Google services. Learn more about payments profile</p>
          </div>
          <div className='group-form' onClick={() => props.togglePaymentMethodModal(true)}>
            <label>Payment method</label>
            <i className='icon'><CreditCardIcon /></i>
            <input type='text' value='Add payment method' />
            <button className='plus-btn'>+</button>
            <p>Please complete the previous sections before continuing <br /> You'll see a <b>temporary PKR2,850.00 authorization</b> on your card, which is typically removed within a week.</p>
          </div>
          {/* <div className='group-form' onClick={() => props.toggleChangePaymentModal(true)}>
            <label>Payment setting</label>
            <i className='icon'><RefreshIcon /></i>
            <input type='text' value='Automatic payment' />
            <button className='plus-btn'>Change</button>
            <p>You’ll be charged on the 1st of each month or any time your balance exceeds an amount known as your billing threshold.<br /> Learn more about automatic payments Please complete the previous sections before continuing</p>
          </div> */}
        </div>
      </div>

      {/* <div className='payment-box'>
        <div className='payment-block'>
          <p>Want personalized campaign guidance from a Google Ads expert by phone?</p>
          <div className='group-form label-radio'>
            <label>
              <Radio /> Yes
            </label>
            <label>
              <Radio /> No
            </label>
          </div>
          <p>Get tips, promo offers, testing and feedback opportunities, and new feature invitations by email</p>
          <div className='group-form label-radio'>
            <label>
              <Radio /> Yes
            </label>
            <label>
              <Radio /> No
            </label>
          </div>
        </div>
      </div> */}

      {/* Payments Profile Modal */}
      <Modal isOpen={props.isPaymentsProfileModal} toggle={() => closePaymentProfileModal()} className='main-modal add-modal payment-modals'>
        <ModalHeader toggle={() => closePaymentProfileModal()}>
          <div className='text-center'>
            <h2>{paymentProfileMode === 'create' ? 'Create Payment Profile' : 'Edit Payment Profile'}</h2>
          </div>
        </ModalHeader>
        <ModalBody className='modal-body'>
          <div>
            <p>If you are signing up for a business, choose Organization. Otherwise choose Individual. Learn more about payments profiles</p>
            <div className='form-group'>
              <label htmlFor='amount'>Profile type</label>
              <Select name='profileType' value={paymentProfile['profileType']} onChange={(e) => handleProfileChange(e)}>
                <MenuItem value={'Organization'}><h4>Organization</h4> <span> Use for businesses, corporations or registered organizations</span></MenuItem>
                <MenuItem value={'Individual'}><h4>Individual</h4> <span>Use for personal or sole proprietorship</span></MenuItem>
              </Select>
            </div>
            <div className='row'>
              <div className='col-lg-6 col-md-12'>
                <div className='form-group'>
                  <label htmlFor='amount'>Organization name</label>
                  <input name='organizationName' type='text' value={paymentProfile['organizationName']} onChange={(e) => handleProfileChange(e)} />
                </div>
              </div>
              <div className='col-lg-6 col-md-12'>
                <div className='form-group'>
                  <label htmlFor='amount'>Legal name</label>
                  <input name='legalName' type='text' value={paymentProfile['legalName']} onChange={(e) => handleProfileChange(e)} />
                </div>
              </div>
              <div className='col-lg-12 col-md-12'>
                <div className='form-group'>
                  <label htmlFor='amount'>Apt, suite, etc. (optional)</label>
                  <input name='suite' type='text' value={paymentProfile['suite']} onChange={(e) => handleProfileChange(e)} />
                </div>
              </div>
              <div className='col-lg-6 col-md-12'>
                <div className='form-group'>
                  <label htmlFor='amount'>Subrub</label>
                  <input name='suburb' type='text' value={paymentProfile['suburb']} onChange={(e) => handleProfileChange(e)} />
                </div>
              </div>
              <div className='col-lg-6 col-md-12'>
                <div className='form-group'>
                  <label htmlFor='amount'>City</label>
                  <input name='city' type='text' value={paymentProfile['city']} onChange={(e) => handleProfileChange(e)} />
                </div>
              </div>
              <div className='col-lg-12 col-md-12'>
                <div className='form-group'>
                  <label htmlFor='amount'>Postal Code</label>
                  <input name='postalCode' type='number' value={paymentProfile['postalCode']} onChange={(e) => handleProfileChange(e)} />
                </div>
              </div>
            </div>
            <div className='form-group text-center'>
              <Button onClick={() => savePaymentProfile()} className='btn-style-one'>
                {!isLoading ? <>{paymentProfileMode === 'create' ? 'Create' : 'Update'}</> : <i className="fa fa-spinner fa-spin fa-fw"></i>}
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      <PaymentMethodModal amount={props.amount} isRedirect={props.isRedirect} history={props.history} bannerId={props.paymentBannerId} />



      {/* Change Payment Modal */}
      {/* <Modal isOpen={props.isChangePaymentModal} toggle={() => props.toggleChangePaymentModal(false)} className='main-modal add-modal payment-modals'>
        <ModalHeader toggle={() => props.toggleChangePaymentModal(false)} ><div className='text-center'><h2>Change payment setting</h2></div></ModalHeader>
        <ModalBody className='modal-body'>
          <div>
            <div className='group-form label-radio'>
              <label>
                <Radio checked={paymentSetting == 'Automatic'} value='Automatic' onChange={(e) => setPaymentSetting(e.target.value)} />
                Automatic payment
                <i>You’ll be charged on the 1st of each month or any time your balance exceeds an amount known as your billing threshold. </i>
              </label>
              <label>
                <Radio checked={paymentSetting == 'Manual'} value='Manual' onChange={(e) => setPaymentSetting(e.target.value)} />
                Manual payment
                <i>Pay for your ads ahead of your ad spend. </i>
              </label>
            </div>
            {paymentSetting == 'Manual' &&
              <div className='form-group'>
                <label htmlFor='amount'>Manual payment amount</label>
                <input name='manualPaymentAmount' type='number' value={manualPaymentAmount} onChange={(e) => setManualPaymentAmount(e.target.value)} />
              </div>
            }
            <div className='form-group text-center'>
              <div className='form-group text-center'>
                <Button onClick={() => handlePaymentSetting()} className='btn-style-one'>Continue</Button>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal> */}
    </div>
  );
};

const mapDispatchToProps = {
  togglePaymentsProfileModal,
  togglePaymentMethodModal,
  toggleAddCardModal,
  toggleChangePaymentModal,
};

const mapStateToProps = ({ Payments }) => {
  const { isPaymentsProfileModal, isPaymentMethodModal, isAddCardModal, isChangePaymentModal } = Payments;
  return { isPaymentsProfileModal, isPaymentMethodModal, isAddCardModal, isChangePaymentModal };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetails);