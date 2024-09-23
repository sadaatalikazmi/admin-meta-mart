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
import { getTopItemsPurchasedGraph, } from '../../store/actions/Product'

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
  const dispatch = useDispatch();

  const { topItemsPurchaseGraph } = useSelector(st => st.Product);


  const [topItemsPurchaseLoader, setTopItemsPurchaseLoader] = useState(false);
  const [showTopItemsPurchaseOrdersGraph, setShowTopItemsPurchaseOrdersGraph] = useState(true);
  const [showTopItemsPurchaseEarningsGraph, setShowTopItemsPurchaseEarningsGraph] = useState(true);
  const [topItemsPurchaseFromDate, setTopItemsPurchaseFromDate] = useState(null);
  const [topItemsPurchaseToDate, setTopItemsPurchaseToDate] = useState(null);
  const [topItemsPurchaseNumber, setTopItemsPurchaseNumber] = useState(3);
  const [topItemsPurchaseGraphData, setTopItemsPurchaseGraphData] = useState();

  useEffect(() => {
    dispatch(getTopItemsPurchasedGraph({ number: topItemsPurchaseNumber }));
  }, []);

  useEffect(() => {
    setTopItemsPurchaseLoader(false)
  }, [topItemsPurchaseGraph]);

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
        yaxis: [{
          title: {
            text: 'Orders',
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
          color: colors[0]
        },
        showTopItemsPurchaseEarningsGraph && {
          name: 'Sales',
          // data: [0, 10, 1300, 100002, 132047, 289234, 7873, 782, 17]
          data: topItemsPurchaseGraph.graph.Earnings.data,
          type: 'line',
          color: colors[1]
        }
      ].filter(Boolean)
    });
  }, [topItemsPurchaseGraph, showTopItemsPurchaseOrdersGraph, showTopItemsPurchaseEarningsGraph]);


  const applyTopItemsPurchaseFilters = () => {
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
  };

  return (
    <>
      <div className='chart-container combined-chart'>
        <Tabs>
          <TabList>
            <Tab>Items</Tab>
            <Tab>Categories</Tab>
          </TabList>

          <TabPanel>
            <div className='chart-area'>
              <div className='chart-title'>
                <div className='value-title'>
                  <h1 className='heading'>Top Items</h1>
                  <div className='group-form'>
                    <button className='btn-style-one' onClick={() => applyTopItemsPurchaseFilters()}>
                      Apply
                    </button>
                  </div>
                </div>
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
                      <div>
                        <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                          <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  sx={{
                                    color: colors[0],
                                    '&.Mui-checked': {
                                      color: colors[0],
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
                            <FormControlLabel
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
                                  checked={showTopItemsPurchaseEarningsGraph}
                                  onChange={() => setShowTopItemsPurchaseEarningsGraph(!showTopItemsPurchaseEarningsGraph)}
                                />
                              }
                              label='Sales'
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

        </Tabs>
      </div>

    </>
  );
};

export default ItemsCharts;