import ReactApexChart from 'react-apexcharts';
import CircleIcon from '@mui/icons-material/Circle';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect, useMemo } from 'react';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-tabs/style/react-tabs.css';

import './index.css';
import {
    getSalesByGenderGraph,
    getSalesByByAgeGroupGraph,
    getSalesByAreaGraph,
    getTopItemsPurchaseByGenderGraph,
    getTopCategoriesPurchaseByGenderGraph,
} from '../../store/actions/Product'

const colors = ["#0074D9", "#2ECC40", "#FF4136", "#B10DC9", "#FF851B", "#39CCCC", "#FFDC00", "#F012BE", "#AAAAAA", "#00000000", "#ffffff00"];

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
}

const Demographics = () => {
    const todayDate = new Date();
    const priorDate = new Date(new Date().setDate(todayDate.getDate() - 30));

    const dispatch = useDispatch();

    const { salesByGenderGraph, salesByAgeGroupGraph, salesByAreaGraph, topItemsPurchaseByGenderGraph, topCategoriesPurchaseByGenderGraph } = useSelector(st => st.Product);

    const [salesByGenderLoader, setSalesByGenderLoader] = useState(false);
    const [showSalesByGenderOrdersGraph, setShowSalesByGenderOrdersGraph] = useState(true);
    const [showSalesByGenderEarningsGraph, setShowSalesByGenderEarningsGraph] = useState(true);
    const [salesByGenderFromDate, setSalesByGenderFromDate] = useState(priorDate);
    const [salesByGenderToDate, setSalesByGenderToDate] = useState(todayDate);
    const [salesByGenderGraphData, setSalesByGenderGraphData] = useState();

    const [salesByAgeGroupLoader, setSalesByAgeGroupLoader] = useState(false);
    const [showSalesByAgeGroupOrdersGraph, setShowSalesByAgeGroupOrdersGraph] = useState(true);
    const [showSalesByAgeGroupEarningsGraph, setShowSalesByAgeGroupEarningsGraph] = useState(true);
    const [salesByAgeGroupFromDate, setSalesByAgeGroupFromDate] = useState(priorDate);
    const [salesByAgeGroupToDate, setSalesByAgeGroupToDate] = useState(todayDate);
    const [salesByAgeGroupGraphData, setSalesByAgeGroupGraphData] = useState();

    const [topItemsPurchaseByGenderLoader, setTopItemsPurchaseByGenderLoader] = useState(false);
    const [topItemsPurchaseByGenderFromDate, setTopItemsPurchaseByGenderFromDate] = useState(priorDate);
    const [topItemsPurchaseByGenderToDate, setTopItemsPurchaseByGenderToDate] = useState(todayDate);
    const [topItemsPurchaseByGenderGraphData, setTopItemsPurchaseByGenderGraphData] = useState();
    const [showAllTopItemsPurchaseByGenderGraphs, setShowAllTopItemsPurchaseByGenderGraphs] = useState(true);

    const [topCategoriesPurchaseByGenderLoader, setTopCategoriesPurchaseByGenderLoader] = useState(false);
    const [topCategoriesPurchaseByGenderFromDate, setTopCategoriesPurchaseByGenderFromDate] = useState(priorDate);
    const [topCategoriesPurchaseByGenderToDate, setTopCategoriesPurchaseByGenderToDate] = useState(todayDate);
    const [topCategoriesPurchaseByGenderGraphData, setTopCategoriesPurchaseByGenderGraphData] = useState();
    const [showAllTopCategoriesPurchaseByGenderGraphs, setShowAllTopCategoriesPurchaseByGenderGraphs] = useState(true);

    const [salesByAreaLoader, setSalesByAreaLoader] = useState(false);
    const [showSalesByAreaOrdersGraph, setShowSalesByAreaOrdersGraph] = useState(true);
    const [showSalesByAreaEarningsGraph, setShowSalesByAreaEarningsGraph] = useState(true);
    const [salesByAreaFromDate, setSalesByAreaFromDate] = useState(priorDate);
    const [salesByAreaToDate, setSalesByAreaToDate] = useState(todayDate);
    const [salesByAreaNumber, setSalesByAreaNumber] = useState(4);
    const [salesByAreaGraphData, setSalesByAreaGraphData] = useState();

    useEffect(() => {
        dispatch(getSalesByGenderGraph());
        dispatch(getSalesByByAgeGroupGraph());
        dispatch(getSalesByAreaGraph({ number: salesByAreaNumber }));
        dispatch(getTopItemsPurchaseByGenderGraph());
        dispatch(getTopCategoriesPurchaseByGenderGraph());
    }, []);

    useEffect(() => {
        setSalesByGenderLoader(false);
    }, [salesByGenderGraph]);

    useEffect(() => {
        setSalesByAgeGroupLoader(false);
    }, [salesByAgeGroupGraph]);

    useEffect(() => {
        setTopItemsPurchaseByGenderLoader(false);
    }, [topItemsPurchaseByGenderGraph]);

    useEffect(() => {
        setTopCategoriesPurchaseByGenderLoader(false);
    }, [topCategoriesPurchaseByGenderGraph]);

    useEffect(() => {
        setSalesByAreaLoader(false);
    }, [salesByAreaGraph]);

    useEffect(() => {
        if (!salesByGenderGraph) return;

        setSalesByGenderGraphData({
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
                plotOptions: {
                    bar: {
                        columnWidth: "20px"
                    }
                },
                xaxis: {
                    categories: ['Males', 'Females'],
                    labels: {
                        rotate: -45
                    },
                },
                yaxis: [{
                    title: {
                        text: 'Orders',
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
                        text: 'Sales'
                    }
                }],
            },

            series: [
                showSalesByGenderOrdersGraph && {
                    name: 'Orders',
                    data: [salesByGenderGraph.graph.male.totalOrders, salesByGenderGraph.graph.female.totalOrders],
                    type: 'bar',
                    color: "#ffa500",
                    yAxis: 0,
                },
                showSalesByGenderEarningsGraph && {
                    name: 'Sales',
                    data: [salesByGenderGraph.graph.male.subTotal, salesByGenderGraph.graph.female.subTotal],
                    type: 'bar',
                    color: "#7cb5ec",
                    yAxis: 0,
                },
            ].filter(Boolean)
        });
    }, [salesByGenderGraph, showSalesByGenderOrdersGraph, showSalesByGenderEarningsGraph]);

    useEffect(() => {
        if (!salesByAgeGroupGraph) return;

        setSalesByAgeGroupGraphData({
            options: {
                ...chartOptions,
                xaxis: { categories: salesByAgeGroupGraph.graph.TotalOrders.labels },
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
                plotOptions: {
                    bar: {
                        columnWidth: "20px"
                    }
                },
                yaxis: [{
                    title: {
                        text: 'Orders',
                        axisTicks: {
                            show: true
                        },
                        axisBorder: {
                            show: false,
                        },
                    },
                    labels: {
                        rotate: -45
                    },

                }, {
                    opposite: true,
                    title: {
                        text: 'Sales'
                    }
                }]
            },

            series: [
                showSalesByAgeGroupOrdersGraph && {
                    name: 'Orders',
                    data: salesByAgeGroupGraph.graph.TotalOrders.data,
                    type: 'bar',
                    color: "#ffa500"
                },
                showSalesByAgeGroupEarningsGraph && {
                    name: 'Sales',
                    data: salesByAgeGroupGraph.graph.Earnings.data,
                    type: 'bar',
                    color: "#7cb5ec"
                },
            ].filter(Boolean)
        });
    }, [salesByAgeGroupGraph, showSalesByAgeGroupOrdersGraph, showSalesByAgeGroupEarningsGraph]);

    useEffect(() => {
        if (!topItemsPurchaseByGenderGraph) return;

        setTopItemsPurchaseByGenderGraphData({
            options: {
                chart: {
                    type: 'bar',
                    stacked: true,
                    stackType: '100%'
                },
                dataLabels: {
                    enabled: false,
                    enabledOnSeries: [0]
                },
                plotOptions: {
                    dataLabels: {
                        enabled: false,
                        enabledOnSeries: [0]
                    },
                    bar: {
                        horizontal: true,
                        barHeight: '20px',
                    },
                },
                stroke: {
                    width: 1,
                },
                xaxis: {
                    categories: ['Male', 'Female'],
                    labels: {
                        rotate: -45
                    },
                },
                tooltip: {
                    enabled: showAllTopItemsPurchaseByGenderGraphs,
                    y: {
                        formatter: function (val) {
                            return val
                        }
                    }
                },
                fill: {
                    opacity: 1

                },
                legend: {
                    position: 'bottom',
                    horizontalAlign: 'left',
                    offsetX: 40
                }
            },

            series: Object.keys(topItemsPurchaseByGenderGraph.graph).map((key) => ({
                name: key,
                data: topItemsPurchaseByGenderGraph.graph[key].data,
                color: showAllTopItemsPurchaseByGenderGraphs ? topItemsPurchaseByGenderGraph.graph[key].color : '#00000000'
            }))
        });
    }, [topItemsPurchaseByGenderGraph, showAllTopItemsPurchaseByGenderGraphs]);

    useEffect(() => {
        if (!topCategoriesPurchaseByGenderGraph) return;

        setTopCategoriesPurchaseByGenderGraphData({
            options: {
                chart: {
                    type: 'bar',
                    height: 20,
                    stacked: true,
                    stackType: '100%'
                },
                dataLabels: {
                    enabled: false,
                    enabledOnSeries: [0]
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        barHeight: '20px',
                    },
                },
                stroke: {
                    width: 1,
                },
                xaxis: {
                    categories: ['Male', 'Female'],
                    labels: {
                        rotate: -45
                    },
                },
                tooltip: {
                    enabled: showAllTopCategoriesPurchaseByGenderGraphs,
                    y: {
                        formatter: function (val) {
                            return val
                        }
                    }
                },
                fill: {
                    opacity: 1

                },
                legend: {
                    position: 'bottom',
                    horizontalAlign: 'left',
                    offsetX: 40
                }
            },
            
            series: Object.keys(topCategoriesPurchaseByGenderGraph.graph).map((key) => ({
                name: key,
                data: topCategoriesPurchaseByGenderGraph.graph[key].data,
                color: showAllTopCategoriesPurchaseByGenderGraphs ? topCategoriesPurchaseByGenderGraph.graph[key].color : '#00000000'
            }))
        });
    }, [topCategoriesPurchaseByGenderGraph, showAllTopCategoriesPurchaseByGenderGraphs]);

    useEffect(() => {
        if (!salesByAreaGraph) return;

        setSalesByAreaGraphData({
            options: {
                ...chartOptions,
                xaxis: { categories: salesByAreaGraph.graph.TotalOrders.labels },
                stroke: {
                    show: true,
                    width: 3,
                    colors: ['transparent']
                },
                plotOptions: {
                    bar: {
                        columnWidth: "20px"
                    }
                },
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
                yaxis: [{
                    title: {
                        text: 'Orders',
                        axisTicks: {
                            show: true
                        },
                        axisBorder: {
                            show: false,
                        },
                    },
                    labels: {
                        rotate: -45
                    },

                }, {
                    opposite: true,
                    title: {
                        text: 'Sales'
                    }
                }]
            },

            series: [
                showSalesByAreaOrdersGraph && {
                    name: 'Orders',
                    data: salesByAreaGraph.graph.TotalOrders.data,
                    type: 'bar',
                    color: "#ffa500"
                },
                showSalesByAreaEarningsGraph && {
                    name: 'Sales',
                    data: salesByAreaGraph.graph.Earnings.data,
                    type: 'bar',
                    color: "#7cb5ec"
                },
            ].filter(Boolean)
        });
    }, [salesByAreaGraph, showSalesByAreaOrdersGraph, showSalesByAreaEarningsGraph]);

    const applySalesByGenderFilters = () => {
        if (!salesByGenderFromDate || !salesByGenderToDate) {
            alert('Please select both "From" and "To" dates.');
            return;
        }

        if (salesByGenderFromDate > salesByGenderToDate) {
            alert('"From" date should be earlier than "To" date.');
            return;
        }

        setSalesByGenderLoader(true);
        dispatch(getSalesByGenderGraph({ fromDate: salesByGenderFromDate, toDate: salesByGenderToDate }));
    };

    const applySalesByAgeGroupFilters = () => {
        if (!salesByAgeGroupFromDate || !salesByAgeGroupToDate) {
            alert('Please select both "From" and "To" dates.');
            return;
        }

        if (salesByAgeGroupFromDate > salesByAgeGroupToDate) {
            alert('"From" date should be earlier than "To" date.');
            return;
        }

        setSalesByAgeGroupLoader(true);
        dispatch(getSalesByByAgeGroupGraph({ fromDate: salesByAgeGroupFromDate, toDate: salesByAgeGroupToDate }));
    };

    const applySalesByAreaFilters = () => {
        if (!salesByAreaFromDate || !salesByAreaToDate) {
            alert('Please select both "From" and "To" dates.');
            return;
        }

        if (salesByAreaFromDate > salesByAreaToDate) {
            alert('"From" date should be earlier than "To" date.');
            return;
        }

        setSalesByAreaLoader(true);
        dispatch(getSalesByAreaGraph({ number: salesByAreaNumber, fromDate: salesByAreaFromDate, toDate: salesByAreaToDate }));
    };

    const applyTopItemsPurchasedByGenderFilters = () => {
        if (!topItemsPurchaseByGenderFromDate || !topItemsPurchaseByGenderToDate) {
            alert('Please select both "From" and "To" dates.');
            return;
        }

        if (topItemsPurchaseByGenderFromDate > topItemsPurchaseByGenderToDate) {
            alert('"From" date should be earlier than "To" date.');
            return;
        }

        setTopItemsPurchaseByGenderLoader(true);
        dispatch(getTopItemsPurchaseByGenderGraph({ fromDate: topItemsPurchaseByGenderFromDate, toDate: topItemsPurchaseByGenderToDate }));
    };

    const applyTopCategoriesPurchasedByGenderFilters = () => {
        if (!topCategoriesPurchaseByGenderFromDate || !topCategoriesPurchaseByGenderToDate) {
            alert('Please select both "From" and "To" dates.');
            return;
        }

        if (topCategoriesPurchaseByGenderFromDate > topCategoriesPurchaseByGenderToDate) {
            alert('"From" date should be earlier than "To" date.');
            return;
        }

        setTopCategoriesPurchaseByGenderLoader(true);
        dispatch(getTopCategoriesPurchaseByGenderGraph({ fromDate: topCategoriesPurchaseByGenderFromDate, toDate: topCategoriesPurchaseByGenderToDate }));
    };

    return (
        <>
            <div className='content'>
                <div className='top-heading-area home-header'>
                    <h3>Demographics</h3>
                </div>

                <div className='chart-container combined-chart demographics-page'>
                    <Tabs>
                        <TabList>
                            <Tab>Gender</Tab>
                            <Tab>Age</Tab>
                        </TabList>

                        <TabPanel>
                            <div className='row'>
                                <div className='col-lg-6 col-md-12 col-sm-12'>
                                    <div className='chart-area item-chart'>
                                        <div className='value-title'>
                                            <h1 className='heading'>Sales By Gender</h1>
                                            <div className='group-form'>
                                                <button className='btn-style-one' onClick={() => applySalesByGenderFilters()}>
                                                    Apply
                                                </button>
                                            </div>
                                        </div>
                                        <div className='chart-title'>
                                            <div className='group-form'>
                                                <label>From: </label>
                                                <DatePicker
                                                    selected={salesByGenderFromDate}
                                                    onChange={date => setSalesByGenderFromDate(date)}
                                                    dateFormat="dd-MM-yyyy"
                                                />
                                            </div>
                                            <div className='group-form'>
                                                <label>To: </label>
                                                <DatePicker
                                                    selected={salesByGenderToDate}
                                                    onChange={date => setSalesByGenderToDate(date)}
                                                    dateFormat="dd-MM-yyyy"
                                                />
                                            </div>
                                        </div>
                                        {salesByGenderGraphData ?
                                            <div>
                                                <div>
                                                    <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                                        <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                                                        </FormGroup>
                                                    </FormControl>
                                                </div>
                                                {salesByGenderLoader ? (
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
                                                        <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <ReactApexChart options={salesByGenderGraphData.options} series={salesByGenderGraphData.series} height={300} />
                                                        <div className='bottom-sales-area text-center'>
                                                            <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                                                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                                                                    <FormControlLabel
                                                                        className='sales-icon-chart'
                                                                        control={
                                                                            <Checkbox
                                                                                sx={{
                                                                                    color: "#7cb5ec",
                                                                                    '&.Mui-checked': {
                                                                                        color: "#7cb5ec",
                                                                                    },
                                                                                }}
                                                                                icon={<CircleIcon />}
                                                                                checkedIcon={<CircleIcon />}
                                                                                checked={showSalesByGenderEarningsGraph}
                                                                                onChange={() => setShowSalesByGenderEarningsGraph(!showSalesByGenderEarningsGraph)}
                                                                            />
                                                                        }
                                                                        label='Sales'
                                                                    />
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                sx={{
                                                                                    color: "#ffa500",
                                                                                    '&.Mui-checked': {
                                                                                        color: "#ffa500",
                                                                                    },
                                                                                }}
                                                                                icon={<CircleOutlinedIcon />}
                                                                                checkedIcon={<CircleIcon />}
                                                                                checked={showSalesByGenderOrdersGraph}
                                                                                onChange={() => setShowSalesByGenderOrdersGraph(!showSalesByGenderOrdersGraph)}
                                                                            />
                                                                        }
                                                                        label='Orders'
                                                                    />
                                                                </FormGroup>
                                                            </FormControl>
                                                        </div>
                                                    </>
                                                )
                                                }
                                            </div>
                                            : (
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '42vh' }}>
                                                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className='col-lg-6 col-md-12 col-sm-12'>
                                    <div className='chart-area item-chart'>
                                        <div className='value-title'>
                                            <h1 className='heading'>Sales By Age Group</h1>
                                            <div className='group-form'>
                                                <button className='btn-style-one' onClick={() => applySalesByAgeGroupFilters()}>
                                                    Apply
                                                </button>
                                            </div>
                                        </div>
                                        <div className='chart-title'>
                                            <div className='group-form'>
                                                <label>From: </label>
                                                <DatePicker
                                                    selected={salesByAgeGroupFromDate}
                                                    onChange={date => setSalesByAgeGroupFromDate(date)}
                                                    dateFormat="dd-MM-yyyy"
                                                />
                                            </div>
                                            <div className='group-form'>
                                                <label>To: </label>
                                                <DatePicker
                                                    selected={salesByAgeGroupToDate}
                                                    onChange={date => setSalesByAgeGroupToDate(date)}
                                                    dateFormat="dd-MM-yyyy"
                                                />
                                            </div>
                                        </div>
                                        {salesByAgeGroupGraphData ?
                                            <div>
                                                <div>
                                                    <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                                        <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                                                        </FormGroup>
                                                    </FormControl>
                                                </div>
                                                {salesByAgeGroupLoader ? (
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
                                                        <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <ReactApexChart options={salesByAgeGroupGraphData.options} series={salesByAgeGroupGraphData.series} height={300} />
                                                        <div className='bottom-sales-area text-center'>
                                                            <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                                                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                                                                    <FormControlLabel
                                                                        className='sales-icon-chart'
                                                                        control={
                                                                            <Checkbox
                                                                                sx={{
                                                                                    color: "#7cb5ec",
                                                                                    '&.Mui-checked': {
                                                                                        color: "#7cb5ec",
                                                                                    },
                                                                                }}
                                                                                icon={<CircleIcon />}
                                                                                checkedIcon={<CircleIcon />}
                                                                                checked={showSalesByAgeGroupEarningsGraph}
                                                                                onChange={() => setShowSalesByAgeGroupEarningsGraph(!showSalesByAgeGroupEarningsGraph)}
                                                                            />
                                                                        }
                                                                        label='Sales'
                                                                    />
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                sx={{
                                                                                    color: "#ffa500",
                                                                                    '&.Mui-checked': {
                                                                                        color: "#ffa500",
                                                                                    },
                                                                                }}
                                                                                icon={<CircleOutlinedIcon />}
                                                                                checkedIcon={<CircleIcon />}
                                                                                checked={showSalesByAgeGroupOrdersGraph}
                                                                                onChange={() => setShowSalesByAgeGroupOrdersGraph(!showSalesByAgeGroupOrdersGraph)}
                                                                            />
                                                                        }
                                                                        label='Orders'
                                                                    />
                                                                </FormGroup>
                                                            </FormControl>
                                                        </div>
                                                    </>
                                                )
                                                }
                                            </div>
                                            : (
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '42vh' }}>
                                                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className='col-lg-12 col-md-12 col-sm-12'>
                                    <div className='chart-area'>
                                        <div className='chart-title'>
                                            <h1 className='heading'>Top Items Purchased by Gender</h1>
                                            <div className='group-form form-to-sales'>
                                                <div className='form-to'>
                                                    <label>From: </label>
                                                    <DatePicker
                                                        selected={topItemsPurchaseByGenderFromDate}
                                                        onChange={date => setTopItemsPurchaseByGenderFromDate(date)}
                                                        dateFormat="dd-MM-yyyy"
                                                    />
                                                </div>
                                                <div className='form-to'>
                                                    <label>To: </label>
                                                    <DatePicker
                                                        selected={topItemsPurchaseByGenderToDate}
                                                        onChange={date => setTopItemsPurchaseByGenderToDate(date)}
                                                        dateFormat="dd-MM-yyyy"
                                                    />
                                                </div>
                                                <button className='btn-style-one' onClick={() => applyTopItemsPurchasedByGenderFilters()}>
                                                    Apply
                                                </button>
                                            </div>
                                        </div>
                                        {topItemsPurchaseByGenderGraphData ?
                                            <div>
                                                <div>
                                                    <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                                        <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                                                        </FormGroup>
                                                    </FormControl>
                                                </div>
                                                {topItemsPurchaseByGenderLoader ? (
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
                                                        <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className='chart-box-gender chart-box-gender-legend'>
                                                            <ReactApexChart options={topItemsPurchaseByGenderGraphData.options} series={topItemsPurchaseByGenderGraphData.series} type='bar' height={230} />
                                                        </div>
                                                        <div className='bottom-sales-area chart-box-gender-sales text-center'>
                                                            <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                                                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                sx={{
                                                                                    color: "#808080",
                                                                                    '&.Mui-checked': {
                                                                                        color: "#808080",
                                                                                    },
                                                                                }}
                                                                                icon={<CircleOutlinedIcon />}
                                                                                checkedIcon={<CircleIcon />}
                                                                                checked={showAllTopItemsPurchaseByGenderGraphs}
                                                                                onChange={() => setShowAllTopItemsPurchaseByGenderGraphs(!showAllTopItemsPurchaseByGenderGraphs)}
                                                                            />
                                                                        }
                                                                        label='All'
                                                                    />
                                                                </FormGroup>
                                                            </FormControl>
                                                        </div>
                                                    </>
                                                )
                                                }
                                            </div>
                                            : (
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '42vh' }}>
                                                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className='col-lg-12 col-md-12 col-sm-12'>
                                    <div className='chart-area'>
                                        <div className='chart-title'>
                                            <h1 className='heading'>Top Categories Purchased by Gender</h1>
                                            <div className='group-form form-to-sales'>
                                                <div className='form-to'>
                                                    <label>From: </label>
                                                    <DatePicker
                                                        selected={topCategoriesPurchaseByGenderFromDate}
                                                        onChange={date => setTopCategoriesPurchaseByGenderFromDate(date)}
                                                        dateFormat="dd-MM-yyyy"
                                                    />
                                                </div>
                                                <div className='form-to'>
                                                    <label>To: </label>
                                                    <DatePicker
                                                        selected={topCategoriesPurchaseByGenderToDate}
                                                        onChange={date => setTopCategoriesPurchaseByGenderToDate(date)}
                                                        dateFormat="dd-MM-yyyy"
                                                    />
                                                </div>
                                                <button className='btn-style-one' onClick={() => applyTopCategoriesPurchasedByGenderFilters()}>
                                                    Apply
                                                </button>
                                            </div>
                                        </div>
                                        {topCategoriesPurchaseByGenderGraphData ?
                                            <div>
                                                <div>
                                                    <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                                        <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                                                        </FormGroup>
                                                    </FormControl>
                                                </div>
                                                {topCategoriesPurchaseByGenderLoader ? (
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
                                                        <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className='chart-box-gender chart-box-gender-legend'>
                                                            <ReactApexChart options={topCategoriesPurchaseByGenderGraphData.options} series={topCategoriesPurchaseByGenderGraphData.series} type='bar' height={230} />
                                                        </div>
                                                        <div className='bottom-sales-area chart-box-gender-sales-two text-center'>
                                                            <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                                                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                sx={{
                                                                                    color: "#808080",
                                                                                    '&.Mui-checked': {
                                                                                        color: "#808080",
                                                                                    },
                                                                                }}
                                                                                icon={<CircleOutlinedIcon />}
                                                                                checkedIcon={<CircleIcon />}
                                                                                checked={showAllTopCategoriesPurchaseByGenderGraphs}
                                                                                onChange={() => setShowAllTopCategoriesPurchaseByGenderGraphs(!showAllTopCategoriesPurchaseByGenderGraphs)}
                                                                            />
                                                                        }
                                                                        label='All'
                                                                    />
                                                                </FormGroup>
                                                            </FormControl>
                                                        </div>
                                                    </>
                                                )
                                                }
                                            </div>
                                            : (
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '42vh' }}>
                                                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className='col-lg-12 col-md-12 col-sm-12'>
                                    <div className='chart-area sales-by-area-chart'>
                                        <div className='chart-title'>
                                            <h1 className='heading'>Sales By Area</h1>
                                            <div className='group-form'>
                                                <label>From: </label>
                                                <DatePicker
                                                    selected={salesByAreaFromDate}
                                                    onChange={date => setSalesByAreaFromDate(date)}
                                                    dateFormat="dd-MM-yyyy"
                                                />
                                            </div>
                                            <div className='group-form'>
                                                <label>To: </label>
                                                <DatePicker
                                                    selected={salesByAreaToDate}
                                                    onChange={date => setSalesByAreaToDate(date)}
                                                    dateFormat="dd-MM-yyyy"
                                                />
                                            </div>
                                            <div className='group-form'>
                                                <label htmlFor='name'>No. of Areas:</label>
                                                <input
                                                    id='salesByAreaNumber'
                                                    name='salesByAreaNumber'
                                                    defaultValue={salesByAreaNumber}
                                                    onChange={(e) => setSalesByAreaNumber(e.target.value)} />
                                            </div>
                                            <div>
                                                <button className='btn-style-one' onClick={() => applySalesByAreaFilters()}>
                                                    Apply
                                                </button>
                                            </div>
                                        </div>
                                        {salesByAreaGraphData ?
                                            <div>
                                                <div>
                                                    <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                                        <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                                                        </FormGroup>
                                                    </FormControl>
                                                </div>
                                                {salesByAreaLoader ? (
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
                                                        <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <ReactApexChart options={salesByAreaGraphData.options} series={salesByAreaGraphData.series} height={300} />
                                                        <div className='bottom-sales-area text-center'>
                                                            <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                                                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>

                                                                    <FormControlLabel
                                                                        className='sales-icon-chart'
                                                                        control={
                                                                            <Checkbox
                                                                                sx={{
                                                                                    color: "#7cb5ec",
                                                                                    '&.Mui-checked': {
                                                                                        color: "#7cb5ec",
                                                                                    },
                                                                                }}
                                                                                icon={<CircleIcon />}
                                                                                checkedIcon={<CircleIcon />}
                                                                                checked={showSalesByAreaEarningsGraph}
                                                                                onChange={() => setShowSalesByAreaEarningsGraph(!showSalesByAreaEarningsGraph)}
                                                                            />
                                                                        }
                                                                        label='Sales'
                                                                    />
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                sx={{
                                                                                    color: "#ffa500",
                                                                                    '&.Mui-checked': {
                                                                                        color: "#ffa500",
                                                                                    },
                                                                                }}
                                                                                icon={<CircleOutlinedIcon />}
                                                                                checkedIcon={<CircleIcon />}
                                                                                checked={showSalesByAreaOrdersGraph}
                                                                                onChange={() => setShowSalesByAreaOrdersGraph(!showSalesByAreaOrdersGraph)}
                                                                            />
                                                                        }
                                                                        label='Orders'
                                                                    />
                                                                </FormGroup>
                                                            </FormControl>
                                                        </div>
                                                    </>
                                                )
                                                }
                                            </div>
                                            : (
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '42vh' }}>
                                                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </TabPanel>

                    </Tabs>
                </div>
            </div>

        </>
    );
};

export default Demographics;