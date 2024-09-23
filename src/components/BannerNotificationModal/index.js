import React from 'react';
import { Button } from '@mui/material';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

const BannerNotificationModal = ({ isNotificationModal, toggleNotificationModal, notification, redirectToEditBanner }) => {
    return (
        <div>
            {notification &&
                <Modal
                    isOpen={isNotificationModal}
                    toggle={toggleNotificationModal}
                    className='main-modal add-modal payment-modals'>
                    <ModalHeader
                        toggle={toggleNotificationModal}
                        style={{ zIndex: 100000000000000000000000000000 }}>
                        <div className='text-center'>
                            <h2>Notification</h2>
                        </div>
                    </ModalHeader>
                    <ModalBody className='modal-body'>
                        <div>
                            <div className='form-group'>
                                <label htmlFor='name'>Campaign Name:</label>
                                <input
                                    id='name'
                                    name='name'
                                    type='text'
                                    disabled
                                    value={notification.bannerName}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='status'>Status:</label>
                                <input
                                    id='status'
                                    name='status'
                                    type='text'
                                    disabled
                                    value={notification.status}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='message'>Message:</label>
                                <input
                                    id='message'
                                    name='message'
                                    type='text'
                                    disabled
                                    value={notification.message}
                                />
                            </div>
                            {notification.status === 'suspended' &&
                                <div className='form-group text-center'>
                                    <Button onClick={() => redirectToEditBanner(notification.campaignId)} className='btn-style-one'>
                                        Update
                                    </Button>
                                </div>
                            }
                        </div>
                    </ModalBody>
                </Modal>
            }
        </div>
    )
};

export default BannerNotificationModal;