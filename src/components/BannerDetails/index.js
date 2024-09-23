import React, { useEffect, useState } from "react";
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import { FormControl, FormGroup } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './index.css';
import { getCampaignGraphs, getCampaign } from '../../store/actions/Banner';
import constants from '../utils/constants';
import Loader from '../Loader'

const chartOptions = {
    legend: {
        show: false
    },
    chart: {
        id: 'new-customers-graph',
        toolbar: {
            tools: {
                zoom: false,
                zoomin: false,
                zoomout: false,
                pan: false,
                reset: false,
            }
        }
    },
};

const BannerDetails = (props) => {
    const dispatch = useDispatch();
    const campaignId = (props?.history?.location?.pathname?.split('/')[3]);
    const { bannerImpressionsGraph, bannerSlotTypeGraph, campaign } = useSelector(st => st.Banners);
    const todayDate = new Date();
    const priorDate = new Date(new Date().setDate(todayDate.getDate() - 30));
    const { colors, genders } = constants;

    const [gender, setGender] = useState('all');
    const [isLoader, setIsLoader] = useState(false);
    const [fromDate, setFromDate] = useState(priorDate);
    const [toDate, setToDate] = useState(todayDate);
    const [bannerImpressionsGraphData, setBannerImpressionsGraphData] = useState();
    const [bannerSlotTypeImpressionsGraphData, setBannerSlotTypeImpressionsGraphData] = useState();
    const [bannerSlotTypeAmountGraphData, setBannerSlotTypeAmountGraphData] = useState();

    useEffect(() => {
        dispatch(getCampaign(campaignId));
        dispatch(getCampaignGraphs({ campaignId, startDate: fromDate, endDate: toDate }));
    }, []);

    useEffect(() => setIsLoader(false), [bannerImpressionsGraph, bannerSlotTypeGraph]);

    useEffect(() => {
        if (!bannerImpressionsGraph) return;

        setBannerImpressionsGraphData({
            options: {
                ...chartOptions,
                dataLabels: { enabled: false },
                markers: {
                    size: 4,
                    colors: undefined,
                    strokeColors: '#fff',
                    strokeWidth: 0,
                    strokeOpacity: 0.9,
                    strokeDashArray: 0,
                    fillOpacity: 1,
                    discrete: [],
                    shape: "circle",
                    radius: 2,
                    offsetX: 0,
                    offsetY: 0,
                    onClick: undefined,
                    onDblClick: undefined,
                    showNullDataPoints: true,
                    hover: {
                        size: undefined,
                        sizeOffset: 3
                    }
                },
                stroke: {
                    show: true,
                    width: 3,
                    colors: ['transparent']
                },
                plotOptions: { bar: { columnWidth: "20px" } },
                xaxis: {
                    categories: bannerImpressionsGraph?.labels,
                    title: { text: 'Date', offsetY: -10, offsetX: 0, },
                    labels: { rotate: -45 },
                },
                yaxis: [{
                    title: {
                        text: 'Impressions',
                        axisTicks: { show: true },
                        axisBorder: { show: false, },
                    },

                }],
            },

            series: (gender === 'all' ? (
                [
                    {
                        name: 'Impressions',
                        data: bannerImpressionsGraph?.series?.impressionsGraph,
                        type: 'bar',
                        color: colors[0],
                        yAxis: 0,
                    },
                    {
                        name: 'Male Impressions',
                        data: bannerImpressionsGraph?.series?.maleImpressionsGraph,
                        type: 'line',
                        color: colors[10],
                        yAxis: 0,
                    },
                    {
                        name: 'Female Impressions',
                        data: bannerImpressionsGraph?.series?.femaleImpressionsGraph,
                        type: 'line',
                        color: colors[10],
                        yAxis: 0,
                    },
                ].filter(Boolean)
            ) : gender === 'male' ? (
                [{
                    name: 'Male Impressions',
                    data: bannerImpressionsGraph?.series?.maleImpressionsGraph,
                    type: 'bar',
                    color: colors[1],
                    yAxis: 0,
                }].filter(Boolean)
            ) : gender === 'female' ? (
                [{
                    name: 'Female Impressions',
                    data: bannerImpressionsGraph?.series?.femaleImpressionsGraph,
                    type: 'bar',
                    color: colors[2],
                    yAxis: 0,
                }].filter(Boolean)
            ) : (
                [{
                    name: 'Unknown Impressions',
                    data: Array.from({ length: bannerImpressionsGraph?.labels?.length }).fill(0),
                    type: 'bar',
                    color: colors[3],
                    yAxis: 0,
                }].filter(Boolean)
            )),
        });
    }, [bannerImpressionsGraph, gender]);

    useEffect(() => {
        if (!bannerSlotTypeGraph) return;

        setBannerSlotTypeImpressionsGraphData({
            options: {
                ...chartOptions,
                dataLabels: { enabled: false },
                markers: {
                    size: 4,
                    colors: undefined,
                    strokeColors: '#fff',
                    strokeWidth: 0,
                    strokeOpacity: 0.9,
                    strokeDashArray: 0,
                    fillOpacity: 1,
                    discrete: [],
                    shape: "circle",
                    radius: 2,
                    offsetX: 0,
                    offsetY: 0,
                    onClick: undefined,
                    onDblClick: undefined,
                    showNullDataPoints: true,
                    hover: {
                        size: undefined,
                        sizeOffset: 3
                    }
                },
                stroke: {
                    show: true,
                    width: 3,
                    colors: ['transparent']
                },
                plotOptions: { bar: { columnWidth: "20px" } },
                xaxis: {
                    categories: bannerSlotTypeGraph?.labels,
                    title: { text: 'Slot Type', offsetY: -10, offsetX: 0, },
                    labels: { rotate: -45 },
                },
                yaxis: [{
                    title: {
                        text: 'Impressions',
                        axisTicks: { show: true },
                        axisBorder: { show: false, },
                    },

                }],
            },

            series: (gender === 'all' ? (
                [
                    {
                        name: 'Impressions',
                        data: bannerSlotTypeGraph?.series?.impressionsGraph,
                        type: 'bar',
                        color: colors[0],
                        yAxis: 0,
                    },
                    {
                        name: 'Male Impressions',
                        data: bannerSlotTypeGraph?.series?.maleImpressionsGraph,
                        type: 'line',
                        color: colors[10],
                        yAxis: 0,
                    },
                    {
                        name: 'Female Impressions',
                        data: bannerSlotTypeGraph?.series?.femaleImpressionsGraph,
                        type: 'line',
                        color: colors[10],
                        yAxis: 0,
                    },
                ].filter(Boolean)
            ) : gender === 'male' ? (
                [{
                    name: 'Male Impressions',
                    data: bannerSlotTypeGraph?.series?.maleImpressionsGraph,
                    type: 'bar',
                    color: colors[1],
                    yAxis: 0,
                }].filter(Boolean)
            ) : gender === 'female' ? (
                [{
                    name: 'Female Impressions',
                    data: bannerSlotTypeGraph?.series?.femaleImpressionsGraph,
                    type: 'bar',
                    color: colors[2],
                    yAxis: 0,
                }].filter(Boolean)
            ) : (
                [{
                    name: 'Unknown Impressions',
                    data: Array.from({ length: bannerSlotTypeGraph?.labels?.length }).fill(0),
                    type: 'bar',
                    color: colors[3],
                    yAxis: 0,
                }].filter(Boolean)
            )),
        });
    }, [bannerSlotTypeGraph, gender]);

    useEffect(() => {
        if (!bannerSlotTypeGraph) return;

        setBannerSlotTypeAmountGraphData({
            options: {
                ...chartOptions,
                dataLabels: { enabled: false },
                markers: {
                    size: 4,
                    colors: undefined,
                    strokeColors: '#fff',
                    strokeWidth: 0,
                    strokeOpacity: 0.9,
                    strokeDashArray: 0,
                    fillOpacity: 1,
                    discrete: [],
                    shape: "circle",
                    radius: 2,
                    offsetX: 0,
                    offsetY: 0,
                    onClick: undefined,
                    onDblClick: undefined,
                    showNullDataPoints: true,
                    hover: {
                        size: undefined,
                        sizeOffset: 3
                    }
                },
                stroke: {
                    show: true,
                    width: 3,
                    colors: ['transparent']
                },
                plotOptions: { bar: { columnWidth: "20px" } },
                xaxis: {
                    categories: bannerSlotTypeGraph?.labels,
                    title: { text: 'Slot Type', offsetY: -10, offsetX: 0, },
                    labels: { rotate: -45 },
                },
                yaxis: [{
                    title: {
                        text: 'Amount',
                        axisTicks: { show: true },
                        axisBorder: { show: false, },
                    },

                }],
            },

            series: [{
                name: 'Amount',
                data: bannerSlotTypeGraph?.series?.amount,
                type: 'bar',
                color: gender === 'all' ? colors[0] : gender === 'male' ? colors[1] : gender === 'female' ? colors[2] : colors[3],
                yAxis: 0,
            }].filter(Boolean),
        });
    }, [bannerSlotTypeGraph, gender]);

    const handleBackClick = () => {
        if (props?.history?.location?.pathname.startsWith('/home')) props?.history?.push('/home/banners');
        else props.history.push(`/advertiser/myBanners`);
    };

    const applyFilters = () => {
        if (!fromDate || !toDate) {
            toast.error(`Please select both "From" and "To" dates`);
            return;
        }

        if (fromDate > toDate) {
            toast.error(`"From" date should be earlier than "To" date`);
            return;
        }

        setIsLoader(true);
        dispatch(getCampaignGraphs({ campaignId, startDate: fromDate, endDate: toDate }));
    };

    return (
        <div className='content my-ads-page'>
            <div className='top-heading-area home-header'>
                <div className="page-title">
                    <ArrowBackIcon className="back-arrow" onClick={() => handleBackClick()} />
                    <h3 className="ml-2">Ad Details</h3>
                </div>
            </div>

            {campaign ? (
                <div className='banner-details'>
                    <div className='user-box'>
                        <h5>Campaign Name</h5>
                        <p>{campaign?.adName}</p>
                    </div>
                    <div className='user-box'>
                        <h5>Status</h5>
                        <p>{campaign?.status}</p>
                    </div>
                    <div className='user-box'>
                        <h5>Banner Type</h5>
                        <p>{campaign.category}</p>
                    </div>
                    <div className='user-box'>
                        <h5>Amount</h5>
                        <p>{(campaign.amount && campaign.isPaid) ? campaign.amount : 'Unpaid'}</p>
                    </div>
                </div>
            ) : (
                <Loader />
            )}

            <div className='chart-container combined-chart demographics-page stats-chart-page'>
                <div className='dashboard-top'>
                    <div className='chart-title'>
                        <div className='group-form'>
                            <label>From: </label>
                            <DatePicker
                                selected={fromDate}
                                onChange={date => setFromDate(date)}
                                dateFormat="dd-MM-yyyy"
                            />
                        </div>
                        <div className='group-form'>
                            <label>To: </label>
                            <DatePicker
                                selected={toDate}
                                onChange={date => setToDate(date)}
                                dateFormat="dd-MM-yyyy"
                            />
                        </div>
                        <div className='group-form'>
                            <label htmlFor='gender'>Gender:</label>
                            <Select
                                id='gender'
                                value={gender}
                                onChange={(event) => setGender(event.target.value)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="all"><em>All</em></MenuItem>
                                {genders && genders.map((gender, index) => (
                                    <MenuItem key={index} value={gender.toLowerCase()}>{gender}</MenuItem>
                                ))}
                            </Select>
                        </div>
                        <div className='group-form btn-group'>
                            <button className='btn-style-one' onClick={() => applyFilters()}>
                                Apply
                            </button>
                        </div>
                    </div>

                </div>
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12'>
                        <div className='value-title'>
                            <h2 className='heading'>Impressions Graph</h2>
                        </div>
                        <div className='chart-area item-chart adv-chart-item'>
                            {bannerImpressionsGraphData ? (
                                <div className='chart-detail chart-date-change'>
                                    <div>
                                        <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                            <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                                            </FormGroup>
                                        </FormControl>
                                    </div>
                                    {isLoader ? (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
                                            <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                                        </div>
                                    ) : (
                                        <ReactApexChart options={bannerImpressionsGraphData.options} series={bannerImpressionsGraphData.series} height={345} />
                                    )}
                                </div>

                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '42vh' }}>
                                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 mt-4'>
                        <div className='value-title'>
                            <h2 className='heading'>Slot Type Graphs</h2>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-6'>
                        <div className='chart-area item-chart adv-chart-item'>
                            {bannerSlotTypeImpressionsGraphData ? (
                                <div className='chart-detail chart-date-change'>
                                    <div>
                                        <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                            <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                                            </FormGroup>
                                        </FormControl>
                                    </div>
                                    {isLoader ? (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
                                            <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                                        </div>
                                    ) : (
                                        <ReactApexChart options={bannerSlotTypeImpressionsGraphData.options} series={bannerSlotTypeImpressionsGraphData.series} height={345} />
                                    )}
                                </div>

                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '42vh' }}>
                                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-6'>
                        <div className='chart-area item-chart adv-chart-item'>
                            {bannerSlotTypeAmountGraphData ? (
                                <div className='chart-detail chart-date-change'>
                                    <div>
                                        <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                            <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                                            </FormGroup>
                                        </FormControl>
                                    </div>
                                    {isLoader ? (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
                                            <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                                        </div>
                                    ) : (
                                        <ReactApexChart options={bannerSlotTypeAmountGraphData.options} series={bannerSlotTypeAmountGraphData.series} height={345} />
                                    )}
                                </div>

                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '42vh' }}>
                                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* {
                campaign ? (
                    <div className='row'>
                        <div className='col-lg-7 col-md-12'>
                            <div className='banner-details'>
                                <div className='user-box'>
                                    <h5>Banner Type</h5>
                                    <p>{campaign.category}</p>
                                </div>
                                <div className='user-box'>
                                    <h5>Amount</h5>
                                    <p>{(campaign.amount && campaign.isPaid) ? campaign.amount : 'Unpaid'}</p>
                                </div>
                                <div className='user-box'>
                                    <h5>Gender</h5>
                                    <p>{campaign.gender ? campaign.gender : 'N/A'}</p>
                                </div>
                                <div className='user-box'>
                                    <h5>Age</h5>
                                    <p>{(campaign.fromAge && campaign.toAge) ? `${campaign.fromAge} - ${campaign.toAge}` : 'N/A'}</p>
                                </div>
                                <div className='user-box'>
                                    <h5>Location</h5>
                                    <p>{campaign.location ? campaign.location.replaceAll(',', ', ') : 'N/A'}</p>
                                </div>
                                <div className='user-box'>
                                    <h5>Product Category</h5>
                                    <p>{campaign.productCategory ? campaign.location : 'N/A'}</p>
                                </div>
                                <div className='user-box'>
                                    <h5>Hours</h5>
                                    <p>{(campaign.fromHour && campaign.toHour) ? `${campaign.fromHour} - ${campaign.toHour}` : 'N/A'}</p>
                                </div>
                                <div className='user-box'>
                                    <h5>Days of Week</h5>
                                    <p>{campaign.dayOfWeek ? campaign.dayOfWeek.replaceAll(',', ', ') : 'N/A'}</p>
                                </div>
                                {
                                    campaign.category === 'target' ? (
                                        <>
                                            <div className='user-box'>
                                                <h5>Device</h5>
                                                <p>{campaign.device ? campaign.device : 'N/A'}</p>
                                            </div>
                                            <div className='user-box'>
                                                <h5>Operating System</h5>
                                                <p>{campaign.os ? campaign.os : 'N/A'}</p>
                                            </div>
                                            <div className='user-box'>
                                                <h5>Impressions Limit</h5>
                                                <p>{campaign.impressionsLimit ? campaign.impressionsLimit : 'N/A'}</p>
                                            </div>
                                        </>
                                    ) : campaign.category === 'awareness' ? (
                                        <>
                                            <div className='user-box'>
                                                <h5>Frequency Cap</h5>
                                                <p>{campaign.frequencyCap ? campaign.frequencyCap : 'N/A'}</p>
                                            </div>
                                            <div className='user-box'>
                                                <h5>Reach</h5>
                                                <p>{(campaign.reachNumber && campaign.reachGender) ? `${campaign.reachNumber}% of ${campaign.reachGender}` : 'N/A'}</p>
                                            </div>
                                            <div className='user-box'>
                                                <h5>Life Event</h5>
                                                <p>{campaign.lifeEvent ? campaign.lifeEvent : 'N/A'}</p>
                                            </div>
                                            <div className='user-box'>
                                                <h5>Time Limit</h5>
                                                <p>{campaign.timeLimit ? campaign.timeLimit : 'N/A'}</p>
                                            </div>
                                        </>
                                    ) : ''
                                }
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-12">
                            <h3 className="title-preivew">Preview</h3>
                            <>
                                <div className={`img-preivew-box ${campaign.type}`}>
                                    {campaign.type !== 'wall' ? (
                                        <>
                                            <div className="img-box">
                                                <img className='preview-img' src={campaign.bannerUrl} alt='campaign' />
                                                <img className="place-img" src={require(`../../assets/bannerSlots/${campaign.type}.png`)} alt='file' />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="img-box">
                                                <img className="place-img" src={require(`../../assets/bannerSlots/${campaign.type}.png`)} alt='file' />
                                                <video className='preview-video' loop autoPlay muted controls>
                                                    <source src={campaign.bannerUrl} type="video/mp4" />
                                                </video>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </>
                        </div>
                    </div>
                ) : <Loader />
            } */}
        </div>
    );
};

export default BannerDetails;