import React from 'react';
import { Button } from '@mui/material';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

const ConfirmAdModal = ({ isConfirmModal, toggleConfirmModal, amount, impressions, setImpressions, handleSubmit, isLoading }) => {
    return (
        <div>
            <Modal
                isOpen={isConfirmModal}
                toggle={toggleConfirmModal}
                className='main-modal add-modal payment-modals'>
                <ModalHeader
                    toggle={toggleConfirmModal}
                    style={{ zIndex: 100000000000000000000000000000 }}>
                    <div className='text-center'>
                        <h2>Confirm Create Campaign</h2>
                    </div>
                </ModalHeader>
                <ModalBody className='modal-body'>
                    {isLoading ? (
                        <div className='progresbar-area'>
                            <p>Uploading Files...</p>
                            <img className='place-img' src={require('../../assets/img/progressbar.gif')} alt='file' />
                        </div>
                    ) : (
                        <div>
                            <h4>Are you sure you want to create this ad?</h4>
                            {amount >= 0 ? (
                                <div className='form-group'>
                                    <label htmlFor='amount'>Payable Amount ($):</label>
                                    <input
                                        id='amount'
                                        name='amount'
                                        type='text'
                                        value={amount ? amount : 0}
                                        disabled
                                    />
                                </div>
                            ) : (
                                <div className='form-group'>
                                    <label htmlFor='refundAmount'>Refundable Amount ($):</label>
                                    <input
                                        id='refundAmount'
                                        name='refundAmount'
                                        type='number'
                                        value={amount ? Math.abs(amount) : 0}
                                        disabled
                                    />
                                </div>
                            )}
                            <div className='form-group'>
                                <label htmlFor='amount'>Expected Impressions:</label>
                                <input
                                    id='impressions'
                                    name='impressions'
                                    type='number'
                                    value={impressions}
                                    min={200}
                                    onChange={(event) => setImpressions(event.target.value)}
                                />
                            </div>
                            <div className='form-group text-center'>
                                <Button onClick={() => handleSubmit()} disabled={isLoading} className='btn-style-one'>Yes</Button>
                            </div>
                        </div>
                    )}
                </ModalBody>
            </Modal>
        </div>
    )
};

export default ConfirmAdModal;