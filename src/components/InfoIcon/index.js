import React from 'react';
import Tooltip from '@mui/material/Tooltip';

const InfoIcon = ({ description }) => {
    return (
        <Tooltip title={description}>
            <span className="info-icon">
                ℹ️
            </span>
        </Tooltip>
    );
};

export default InfoIcon;