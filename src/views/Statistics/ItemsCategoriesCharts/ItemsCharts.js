import DatePicker from 'react-datepicker';
import ReactApexChart from 'react-apexcharts';
import React, { useState, useEffect } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import { useDispatch, useSelector } from 'react-redux';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';

import '../index.css';
import 'react-tabs/style/react-tabs.css';
import 'react-datepicker/dist/react-datepicker.css';
import { getTopItemsPurchasedGraph, getLeastItemsPurchasedGraph } from '../../../store/actions/Product'

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

const ItemsCharts = () => {
  const todayDate = new Date();
  const priorDate = new Date(new Date().setDate(todayDate.getDate() - 30));

  const dispatch = useDispatch();

  const { topItemsPurchaseGraph, leastItemsPurchaseGraph } = useSelector(st => st.Product);

  {/* Top Items */ }
  const [topItemsPurchaseLoader, setTopItemsPurchaseLoader] = useState(false);
  const [showTopItemsPurchaseOrdersGraph, setShowTopItemsPurchaseOrdersGraph] = useState(true);
  const [showTopItemsPurchaseEarningsGraph, setShowTopItemsPurchaseEarningsGraph] = useState(true);
  const [topItemsPurchaseFromDate, setTopItemsPurchaseFromDate] = useState(priorDate);
  const [topItemsPurchaseToDate, setTopItemsPurchaseToDate] = useState(todayDate);
  const [topItemsPurchaseNumber, setTopItemsPurchaseNumber] = useState(3);
  const [topItemsPurchaseGraphData, setTopItemsPurchaseGraphData] = useState();

  {/* Least Items */ }
  const [leastItemsPurchaseLoader, setLeastItemsPurchaseLoader] = useState(false);
  const [showLeastItemsPurchaseOrdersGraph, setShowLeastItemsPurchaseOrdersGraph] = useState(true);
  const [showLeastItemsPurchaseEarningsGraph, setShowLeastItemsPurchaseEarningsGraph] = useState(true);
  const [leastItemsPurchaseFromDate, setLeastItemsPurchaseFromDate] = useState(priorDate);
  const [leastItemsPurchaseToDate, setLeastItemsPurchaseToDate] = useState(todayDate);
  const [leastItemsPurchaseNumber, setLeastItemsPurchaseNumber] = useState(3);
  const [leastItemsPurchaseGraphData, setLeastItemsPurchaseGraphData] = useState();


  useEffect(() => {
    dispatch(getTopItemsPurchasedGraph({ number: topItemsPurchaseNumber }));
    dispatch(getLeastItemsPurchasedGraph({ number: leastItemsPurchaseNumber }));
  }, []);


  {/* Top Items */ }
  useEffect(() => { setTopItemsPurchaseLoader(false) }, [topItemsPurchaseGraph]);
  useEffect(() => {
    if (!topItemsPurchaseGraph) return;


    setTopItemsPurchaseGraphData({
      options: {
        ...chartOptions,
        // dataLabels: { enabled: false },
        // stroke: { width: 1 },
        xaxis: { categories: topItemsPurchaseGraph.graph.TotalOrders.labels },
        dataLabels: { enabled: false },
        // xaxis: { categories: [1, 2, 3, 4, 5, 6, 7, 8, 9 ] },
        // yaxis: {
        //   // type: 'logarithmic',
        //   // logarithmicBase: 10,
        //   logarithmic: true,
        //   logBase: 10,
        // },
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
        showTopItemsPurchaseOrdersGraph && {
          name: 'Orders',
          // data: [2, 3, 23, 32, 123, 11, 21, 0, 2]
          data: topItemsPurchaseGraph.graph.TotalOrders.data,
          type: 'column',
          color: "#008000"
        },
        showTopItemsPurchaseEarningsGraph && {
          name: 'Sales',
          // data: [0, 10, 1300, 100002, 132047, 289234, 7873, 782, 17]
          data: topItemsPurchaseGraph.graph.Earnings.data,
          type: 'line',
          color: "#7cb5ec"
        }
      ].filter(Boolean)
    });
  }, [topItemsPurchaseGraph, showTopItemsPurchaseOrdersGraph, showTopItemsPurchaseEarningsGraph]);

  {/* Least Items */ }
  useEffect(() => { setLeastItemsPurchaseLoader(false) }, [leastItemsPurchaseGraph]);
  useEffect(() => {
    if (!leastItemsPurchaseGraph) return;


    setLeastItemsPurchaseGraphData({
      options: {
        ...chartOptions,
        // dataLabels: { enabled: false },
        // stroke: { width: 1 },
        xaxis: { categories: leastItemsPurchaseGraph.graph.TotalOrders.labels },
        dataLabels: { enabled: false },
        // xaxis: { categories: [1, 2, 3, 4, 5, 6, 7, 8, 9 ] },
        // yaxis: {
        //   // type: 'logarithmic',
        //   // logarithmicBase: 10,
        //   logarithmic: true,
        //   logBase: 10,
        // },
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
        showLeastItemsPurchaseOrdersGraph && {
          name: 'Orders',
          // data: [2, 3, 23, 32, 123, 11, 21, 0, 2]
          data: leastItemsPurchaseGraph.graph.TotalOrders.data,
          type: 'column',
          color: "#ffa500"
        },
        showLeastItemsPurchaseEarningsGraph && {
          name: 'Sales',
          // data: [0, 10, 1300, 100002, 132047, 289234, 7873, 782, 17]
          data: leastItemsPurchaseGraph.graph.Earnings.data,
          type: 'line',
          color: "#7cb5ec"
        }
      ].filter(Boolean)
    });
  }, [leastItemsPurchaseGraph, showLeastItemsPurchaseOrdersGraph, showLeastItemsPurchaseEarningsGraph]);


  {/* Items Filter */ }
  const applyItemsPurchaseFilters = (filter) => {
    if (filter == 'topItemsPurchaseFilter') {
      if (!topItemsPurchaseFromDate || !topItemsPurchaseToDate) {
        alert('Please select both "From" and "To" dates.');
        return;
      }

      if (topItemsPurchaseFromDate > topItemsPurchaseToDate) {
        alert('"From" date should be earlier than "To" date.');
        return;
      }

      setTopItemsPurchaseLoader(true);
      dispatch(getTopItemsPurchasedGraph({ number: topItemsPurchaseNumber, fromDate: topItemsPurchaseFromDate, toDate: topItemsPurchaseToDate }));
    }
    if (filter == 'leastItemsPurchaseFilter') {
      if (!leastItemsPurchaseFromDate || !leastItemsPurchaseToDate) {
        alert('Please select both "From" and "To" dates.');
        return;
      }

      if (leastItemsPurchaseFromDate > leastItemsPurchaseToDate) {
        alert('"From" date should be earlier than "To" date.');
        return;
      }

      setLeastItemsPurchaseLoader(true);
      dispatch(getLeastItemsPurchasedGraph({ number: leastItemsPurchaseNumber, fromDate: leastItemsPurchaseFromDate, toDate: leastItemsPurchaseToDate }));
    }
  };

  return (
    <>

      {/* Items */}
      <div className='row'>
        {/* Top Items */}
        <div className='col-lg-12 col-md-12 col-sm-12'>
          <div className='chart-area item-chart'>
            <div className='value-title'>
              <h1 className='heading'>Top Items</h1>
              <div className='group-form'>
                <button className='btn-style-one' onClick={() => applyItemsPurchaseFilters('topItemsPurchaseFilter')}>Apply </button>
              </div>
            </div>
            <div className='chart-title'>
              <div className='group-form'>
                <label>From: </label>
                <DatePicker
                  selected={topItemsPurchaseFromDate}
                  onChange={date => setTopItemsPurchaseFromDate(date)}
                  dateFormat="dd-MM-yyyy"
                />
              </div>
              <div className='group-form'>
                <label>To: </label>
                <DatePicker
                  selected={topItemsPurchaseToDate}
                  onChange={date => setTopItemsPurchaseToDate(date)}
                  dateFormat="dd-MM-yyyy"
                />
              </div>
              <div className='group-form' style={{ display: 'flex' }}>
                <label htmlFor='name'>No. of Products:</label>
                <input
                  id='topItemsPurchaseNumber'
                  name='topItemsPurchaseNumber'
                  defaultValue={topItemsPurchaseNumber}
                  onChange={(e) => setTopItemsPurchaseNumber(e.target.value)} />
              </div>
            </div>
            {topItemsPurchaseGraphData ?
              <div>
                <div>
                  <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                    <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    </FormGroup>
                  </FormControl>
                </div>
                {topItemsPurchaseLoader ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                  </div>
                ) : (
                  <>
                    <ReactApexChart className="chart-height" options={topItemsPurchaseGraphData.options} series={topItemsPurchaseGraphData.series} type="line" height={300} />
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
                                icon={<CircleOutlinedIcon />}
                                checkedIcon={<CircleIcon />}
                                checked={showTopItemsPurchaseEarningsGraph}
                                onChange={() => setShowTopItemsPurchaseEarningsGraph(!showTopItemsPurchaseEarningsGraph)}
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
                                checked={showTopItemsPurchaseOrdersGraph}
                                onChange={() => setShowTopItemsPurchaseOrdersGraph(!showTopItemsPurchaseOrdersGraph)}
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
        {/* Least Items */}
        <div className='col-lg-12 col-md-12 col-sm-12'>
          <div className='chart-area item-chart'>
            <div className='value-title'>
              <h1 className='heading'>Least Items</h1>
              <div className='group-form'>
                <button className='btn-style-one' onClick={() => applyItemsPurchaseFilters('leastItemsPurchaseFilter')}>Apply</button>
              </div>
            </div>
            <div className='chart-title'>
              <div className='group-form'>
                <label>From: </label>
                <DatePicker
                  selected={leastItemsPurchaseFromDate}
                  onChange={date => setLeastItemsPurchaseFromDate(date)}
                  dateFormat="dd-MM-yyyy"
                />
              </div>
              <div className='group-form'>
                <label>To: </label>
                <DatePicker
                  selected={leastItemsPurchaseToDate}
                  onChange={date => setLeastItemsPurchaseToDate(date)}
                  dateFormat="dd-MM-yyyy"
                />
              </div>
              <div className='group-form' style={{ display: 'flex' }}>
                <label htmlFor='name'>No. of Products:</label>
                <input
                  id='leastItemsPurchaseNumber'
                  name='leastItemsPurchaseNumber'
                  defaultValue={leastItemsPurchaseNumber}
                  onChange={(e) => setLeastItemsPurchaseNumber(e.target.value)} />
              </div>
            </div>
            {leastItemsPurchaseGraphData ?
              <div>
                <div>
                  <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                    <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    </FormGroup>
                  </FormControl>
                </div>
                {leastItemsPurchaseLoader ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                  </div>
                ) : (
                  <>
                    <ReactApexChart className="chart-height" options={leastItemsPurchaseGraphData.options} series={leastItemsPurchaseGraphData.series} type="line" height={300} />
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
                                icon={<CircleOutlinedIcon />}
                                checkedIcon={<CircleIcon />}
                                checked={showLeastItemsPurchaseEarningsGraph}
                                onChange={() => setShowLeastItemsPurchaseEarningsGraph(!showLeastItemsPurchaseEarningsGraph)}
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
                                checked={showLeastItemsPurchaseOrdersGraph}
                                onChange={() => setShowLeastItemsPurchaseOrdersGraph(!showLeastItemsPurchaseOrdersGraph)}
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
    </>
  );
};

export default ItemsCharts;