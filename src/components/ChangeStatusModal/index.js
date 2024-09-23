import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { green } from '@mui/material/colors';

import constants from '../utils/constants';

const ChangeStatusModal = ({ isStatusModal, toggleStatusModal, status, message, setMessage, changeStatus, isLoading }) => {
    const { preApprovedMessages } = constants;
    return (
        <div>
            <Modal
                isOpen={isStatusModal}
                toggle={toggleStatusModal}
                className='main-modal add-modal payment-modals status-modal'>
                <ModalHeader
                    toggle={toggleStatusModal}
                    style={{ zIndex: 100000000000000000000000000000 }}>
                    <div className='text-center'>
                        <h2>Change Status</h2>
                    </div>
                </ModalHeader>
                <ModalBody className='modal-body'>
                    <div>
                        <h4>Are you sure you want to change status of this ad to {status}?</h4>
                        <div className='form-group'>
                            <label htmlFor='status'>Status:</label>
                            <input
                                id='status'
                                name='status'
                                type='text'
                                value={status}
                                disabled
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='message'>Message:</label>
                            <Select
                                id='message'
                                className=''
                                value={message}
                                onChange={(event) => setMessage(event.target.value)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="">
                                    <em>Select message</em>
                                </MenuItem>
                                {preApprovedMessages && preApprovedMessages.map((message, index) => (
                                    <MenuItem key={index} value={message}>
                                        {message}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                        <div className='form-group text-center'>
                            <Button disabled={isLoading} onClick={changeStatus} className='btn-style-one'>
                                {
                                    isLoading ? (
                                        <CircularProgress
                                            size={24}
                                            sx={{
                                                color: green[500],
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                marginTop: '-12px',
                                                marginLeft: '-12px',
                                            }}
                                        />
                                    ) : 'Confirm'
                                }
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
};

export default ChangeStatusModal;