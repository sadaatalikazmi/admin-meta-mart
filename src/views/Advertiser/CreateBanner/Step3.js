import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Select from '@mui/material/Select';
// import Select from 'react-select';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import InfoIcon from '../../../components/InfoIcon';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DatePicker from 'react-datepicker';
import MenuItem from '@mui/material/MenuItem';
import 'react-datepicker/dist/react-datepicker.css';

import constants from '../../../components/utils/constants';

const Accordion = styled((props) => (

    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const StepThree = (props) => {
    const { citiesUAE, hours, operatingSystems, lifeEvents } = constants;
    const {
        category,
        location,
        setLocation,
        handleLocationSelect,
        fromHour,
        setFromHour,
        toHour,
        setToHour,
        os,
        setOs,
        handleOsSelect,
        device,
        setDevice,
        devices,
        handleDeviceSelect,
        timeLimit,
        setTimeLimit,
        lifeEvent,
        setLifeEvent,
        handleLifeEventChange,
        ramadanDates,
        handleAllSelect,
    } = props;

    const [expanded, setExpanded] = useState('panel1');
    const [showAdSchedule, setShowAdSchedule] = useState(false);
    const [showOS, setShowOS] = useState(false);
    const [showDevice, setShowDevice] = useState(false);
    const [showDates, setShowDates] = useState(false);
    const [locationOption, setLocationOption] = useState(null);
    const [deviceOption, setDeviceOption] = useState(null);

    const handleChange = (panel) => (event, newExpanded) => setExpanded(newExpanded ? panel : false);

    const handleTabClick = (tab) => {
        switch (tab) {
            case 'adSchedule':
                setShowAdSchedule(true);
                setExpanded('panel2');
                break;
            case 'os':
                setShowOS(true);
                setExpanded('panel3');
                break;
            case 'device':
                setShowDevice(true);
                setExpanded('panel4');
                break;
            case 'dates':
                setShowDates(true);
                setExpanded('panel5');
                break;
            default:
                return true;
        }
    };

    const handleLocationOption = (option) => {
        setLocationOption(option);

        if (option === 'all') setLocation([]);
        else if (option === 'uae') setLocation(citiesUAE);
    };

    const handleDeviceOption = (option) => {
        setDeviceOption(option);

        if (option === 'all') setDevice([]);
    };

    return (
        <div>
            <h3>Campaign settings</h3>
            <Accordion expanded={expanded === `panel1`} onChange={handleChange(`panel1`)}>
                <AccordionSummary aria-controls={`panel1`} id={`panel1`}>
                    <Typography>Location</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='location-box'>
                        <label>
                            <Checkbox checked={locationOption === 'all'} onChange={() => handleLocationOption('all')} />
                            All countries and territories
                        </label>
                        <label>
                            <Checkbox checked={locationOption === 'uae'} onChange={() => handleLocationOption('uae')} />
                            United Arab Emirates
                        </label>
                        <label>
                            <Checkbox checked={locationOption === 'other'} onChange={() => handleLocationOption('other')} />
                            Enter another location
                        </label>
                        {locationOption === 'other' &&
                            <div className='col-lg-6 col-md-6 col-sm-12'>
                                <div className='form-group'>
                                    <Select
                                        id='location'
                                        multiple
                                        value={location}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        disabled={locationOption !== 'other'}
                                        renderValue={(selected) => {
                                            if (selected.length === 0) return <em>{'Select locations'}</em>;
                                            else return selected.join(', ');
                                        }}
                                    >
                                        <MenuItem value="" onClick={() => handleAllSelect('location')}>
                                            <div onClick={() => handleAllSelect('location')}>
                                                <Checkbox checked={location.length === citiesUAE.length} />
                                                {'All'}
                                            </div>
                                        </MenuItem>
                                        {citiesUAE && citiesUAE.map((city, index) => (
                                            <MenuItem key={index} value={city} onClick={() => handleLocationSelect(city)}>
                                                <div onClick={() => handleLocationSelect(city)}>
                                                    <Checkbox checked={location.includes(city)} />
                                                    {city}
                                                </div>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        }
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === `panel2`} onChange={handleChange(`panel2`)} className={!showAdSchedule ? 'd-none' : ''}>
                <AccordionSummary aria-controls={`panel2`} id={`panel2`}>
                    <Typography>Ad Schedule</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='timebox'>
                        <label className='heading-label'>Time</label>
                        <div className='age-box'>
                            <div className='form-group'>
                                <label htmlFor='fromHour'>From:</label>
                                <Select
                                    id='fromHour'
                                    value={fromHour}
                                    onChange={(event) => setFromHour(event.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value="">
                                        <em>Lower time limit</em>
                                    </MenuItem>
                                    {hours && hours.map((hour) => (
                                        <MenuItem key={hour.value} value={hour.value}>
                                            {hour.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </div>
                        <div className='age-box style-two'>
                            <div className='form-group'>
                                <label htmlFor='toHour'>To:</label>
                                <Select
                                    id='toHour'
                                    value={toHour}
                                    onChange={(event) => setToHour(event.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value="">
                                        <em>Upper time limit</em>
                                    </MenuItem>
                                    {hours && hours.map((hour) => (
                                        <MenuItem key={hour.value} value={hour.value}>
                                            {hour.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    </div>

                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === `panel3`} onChange={handleChange(`panel3`)} className={!showOS ? 'd-none' : ''}>
                <AccordionSummary aria-controls={`panel3`} id={`panel3`}>
                    <Typography>OS</Typography>
                    <InfoIcon description={'Operating System'} />
                </AccordionSummary>
                <AccordionDetails>
                    <div className='devices-box'>
                        <label>
                            <Checkbox checked={os.length === operatingSystems.length} onClick={() => handleAllSelect('os')} />
                            All Operating Systems
                        </label>
                        {operatingSystems && operatingSystems.map((osValue, index) => (
                            <label>
                                <Checkbox checked={os.includes(osValue)} onClick={() => handleOsSelect(osValue)} />
                                {osValue}
                            </label>
                        ))}
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === `panel4`} onChange={handleChange(`panel4`)} className={!showDevice ? 'd-none' : ''}>
                <AccordionSummary aria-controls={`panel4`} id={`panel4`}>
                    <Typography>Carrier</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='devices-box'>
                        <label>
                            <Checkbox checked={deviceOption === 'all'} onChange={() => handleDeviceOption('all')} />
                            Show on all devices
                        </label>
                        {os.length !== 0 && (
                            <>
                                <label>
                                    <Checkbox checked={os.length !== 0 && deviceOption === 'other'} onChange={() => handleDeviceOption('other')} />
                                    Set specific targeting for devices
                                </label>
                                {os.length !== 0 && deviceOption === 'other' &&
                                    <div className='col-lg-6 col-md-6 col-sm-12'>
                                        <div className='form-group'>
                                            <Select
                                                id='device'
                                                multiple
                                                value={device}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                disabled={os.length === 0 || deviceOption !== 'other'}
                                                renderValue={(selected) => {
                                                    if (selected.length === 0) return <em>{'Select devices'}</em>;
                                                    else return selected.join(', ');
                                                }}
                                            >
                                                <MenuItem value="" onClick={() => handleAllSelect('device')}>
                                                    <div onClick={() => handleAllSelect('device')}>
                                                        <Checkbox checked={device.length === devices.length} />
                                                        {'All'}
                                                    </div>
                                                </MenuItem>
                                                {devices && devices.map((deviceValue, index) => (
                                                    <MenuItem key={index} value={deviceValue} onClick={() => handleDeviceSelect(deviceValue)}>
                                                        <div onClick={() => handleDeviceSelect(deviceValue)}>
                                                            <Checkbox checked={device.includes(deviceValue)} />
                                                            {deviceValue}
                                                        </div>
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>
                                }
                            </>
                        )}
                    </div>
                </AccordionDetails>
            </Accordion>
            {category === 'awareness' && (
                <Accordion expanded={expanded === `panel5`} onChange={handleChange(`panel5`)} className={!showDates ? 'd-none' : ''}>
                    <AccordionSummary aria-controls={`panel5`} id={`panel5`}>
                        <Typography>Life Event and End Date </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className='select-date'>
                            <div className='form-group'>
                                <label htmlFor='lifeEvent'>Life Event:</label>
                                <Select
                                    id='lifeEvent'
                                    value={lifeEvent}
                                    onChange={(event) => handleLifeEventChange(event.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value="">
                                        <em>Select life event</em>
                                    </MenuItem>
                                    {lifeEvents && lifeEvents.map((event, index) => (
                                        <MenuItem key={index} value={event.day}>
                                            {event.day === 'Ramadan' ? (
                                                `${event.day} (End Date: ${ramadanDates?.endDate.substring(8, 10)}-${ramadanDates?.endDate.substring(5, 7)}-${ramadanDates?.endDate.substring(0, 4)})`
                                            ) : (
                                                `${event.day} (End Date: ${event.date}-${(new Date().getFullYear())})`
                                            )}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                            {lifeEvent === '' &&
                                <div className='form-group style-two'>
                                    <label htmlFor='timeLimit'>Ending Time: *</label>
                                    <DatePicker
                                        id='timeLimit'
                                        selected={timeLimit}
                                        onChange={date => setTimeLimit(date)}
                                        dateFormat="dd-MM-yyyy"
                                    />
                                </div>
                            }
                        </div>
                    </AccordionDetails>
                </Accordion>
            )}
            <Accordion expanded={expanded === `panel7`} onChange={handleChange(`panel7`)}>
                <AccordionSummary aria-controls={`panel7`} id={`panel7`}>
                    <Typography><SettingsIcon /> More settings</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='more-setting-box'>
                        <button className="tabs-btn" onChange={handleChange(`panel2`)} onClick={() => handleTabClick('adSchedule')}> <span>Ad Schedule </span> All day <i className='iocn'><EditIcon /></i></button>
                        <button className="tabs-btn" onChange={handleChange(`panel3`)} onClick={() => handleTabClick('os')}><span>OS </span> Operating Systems <i className='iocn'><EditIcon /></i></button>
                        <button className="tabs-btn" onChange={handleChange(`panel4`)} onClick={() => handleTabClick('device')}> <span>Carrier </span> Show on all devices <i className='iocn'><EditIcon /></i></button>
                        {category === 'awareness' && <button className="tabs-btn" onChange={handleChange(`panel5`)} onClick={() => handleTabClick('dates')}> <span>Life Event and End Date </span> Start date: January 22, 2024 End date: Not set <i className='iocn'><EditIcon /></i></button>}
                    </div>
                </AccordionDetails>
            </Accordion>


        </div>
    );
}

export default StepThree;