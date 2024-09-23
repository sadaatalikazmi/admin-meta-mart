import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Button } from '@mui/material';
import { toast } from "react-toastify";

import CheckoutForm from "../CheckoutForm";
import { togglePaymentsProfileModal, togglePaymentMethodModal, toggleAddCardModal, toggleChangePaymentModal, getUserCards, paymentPay, paymentRefund } from '../../store/actions/Payments';


const PaymentMethodModal = (props) => {
    const stripePromise = loadStripe('pk_test_51ORwB1EwaCzpwm3NQ26pjRkQVPdNJp0PWnZd6fJtelt6npSl1FYHYkOJkAE9nLedyxXrE6hJDgeQGhh53d8aI57900X01NVPYg');
    const dispatch = useDispatch();

    const { amount, isRedirect, history, bannerId } = props;
    const { userCards } = useSelector(st => st.Payments);

    const [paymentMethodId, setPaymentMethodId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        dispatch(getUserCards());
        setIsLoading(false);
    }, []);

    const handleCardClick = (cardId) => setPaymentMethodId(cardId);

    const handlePayment = (transactionMode) => {
        if (!paymentMethodId || paymentMethodId === '') return toast.error('Please select a card');

        setIsLoading(true);

        let requestData = {
            data: { paymentMethodId, amount: Math.abs(amount) },
            redirection: { isRedirect, history, bannerId },
        };

        if (transactionMode === 'pay') dispatch(paymentPay(requestData));
        else if (transactionMode === 'refund') dispatch(paymentRefund(requestData));
    };

    return (
        <div>
            <Modal isOpen={props.isPaymentMethodModal} toggle={() => props.togglePaymentMethodModal(false)} className='main-modal add-modal payment-modals'>
                <ModalHeader toggle={() => props.togglePaymentMethodModal(false)}><div className='text-center'><h2>Select payment method</h2></div></ModalHeader>
                <ModalBody className='modal-body'>
                    <div>
                        <p>Available payment methods are based on your currency (PKR) and payment setting. Learn more about payment methods</p>
                        {amount && (
                            <>
                                {amount >= 0 ? (
                                    <div className='form-group mt-3'>
                                        <label htmlFor='amount'>Payable Amount ($):</label>
                                        <input id='amount' name='amount' type='number' value={Math.abs(amount)} disabled />
                                    </div>
                                ) : (
                                    <div className='form-group mt-3'>
                                        <label htmlFor='amount'>Refundable Amount ($):</label>
                                        <input id='amount' name='amount' type='number' value={Math.abs(amount)} disabled />
                                    </div>
                                )}
                            </>
                        )}
                        <div class="radio-buttons card-select-area mt-4">
                            {userCards && userCards.length > 0 && userCards?.map(card => {
                                return (
                                    <div className='radio-btns-area' onClick={() => handleCardClick(card.paymentMethodId)}>
                                        <label class="custom-radio">
                                            <input type="radio" name="radio" />
                                            <span class="radio-btn">
                                                <div class="hobbies-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
                                                        <rect x="0.552246" y="0.48584" width="36.2148" height="36.2148" rx="18.1074" fill="#329DFF" fill-opacity="0.1" />
                                                        <path d="M10.9614 15.25H26.9614M10.9614 15.9H26.9614M13.423 20.45H18.346M13.423 22.4H15.8845M12.8076 25H25.1153C25.6049 25 26.0745 24.7946 26.4207 24.4289C26.7669 24.0632 26.9614 23.5672 26.9614 23.05V13.95C26.9614 13.4328 26.7669 12.9368 26.4207 12.5711C26.0745 12.2054 25.6049 12 25.1153 12H12.8076C12.3179 12 11.8484 12.2054 11.5022 12.5711C11.1559 12.9368 10.9614 13.4328 10.9614 13.95V23.05C10.9614 23.5672 11.1559 24.0632 11.5022 24.4289C11.8484 24.7946 12.3179 25 12.8076 25Z" stroke="#156CF7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                </div>
                                                <div className='text-box'>
                                                    <h3 class="">{card.brand.toUpperCase()} CARD</h3>
                                                    <p>xxxx xxxx xxxx {card.last4Digits}</p>
                                                </div>
                                                <div className='card-detail-area'>
                                                    <p className='card-name'>Expiry: {`${card.expiryMonth < 10 ? `0${card.expiryMonth}` : card.expiryMonth}/${card.expiryYear % 100}`}</p>
                                                    {/* <p className='card-name'>Zip: {card.zipCode}</p> */}
                                                </div>
                                            </span>
                                        </label>
                                    </div>
                                )
                            })}
                        </div>


                        <div className='form-group'>
                            <button onClick={() => props.toggleAddCardModal(true)} className='add-card'>
                                <i className='icon'>+</i> Add credit or debit card
                            </button>
                        </div>

                        {amount && (
                            <div className='form-group text-center'>
                                {amount >= 0 ? (
                                    <Button className='btn-style-one' onClick={() => handlePayment('pay')}>
                                        {!isLoading ? 'Pay' : <i className="fa fa-spinner fa-spin fa-fw"></i>}
                                    </Button>
                                ) : (
                                    <Button className='btn-style-one' onClick={() => handlePayment('refund')}>
                                        {!isLoading ? 'Refund' : <i className="fa fa-spinner fa-spin fa-fw"></i>}
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </ModalBody>
            </Modal>

            {/* Add Card Modal */}
            <Modal isOpen={props.isAddCardModal} toggle={() => props.toggleAddCardModal(false)} className='main-modal add-modal payment-modals'>
                <ModalHeader toggle={() => props.toggleAddCardModal(false)}><div className='text-center'><h2>Add credit or debit card</h2></div></ModalHeader>
                <ModalBody className='modal-body'>
                    <div className='mt-3'>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                    </div>
                </ModalBody>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethodModal);