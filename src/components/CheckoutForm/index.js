import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import './index.css';
import { saveCard } from '../../store/actions/Payments';


const CheckoutForm = (props) => {
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setIsLoading(true);

        const { paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (paymentMethod) dispatch(saveCard({ paymentMethodId: paymentMethod.id }));
    };

    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <CardElement />
            <div className='d-flex justify-content-center'>
                <button className='btn-style-one' type="submit" disabled={!stripe || isLoading}>
                    {!isLoading ? <>Save Card</> : <i className="fa fa-spinner fa-spin fa-fw"></i>}
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;