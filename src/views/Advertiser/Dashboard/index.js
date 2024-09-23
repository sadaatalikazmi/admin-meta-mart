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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import './index.css';
import { getRunCampaigns, getUserDashboard, getBannerLocations, getUserBannersGraph } from '../../../store/actions/Banner';
import constants from '../../../components/utils/constants';

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

const Dashboard = (props) => {
    const dispatch = useDispatch();

    const todayDate = new Date();
    const priorDate = new Date(new Date().setDate(todayDate.getDate() - 30));

    const { colors, genders, citiesUAE } = constants;
    const {
        runCampaigns,
        scorecard,
        dailyCostByOsGraph,
        dailyCostByDeviceGraph,
        interactionRateAndCostByOsGraph,
        interactionRateAndCostByDeviceGraph,
        interactionsByOsGraph,
        interactionsByDeviceGraph,
        campaignPerformanceTable,
        bannerLocations,
        userBannerIdImpressionsGraph,
        userSlotTypeImpressionsGraph,
        userBannerIdAmountGraph,
        userSlotTypeAmountGraph,
    } = useSelector(st => st.Banners);

    const [fromDate, setFromDate] = useState(priorDate);
    const [toDate, setToDate] = useState(todayDate);
    const [campaigns, setCampaigns] = useState('all');
    const [gender, setGender] = useState('all');
    const [location, setLocation] = useState('all');
    const [isLoader, setIsLoader] = useState(false);

    const [scorecardData, setScorecardData] = useState({});
    const [dailyCostByOsGraphData, setDailyCostByOsGraphData] = useState({});
    const [dailyCostByDeviceGraphData, setDailyCostByDeviceGraphData] = useState({});
    const [interactionRateAndCostByOsGraphData, setInteractionRateAndCostByOsGraphData] = useState({});
    const [interactionRateAndCostByDeviceGraphData, setInteractionRateAndCostByDeviceGraphData] = useState({});
    const [interactionsByOsGraphData, setInteractionsByOsGraphData] = useState({});
    const [interactionsByDeviceGraphData, setInteractionsByDeviceGraphData] = useState({});

    // const [locationDropdown, setLocationDropdown] = useState(null);
    // const [bannerIdImpressionsGraphData, setBannerIdImpressionsGraphData] = useState();
    // const [slotTypeImpressionsGraphData, setSlotTypeImpressionsGraphData] = useState();
    // const [bannerIdAmountGraphData, setBannerIdAmountGraphData] = useState();
    // const [slotTypeAmountGraphData, setSlotTypeAmountGraphData] = useState();

    useEffect(() => {
        dispatch(getBannerLocations());
        dispatch(getRunCampaigns());
        dispatch(getUserDashboard({ startDate: fromDate, endDate: toDate, campaigns }));
        // dispatch(getUserBannersGraph({ startDate: fromDate, endDate: toDate, location }));
    }, []);

    // useEffect(() => {
    //     console.log('*** interactionRateAndCostByDeviceGraph: ', interactionRateAndCostByDeviceGraph);
    // }, [interactionRateAndCostByDeviceGraph]);

    // useEffect(() => {
    //     if (bannerLocations) setLocationDropdown(bannerLocations);
    // }, [bannerLocations]);

    useEffect(() => setIsLoader(false), [userBannerIdImpressionsGraph, userSlotTypeImpressionsGraph, userBannerIdAmountGraph, userSlotTypeAmountGraph,]);

    useEffect(() => {
        if (!scorecard) return;

        setScorecardData({
            scorecardData: scorecard.scorecardData,

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
                plotOptions: { bar: { columnWidth: "50px" } },
                xaxis: {
                    categories: scorecard?.labels,
                    labels: { rotate: -45 },
                },
                yaxis: {
                    labels:{show: false,}
                },
            },

            series: [{
                data: scorecard?.series,
                type: 'bar',
                color: colors[3],
                yAxis: 0,
            }].filter(Boolean),
        });
    }, [scorecard]);

    useEffect(() => {
        if (!dailyCostByOsGraph) return;

        setDailyCostByOsGraphData({
            options: {
                ...chartOptions,
                dataLabels: { enabled: false },
                markers: {
                    size: 0,
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
                      sizeOffset: 2,
                      dropShadow: {
                        enabled: true,
                        top: 0,
                        left: 0,
                        blur: 3,
                        opacity: 0.5
                      }
                    }
                  },
                stroke: {
                    curve: 'smooth',
                    width: 2,
                },
                plotOptions: { bar: { columnWidth: "20px" } },
                legend: {
                    position: 'bottom',
                    horizontalAlign: 'center',
                    offsetX: 40
                },
                xaxis: {
                    categories: dailyCostByOsGraph?.labels,
                    labels: { rotate: -45 },
                },
                yaxis: [{
                    title: {
                        text: 'Cost',
                        axisTicks: { show: true },
                        axisBorder: { show: false, },
                    },
                }],
            },

            series: [
                {
                    name: 'Android',
                    data: dailyCostByOsGraph?.series?.android,
                    type: 'line',
                    color: colors[3],
                    yAxis: 0,
                },
                {
                    name: 'VR',
                    data: dailyCostByOsGraph?.series?.vr,
                    type: 'line',
                    color: colors[2],
                    yAxis: 0,
                },
            ].filter(Boolean)
        });
    }, [dailyCostByOsGraph]);

    useEffect(() => {
        if (!dailyCostByDeviceGraph) return;

        setDailyCostByDeviceGraphData({
            options: {
                ...chartOptions,
                dataLabels: { enabled: false },
                markers: {
                    size: 0,
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
                      sizeOffset: 2,
                      dropShadow: {
                        enabled: true,
                        top: 0,
                        left: 0,
                        blur: 3,
                        opacity: 0.5
                      }
                    }
                  },
                stroke: {
                    curve: 'smooth',
                    width: 2,
                },
                plotOptions: { bar: { columnWidth: "20px" } },
                legend: {
                    position: 'bottom',
                    horizontalAlign: 'left',
                    offsetX: 40
                },
                xaxis: {
                    categories: dailyCostByDeviceGraph?.labels,
                    labels: { rotate: -45 },
                },
                yaxis: [{
                    title: {
                        text: 'Cost',
                        axisTicks: { show: true },
                        axisBorder: { show: false, },
                    },
                }],
            },

            series: [
                {
                    name: 'Oculus',
                    data: dailyCostByDeviceGraph?.series?.oculus,
                    type: 'line',
                    color: colors[3],
                    yAxis: 0,
                },
                {
                    name: 'Samsung',
                    data: dailyCostByDeviceGraph?.series?.samsung,
                    type: 'line',
                    color: colors[2],
                    yAxis: 0,
                },
                {
                    name: 'Oppo',
                    data: dailyCostByDeviceGraph?.series?.oppo,
                    type: 'line',
                    color: colors[0],
                    yAxis: 0,
                },
                {
                    name: 'Xiaomi',
                    data: dailyCostByDeviceGraph?.series?.xiaomi,
                    type: 'line',
                    color: colors[1],
                    yAxis: 0,
                },
                {
                    name: 'Vivo',
                    data: dailyCostByDeviceGraph?.series?.vivo,
                    type: 'line',
                    color: colors[4],
                    yAxis: 0,
                },
            ].filter(Boolean)
        });
    }, [dailyCostByDeviceGraph]);

    useEffect(() => {
        if (!interactionRateAndCostByOsGraph) return;

        setInteractionRateAndCostByOsGraphData({
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
                legend: {
                    position: 'bottom',
                    horizontalAlign: 'center',
                    offsetX: 10
                },
                xaxis: {
                    categories: interactionRateAndCostByOsGraph?.labels,
                    labels: { rotate: -45 },
                },
                yaxis: [{
                    title: {
                        text: 'Interaction Rate',
                        axisTicks: {
                            show: true
                        },
                        axisBorder: {
                            show: false,
                        },
                    },

                }, {
                    opposite: true,
                    title: {
                        text: 'Cost'
                    }
                }],
            },

            series: [
                {
                    name: 'Interaction Rate',
                    data: interactionRateAndCostByOsGraph?.series?.interactionRate,
                    type: 'bar',
                    color: colors[3],
                    yAxis: 0,
                },
                {
                    name: 'Cost',
                    data: interactionRateAndCostByOsGraph?.series?.cost,
                    type: 'bar',
                    color: colors[2],
                    yAxis: 0,
                },
            ].filter(Boolean)
        });
    }, [interactionRateAndCostByOsGraph]);

    useEffect(() => {
        if (!interactionRateAndCostByDeviceGraph) return;

        setInteractionRateAndCostByDeviceGraphData({
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
                legend: {
                    position: 'bottom',
                    horizontalAlign: 'center',
                    offsetY: 8,
                },
                xaxis: {
                    categories: interactionRateAndCostByDeviceGraph?.labels,
                    labels: { rotate: -45 },
                },
                yaxis: [{
                    title: {
                        text: 'Interaction Rate',
                        axisTicks: {
                            show: true
                        },
                        axisBorder: {
                            show: false,
                        },
                    },

                }, {
                    opposite: true,
                    title: {
                        text: 'Cost'
                    }
                }],
            },

            series: [
                {
                    name: 'Interaction Rate',
                    data: interactionRateAndCostByDeviceGraph?.series?.interactionRate,
                    type: 'bar',
                    color: colors[3],
                    yAxis: 0,
                },
                {
                    name: 'Cost',
                    data: interactionRateAndCostByDeviceGraph?.series?.cost,
                    type: 'bar',
                    color: colors[2],
                    yAxis: 0,
                },
            ].filter(Boolean)
        });
    }, [interactionRateAndCostByDeviceGraph]);

    useEffect(() => {
        if (!interactionsByOsGraph) return;

        setInteractionsByOsGraphData({
            options: {
                labels: ['Android', 'VR'],
                colors: [colors[3], colors[2]],
                legend: {
                    position: 'bottom',
                    horizontalAlign: 'center',
                    offsetY: -5
                },
            },

            series: interactionsByOsGraph?.series,
        });
    }, [interactionsByOsGraph]);

    useEffect(() => {
        if (!interactionsByDeviceGraph) return;

        setInteractionsByDeviceGraphData({
            options: {
                labels: ['Oculus', 'Samsung', 'Oppo', 'Xiaomi', 'Vivo'],
                colors: [colors[3], colors[2], colors[0], colors[1], colors[4]],
                legend: {
                    position: 'bottom',
                    horizontalAlign: 'left',
                    offsetY: -5
                },
            },

            series: interactionsByDeviceGraph?.series,
        });
    }, [interactionsByDeviceGraph]);

    // useEffect(() => {
    //     if (!userSlotTypeImpressionsGraph) return;

    //     setSlotTypeImpressionsGraphData({
    //         options: {
    //             ...chartOptions,
    //             dataLabels: { enabled: false },
    //             markers: {
    //                 size: 4,
    //                 colors: undefined,
    //                 strokeColors: '#fff',
    //                 strokeWidth: 0,
    //                 strokeOpacity: 0.9,
    //                 strokeDashArray: 0,
    //                 fillOpacity: 1,
    //                 discrete: [],
    //                 shape: "circle",
    //                 radius: 2,
    //                 offsetX: 0,
    //                 offsetY: 0,
    //                 onClick: undefined,
    //                 onDblClick: undefined,
    //                 showNullDataPoints: true,
    //                 hover: {
    //                     size: undefined,
    //                     sizeOffset: 3
    //                 }
    //             },
    //             stroke: {
    //                 show: true,
    //                 width: 3,
    //                 colors: ['transparent']
    //             },
    //             plotOptions: { bar: { columnWidth: "20px" } },
    //             xaxis: {
    //                 title: { text: 'Slot Type' },
    //                 categories: userSlotTypeImpressionsGraph?.labels,
    //                 labels: { rotate: -45 },
    //             },
    //             yaxis: [{
    //                 title: {
    //                     text: 'Impressions',
    //                     axisTicks: { show: true },
    //                     axisBorder: { show: false, },
    //                 },

    //             }],
    //         },

    //         series: (gender === 'all' ? (
    //             [
    //                 {
    //                     name: 'Impressions',
    //                     data: userSlotTypeImpressionsGraph?.series?.impressionsGraph?.data,
    //                     type: 'bar',
    //                     color: colors[0],
    //                     yAxis: 0,
    //                 },
    //                 {
    //                     name: 'Male Impressions',
    //                     data: userSlotTypeImpressionsGraph?.series?.maleImpressionsGraph?.data,
    //                     type: 'line',
    //                     color: colors[10],
    //                     yAxis: 0,
    //                 },
    //                 {
    //                     name: 'Female Impressions',
    //                     data: userSlotTypeImpressionsGraph?.series?.femaleImpressionsGraph?.data,
    //                     type: 'line',
    //                     color: colors[10],
    //                     yAxis: 0,
    //                 },
    //             ].filter(Boolean)
    //         ) : gender === 'male' ? (
    //             [{
    //                 name: 'Male Impressions',
    //                 data: userSlotTypeImpressionsGraph?.series?.maleImpressionsGraph?.data,
    //                 type: 'bar',
    //                 color: colors[1],
    //                 yAxis: 0,
    //             }].filter(Boolean)
    //         ) : gender === 'female' ? (
    //             [{
    //                 name: 'Female Impressions',
    //                 data: userSlotTypeImpressionsGraph?.series?.femaleImpressionsGraph?.data,
    //                 type: 'bar',
    //                 color: colors[2],
    //                 yAxis: 0,
    //             }].filter(Boolean)
    //         ) : (
    //             [{
    //                 name: 'Unknown Impressions',
    //                 data: Array.from({ length: userSlotTypeImpressionsGraph?.labels?.length }).fill(0),
    //                 type: 'bar',
    //                 color: colors[4],
    //                 yAxis: 0,
    //             }].filter(Boolean)
    //         )),
    //     });
    // }, [userSlotTypeImpressionsGraph, gender]);

    // useEffect(() => {
    //     if (!userSlotTypeImpressionsGraph) return;

    //     setSlotTypeImpressionsGraphData({
    //         options: {
    //             ...chartOptions,
    //             dataLabels: { enabled: false },
    //             markers: {
    //                 size: 4,
    //                 colors: undefined,
    //                 strokeColors: '#fff',
    //                 strokeWidth: 0,
    //                 strokeOpacity: 0.9,
    //                 strokeDashArray: 0,
    //                 fillOpacity: 1,
    //                 discrete: [],
    //                 shape: "circle",
    //                 radius: 2,
    //                 offsetX: 0,
    //                 offsetY: 0,
    //                 onClick: undefined,
    //                 onDblClick: undefined,
    //                 showNullDataPoints: true,
    //                 hover: {
    //                     size: undefined,
    //                     sizeOffset: 3
    //                 }
    //             },
    //             stroke: {
    //                 show: true,
    //                 width: 3,
    //                 colors: ['transparent']
    //             },
    //             plotOptions: { bar: { columnWidth: "20px" } },
    //             xaxis: {
    //                 title: { text: 'Slot Type' },
    //                 categories: userSlotTypeImpressionsGraph?.labels,
    //                 labels: { rotate: -45 },
    //             },
    //             yaxis: [{
    //                 title: {
    //                     text: 'Impressions',
    //                     axisTicks: { show: true },
    //                     axisBorder: { show: false, },
    //                 },

    //             }],
    //         },

    //         series: (gender === 'all' ? (
    //             [
    //                 {
    //                     name: 'Impressions',
    //                     data: userSlotTypeImpressionsGraph?.series?.impressionsGraph?.data,
    //                     type: 'bar',
    //                     color: colors[0],
    //                     yAxis: 0,
    //                 },
    //                 {
    //                     name: 'Male Impressions',
    //                     data: userSlotTypeImpressionsGraph?.series?.maleImpressionsGraph?.data,
    //                     type: 'line',
    //                     color: colors[10],
    //                     yAxis: 0,
    //                 },
    //                 {
    //                     name: 'Female Impressions',
    //                     data: userSlotTypeImpressionsGraph?.series?.femaleImpressionsGraph?.data,
    //                     type: 'line',
    //                     color: colors[10],
    //                     yAxis: 0,
    //                 },
    //             ].filter(Boolean)
    //         ) : gender === 'male' ? (
    //             [{
    //                 name: 'Male Impressions',
    //                 data: userSlotTypeImpressionsGraph?.series?.maleImpressionsGraph?.data,
    //                 type: 'bar',
    //                 color: colors[1],
    //                 yAxis: 0,
    //             }].filter(Boolean)
    //         ) : gender === 'female' ? (
    //             [{
    //                 name: 'Female Impressions',
    //                 data: userSlotTypeImpressionsGraph?.series?.femaleImpressionsGraph?.data,
    //                 type: 'bar',
    //                 color: colors[2],
    //                 yAxis: 0,
    //             }].filter(Boolean)
    //         ) : (
    //             [{
    //                 name: 'Unknown Impressions',
    //                 data: Array.from({ length: userSlotTypeImpressionsGraph?.labels?.length }).fill(0),
    //                 type: 'bar',
    //                 color: colors[4],
    //                 yAxis: 0,
    //             }].filter(Boolean)
    //         )),
    //     });
    // }, [userSlotTypeImpressionsGraph, gender]);

    // useEffect(() => {
    //     if (!userBannerIdAmountGraph) return;

    //     setBannerIdAmountGraphData({
    //         options: {
    //             ...chartOptions,
    //             dataLabels: { enabled: false },
    //             markers: {
    //                 size: 4,
    //                 colors: undefined,
    //                 strokeColors: '#fff',
    //                 strokeWidth: 0,
    //                 strokeOpacity: 0.9,
    //                 strokeDashArray: 0,
    //                 fillOpacity: 1,
    //                 discrete: [],
    //                 shape: "circle",
    //                 radius: 2,
    //                 offsetX: 0,
    //                 offsetY: 0,
    //                 onClick: undefined,
    //                 onDblClick: undefined,
    //                 showNullDataPoints: true,
    //                 hover: {
    //                     size: undefined,
    //                     sizeOffset: 3
    //                 }
    //             },
    //             stroke: {
    //                 show: true,
    //                 width: 3,
    //                 colors: ['transparent']
    //             },
    //             plotOptions: { bar: { columnWidth: "20px" } },
    //             xaxis: {
    //                 title: { text: 'Advertisement Name', offsetY: -10, offsetX: 0, },
    //                 categories: userBannerIdAmountGraph?.labels,
    //                 labels: { rotate: -45 },
    //             },
    //             yaxis: [{
    //                 title: {
    //                     text: 'Amount',
    //                     axisTicks: { show: true },
    //                     axisBorder: { show: false, },
    //                 },

    //             }],
    //         },

    //         series: [{
    //             name: 'Amount',
    //             data: userBannerIdAmountGraph?.series?.data,
    //             type: 'bar',
    //             color: colors[3],
    //             yAxis: 0,
    //         }],
    //     });
    // }, [userBannerIdAmountGraph]);

    // useEffect(() => {
    //     if (!userSlotTypeAmountGraph) return;

    //     setSlotTypeAmountGraphData({
    //         options: {
    //             ...chartOptions,
    //             dataLabels: { enabled: false },
    //             markers: {
    //                 size: 4,
    //                 colors: undefined,
    //                 strokeColors: '#fff',
    //                 strokeWidth: 0,
    //                 strokeOpacity: 0.9,
    //                 strokeDashArray: 0,
    //                 fillOpacity: 1,
    //                 discrete: [],
    //                 shape: "circle",
    //                 radius: 2,
    //                 offsetX: 0,
    //                 offsetY: 0,
    //                 onClick: undefined,
    //                 onDblClick: undefined,
    //                 showNullDataPoints: true,
    //                 hover: {
    //                     size: undefined,
    //                     sizeOffset: 3
    //                 }
    //             },
    //             stroke: {
    //                 show: true,
    //                 width: 3,
    //                 colors: ['transparent']
    //             },
    //             plotOptions: { bar: { columnWidth: "20px" } },
    //             xaxis: {
    //                 title: { text: 'Slot Type' },
    //                 categories: userSlotTypeAmountGraph?.labels,
    //                 labels: { rotate: -45 },
    //             },
    //             yaxis: [{
    //                 title: {
    //                     text: 'Amount',
    //                     axisTicks: { show: true },
    //                     axisBorder: { show: false, },
    //                 },

    //             }],
    //         },

    //         series: [{
    //             name: 'Amount',
    //             data: userSlotTypeAmountGraph?.series?.data,
    //             type: 'bar',
    //             color: colors[3],
    //             yAxis: 0,
    //         }],
    //     });
    // }, [userSlotTypeAmountGraph]);

    const applyFilters = () => {
        if (!fromDate || !toDate) {
            toast.error(`Please select both "From" and "To" dates`);
            return;
        }

        if (fromDate > toDate) {
            toast.error(`"From" date should be earlier than "To" date`);
            return;
        }

        // if (!location) {
        //     toast.error('Please select location');
        //     return;
        // }

        setIsLoader(true);
        dispatch(getUserBannersGraph({ startDate: fromDate, endDate: toDate, location }));
        dispatch(getUserDashboard({ startDate: fromDate, endDate: toDate, campaigns }));
    };

    return (
        <div className='content'>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className='top-heading-area home-header'>
                    <h3>Dashboard</h3>
                </div>
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
                        {/* <div className='group-form'>
                            <label htmlFor='campaigns'>Campaigns:</label>
                            <Select
                                id='campaigns'
                                value={campaigns}
                                onChange={(event) => setCampaigns(event.target.value)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="all"><em>All</em></MenuItem>
                                {runCampaigns && runCampaigns.map((campaign, index) => (
                                    <MenuItem key={index} value={`${campaign.id}`}>{campaign.campaignName}</MenuItem>
                                ))}
                            </Select>
                        </div> */}
                        {/* <div className='group-form'>
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
                        </div> */}
                        <div className='group-form btn-group'>
                            <button className='btn-style-one' onClick={() => applyFilters()}>
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12'>
                        <div className='chart-area item-chart adv-chart-item'>
                            {Object.keys(scorecardData).length > 0 ? (
                                <div className='chart-detail'>
                                    <div className='heading-area top-main-chart'>
                                        <h2>Custom Scorecard</h2>
                                        <h2 className='price-area'><span>Cost</span>$ {scorecardData.scorecardData?.cost}</h2>
                                        <h2 className='price-area'><span>Interactions</span>{scorecardData.scorecardData?.interactions}</h2>
                                        <h2 className='price-area'><span>Interaction rate</span>{scorecardData.scorecardData?.interactionRate}%</h2>
                                        <h2 className='price-area'><span>Impr.</span>{scorecardData.scorecardData?.impressions}</h2>
                                    </div>
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
                                        <ReactApexChart options={scorecardData.options} series={scorecardData.series} height={300} />
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
                            {Object.keys(dailyCostByOsGraphData).length > 0 ? (
                                <div className='chart-detail'>
                                    <div className='heading-area'>
                                        <h2>Daily Cost by OS</h2>
                                    </div>
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
                                        <ReactApexChart options={dailyCostByOsGraphData.options} series={dailyCostByOsGraphData.series} height={300} />
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
                            {Object.keys(dailyCostByDeviceGraphData).length > 0 ? (
                                <div className='chart-detail'>
                                    <div className='heading-area'>
                                        <h2>Daily Cost by Device</h2>
                                    </div>
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
                                        <ReactApexChart options={dailyCostByDeviceGraphData.options} series={dailyCostByDeviceGraphData.series} height={300} />
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
                            {Object.keys(interactionRateAndCostByOsGraphData).length > 0 ? (
                                <div className='chart-detail'>
                                    <div className='heading-area'>
                                        <h2>Interaction Rate and Cost by OS</h2>
                                    </div>
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
                                        <ReactApexChart options={interactionRateAndCostByOsGraphData.options} series={interactionRateAndCostByOsGraphData.series} height={300} />
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
                            {Object.keys(interactionsByOsGraphData).length > 0 ? (
                                <div className='chart-detail'>
                                    <div className='heading-area'>
                                        <h2>Interactions by OS</h2>
                                    </div>
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
                                        <ReactApexChart options={interactionsByOsGraphData.options} series={interactionsByOsGraphData.series} height={350} type='donut' />
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
                            {Object.keys(interactionRateAndCostByDeviceGraphData).length > 0 ? (
                                <div className='chart-detail'>
                                    <div className='heading-area'>
                                        <h2>Interaction Rate and Cost by Device</h2>
                                    </div>
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
                                        <ReactApexChart options={interactionRateAndCostByDeviceGraphData.options} series={interactionRateAndCostByDeviceGraphData.series} height={300} />
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
                            {Object.keys(interactionsByDeviceGraphData).length > 0 ? (
                                <div className='chart-detail'>
                                    <div className='heading-area'>
                                        <h2>Interactions by Device</h2>
                                    </div>
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
                                        <ReactApexChart options={interactionsByDeviceGraphData.options} series={interactionsByDeviceGraphData.series} height={350} type='donut' />
                                    )}
                                </div>
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '42vh' }}>
                                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12'>
                        <div className='chart-area item-chart adv-chart-item'>
                            <div className='chart-detail table-data'>
                                <div className='heading-area'>
                                    <h2>Campaign Performance by Device</h2>
                                </div>
                                <TableContainer>
                                    <Table
                                        sx={{ minWidth: 500 }}
                                        aria-labelledby='tableTitle'
                                        size={'small'}
                                    >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Campaign</TableCell>
                                                <TableCell>Android</TableCell>
                                                <TableCell>VR</TableCell>
                                                <TableCell>Oculus</TableCell>
                                                <TableCell>Samsung</TableCell>
                                                <TableCell>Oppo</TableCell>
                                                <TableCell>Xiaomi</TableCell>
                                                <TableCell>Vivo</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {campaignPerformanceTable && campaignPerformanceTable.map(campaign => (
                                                <TableRow key={campaign.id}>
                                                    <TableCell>{campaign.campaignName}</TableCell>
                                                    <TableCell>{campaign.android}</TableCell>
                                                    <TableCell>{campaign.vr}</TableCell>
                                                    <TableCell>{campaign.oculus}</TableCell>
                                                    <TableCell>{campaign.samsung}</TableCell>
                                                    <TableCell>{campaign.oppo}</TableCell>
                                                    <TableCell>{campaign.xiaomi}</TableCell>
                                                    <TableCell>{campaign.vivo}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* <div className='chart-container combined-chart demographics-page stats-chart-page'>
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
            </div> */}


        </div>
    )
};

export default Dashboard;