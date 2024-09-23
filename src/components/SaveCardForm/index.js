import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';

import './index.css';
import { createPaymentIntent, updateBannerPayment } from '../../store/actions/Banner';

const SaveCardForm = ({ bannerId, closePaymentModal, page, redirect }) => {
    const dispatch = useDispatch();
    const { paymentIntent } = useSelector(st => st.Banners);

    const stripe = useStripe();
    const elements = useElements();

    const [isLoading, setIsLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState(null);
    const [amount, setAmount] = useState(null);

    useEffect(() => {
        if (bannerId) dispatch(createPaymentIntent({ id: bannerId }));
    }, [bannerId]);

    useEffect(() => {
        if (paymentIntent) {
            setClientSecret(paymentIntent.clientSecret);
            setAmount(paymentIntent.amount);
        }
    }, [paymentIntent]);

    const handlePay = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setIsLoading(true);

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    // Include any additional billing details if needed
                },
            },
        });

        setIsLoading(false);

        if (result.error) toast.error(result.error.message);
        else {
            if (result.paymentIntent.status === 'succeeded') {
                setClientSecret(null);
                closePaymentModal();
                dispatch(updateBannerPayment({ campaignId: bannerId, transactionId: result.paymentIntent.id }));
                if (page === 'createBanner') redirect();
                return;
            }
        }
    };

    return (
        <form onSubmit={(event) => handlePay(event)}>
            <CardElement />
            <div className='form-group text-center'>
                <button type="submit" className='btn-style-two' disabled={!stripe || isLoading}>
                    {!isLoading ? 'Cancel' : <i className="fa fa-spinner fa-spin fa-fw"></i>}
                </button>
                <button type="submit" className='btn-style-one' disabled={!stripe || isLoading}>
                    {!isLoading ? 'Save' : <i className="fa fa-spinner fa-spin fa-fw"></i>}
                </button>
            </div>
        </form>
    );
};

export default SaveCardForm;