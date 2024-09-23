import DatePicker from 'react-datepicker';
import ReactApexChart from 'react-apexcharts';
import React, { useState, useEffect } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';

import '../index.css';
import 'react-tabs/style/react-tabs.css';
import 'react-datepicker/dist/react-datepicker.css';
import { getTopCategoriesPurchasedGraph, getLeastCategoriesPurchasedGraph, getCategoriesSalesByMonthGraph } from '../../../store/actions/Product'

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

const CategoriesCharts = () => {
  const todayDate = new Date();
  const priorDate = new Date(new Date().setDate(todayDate.getDate() - 30));

  const dispatch = useDispatch();

  const { topCategoriesPurchaseGraph, leastCategoriesPurchaseGraph, categoriesSalesByMonthGraph } = useSelector(st => st.Product);

  {/* Top Categories */ }
  const [topCategoriesPurchaseLoader, setTopCategoriesPurchaseLoader] = useState(false);
  const [showTopCategoriesPurchaseOrdersGraph, setShowTopCategoriesPurchaseOrdersGraph] = useState(true);
  const [showTopCategoriesPurchaseEarningsGraph, setShowTopCategoriesPurchaseEarningsGraph] = useState(true);
  const [topCategoriesPurchaseFromDate, setTopCategoriesPurchaseFromDate] = useState(priorDate);
  const [topCategoriesPurchaseToDate, setTopCategoriesPurchaseToDate] = useState(todayDate);
  const [topCategoriesPurchaseNumber, setTopCategoriesPurchaseNumber] = useState(4);
  const [topCategoriesPurchaseGraphData, setTopCategoriesPurchaseGraphData] = useState();

  {/* Least Categories */ }
  const [leastCategoriesPurchaseLoader, setLeastCategoriesPurchaseLoader] = useState(false);
  const [showLeastCategoriesPurchaseOrdersGraph, setShowLeastCategoriesPurchaseOrdersGraph] = useState(true);
  const [showLeastCategoriesPurchaseEarningsGraph, setShowLeastCategoriesPurchaseEarningsGraph] = useState(true);
  const [leastCategoriesPurchaseFromDate, setLeastCategoriesPurchaseFromDate] = useState(priorDate);
  const [leastCategoriesPurchaseToDate, setLeastCategoriesPurchaseToDate] = useState(todayDate);
  const [leastCategoriesPurchaseNumber, setLeastCategoriesPurchaseNumber] = useState(4);
  const [leastCategoriesPurchaseGraphData, setLeastCategoriesPurchaseGraphData] = useState();

  {/* Categories By Month  */ }
  const [categoriesSalesByMonthLoader, setCategoriesSalesByMonthGraphLoader] = useState(false);
  const [categoriesSalesByMonthFromDate, setCategoriesSalesByMonthFromDate] = useState(new Date(new Date().setDate(todayDate.getDate() - 60)));
  const [categoriesSalesByMonthToDate, setCategoriesSalesByMonthToDate] = useState(todayDate);
  const [categoriesSalesByMonthGraphData, setCategoriesSalesByMonthGraphData] = useState();
  const [showAllSalesByMonthGraphs, setShowAllSalesByMonthGraphs] = useState(true);

  useEffect(() => {
    dispatch(getTopCategoriesPurchasedGraph({ number: topCategoriesPurchaseNumber }));
    dispatch(getLeastCategoriesPurchasedGraph({ number: leastCategoriesPurchaseNumber }));
    dispatch(getCategoriesSalesByMonthGraph({ fromDate: categoriesSalesByMonthFromDate, toDate: categoriesSalesByMonthToDate }));
  }, []);

  {/* Top Categories */ }
  useEffect(() => { setTopCategoriesPurchaseLoader(false) }, [topCategoriesPurchaseGraph]);
  useEffect(() => {
    if (!topCategoriesPurchaseGraph) return;

    setTopCategoriesPurchaseGraphData({
      options: {
        ...chartOptions,
        xaxis: { categories: topCategoriesPurchaseGraph.graph.TotalOrders.labels },
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
          },

        }, {
          opposite: true,
          title: {
            text: 'Sales'
          }
        }]
      },

      series: [
        showTopCategoriesPurchaseOrdersGraph && {
          name: 'Orders',
          data: topCategoriesPurchaseGraph.graph.TotalOrders.data,
          type: 'column',
          color: "#008000"
        },
        showTopCategoriesPurchaseEarningsGraph && {
          name: 'Sales',
          data: topCategoriesPurchaseGraph.graph.Earnings.data,
          type: 'line',
          color: "#7cb5ec"
        }
      ].filter(Boolean)
    });
  }, [topCategoriesPurchaseGraph, showTopCategoriesPurchaseOrdersGraph, showTopCategoriesPurchaseEarningsGraph]);

  {/* Least Categories */ }
  useEffect(() => { setLeastCategoriesPurchaseLoader(false) }, [leastCategoriesPurchaseGraph]);
  useEffect(() => {
    if (!leastCategoriesPurchaseGraph) return;

    setLeastCategoriesPurchaseGraphData({
      options: {
        ...chartOptions,
        xaxis: { categories: leastCategoriesPurchaseGraph.graph.TotalOrders.labels },
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
          },

        }, {
          opposite: true,
          title: {
            text: 'Sales'
          }
        }]
      },

      series: [
        showLeastCategoriesPurchaseOrdersGraph && {
          name: 'Orders',
          data: leastCategoriesPurchaseGraph.graph.TotalOrders.data,
          type: 'column',
          color: "#ffa500"
        },
        showLeastCategoriesPurchaseEarningsGraph && {
          name: 'Sales',
          data: leastCategoriesPurchaseGraph.graph.Earnings.data,
          type: 'line',
          color: "#7cb5ec"
        }
      ].filter(Boolean)
    });
  }, [leastCategoriesPurchaseGraph, showLeastCategoriesPurchaseOrdersGraph, showLeastCategoriesPurchaseEarningsGraph]);

  {/* Categories By Month  */ }
  useEffect(() => { setCategoriesSalesByMonthGraphLoader(false) }, [categoriesSalesByMonthGraph]);
  useEffect(() => {
    if (!categoriesSalesByMonthGraph) return;

    setCategoriesSalesByMonthGraphData({
      options: {
        ...chartOptions,
        dataLabels: { enabled: false },
        stroke: { width: 1 },
        xaxis: { categories: categoriesSalesByMonthGraph.graph.labels },
        yaxis: [{
          title: {
            text: 'Orders',
          },
        }],
        tooltip: { enabled: showAllSalesByMonthGraphs },
        legend: {
          position: 'bottom',
          horizontalAlign: 'left',
          offsetX: 40
        }
      },

      series: categoriesSalesByMonthGraph.graph.series.map(item => ({
        name: item.name,
        data: item.data,
        color: showAllSalesByMonthGraphs ? item.color : '#00000000'
      }))
    });
  }, [categoriesSalesByMonthGraph, showAllSalesByMonthGraphs]);

  {/* Categories Filter */ }
  const applyCategoriesPurchaseFilters = (filter) => {
    if (filter == 'topCategoriesPurchaseFilter') {
      if (!topCategoriesPurchaseFromDate || !topCategoriesPurchaseToDate) {
        alert('Please select both "From" and "To" dates.');
        return;
      }

      if (topCategoriesPurchaseFromDate > topCategoriesPurchaseToDate) {
        alert('"From" date should be earlier than "To" date.');
        return;
      }

      setTopCategoriesPurchaseLoader(true);
      dispatch(getTopCategoriesPurchasedGraph({ number: topCategoriesPurchaseNumber, fromDate: topCategoriesPurchaseFromDate, toDate: topCategoriesPurchaseToDate }));
    }

    if (filter == 'leastCategoriesPurchaseFilter') {
      if (!leastCategoriesPurchaseFromDate || !leastCategoriesPurchaseToDate) {
        alert('Please select both "From" and "To" dates.');
        return;
      }

      if (leastCategoriesPurchaseFromDate > leastCategoriesPurchaseToDate) {
        alert('"From" date should be earlier than "To" date.');
        return;
      }

      setLeastCategoriesPurchaseLoader(true);
      dispatch(getLeastCategoriesPurchasedGraph({ number: leastCategoriesPurchaseNumber, fromDate: leastCategoriesPurchaseFromDate, toDate: leastCategoriesPurchaseToDate }));
    }

    if (filter == 'categorySalesByMonth') {
      if (!categoriesSalesByMonthFromDate || !categoriesSalesByMonthToDate) {
        alert('Please select both "From" and "To" dates.');
        return;
      }

      if (categoriesSalesByMonthFromDate > categoriesSalesByMonthToDate) {
        alert('"From" date should be earlier than "To" date.');
        return;
      }

      setCategoriesSalesByMonthGraphLoader(true);
      dispatch(getCategoriesSalesByMonthGraph({ fromDate: categoriesSalesByMonthFromDate, toDate: categoriesSalesByMonthToDate }));
    }
  };

  return (
    <>
      {/* Categories */}
      <div className='row'>
        {/* Top Categories */}
        <div className='col-lg-6 col-md-12 col-sm-12'>
          <div className='chart-area item-chart'>
            <div className='value-title'>
              <h1 className='heading'>Top Categories</h1>
              <div className='group-form'>
                <button className='btn-style-one' onClick={() => applyCategoriesPurchaseFilters('topCategoriesPurchaseFilter')}>Apply </button>
              </div>
            </div>
            <div className='chart-title'>
              <div className='group-form'>
                <label>From: </label>
                <DatePicker
                  selected={topCategoriesPurchaseFromDate}
                  onChange={date => setTopCategoriesPurchaseFromDate(date)}
                  dateFormat="dd-MM-yyyy"
                />
              </div>
              <div className='group-form'>
                <label>To: </label>
                <DatePicker
                  selected={topCategoriesPurchaseToDate}
                  onChange={date => setTopCategoriesPurchaseToDate(date)}
                  dateFormat="dd-MM-yyyy"
                />
              </div>
              <div className='group-form'>
                <label htmlFor='name'>No. of Products:</label>
                <input
                  id='topCategoriesPurchaseNumber'
                  name='topCategoriesPurchaseNumber'
                  defaultValue={topCategoriesPurchaseNumber}
                  onChange={(e) => setTopCategoriesPurchaseNumber(e.target.value)} />
              </div>
            </div>
            {topCategoriesPurchaseGraphData ?
              <div>
                <div>
                  <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                    <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    </FormGroup>
                  </FormControl>
                </div>
                {topCategoriesPurchaseLoader ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                  </div>
                ) : (
                  <>
                    <ReactApexChart className="chart-height" options={topCategoriesPurchaseGraphData.options} series={topCategoriesPurchaseGraphData.series} type="line" height={300} />
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
                                checked={showTopCategoriesPurchaseEarningsGraph}
                                onChange={() => setShowTopCategoriesPurchaseEarningsGraph(!showTopCategoriesPurchaseEarningsGraph)}
                              />
                            }
                            label='Sales'
                          />
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
                                checked={showTopCategoriesPurchaseOrdersGraph}
                                onChange={() => setShowTopCategoriesPurchaseOrdersGraph(!showTopCategoriesPurchaseOrdersGraph)}
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
        {/* Least Categories */}
        <div className='col-lg-6 col-md-12 col-sm-12'>
          <div className='chart-area item-chart'>
            <div className='value-title'>
              <h1 className='heading'>Least Categories</h1>
              <div className='group-form'>
                <button className='btn-style-one' onClick={() => applyCategoriesPurchaseFilters('leastCategoriesPurchaseFilter')}>Apply</button>
              </div>
            </div>
            <div className='chart-title'>
              <div className='group-form'>
                <label>From: </label>
                <DatePicker
                  selected={leastCategoriesPurchaseFromDate}
                  onChange={date => setLeastCategoriesPurchaseFromDate(date)}
                  dateFormat="dd-MM-yyyy"
                />
              </div>
              <div className='group-form'>
                <label>To: </label>
                <DatePicker
                  selected={leastCategoriesPurchaseToDate}
                  onChange={date => setLeastCategoriesPurchaseToDate(date)}
                  dateFormat="dd-MM-yyyy"
                />
              </div>
              <div className='group-form'>
                <label htmlFor='name'>No. of Products:</label>
                <input
                  id='leastCategoriesPurchaseNumber'
                  name='leastCategoriesPurchaseNumber'
                  defaultValue={leastCategoriesPurchaseNumber}
                  onChange={(e) => setLeastCategoriesPurchaseNumber(e.target.value)} />
              </div>
            </div>
            {leastCategoriesPurchaseGraphData ?
              <div>
                <div>
                  <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                    <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    </FormGroup>
                  </FormControl>
                </div>
                {leastCategoriesPurchaseLoader ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                  </div>
                ) : (
                  <>
                    <ReactApexChart className="chart-height" options={leastCategoriesPurchaseGraphData.options} series={leastCategoriesPurchaseGraphData.series} type="line" height={300} />
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
                                checked={showLeastCategoriesPurchaseEarningsGraph}
                                onChange={() => setShowLeastCategoriesPurchaseEarningsGraph(!showLeastCategoriesPurchaseEarningsGraph)}
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
                                checked={showLeastCategoriesPurchaseOrdersGraph}
                                onChange={() => setShowLeastCategoriesPurchaseOrdersGraph(!showLeastCategoriesPurchaseOrdersGraph)}
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
        {/* Categories By Month  */}
        <div className='col-lg-12 col-md-12 col-sm-12'>
          <div className='chart-area item-chart'>
            <div className='chart-title'>
              <div className='value-title'>
                <h1 className='heading'>Categories by Month</h1>
                <div className='group-form form-to-sales'>
                  <div className='form-to'>
                    <label>From: </label>
                    <DatePicker
                      selected={categoriesSalesByMonthFromDate}
                      onChange={date => setCategoriesSalesByMonthFromDate(date)}
                      dateFormat="dd-MM-yyyy"
                    />
                  </div>
                  <div className='form-to'>
                    <label>To: </label>
                    <DatePicker
                      selected={categoriesSalesByMonthToDate}
                      onChange={date => setCategoriesSalesByMonthToDate(date)}
                      dateFormat="dd-MM-yyyy"
                    />
                  </div>
                  <button className='btn-style-one' onClick={() => applyCategoriesPurchaseFilters('categorySalesByMonth')}>Apply</button>
                </div>
              </div>
            </div>
            {categoriesSalesByMonthGraphData ?
              <div>
                <div>
                  <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                    <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    </FormGroup>
                  </FormControl>
                </div>
                {categoriesSalesByMonthLoader ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                  </div>
                ) : (
                  <>
                    <ReactApexChart className="chart-height categories-chart" options={categoriesSalesByMonthGraphData.options} series={categoriesSalesByMonthGraphData.series} type={showAllSalesByMonthGraphs ? "area" : "line"} height={300} />
                    <div className='bottom-sales-area categories-bottom-sales text-center'>
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
                                checked={showAllSalesByMonthGraphs}
                                onChange={() => setShowAllSalesByMonthGraphs(!showAllSalesByMonthGraphs)}
                              />
                            }
                            label='All'
                          />
                        </FormGroup>
                      </FormControl>
                    </div>
                  </>
                )}
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
    </>
  );
};

export default CategoriesCharts;