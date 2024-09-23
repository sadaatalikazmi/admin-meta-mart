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
import { getTopItemsPurchaseSubCategoryGraph, getLeastItemsPurchaseSubCategoryGraph } from '../../../store/actions/Product'

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

const SubCategoriesCharts = () => {
  const todayDate = new Date();
  const priorDate = new Date(new Date().setDate(todayDate.getDate() - 30));

  const dispatch = useDispatch();

  const { topItemsPurchaseSubCategoryGraph, leastItemsPurchaseSubCategoryGraph, } = useSelector(st => st.Product);

  {/* Top Items Sub Category */ }
  const [topItemsPurchaseSubCategoryLoader, setTopItemsPurchaseSubCategoryLoader] = useState(false);
  const [showTopItemsPurchaseSubCategoryOrdersGraph, setShowTopItemsPurchaseSubCategoryOrdersGraph] = useState(true);
  const [showTopItemsPurchaseSubCategoryEarningsGraph, setShowTopItemsPurchaseSubCategoryEarningsGraph] = useState(true);
  const [topItemsPurchaseSubCategoryFromDate, setTopItemsPurchaseSubCategoryFromDate] = useState(priorDate);
  const [topItemsPurchaseSubCategoryToDate, setTopItemsPurchaseSubCategoryToDate] = useState(todayDate);
  const [topItemsPurchaseSubCategoryNumber, setTopItemsPurchaseSubCategoryNumber] = useState(3);
  const [topItemsPurchaseSubCategoryGraphData, setTopItemsPurchaseSubCategoryGraphData] = useState();
  const [topItemsTypesExpand, setTopItemsTypesExpand] = useState(false);
  const [topItemsProductTypes, setTopItemsProductTypes] = useState([
    { id: 0, checked: false, name: 'All', },
    { id: 1, checked: true, name: 'Pasta', },
    { id: 2, checked: false, name: 'Snacks', },
    { id: 3, checked: true, name: 'Milk', },
    { id: 4, checked: false, name: 'Oil', },
    { id: 5, checked: false, name: 'Softdrinks', },
    { id: 6, checked: true, name: 'Cheese', },
    { id: 7, checked: false, name: 'Beef', },
    { id: 8, checked: false, name: 'Flower', },
    { id: 9, checked: false, name: 'Fruits', },
    { id: 10, checked: false, name: 'Vegetables', },
    { id: 11, checked: false, name: 'Bars', },
  ]);

  {/* Least Items Sub Category */ }
  const [leastItemsPurchaseSubCategoryLoader, setLeastItemsPurchaseSubCategoryLoader] = useState(false);
  const [showLeastItemsPurchaseSubCategoryOrdersGraph, setShowLeastItemsPurchaseSubCategoryOrdersGraph] = useState(true);
  const [showLeastItemsPurchaseSubCategoryEarningsGraph, setShowLeastItemsPurchaseSubCategoryEarningsGraph] = useState(true);
  const [leastItemsPurchaseSubCategoryFromDate, setLeastItemsPurchaseSubCategoryFromDate] = useState(priorDate);
  const [leastItemsPurchaseSubCategoryToDate, setLeastItemsPurchaseSubCategoryToDate] = useState(todayDate);
  const [leastItemsPurchaseSubCategoryNumber, setLeastItemsPurchaseSubCategoryNumber] = useState(3);
  const [leastItemsPurchaseSubCategoryGraphData, setLeastItemsPurchaseSubCategoryGraphData] = useState();
  const [leastItemsTypesExpand, setLeastItemsTypesExpand] = useState(false);
  const [leastItemsProductTypes, setLeastItemsProductTypes] = useState([
    { id: 0, checked: false, name: 'All', },
    { id: 1, checked: false, name: 'Pasta', },
    { id: 2, checked: true, name: 'Snacks', },
    { id: 3, checked: true, name: 'Milk', },
    { id: 4, checked: false, name: 'Oil', },
    { id: 5, checked: true, name: 'Softdrinks', },
    { id: 6, checked: false, name: 'Cheese', },
    { id: 7, checked: false, name: 'Beef', },
    { id: 8, checked: false, name: 'Flower', },
    { id: 9, checked: false, name: 'Fruits', },
    { id: 10, checked: false, name: 'Vegetables', },
    { id: 11, checked: false, name: 'Bars', },
  ]);


  useEffect(() => {
    dispatch(getTopItemsPurchaseSubCategoryGraph({ number: topItemsPurchaseSubCategoryNumber, subCategories: topItemsProductTypes }));
    dispatch(getLeastItemsPurchaseSubCategoryGraph({ number: leastItemsPurchaseSubCategoryNumber, subCategories: leastItemsProductTypes }));
  }, []);


  {/* Top Items Sub Category */ }
  useEffect(() => { setTopItemsPurchaseSubCategoryLoader(false) }, [topItemsPurchaseSubCategoryGraph]);
  useEffect(() => {
    if (!topItemsPurchaseSubCategoryGraph) return;


    setTopItemsPurchaseSubCategoryGraphData({
      options: {
        ...chartOptions,
        xaxis: { categories: topItemsPurchaseSubCategoryGraph.graph.TotalOrders.labels },
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
        showTopItemsPurchaseSubCategoryOrdersGraph && {
          name: 'Orders',
          data: topItemsPurchaseSubCategoryGraph.graph.TotalOrders.data,
          type: 'column',
          color: "#008000"
        },
        showTopItemsPurchaseSubCategoryEarningsGraph && {
          name: 'Sales',
          data: topItemsPurchaseSubCategoryGraph.graph.Earnings.data,
          type: 'line',
          color: "#7cb5ec"
        }
      ].filter(Boolean)
    });
  }, [topItemsPurchaseSubCategoryGraph, showTopItemsPurchaseSubCategoryOrdersGraph, showTopItemsPurchaseSubCategoryEarningsGraph]);

  {/* Least Items Sub Category */ }
  useEffect(() => { setLeastItemsPurchaseSubCategoryLoader(false) }, [leastItemsPurchaseSubCategoryGraph]);
  useEffect(() => {
    if (!leastItemsPurchaseSubCategoryGraph) return;


    setLeastItemsPurchaseSubCategoryGraphData({
      options: {
        ...chartOptions,
        xaxis: { categories: leastItemsPurchaseSubCategoryGraph.graph.TotalOrders.labels },
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
        showLeastItemsPurchaseSubCategoryOrdersGraph && {
          name: 'Orders',
          data: leastItemsPurchaseSubCategoryGraph.graph.TotalOrders.data,
          type: 'column',
          color: "#ffa500"
        },
        showLeastItemsPurchaseSubCategoryEarningsGraph && {
          name: 'Sales',
          data: leastItemsPurchaseSubCategoryGraph.graph.Earnings.data,
          type: 'line',
          color: "#7cb5ec"
        }
      ].filter(Boolean)
    });
  }, [leastItemsPurchaseSubCategoryGraph, showLeastItemsPurchaseSubCategoryOrdersGraph, showLeastItemsPurchaseSubCategoryEarningsGraph]);


  {/* Items Sub Category Filter */ }
  const applyItemsPurchaseSubCategoryFilters = (filter) => {
    if (filter == 'topItemsPurchaseSubCategoryFilter') {
      if (!topItemsPurchaseSubCategoryFromDate || !topItemsPurchaseSubCategoryToDate) {
        alert('Please select both "From" and "To" dates.');
        return;
      }

      if (topItemsPurchaseSubCategoryFromDate > topItemsPurchaseSubCategoryToDate) {
        alert('"From" date should be earlier than "To" date.');
        return;
      }
      setTopItemsTypesExpand(false);
      setTopItemsPurchaseSubCategoryLoader(true);
      dispatch(getTopItemsPurchaseSubCategoryGraph({ number: topItemsPurchaseSubCategoryNumber, fromDate: topItemsPurchaseSubCategoryFromDate, toDate: topItemsPurchaseSubCategoryToDate, subCategories: topItemsProductTypes }));
    }
    if (filter == 'leastItemsPurchaseSubCategoryFilter') {
      if (!leastItemsPurchaseSubCategoryFromDate || !leastItemsPurchaseSubCategoryToDate) {
        alert('Please select both "From" and "To" dates.');
        return;
      }

      if (leastItemsPurchaseSubCategoryFromDate > leastItemsPurchaseSubCategoryToDate) {
        alert('"From" date should be earlier than "To" date.');
        return;
      }
      setLeastItemsTypesExpand(false);
      setLeastItemsPurchaseSubCategoryLoader(true);
      dispatch(getLeastItemsPurchaseSubCategoryGraph({ number: leastItemsPurchaseSubCategoryNumber, fromDate: leastItemsPurchaseSubCategoryFromDate, toDate: leastItemsPurchaseSubCategoryToDate, subCategories: leastItemsProductTypes }));
    }
  };

  const handleAllSelect = (type, checked) => {
    type === 'top' && setTopItemsProductTypes(st => st.map(el => ({ ...el, checked })));
    type === 'least' && setLeastItemsProductTypes(st => st.map(el => ({...el, checked })));
  };

  return (
    <>
      <div className='row'>
        {/* Top Items Sub Category */}
        <div className='col-lg-12 col-md-12 col-sm-12'>
          <div className='chart-area item-chart'>
            <div className='value-title'>
              <h1 className='heading'>Top Items Sub Category</h1>
              <div className='group-form'>
                <button className='btn-style-one' onClick={() => applyItemsPurchaseSubCategoryFilters('topItemsPurchaseSubCategoryFilter')}>Apply </button>
              </div>
            </div>
            <div className='chart-title'>
              <div className='group-form'>
                <label>From: </label>
                <DatePicker
                  selected={topItemsPurchaseSubCategoryFromDate}
                  onChange={date => setTopItemsPurchaseSubCategoryFromDate(date)}
                  dateFormat="dd-MM-yyyy"
                />
              </div>
              <div className='group-form'>
                <label>To: </label>
                <DatePicker
                  selected={topItemsPurchaseSubCategoryToDate}
                  onChange={date => setTopItemsPurchaseSubCategoryToDate(date)}
                  dateFormat="dd-MM-yyyy"
                />
              </div>
              <div className='group-form'>
                <label htmlFor='name'>No. of Products:</label>
                <input
                  id='topItemsPurchaseSubCategoryNumber'
                  name='topItemsPurchaseSubCategoryNumber'
                  defaultValue={topItemsPurchaseSubCategoryNumber}
                  onChange={(e) => setTopItemsPurchaseSubCategoryNumber(e.target.value)} />
              </div>
              <div className='comined-chart sub-category group-form'>
                {/* <label htmlFor='name'>Select Sub Category:</label> */}
                <div className='dropdown-checkbox orders-filters'>
                  <div style={{ display: 'flex', position: 'reletive', alignItems: 'center', cursor: 'pointer' }} onClick={() => setTopItemsTypesExpand(!topItemsTypesExpand)}>
                    <div>Select Sub Category</div>
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

            {topItemsPurchaseSubCategoryGraphData ?
              <div>
                <div>
                  <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                    <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    </FormGroup>
                  </FormControl>
                </div>
                {topItemsPurchaseSubCategoryLoader ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                  </div>
                ) : (
                  <>
                    <ReactApexChart className="chart-height" options={topItemsPurchaseSubCategoryGraphData.options} series={topItemsPurchaseSubCategoryGraphData.series} type="line" height={300} />
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
                                checked={showTopItemsPurchaseSubCategoryEarningsGraph}
                                onChange={() => setShowTopItemsPurchaseSubCategoryEarningsGraph(!showTopItemsPurchaseSubCategoryEarningsGraph)}
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
                                checked={showTopItemsPurchaseSubCategoryOrdersGraph}
                                onChange={() => setShowTopItemsPurchaseSubCategoryOrdersGraph(!showTopItemsPurchaseSubCategoryOrdersGraph)}
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
        {/* Least Items Sub Category */}
        <div className='col-lg-12 col-md-12 col-sm-12'>
          <div className='chart-area item-chart'>
            <div className='value-title'>
              <h1 className='heading'>Least Items Sub Category</h1>
              <div className='group-form'>
                <button className='btn-style-one' onClick={() => applyItemsPurchaseSubCategoryFilters('leastItemsPurchaseSubCategoryFilter')}>Apply</button>
              </div>
            </div>
            <div className='chart-title'>
              <div className='group-form'>
                <label>From: </label>
                <DatePicker
                  selected={leastItemsPurchaseSubCategoryFromDate}
                  onChange={date => setLeastItemsPurchaseSubCategoryFromDate(date)}
                  dateFormat="dd-MM-yyyy"
                />
              </div>
              <div className='group-form'>
                <label>To: </label>
                <DatePicker
                  selected={leastItemsPurchaseSubCategoryToDate}
                  onChange={date => setLeastItemsPurchaseSubCategoryToDate(date)}
                  dateFormat="dd-MM-yyyy"
                />
              </div>
              <div className='group-form'>
                <label htmlFor='name'>No. of Products:</label>
                <input
                  id='leastItemsPurchaseSubCategoryNumber'
                  name='leastItemsPurchaseSubCategoryNumber'
                  defaultValue={leastItemsPurchaseSubCategoryNumber}
                  onChange={(e) => setLeastItemsPurchaseSubCategoryNumber(e.target.value)} />
              </div>
              <div className='comined-chart sub-category group-form'>
                {/* <label htmlFor='name'>Select Sub Category:</label> */}
                <div className='dropdown-checkbox orders-filters'>
                  <div style={{ display: 'flex', position: 'reletive', alignItems: 'center', cursor: 'pointer' }} onClick={() => setLeastItemsTypesExpand(!leastItemsTypesExpand)}>
                    <div>Select Sub Category</div>
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

            {leastItemsPurchaseSubCategoryGraphData ?
              <div>
                <div>
                  <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                    <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    </FormGroup>
                  </FormControl>
                </div>
                {leastItemsPurchaseSubCategoryLoader ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                  </div>
                ) : (
                  <>
                    <ReactApexChart className="chart-height" options={leastItemsPurchaseSubCategoryGraphData.options} series={leastItemsPurchaseSubCategoryGraphData.series} type="line" height={300} />
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
                                checked={showLeastItemsPurchaseSubCategoryEarningsGraph}
                                onChange={() => setShowLeastItemsPurchaseSubCategoryEarningsGraph(!showLeastItemsPurchaseSubCategoryEarningsGraph)}
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
                                checked={showLeastItemsPurchaseSubCategoryOrdersGraph}
                                onChange={() => setShowLeastItemsPurchaseSubCategoryOrdersGraph(!showLeastItemsPurchaseSubCategoryOrdersGraph)}
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

export default SubCategoriesCharts;