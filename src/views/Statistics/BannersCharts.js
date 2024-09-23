import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, FormGroup } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-tabs/style/react-tabs.css';

import './index.css';
import { getBannerLocations, getAllBannersGraph } from '../../store/actions/Banner';
import constants from '../../components/utils/constants';

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

const BannersCharts = () => {
    const dispatch = useDispatch();

    const todayDate = new Date();
    const priorDate = new Date(new Date().setDate(todayDate.getDate() - 30));

    const { colors, genders, citiesUAE } = constants;
    const {
        bannerLocations,
        allBannerIdImpressionsGraph,
        allSlotTypeImpressionsGraph,
        allBannerIdAmountGraph,
        allSlotTypeAmountGraph,
    } = useSelector(st => st.Banners);

    const [locationDropdown, setLocationDropdown] = useState(null);
    const [gender, setGender] = useState('all');
    const [location, setLocation] = useState('all');
    const [isLoader, setIsLoader] = useState(false);
    const [fromDate, setFromDate] = useState(priorDate);
    const [toDate, setToDate] = useState(todayDate);
    const [bannerIdImpressionsGraphData, setBannerIdImpressionsGraphData] = useState();
    const [slotTypeImpressionsGraphData, setSlotTypeImpressionsGraphData] = useState();
    const [bannerIdAmountGraphData, setBannerIdAmountGraphData] = useState();
    const [slotTypeAmountGraphData, setSlotTypeAmountGraphData] = useState();

    useEffect(() => {
        dispatch(getBannerLocations());
        dispatch(getAllBannersGraph({ startDate: fromDate, endDate: toDate, location }));
    }, []);

    useEffect(() => {
        if (bannerLocations) setLocationDropdown(bannerLocations);
    }, [bannerLocations]);

    useEffect(() => setIsLoader(false), [allBannerIdImpressionsGraph, allSlotTypeImpressionsGraph, allBannerIdAmountGraph, allSlotTypeAmountGraph,]);

    useEffect(() => {
        if (!allBannerIdImpressionsGraph) return;

        setBannerIdImpressionsGraphData({
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
                    labels: { rotate: -45 },
                    rotateAlways: true,
                    title: { text: 'Advertisement Name', offsetY: -10, offsetX: 0, },
                    categories: allBannerIdImpressionsGraph?.labels,
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
                        data: allBannerIdImpressionsGraph?.series?.impressionsGraph?.data,
                        type: 'bar',
                        color: colors[0],
                        yAxis: 0,
                    },
                    {
                        name: 'Male Impressions',
                        data: allBannerIdImpressionsGraph?.series?.maleImpressionsGraph?.data,
                        type: 'line',
                        color: colors[10],
                        yAxis: 0,
                    },
                    {
                        name: 'Female Impressions',
                        data: allBannerIdImpressionsGraph?.series?.femaleImpressionsGraph?.data,
                        type: 'line',
                        color: colors[10],
                        yAxis: 0,
                    },
                ].filter(Boolean)
            ) : gender === 'male' ? (
                [{
                    name: 'Male Impressions',
                    data: allBannerIdImpressionsGraph?.series?.maleImpressionsGraph?.data,
                    type: 'bar',
                    color: colors[1],
                    yAxis: 0,
                }].filter(Boolean)
            ) : gender === 'female' ? (
                [{
                    name: 'Female Impressions',
                    data: allBannerIdImpressionsGraph?.series?.femaleImpressionsGraph?.data,
                    type: 'bar',
                    color: colors[2],
                    yAxis: 0,
                }].filter(Boolean)
            ) : (
                [{
                    name: 'Unknown Impressions',
                    data: Array.from({ length: allBannerIdImpressionsGraph?.labels?.length }).fill(0),
                    type: 'bar',
                    color: colors[4],
                    yAxis: 0,
                }].filter(Boolean)
            )),
        });
    }, [allBannerIdImpressionsGraph, gender]);

    useEffect(() => {
        if (!allSlotTypeImpressionsGraph) return;

        setSlotTypeImpressionsGraphData({
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
                    labels: { rotate: -45 },
                    title: { text: 'Slot Type' },
                    categories: allSlotTypeImpressionsGraph?.labels,
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
                        data: allSlotTypeImpressionsGraph?.series?.impressionsGraph?.data,
                        type: 'bar',
                        color: colors[0],
                        yAxis: 0,
                    },
                    {
                        name: 'Male Impressions',
                        data: allSlotTypeImpressionsGraph?.series?.maleImpressionsGraph?.data,
                        type: 'line',
                        color: colors[10],
                        yAxis: 0,
                    },
                    {
                        name: 'Female Impressions',
                        data: allSlotTypeImpressionsGraph?.series?.femaleImpressionsGraph?.data,
                        type: 'line',
                        color: colors[10],
                        yAxis: 0,
                    },
                ].filter(Boolean)
            ) : gender === 'male' ? (
                [{
                    name: 'Male Impressions',
                    data: allSlotTypeImpressionsGraph?.series?.maleImpressionsGraph?.data,
                    type: 'bar',
                    color: colors[1],
                    yAxis: 0,
                }].filter(Boolean)
            ) : gender === 'female' ? (
                [{
                    name: 'Female Impressions',
                    data: allSlotTypeImpressionsGraph?.series?.femaleImpressionsGraph?.data,
                    type: 'bar',
                    color: colors[2],
                    yAxis: 0,
                }].filter(Boolean)
            ) : (
                [{
                    name: 'Unknown Impressions',
                    data: Array.from({ length: allSlotTypeImpressionsGraph?.labels?.length }).fill(0),
                    type: 'bar',
                    color: colors[4],
                    yAxis: 0,
                }].filter(Boolean)
            )),
        });
    }, [allSlotTypeImpressionsGraph, gender]);

    useEffect(() => {
        if (!allBannerIdAmountGraph) return;

        setBannerIdAmountGraphData({
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
                    labels: { rotate: -45 },
                    title: { text: 'Advertisement Name', offsetY: -10, offsetX: 0, },
                    categories: allBannerIdAmountGraph?.labels,
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
                data: allBannerIdAmountGraph?.series?.data,
                type: 'bar',
                color: colors[3],
                yAxis: 0,
            }],
        });
    }, [allBannerIdAmountGraph]);

    useEffect(() => {
        if (!allSlotTypeAmountGraph) return;

        setSlotTypeAmountGraphData({
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
                    labels: { rotate: -45 },
                    title: { text: 'Slot Type' },
                    categories: allSlotTypeAmountGraph?.labels,
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
                data: allSlotTypeAmountGraph?.series?.data,
                type: 'bar',
                color: colors[3],
                yAxis: 0,
            }],
        });
    }, [allSlotTypeAmountGraph]);

    const applyFilters = () => {
        if (!fromDate || !toDate) {
            toast.error(`Please select both "From" and "To" dates`);
            return;
        }

        if (fromDate > toDate) {
            toast.error(`"From" date should be earlier than "To" date`);
            return;
        }

        if (!location) {
            toast.error('Please select location');
            return;
        }

        setIsLoader(true);
        dispatch(getAllBannersGraph({ startDate: fromDate, endDate: toDate, location }));
    };

    return (
        <div className='content'>
            <div className='top-heading-area home-header'>
                <h3>Advertisement Stats</h3>
            </div>
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
                        <div className='group-form'>
                            <label htmlFor='location'>Location:</label>
                            <Select
                                id='location'
                                value={location}
                                onChange={(event) => setLocation(event.target.value)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="all"><em>All</em></MenuItem>
                                {citiesUAE && citiesUAE.map((location, index) => (
                                    <MenuItem key={index} value={location}>{location}</MenuItem>
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
                    <div className='col-12'>
                        <div className='value-title'>
                            <h2 className='heading'>Impressions</h2>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 col-sm-12'>
                        <div className='chart-area item-chart adv-chart-item'>
                            {bannerIdImpressionsGraphData ? (
                                <div className='chart-detail'>
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
                                        <ReactApexChart options={bannerIdImpressionsGraphData.options} series={bannerIdImpressionsGraphData.series} height={300} />
                                    )}
                                </div>

                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '42vh' }}>
                                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 col-sm-12'>
                        <div className='chart-area item-chart adv-chart-item'>
                            {slotTypeImpressionsGraphData ? (
                                <div className='chart-detail'>
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
                                        <ReactApexChart options={slotTypeImpressionsGraphData.options} series={slotTypeImpressionsGraphData.series} height={300} />
                                    )}
                                </div>

                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '42vh' }}>
                                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='value-title'>
                            <h2 className='heading'>Amount</h2>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 col-sm-12'>
                        <div className='chart-area item-chart adv-chart-item'>
                            {bannerIdAmountGraphData ? (
                                <div className='chart-detail'>
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
                                        <ReactApexChart options={bannerIdAmountGraphData.options} series={bannerIdAmountGraphData.series} height={300} />
                                    )}
                                </div>

                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '42vh' }}>
                                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 col-sm-12'>
                        <div className='chart-area item-chart adv-chart-item'>
                            {slotTypeAmountGraphData ? (
                                <div className='chart-detail'>
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
                                        <ReactApexChart options={slotTypeAmountGraphData.options} series={slotTypeAmountGraphData.series} height={300} />
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
        </div>
    )
};

export default BannersCharts;