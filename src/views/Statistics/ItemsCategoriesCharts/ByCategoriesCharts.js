import DatePicker from 'react-datepicker';
import ReactApexChart from 'react-apexcharts';
import React, { useState, useEffect } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import { useDispatch, useSelector } from 'react-redux';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';

import '../index.css';
import 'react-tabs/style/react-tabs.css';
import 'react-datepicker/dist/react-datepicker.css';
import { getTopItemsPurchaseByCategoryGraph, getLeastItemsPurchaseByCategoryGraph } from '../../../store/actions/Product'

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

const ByCategoriesCharts = () => {
  const todayDate = new Date();
  const priorDate = new Date(new Date().setDate(todayDate.getDate() - 30));

  const dispatch = useDispatch();

  const { topItemsPurchaseByCategoryGraph, leastItemsPurchaseByCategoryGraph, } = useSelector(st => st.Product);

  {/* Top Items By Category */ }
  const [topItemsPurchaseByCategoryLoader, setTopItemsPurchaseByCategoryLoader] = useState(false);
  const [showTopItemsPurchaseByCategoryOrdersGraph, setShowTopItemsPurchaseByCategoryOrdersGraph] = useState(true);
  const [showTopItemsPurchaseByCategoryEarningsGraph, setShowTopItemsPurchaseByCategoryEarningsGraph] = useState(true);
  const [topItemsPurchaseByCategoryFromDate, setTopItemsPurchaseByCategoryFromDate] = useState(priorDate);
  const [topItemsPurchaseByCategoryToDate, setTopItemsPurchaseByCategoryToDate] = useState(todayDate);
  const [topItemsPurchaseByCategoryNumber, setTopItemsPurchaseByCategoryNumber] = useState(3);
  const [topItemsPurchaseByCategoryGraphData, setTopItemsPurchaseByCategoryGraphData] = useState();
  const [topItemsTypesExpand, setTopItemsTypesExpand] = useState(false);
  const [topItemsProductTypes, setTopItemsProductTypes] = useState([
    { id: 0, checked: false, name: 'All', },
    { id: 1, checked: true, name: 'Chips & Snacks', },
    { id: 2, checked: false, name: 'Dairy', },
    { id: 3, checked: true, name: 'Grocery', },
    { id: 4, checked: false, name: 'Frozen', },
    { id: 5, checked: false, name: 'Soft Drinks & Juices', },
    { id: 6, checked: true, name: 'Cans & Jars', },
    { id: 7, checked: false, name: 'Chocolates & Candies', },
    { id: 8, checked: false, name: 'Butchery', },
  ]);

  {/* Least Items By Category */ }
  const [leastItemsPurchaseByCategoryLoader, setLeastItemsPurchaseByCategoryLoader] = useState(false);
  const [showLeastItemsPurchaseByCategoryOrdersGraph, setShowLeastItemsPurchaseByCategoryOrdersGraph] = useState(true);
  const [showLeastItemsPurchaseByCategoryEarningsGraph, setShowLeastItemsPurchaseByCategoryEarningsGraph] = useState(true);
  const [leastItemsPurchaseByCategoryFromDate, setLeastItemsPurchaseByCategoryFromDate] = useState(priorDate);
  const [leastItemsPurchaseByCategoryToDate, setLeastItemsPurchaseByCategoryToDate] = useState(todayDate);
  const [leastItemsPurchaseByCategoryNumber, setLeastItemsPurchaseByCategoryNumber] = useState(3);
  const [leastItemsPurchaseByCategoryGraphData, setLeastItemsPurchaseByCategoryGraphData] = useState();
  const [leastItemsTypesExpand, setLeastItemsTypesExpand] = useState(false);
  const [leastItemsProductTypes, setLeastItemsProductTypes] = useState([
    { id: 0, checked: false, name: 'All', },
    { id: 1, checked: true, name: 'Chips & Snacks', },
    { id: 2, checked: true, name: 'Dairy', },
    { id: 3, checked: false, name: 'Grocery', },
    { id: 4, checked: false, name: 'Frozen', },
    { id: 5, checked: true, name: 'Soft Drinks & Juices', },
    { id: 6, checked: false, name: 'Chocolates & Candies', },
    { id: 7, checked: true, name: 'Cans & Jars', },
    { id: 8, checked: false, name: 'Butchery', },
  ]);


  useEffect(() => {
    dispatch(getTopItemsPurchaseByCategoryGraph({ number: topItemsPurchaseByCategoryNumber, categories: topItemsProductTypes }));
    dispatch(getLeastItemsPurchaseByCategoryGraph({ number: leastItemsPurchaseByCategoryNumber, categories: leastItemsProductTypes }));
  }, []);


  {/* Top Items By Category */ }
  useEffect(() => { setTopItemsPurchaseByCategoryLoader(false) }, [topItemsPurchaseByCategoryGraph]);
  useEffect(() => {
    if (!topItemsPurchaseByCategoryGraph) return;


    setTopItemsPurchaseByCategoryGraphData({
      options: {
        ...chartOptions,
        xaxis: { categories: topItemsPurchaseByCategoryGraph.graph.TotalOrders.labels },
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
        showTopItemsPurchaseByCategoryOrdersGraph && {
          name: 'Orders',
          data: topItemsPurchaseByCategoryGraph.graph.TotalOrders.data,
          type: 'column',
          color: "#008000"
        },
        showTopItemsPurchaseByCategoryEarningsGraph && {
          name: 'Sales',
          data: topItemsPurchaseByCategoryGraph.graph.Earnings.data,
          type: 'line',
          color: "#7cb5ec"
        }
      ].filter(Boolean)
    });
  }, [topItemsPurchaseByCategoryGraph, showTopItemsPurchaseByCategoryOrdersGraph, showTopItemsPurchaseByCategoryEarningsGraph]);

  {/* Least Items By Category */ }
  useEffect(() => { setLeastItemsPurchaseByCategoryLoader(false) }, [leastItemsPurchaseByCategoryGraph]);
  useEffect(() => {
    if (!leastItemsPurchaseByCategoryGraph) return;


    setLeastItemsPurchaseByCategoryGraphData({
      options: {
        ...chartOptions,
        xaxis: { categories: leastItemsPurchaseByCategoryGraph.graph.TotalOrders.labels },
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
        showLeastItemsPurchaseByCategoryOrdersGraph && {
          name: 'Orders',
          // data: [2, 3, 23, 32, 123, 11, 21, 0, 2]
          data: leastItemsPurchaseByCategoryGraph.graph.TotalOrders.data,
          type: 'column',
          color: "#ffa500"
        },
        showLeastItemsPurchaseByCategoryEarningsGraph && {
          name: 'Sales',
          // data: [0, 10, 1300, 100002, 132047, 289234, 7873, 782, 17]
          data: leastItemsPurchaseByCategoryGraph.graph.Earnings.data,
          type: 'line',
          color: "#7cb5ec"
        }
      ].filter(Boolean)
    });
  }, [leastItemsPurchaseByCategoryGraph, showLeastItemsPurchaseByCategoryOrdersGraph, showLeastItemsPurchaseByCategoryEarningsGraph]);

  {/* Items By Category Filter */ }
  const applyItemsPurchaseByCategoryFilters = (filter) => {
    if (filter == 'topItemsPurchaseByCategoryFilter') {
      if (!topItemsPurchaseByCategoryFromDate || !topItemsPurchaseByCategoryToDate) {
        alert('Please select both "From" and "To" dates.');
        return;
      }

      if (topItemsPurchaseByCategoryFromDate > topItemsPurchaseByCategoryToDate) {
        alert('"From" date should be earlier than "To" date.');
        return;
      }
      setTopItemsTypesExpand(false);
      setTopItemsPurchaseByCategoryLoader(true);
      dispatch(getTopItemsPurchaseByCategoryGraph({ number: topItemsPurchaseByCategoryNumber, fromDate: topItemsPurchaseByCategoryFromDate, toDate: topItemsPurchaseByCategoryToDate, categories: topItemsProductTypes }));
    }
    if (filter == 'leastItemsPurchaseByCategoryFilter') {
      if (!leastItemsPurchaseByCategoryFromDate || !leastItemsPurchaseByCategoryToDate) {
        alert('Please select both "From" and "To" dates.');
        return;
      }

      if (leastItemsPurchaseByCategoryFromDate > leastItemsPurchaseByCategoryToDate) {
        alert('"From" date should be earlier than "To" date.');
        return;
      }
      setLeastItemsTypesExpand(false);
      setLeastItemsPurchaseByCategoryLoader(true);
      dispatch(getLeastItemsPurchaseByCategoryGraph({ number: leastItemsPurchaseByCategoryNumber, fromDate: leastItemsPurchaseByCategoryFromDate, toDate: leastItemsPurchaseByCategoryToDate, categories: leastItemsProductTypes }));
    }
  };

  const handleAllSelect = (type, checked) => {
    type === 'top' && setTopItemsProductTypes(st => st.map(el => ({ ...el, checked })));
    type === 'least' && setLeastItemsProductTypes(st => st.map(el => ({...el, checked })));
  };

  return (
    <>
      <div className='row'>
        {/* Top Items By Category */}
        <div className='col-lg-12 col-md-12 col-sm-12'>
          <div className='chart-area item-chart'>
            <div className='value-title'>
              <h1 className='heading'>Top Items By Category</h1>
              <div className='group-form'>
                <button className='btn-style-one' onClick={() => applyItemsPurchaseByCategoryFilters('topItemsPurchaseByCategoryFilter')}>Apply </button>
              </div>
            </div>
            <div className='chart-title'>
              <div className='group-form'>
                <label>From: </label>
                <DatePicker
                  selected={topItemsPurchaseByCategoryFromDate}
                  onChange={date => setTopItemsPurchaseByCategoryFromDate(date)}
                  dateFormat="dd-MM-yyyy"
                />
              </div>
              <div className='group-form'>
                <label>To: </label>
                <DatePicker
                  selected={topItemsPurchaseByCategoryToDate}
                  onChange={date => setTopItemsPurchaseByCategoryToDate(date)}
                  dateFormat="dd-MM-yyyy"
                />
              </div>
              <div className='group-form products-group'>
                <label htmlFor='name'>No. of Products:</label>
                <input
                  id='topItemsPurchaseByCategoryNumber'
                  name='topItemsPurchaseByCategoryNumber'
                  defaultValue={topItemsPurchaseByCategoryNumber}
                  onChange={(e) => setTopItemsPurchaseByCategoryNumber(e.target.value)} />
              </div>
              <div className='comined-chart sub-category group-form'>
                <div className='dropdown-checkbox orders-filters'>
                  <div style={{ display: 'flex', position: 'reletive', alignItems: 'center', cursor: 'pointer' }} onClick={() => setTopItemsTypesExpand(!topItemsTypesExpand)}>
                    <div>Select Category</div>
                    {topItemsTypesExpand ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </div>
                  <div className='dropdown-customers' style={{ display: 'block', alignItems: 'center', position: 'absolute', zIndex: '99' }}>
                    {topItemsTypesExpand && topItemsProductTypes.map(type =>
                      <div className='list' key={type['id']}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={topItemsProductTypes.find(el => el.id == type.id).checked}
                              onChange={(e) => {
                                if (e.target.name === 'All') handleAllSelect('top', e.target.checked);
                                else setTopItemsProductTypes(st => st.map(el => el.name === e.target.name ? { ...el, checked: e.target.checked } : el));
                              }}
                              name={type['name']}
                              icon={<CircleOutlinedIcon />}
                              checkedIcon={<CircleIcon />}
                            />}
                          label={type['name']} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {topItemsPurchaseByCategoryGraphData ?
              <div>
                <div>
                  <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                    <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    </FormGroup>
                  </FormControl>
                </div>
                {topItemsPurchaseByCategoryLoader ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                  </div>
                ) : (
                  <>
                    <ReactApexChart className="chart-height" options={topItemsPurchaseByCategoryGraphData.options} series={topItemsPurchaseByCategoryGraphData.series} type="line" height={300} />
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
                                checked={showTopItemsPurchaseByCategoryEarningsGraph}
                                onChange={() => setShowTopItemsPurchaseByCategoryEarningsGraph(!showTopItemsPurchaseByCategoryEarningsGraph)}
                              />
                            }
                            label='Sales'
                          />
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
                                checked={showTopItemsPurchaseByCategoryOrdersGraph}
                                onChange={() => setShowTopItemsPurchaseByCategoryOrdersGraph(!showTopItemsPurchaseByCategoryOrdersGraph)}
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
        {/* Least Items By Category */}
        <div className='col-lg-12 col-md-12 col-sm-12'>
          <div className='chart-area item-chart'>
            <div className='value-title'>
              <h1 className='heading'>Least Items By Category</h1>
              <div className='group-form'>
                <button className='btn-style-one' onClick={() => applyItemsPurchaseByCategoryFilters('leastItemsPurchaseByCategoryFilter')}>Apply</button>
              </div>
            </div>
            <div className='chart-title'>
              <div className='group-form'>
                <label>From: </label>
                <DatePicker
                  selected={leastItemsPurchaseByCategoryFromDate}
                  onChange={date => setLeastItemsPurchaseByCategoryFromDate(date)}
                  dateFormat="dd-MM-yyyy"
                />
              </div>
              <div className='group-form'>
                <label>To: </label>
                <DatePicker
                  selected={leastItemsPurchaseByCategoryToDate}
                  onChange={date => setLeastItemsPurchaseByCategoryToDate(date)}
                  dateFormat="dd-MM-yyyy"
                />
              </div>
              <div className='group-form products-group'>
                <label htmlFor='name'>No. of Products:</label>
                <input
                  id='leastItemsPurchaseByCategoryNumber'
                  name='leastItemsPurchaseByCategoryNumber'
                  defaultValue={leastItemsPurchaseByCategoryNumber}
                  onChange={(e) => setLeastItemsPurchaseByCategoryNumber(e.target.value)} />
              </div>
              <div className='comined-chart sub-category group-form'>
                <div className='dropdown-checkbox orders-filters'>
                  <div style={{ display: 'flex', position: 'reletive', alignItems: 'center', cursor: 'pointer' }} onClick={() => setLeastItemsTypesExpand(!leastItemsTypesExpand)}>
                    <div>Select Category</div>
                    {leastItemsTypesExpand ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </div>
                  <div className='dropdown-customers' style={{ display: 'block', alignItems: 'center', position: 'absolute', zIndex: '99' }}>
                    {leastItemsTypesExpand && leastItemsProductTypes.map(type =>
                      <div className='list' key={type['id']}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={leastItemsProductTypes.find(el => el.id == type.id).checked}
                              onChange={(e) => {
                                if (e.target.name === 'All') handleAllSelect('least', e.target.checked);
                                else setLeastItemsProductTypes(st => st.map(el => el.name === e.target.name ? { ...el, checked: e.target.checked } : el));
                              }}
                              name={type['name']}
                              icon={<CircleOutlinedIcon />}
                              checkedIcon={<CircleIcon />}
                            />}
                          label={type['name']} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {leastItemsPurchaseByCategoryGraphData ?
              <div>
                <div>
                  <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                    <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    </FormGroup>
                  </FormControl>
                </div>
                {leastItemsPurchaseByCategoryLoader ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                  </div>
                ) : (
                  <>
                    <ReactApexChart className="chart-height" options={leastItemsPurchaseByCategoryGraphData.options} series={leastItemsPurchaseByCategoryGraphData.series} type="line" height={300} />
                    <div className='bottom-sales-area text-center'>
                      <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                        <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                          <FormControlLabel
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
                                checked={showLeastItemsPurchaseByCategoryEarningsGraph}
                                onChange={() => setShowLeastItemsPurchaseByCategoryEarningsGraph(!showLeastItemsPurchaseByCategoryEarningsGraph)}
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
                                checked={showLeastItemsPurchaseByCategoryOrdersGraph}
                                onChange={() => setShowLeastItemsPurchaseByCategoryOrdersGraph(!showLeastItemsPurchaseByCategoryOrdersGraph)}
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

export default ByCategoriesCharts;