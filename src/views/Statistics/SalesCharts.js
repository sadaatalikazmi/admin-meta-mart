import ReactApexChart from 'react-apexcharts';
import CircleIcon from '@mui/icons-material/Circle';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect, useMemo } from 'react';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-tabs/style/react-tabs.css';


import './index.css';
import {
  getValueVsOrderGraph,
  getValueSalesByMonthGraph,
  getSalesRegisteredByYearGraph,
  getSalesByHourOfTheDayGraph,
  getSalesByDayOfTheWeekGraph
} from '../../store/actions/Order';

const colors = [ "#0074D9", "#2ECC40", "#FF4136", "#B10DC9", "#FF851B", "#39CCCC", "#FFDC00", "#F012BE", "#AAAAAA", "#00000000", "#ffffff00"];

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

const SalesCharts = () => {
  const todayDate = new Date();
  const priorDate = new Date(new Date().setDate(todayDate.getDate() - 30));

  const dispatch = useDispatch();
  const {
    valueVsOrderGraph,
    valueSalesByMonthGraph,
    salesRegisteredByYearGraph,
    salesByHourOfTheDayGraph,
    salesByDayOfTheWeekGraph,
    countriesGraph
  } = useSelector(st => st.Orders);
  
  const [valueVsOrderLoader, setValueVsOrderLoader] = useState(false);
  const [showValueVsOrderOrdersGraph, setShowValueVsOrderOrdersGraph] = useState(true);
  const [showValueVsOrderEarningsGraph, setShowValueVsOrderEarningsGraph] = useState(true);
  const [valueVsOrderFromDate, setValueVsOrderFromDate] = useState(priorDate);
  const [valueVsOrderToDate, setValueVsOrderToDate] = useState(todayDate);
  const [valueVsOrderGraphData, setValueVsOrderGraphData] = useState();
  
  const [valueSalesByMonthLoader, setValueSalesByMonthLoader] = useState(false);
  const [showValueSalesByMonthOrdersGraph, setShowValueSalesByMonthOrdersGraph] = useState(true);
  const [showValueSalesByMonthEarningsGraph, setShowValueSalesByMonthEarningsGraph] = useState(true);
  const [valueSalesByMonthFromDate, setValueSalesByMonthFromDate] = useState(priorDate);
  const [valueSalesByMonthToDate, setValueSalesByMonthToDate] = useState(todayDate);
  const [valueSalesByMonthGraphData, setValueSalesByMonthGraphData] = useState();

  const [salesRegisteredByYearLoader, setSalesRegisteredByYearLoader] = useState(false);
  const [showSalesRegisteredByYearOrdersGraph, setShowSalesRegisteredByYearOrdersGraph] = useState(true);
  const [showSalesRegisteredByYearEarningsGraph, setShowSalesRegisteredByYearEarningsGraph] = useState(true);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2000 + 1 }, (_, index) => 2000 + index);
  const [salesRegisteredByYearFromYear, setSalesRegisteredByYearFromYear] = useState(currentYear);
  const [salesRegisteredByYearToYear, setSalesRegisteredByYearToYear] = useState(currentYear);
  const [salesRegisteredByYearFromDate, setSalesRegisteredByYearFromDate] = useState(new Date(new Date().setDate(todayDate.getDate() - 1)));
  const [salesRegisteredByYearToDate, setSalesRegisteredByYearToDate] = useState(todayDate);
  const [salesRegisteredByYearGraphData, setSalesRegisteredByYearGraphData] = useState();

  const [salesByHourOfTheDayLoader, setSalesByHourOfTheDayLoader] = useState(false);
  const [showSalesByHourOfTheDayOrdersGraph, setShowSalesByHourOfTheDayOrdersGraph] = useState(true);
  const [showSalesByHourOfTheDayEarningsGraph, setShowSalesByHourOfTheDayEarningsGraph] = useState(true);
  const [salesByHourOfTheDayFromDate, setSalesByHourOfTheDayFromDate] = useState(priorDate);
  const [salesByHourOfTheDayToDate, setSalesByHourOfTheDayToDate] = useState(todayDate);
  const [salesByHourOfTheDayGraphData, setSalesByHourOfTheDayGraphData] = useState();

  const [salesByDayOfTheWeekLoader, setSalesByDayOfTheWeekLoader] = useState(false);
  const [showSalesByDayOfTheWeekOrdersGraph, setShowSalesByDayOfTheWeekOrdersGraph] = useState(true);
  const [showSalesByDayOfTheWeekEarningsGraph, setShowSalesByDayOfTheWeekEarningsGraph] = useState(true);
  const [salesByDayOfTheWeekFromDate, setSalesByDayOfTheWeekFromDate] = useState(priorDate);
  const [salesByDayOfTheWeekToDate, setSalesByDayOfTheWeekToDate] = useState(todayDate);
  const [salesByDayOfTheWeekGraphData, setSalesByDayOfTheWeekGraphData] = useState();

  useEffect(() => {
    dispatch(getValueVsOrderGraph());
    dispatch(getValueSalesByMonthGraph());
    dispatch(getSalesRegisteredByYearGraph());
    dispatch(getSalesByHourOfTheDayGraph());
    dispatch(getSalesByDayOfTheWeekGraph());
  }, []);

  useEffect(() => {
    setValueVsOrderLoader(false)
  }, [valueVsOrderGraph]);

  useEffect(() => {
    setValueSalesByMonthLoader(false)
  }, [valueSalesByMonthGraph]);

  useEffect(() => {
    setSalesRegisteredByYearLoader(false)
  }, [salesRegisteredByYearGraph]);

  useEffect(() => {
    setSalesByHourOfTheDayLoader(false)
  }, [salesByHourOfTheDayGraph]);

  useEffect(() => {
    setSalesByDayOfTheWeekLoader(false)
  }, [salesByDayOfTheWeekGraph]);

  useEffect(() => {
    if (!valueVsOrderGraph) return;
    
    setValueVsOrderGraphData({
      options: {
        ...chartOptions,
        dataLabels: {
          enabled: false
        },
        stacked: false,
        xaxis: { 
          categories: valueVsOrderGraph.graph.labels,
          labels: {
            rotate: -45
          },
        },
        
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
          
        }, {
          opposite: true,
          title: {
            text: 'Sales'
          }
        }]
      },
      
      series: [
        showValueVsOrderOrdersGraph && {
          name: 'Orders',
          data: valueVsOrderGraph.graph.series[0].data,
          type: 'column',
          color: "#808080",
        },
        showValueVsOrderEarningsGraph && {
          name: 'Sales',
          data: valueVsOrderGraph.graph.series[1].data,
          type: 'line',
          color: "#7cb5ec",
        }
      ].filter(Boolean)
    });
  }, [valueVsOrderGraph, showValueVsOrderOrdersGraph, showValueVsOrderEarningsGraph]);

  useEffect(() => {
    if (!valueSalesByMonthGraph) return;
    
    setValueSalesByMonthGraphData({
      options: {
        ...chartOptions,
        xaxis: { categories: valueSalesByMonthGraph.graph.labels },
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
          curve: 'smooth',
          width: 2,
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
          }
        }, {
          opposite: true,
          title: {
            text: 'Sales'
          }
        }]
      },
      
      series: [
        showValueSalesByMonthOrdersGraph && {
          name: 'Orders',
          data: valueSalesByMonthGraph.graph.series[0].data,
          type: 'column',
          color:"#ffa500"
        },
        showValueSalesByMonthEarningsGraph && {
          name: 'Sales',
          data: valueSalesByMonthGraph.graph.series[1].data,
          type: 'line',
          color: "#7cb5ec"
        }
      ].filter(Boolean)
    });
  }, [valueSalesByMonthGraph, showValueSalesByMonthOrdersGraph, showValueSalesByMonthEarningsGraph]);

  useEffect(() => {
    if (!salesRegisteredByYearGraph) return;
    
    setSalesRegisteredByYearGraphData({
      options: {
        ...chartOptions,
        xaxis: { categories: salesRegisteredByYearGraph.graph.labels },
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
          curve: 'smooth',
          width: 2,
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
          }
        }, {
          opposite: true,
          title: {
            text: 'Sales'
          }
        }]
      },
      
      series: [
        showSalesRegisteredByYearOrdersGraph && {
          name: 'Orders',
          data: salesRegisteredByYearGraph.graph.series[0].data,
          type: 'column',
          color:"#ffa500"
        },
        showSalesRegisteredByYearEarningsGraph && {
          name: 'Sales',
          data: salesRegisteredByYearGraph.graph.series[1].data,
          type: 'line',
          color: "#7cb5ec"
        }
      ].filter(Boolean)
    });
  }, [salesRegisteredByYearGraph, showSalesRegisteredByYearOrdersGraph, showSalesRegisteredByYearEarningsGraph]);
  
  useEffect(() => {
    if (!salesByHourOfTheDayGraph) return;
    
    setSalesByHourOfTheDayGraphData({
      options: {
        ...chartOptions,
        dataLabels: { enabled: false },
        stroke: { width: 1 },
        xaxis: { categories: salesByHourOfTheDayGraph.graph.labels },
        stroke: {
          curve: 'smooth',
          width: 2,
        },
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
        plotOptions: {
          bar: {
            columnWidth: "20px"
          }
        },
        yaxis: [
          {
            title: {
              text: 'Orders',
              axisTicks: {
                show: true
              },
              axisBorder: {
                show: false,
              },
            }
          },
        ]
      },
      
      series: [
        showSalesByHourOfTheDayOrdersGraph && {
          name: 'Orders',
          data: salesByHourOfTheDayGraph.graph.series[0].data,
          color: "#008000"
        },
      ].filter(Boolean)
    });
  }, [salesByHourOfTheDayGraph, showSalesByHourOfTheDayOrdersGraph, showSalesByHourOfTheDayEarningsGraph]);
  
  useEffect(() => {
    if (!salesByDayOfTheWeekGraph) return;
    
    setSalesByDayOfTheWeekGraphData({
      options: {
        ...chartOptions,
        xaxis: { categories: salesByDayOfTheWeekGraph.graph.labels },
        dataLabels: { enabled: false },
        stroke: {
          curve: 'smooth',
          width: 2,
        },
        plotOptions: {
          bar: {
            columnWidth: "20px"
          }
        },
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
        yaxis: [
          {
            title: {
              text: 'Orders',
              axisTicks: {
                show: true
              },
              axisBorder: {
                show: false,
              },
            }
          },
        ]
      },
      
      series: [
        showSalesByDayOfTheWeekOrdersGraph && {
          name: 'Orders',
          data: salesByDayOfTheWeekGraph.graph.series[0].data,
          type: 'column',
          color: "#ffa500"
        },
      ].filter(Boolean)
    });
  }, [salesByDayOfTheWeekGraph, showSalesByDayOfTheWeekOrdersGraph, showSalesByDayOfTheWeekEarningsGraph]);

  const applyValueVsOrderFilters = () => {
    if (!valueVsOrderFromDate || !valueVsOrderToDate) {
      alert('Please select both "From" and "To" dates.');
      return;
    }
  
    if (valueVsOrderFromDate > valueVsOrderToDate) {
      alert('"From" date should be earlier than "To" date.');
      return;
    }

    setValueVsOrderLoader(true);
    dispatch(getValueVsOrderGraph({ fromDate: valueVsOrderFromDate, toDate: valueVsOrderToDate }));
  };

  const applyValueSalesByMonthFilters = () => {
    if (!valueSalesByMonthFromDate || !valueSalesByMonthToDate) {
      alert('Please select both "From" and "To" dates.');
      return;
    }
  
    if (valueSalesByMonthFromDate > valueSalesByMonthToDate) {
      alert('"From" date should be earlier than "To" date.');
      return;
    }

    setValueSalesByMonthLoader(true);
    dispatch(getValueSalesByMonthGraph({ fromDate: valueSalesByMonthFromDate, toDate: valueSalesByMonthToDate }));
  };

  const applySalesRegisteredByYearFilters = () => {
    if (!salesRegisteredByYearFromDate || !salesRegisteredByYearToDate) {
      alert('Please select both "From" and "To" years.');
      return;
    }
  
    if (salesRegisteredByYearFromDate > salesRegisteredByYearToDate) {
      alert('"From" year should be earlier than "To" year.');
      return;
    }

    setSalesRegisteredByYearLoader(true);
    dispatch(getSalesRegisteredByYearGraph({ fromDate: salesRegisteredByYearFromDate, toDate: salesRegisteredByYearToDate }));
  };

  const applySalesByHourOfTheDayFilters = () => {
    if (!salesByHourOfTheDayFromDate || !salesByHourOfTheDayToDate) {
      alert('Please select both "From" and "To" dates.');
      return;
    }
  
    if (salesByHourOfTheDayFromDate > salesByHourOfTheDayToDate) {
      alert('"From" date should be earlier than "To" date.');
      return;
    }

    setSalesByHourOfTheDayLoader(true);
    dispatch(getSalesByHourOfTheDayGraph({ fromDate: salesByHourOfTheDayFromDate, toDate: salesByHourOfTheDayToDate }));
  };

  const applySalesByDayOfTheWeekFilters = () => {
    if (!salesByDayOfTheWeekFromDate || !salesByDayOfTheWeekToDate) {
      alert('Please select both "From" and "To" dates.');
      return;
    }
  
    if (salesByDayOfTheWeekFromDate > salesByDayOfTheWeekToDate) {
      alert('"From" date should be earlier than "To" date.');
      return;
    }

    setSalesByDayOfTheWeekLoader(true);
    dispatch(getSalesByDayOfTheWeekGraph({ fromDate: salesByDayOfTheWeekFromDate, toDate: salesByDayOfTheWeekToDate }));
  };

  return (
    <>
    <div className='content'>
      {/* <div className='top-heading-area home-header'>
          <h3>Value Sales</h3>
        </div> */}
      <div className='chart-container combined-chart'>
        <Tabs>
          <TabList>
            <Tab>Value Sales</Tab>
            <Tab>Sales Breakdown</Tab>
          </TabList>
          
          <TabPanel>
            <div className='chart-area'>
              <div className='chart-title'>
                <h1 className='heading'>Value vs. Order</h1>
                <div className='group-form form-to-sales'>
                  <div className='form-to'>
                    <label>From: </label>
                    <DatePicker
                      selected={valueVsOrderFromDate}
                      onChange={date => setValueVsOrderFromDate(date)}
                      dateFormat="dd-MM-yyyy"
                      />
                  </div>
                  <div className='form-to'>
                    <label>To: </label>
                    <DatePicker
                      selected={valueVsOrderToDate}
                      onChange={date => setValueVsOrderToDate(date)}
                      dateFormat="dd-MM-yyyy"
                    />
                  </div>
                  <button className='btn-style-one' onClick={() => applyValueVsOrderFilters()}>
                    Apply
                  </button>
                </div>
              </div>
              {valueVsOrderGraphData ?
                <div>
                  <div>
                    <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                      <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                      </FormGroup>
                    </FormControl>
                  </div>
                  {valueVsOrderLoader ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
                        <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                      </div>
                    ) : (
                      <>
                        <ReactApexChart className="chart-height" options={valueVsOrderGraphData.options} series={valueVsOrderGraphData.series} type="line" height={300} />
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
                                      checked={showValueVsOrderEarningsGraph}
                                      onChange={() => setShowValueVsOrderEarningsGraph(!showValueVsOrderEarningsGraph)}
                                    />
                                  }
                                  label='Sales'
                                />
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
                                    checked={showValueVsOrderOrdersGraph}
                                    onChange={() => setShowValueVsOrderOrdersGraph(!showValueVsOrderOrdersGraph)}
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
          </TabPanel>
          <TabPanel>
            <div className='row'>
              <div className='col-lg-6 col-md-12 col-sm-12'>
                <div className='chart-area'>
                  <div className='chart-title' style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className='value-title'>
                      <h1 className='heading'>Value Sales by Month</h1>
                      <div className='group-form'>
                        <button className='btn-style-one' onClick={() => applyValueSalesByMonthFilters()}>
                          Apply
                        </button>
                      </div>
                    </div>
                    <div className='value-group'>
                      <div className='group-form'>
                        <label>From: </label>
                        <DatePicker
                          selected={valueSalesByMonthFromDate}
                          onChange={date => setValueSalesByMonthFromDate(date)}
                          dateFormat="dd-MM-yyyy"
                          />
                      </div>
                      <div className='group-form'>
                        <label>To: </label>
                        <DatePicker
                          selected={valueSalesByMonthToDate}
                          onChange={date => setValueSalesByMonthToDate(date)}
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>
                    </div>
                  </div>
                  {valueSalesByMonthGraphData ?
                    <div>
                      <div>
                        <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                          <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                          </FormGroup>
                        </FormControl>
                      </div>
                      {
                        valueSalesByMonthLoader ? (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
                            <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                          </div>
                        ) : (
                          <>
                            <div className='chart-box'>
                              <ReactApexChart className="chart-height" options={valueSalesByMonthGraphData.options} series={valueSalesByMonthGraphData.series} type="line" height={300} />
                            </div>
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
                                        checked={showValueSalesByMonthEarningsGraph}
                                        onChange={() => setShowValueSalesByMonthEarningsGraph(!showValueSalesByMonthEarningsGraph)}
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
                                        checked={showValueSalesByMonthOrdersGraph}
                                        onChange={() => setShowValueSalesByMonthOrdersGraph(!showValueSalesByMonthOrdersGraph)}
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
                <div className='chart-area'>
                  <div className='chart-title' style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className='value-title'>
                      <h1 className='heading'>Sales Registered by Year</h1>
                      <div className='group-form'>
                        <button className='btn-style-one' onClick={() => applySalesRegisteredByYearFilters()}>
                          Apply
                        </button>
                      </div>
                    </div>
                    <div className='value-group'>
                      <div className='group-form'>
                        <label htmlFor="fromYearPicker">From:</label>
                        <select
                          id="fromYearPicker"
                          value={salesRegisteredByYearFromYear}
                          onChange={(event) => {
                            setSalesRegisteredByYearFromYear(event.target.value);
                            setSalesRegisteredByYearFromDate(`${event.target.value}-01-01T00:00:00.000Z`);
                          }}
                        >
                          <option value="">Select</option>
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className='group-form'>
                        <label htmlFor="toYearPicker">To:</label>
                        <select
                          id="toYearPicker"
                          value={salesRegisteredByYearToYear}
                          onChange={(event) => {
                            setSalesRegisteredByYearToYear(event.target.value);
                            setSalesRegisteredByYearToDate(`${event.target.value}-12-31T00:00:00.000Z`);
                          }}
                        >
                          <option value="">Select</option>
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  {salesRegisteredByYearGraphData ?
                    <div>
                      <div>
                        <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                          <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                          </FormGroup>
                        </FormControl>
                      </div>
                      {
                        salesRegisteredByYearLoader ? (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
                            <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                          </div>
                        ) : (
                          <>
                            <ReactApexChart className="chart-height" options={salesRegisteredByYearGraphData.options} series={salesRegisteredByYearGraphData.series} height={300} />
                            <div className='bottom-sales-area text-center'>
                              <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                                <FormControlLabel
                                    className='sales-icon-chart'
                                    control={
                                      <Checkbox
                                        sx={{
                                          color: colors[1],
                                          '&.Mui-checked': {
                                            color: colors[1],
                                          },
                                        }}
                                        icon={<CircleIcon />}
                                        checkedIcon={<CircleIcon />}
                                        checked={showSalesRegisteredByYearEarningsGraph}
                                        onChange={() => setShowSalesRegisteredByYearEarningsGraph(!showSalesRegisteredByYearEarningsGraph)}
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
                                        checked={showSalesRegisteredByYearOrdersGraph}
                                        onChange={() => setShowSalesRegisteredByYearOrdersGraph(!showSalesRegisteredByYearOrdersGraph)}
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
                <div className='chart-area'>
                  <div className='chart-title' style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className='value-title'>
                      <h1 className='heading'>Sales by Hour of the Day</h1>
                      <div className='group-form'>
                        <button className='btn-style-one' onClick={() => applySalesByHourOfTheDayFilters()}>
                          Apply
                        </button>
                      </div>
                    </div>
                    <div className='value-group'>
                      <div className='group-form'>
                        <label>From: </label>
                        <DatePicker
                          selected={salesByHourOfTheDayFromDate}
                          onChange={date => setSalesByHourOfTheDayFromDate(date)}
                          dateFormat="dd-MM-yyyy"
                          />
                      </div>
                      <div className='group-form'>
                        <label>To: </label>
                        <DatePicker
                          selected={salesByHourOfTheDayToDate}
                          onChange={date => setSalesByHourOfTheDayToDate(date)}
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>
                    </div>
                  </div>
                  {salesByHourOfTheDayGraphData ?
                    <div>
                      <div>
                        <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                          <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                          </FormGroup>
                        </FormControl>
                      </div>
                      {
                        salesByHourOfTheDayLoader ? (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
                            <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                          </div>
                        ) : (
                          <>
                            <ReactApexChart className="chart-height" options={salesByHourOfTheDayGraphData.options} series={salesByHourOfTheDayGraphData.series} type='area' height={300} />
                            <div className='bottom-sales-area text-center'>
                              <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        sx={{
                                          color: "#008000",
                                          '&.Mui-checked': {
                                            color: "#008000",
                                          },
                                        }}
                                        icon={<CircleOutlinedIcon />}
                                        checkedIcon={<CircleIcon />}
                                        checked={showSalesByHourOfTheDayOrdersGraph}
                                        onChange={() => setShowSalesByHourOfTheDayOrdersGraph(!showSalesByHourOfTheDayOrdersGraph)}
                                      />
                                    }
                                    label='Orders'
                                  />
                                  {/* <FormControlLabel
                                    control={
                                      <Checkbox
                                        sx={{
                                          color: colors[1],
                                          '&.Mui-checked': {
                                            color: colors[1],
                                          },
                                        }}
                                        icon={<CircleOutlinedIcon />}
                                        checkedIcon={<CircleIcon />}
                                        checked={showSalesByHourOfTheDayEarningsGraph}
                                        onChange={() => setShowSalesByHourOfTheDayEarningsGraph(!showSalesByHourOfTheDayEarningsGraph)}
                                      />
                                    }
                                    label='Sales'
                                  /> */}
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
                <div className='chart-area'>
                  <div className='chart-title' style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className='value-title'>
                      <h1 className='heading'>Sales by Day of the Week</h1>
                      <div className='group-form'>
                        <button className='btn-style-one' onClick={() => applySalesByDayOfTheWeekFilters()}>
                          Apply
                        </button>
                      </div>
                    </div>
                    <div className='value-group'>
                      <div className='group-form'>
                        <label>From: </label>
                        <DatePicker
                          selected={salesByDayOfTheWeekFromDate}
                          onChange={date => setSalesByDayOfTheWeekFromDate(date)}
                          dateFormat="dd-MM-yyyy"
                          />
                      </div>
                      <div className='group-form'>
                        <label>To: </label>
                        <DatePicker
                          selected={salesByDayOfTheWeekToDate}
                          onChange={date => setSalesByDayOfTheWeekToDate(date)}
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>
                      </div>
                    </div>
                  {salesByDayOfTheWeekGraphData ?
                    <div>
                      <div>
                        <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                          <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                          </FormGroup>
                        </FormControl>
                      </div>
                      {
                        salesByDayOfTheWeekLoader ? (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
                            <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                          </div>
                        ) : (
                          <>
                            <ReactApexChart className="chart-height" options={salesByDayOfTheWeekGraphData.options} series={salesByDayOfTheWeekGraphData.series} height={300} />
                            <div className='bottom-sales-area text-center'>
                              <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
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
                                        checked={showSalesByDayOfTheWeekOrdersGraph}
                                        onChange={() => setShowSalesByDayOfTheWeekOrdersGraph(!showSalesByDayOfTheWeekOrdersGraph)}
                                      />
                                    }
                                    label='Orders'
                                  />
                                  {/* <FormControlLabel
                                    control={
                                      <Checkbox
                                        sx={{
                                          color: colors[1],
                                          '&.Mui-checked': {
                                            color: colors[1],
                                          },
                                        }}
                                        icon={<CircleOutlinedIcon />}
                                        checkedIcon={<CircleIcon />}
                                        checked={showSalesByDayOfTheWeekEarningsGraph}
                                        onChange={() => setShowSalesByDayOfTheWeekEarningsGraph(!showSalesByDayOfTheWeekEarningsGraph)}
                                      />
                                    }
                                    label='Sales'
                                  /> */}
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

export default SalesCharts;