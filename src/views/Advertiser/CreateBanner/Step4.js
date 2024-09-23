import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import InfoIcon from '../../../components/InfoIcon';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";

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

const StepFour = (props) => {
    const { genders, ageGroups, daysOfWeek, productCategories, visibilityPercentages, frequencyCapRange } = constants;
    const {
        category,
        productCategory,
        handleProductCategoryChange,
        gender,
        selectedDays,
        handleDaySelect,
        handleGenderChange,
        setFromAge,
        setToAge,
        reachNumber,
        setReachNumber,
        frequencyCap,
        setFrequencyCap,
        shareOfVoice,
        setShareOfVoice,
        handleAllSelect,
    } = props;

    const [expanded, setExpanded] = useState('panel1');
    const [showGender, setShowGender] = useState(false);
    const [showDayOfWeek, setShowDayOfWeek] = useState(false);
    const [showVisibilty, setShowVisibilty] = useState(false);
    const [ageOptions, setAgeOptions] = useState([]);

    useEffect(() => {
        let ages = [];

        ageOptions.map(ageGroup => {
            if (ageGroup !== '65+') {
                let rangeAges = ageGroup.split('-').map(Number);
                rangeAges.map(rangeAge => ages.push(rangeAge));
            } else ages.push(65);

            ages.sort();
        });

        if (ages.length > 1) {
            setFromAge(Math.min(...ages));
            setToAge(Math.max(...ages));
        }
    }, [ageOptions]);

    const handleChange = (panel) => (event, newExpanded) => setExpanded(newExpanded ? panel : false);

    const handleTabClick = (tab) => {
        switch (tab) {
            case 'demographics':
                setShowGender(true);
                setExpanded('panel2');
                break;
            case 'dayOfWeek':
                setShowDayOfWeek(true);
                setExpanded('panel3');
                break;
            case 'visibility':
                setShowVisibilty(true);
                setExpanded('panel4');
                break;
            default:
                return true;
        }
    };

    const handleAgeOption = (option) => {
        if (option === 'all') {
            if (ageOptions.length === ageGroups.length) setAgeOptions([]);
            else setAgeOptions(ageGroups);
        } else {
            if (ageOptions.includes(option)) setAgeOptions(ageOptions.filter(ageElement => ageElement !== option));
            else setAgeOptions([...ageOptions, option]);
        }
    };

    return (
        <div>
            <h3>Targeting</h3>
            <div className='box-ads'>
                <h4>Optimized targeting is set up for you</h4>
                <p>Optimized targeting helps you get more clicks by using information such as your landing page and assets. You can opt out or speed up optimization by adding targeting first.</p>
            </div>
            <Accordion expanded={expanded === `panel1`} onChange={handleChange(`panel1`)}>
                <AccordionSummary aria-controls={`panel1`} id={`panel1`}>
                    <Typography>Audience Segments</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <label>
                        <Checkbox checked={productCategory.length === productCategories.length} onClick={() => handleAllSelect('productCategory')} />
                        All Categories
                    </label>
                    {productCategories && productCategories.map((category, index) => (
                        <label>
                            <Checkbox checked={productCategory.includes(category)} onClick={() => handleProductCategoryChange(category)} />
                            {category}
                        </label>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === `panel2`} onChange={handleChange(`panel2`)} className={!showGender ? 'd-none' : ''}>
                <AccordionSummary aria-controls={`panel2`} id={`panel2`}>
                    <Typography>Demographics</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='row'>
                        <div className='col-lg-6 col-md-6'>
                            <div className='age-box'>
                                <label className='full-width'>
                                    <Checkbox checked={gender.length === genders.length} onClick={() => handleAllSelect('gender')} />
                                    All Genders
                                </label>
                                {genders && genders.map((genderValue, index) => (
                                    <label>
                                        <Checkbox checked={gender.includes(genderValue.toLowerCase())} onClick={() => handleGenderChange(genderValue.toLowerCase())} />
                                        {genderValue}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className='col-lg-6 col-md-6'>
                            <div className='age-box'>
                                <label className='full-width'>
                                    <Checkbox checked={ageOptions.length === ageGroups.length} onClick={() => handleAgeOption('all')} />
                                    All Age Groups
                                </label>
                                {ageGroups && ageGroups.map((ageGroupValue, index) => (
                                    <label>
                                        <Checkbox checked={ageOptions.includes(ageGroupValue)} onClick={() => handleAgeOption(ageGroupValue)} />
                                        {ageGroupValue}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === `panel3`} onChange={handleChange(`panel3`)} className={!showDayOfWeek ? 'd-none' : ''}>
                <AccordionSummary aria-controls={`panel3`} id={`panel3`}>
                    <Typography>DOW: <InfoIcon description={'Days of Week'} /></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <label className='full-width'>
                        <Checkbox checked={selectedDays.length === daysOfWeek.length} onClick={() => handleAllSelect('dayOfWeek')} />
                        All Days
                    </label>
                    {daysOfWeek && daysOfWeek.map((day, index) => (
                        <label>
                            <Checkbox checked={selectedDays.includes(day)} onClick={() => handleDaySelect(day)} />
                            {day}
                        </label>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === `panel4`} onChange={handleChange(`panel4`)} className={!showVisibilty ? 'd-none' : ''}>
                <AccordionSummary aria-controls={`panel4`} id={`panel4`}>
                    <Typography>Visibility</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='reach-box'>
                        <div className='reach-block'>
                            <label htmlFor='reachNumber' className='full-width'>
                                Reach
                                <InfoIcon description={'Percentage of selected gender who can view this ad'} />
                            </label>
                            <Select
                                id='reachNumber'
                                value={reachNumber}
                                onChange={(event) => setReachNumber(event.target.value)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="">
                                    <em>Select reach percentage</em>
                                </MenuItem>
                                {visibilityPercentages && visibilityPercentages.map((number) => (
                                    <MenuItem key={number} value={number}>
                                        {`${number} %`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                        <div className='reach-block'>
                            <label htmlFor='frequencyCap' className='full-width'>
                                Frequency Cap
                                <InfoIcon description={'Maximum number a user can view this ad'} />
                            </label>
                            <Select
                                id='frequencyCap'
                                value={frequencyCap}
                                onChange={(event) => setFrequencyCap(event.target.value)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="">
                                    <em>Select frequency cap</em>
                                </MenuItem>
                                {frequencyCapRange && frequencyCapRange.map((number) => (
                                    <MenuItem key={number} value={number}>
                                        {number}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                        <div className='reach-block mt-3'>
                            <label htmlFor='shareOfVoice' className='full-width'>
                                Share of Voice
                                <InfoIcon description={'Percentage of total impressions for which the ad is run'} />
                            </label>
                            <Select
                                id='shareOfVoice'
                                value={shareOfVoice}
                                onChange={(event) => setShareOfVoice(event.target.value)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="">
                                    <em>Select share of voice percentage</em>
                                </MenuItem>
                                {visibilityPercentages && visibilityPercentages.map((number) => (
                                    <MenuItem key={number} value={number}>
                                        {`${number} %`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === `panel5`} onChange={handleChange(`panel5`)}>
                <AccordionSummary aria-controls={`panel5`} id={`panel5`}>
                    <Typography><SettingsIcon /> Add targeting</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='more-setting-box'>
                        {/* <button className="tabs-btn" onChange={handleChange(`panel1`)}><span>Purchasing Behavior </span>Suggest who should see your ads <i className='iocn'><EditIcon /></i></button> */}
                        <button className="tabs-btn" onChange={handleChange(`panel2`)} onClick={() => handleTabClick('demographics')}> <span>Demographics </span> Suggest people based on gender and age <i className='iocn'><EditIcon /></i></button>
                        <button className="tabs-btn" onChange={handleChange(`panel3`)} onClick={() => handleTabClick('dayOfWeek')}> <span>DOW </span> Put your ad on specific days of week <i className='iocn'><EditIcon /></i></button>
                        <button className="tabs-btn" onChange={handleChange(`panel4`)} onClick={() => handleTabClick('visibility')}> <span>Visibility </span> Mastering reach and share of voice in your ad strategy <i className='iocn'><EditIcon /></i></button>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default StepFour;