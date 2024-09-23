import ReactApexChart from 'react-apexcharts';
import React, { useEffect, useState } from 'react'
import CircleIcon from '@mui/icons-material/Circle';
import { connect, useDispatch, useSelector } from 'react-redux';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { getEaringsOrdersGraph, getOrdersGraph } from '../../store/actions/Order';
import { Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';

const earningsGraphid = "earnings-chart"
const colors = [ "#0074D9", "#2ECC40", "#FF4136", "#B10DC9", "#FF851B", "#39CCCC", "#FFDC00", "#F012BE", "#AAAAAA", "#00000000", "#ffffff00"];
const chartOptions = {
  legend: {
    show: false
  },
  chart: {
    id: earningsGraphid,
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

const OrdersChart = () => {

  const dispatch = useDispatch();
  const [orderChartData, setOrderChartData] = useState();
  const [chartTimeline, setChartTimeline] = useState('1m');
  const { ordersGraph, earningsGraph } = useSelector(st => st.Orders)

  const [barChartTimeline, setBarChartTimeline] = useState('1m')

  const [barChartData, setBarChartData] = useState()
  const [orderSeries, setOrderSeries] = React.useState([
    { id: 1, checked: true, name: 'Total Orders', },
    { id: 2, checked: true, name: 'Completed Orders', },
    { id: 3, checked: true, name: 'Cancelled Orders', },
    { id: 4, checked: true, name: 'Pending Orders', },
  ]);

  const [earningSeries, setEarningSeries] = React.useState([
    { id: 1, checked: true, name: 'All Earnings' },
    { id: 2, checked: true, name: 'Snacks Earnings' },
    { id: 3, checked: true, name: 'Dairy Earnings' },
    { id: 4, checked: true, name: 'Grocery Earnings' },
    { id: 5, checked: true, name: 'Fruits Earnings' },
    { id: 6, checked: true, name: 'Softdrinks Earnings' },
    { id: 7, checked: true, name: 'Cheese Earnings' },
    { id: 8, checked: true, name: 'Sweets Earnings' },
    { id: 9, checked: true, name: 'Meat Earnings' },
  ]);

  const handleChange = (event) => {
    setOrderSeries(
      st => st.map(el => +el.id === +event.target.name ? { ...el, checked: event.target.checked } : el)
    );
  };

  const handleEarningChange = (event) => {
    setEarningSeries(
      st => st.map(el => +el.id === +event.target.name ? { ...el, checked: event.target.checked } : el)
    );
  };


  useEffect(() => {
    dispatch(getOrdersGraph())
    dispatch(getEaringsOrdersGraph())
  }, [])

  useEffect(() => {
    if (!earningsGraph) return;
    switch (barChartTimeline) {
      case 'hourly':
        setBarChartData(earningsGraph.graph_hourly);
        break;
      case 'weekly':
        setBarChartData(earningsGraph.graph_weekly);
        break;
      case '1m':
        setBarChartData(earningsGraph.graph_1m);
        break;
      default:
        setBarChartData(earningsGraph.graph_weekly)
    }
  }, [barChartTimeline, earningsGraph]);


  useEffect(() => {
    if (!earningsGraph) return;
    switch (barChartTimeline) {
      case 'hourly':
        setBarChartData({ options: { ...chartOptions, dataLabels: { enabled: false }, stroke: { width: 1 }, xaxis: { categories: earningsGraph.graph_hourly.labels } }, series: earningsGraph.graph_hourly.series.filter(el => earningSeries.find(st => st.id === el.id && st.checked)) });
        break;
      case 'weekly':
        setBarChartData({ options: { ...chartOptions, dataLabels: { enabled: false }, stroke: { width: 1 }, xaxis: { categories: earningsGraph.graph_weekly.labels } }, series: earningsGraph.graph_weekly.series.filter(el => earningSeries.find(st => st.id === el.id && st.checked)) });
        break;
      case '1m':
        setBarChartData({ options: { ...chartOptions, dataLabels: { enabled: false }, stroke: { width: 1 }, xaxis: { categories: earningsGraph.graph_1m && earningsGraph.graph_1m.labels } }, series: earningsGraph.graph_1m && earningsGraph.graph_1m.series.filter(el => earningSeries.find(st => st.id === el.id && st.checked)) });
        break;
      default:
        setBarChartData({ options: { ...chartOptions, dataLabels: { enabled: false }, stroke: { width: 1 }, xaxis: { categories: earningsGraph.graph_weekly.labels } }, series: earningsGraph.graph_weekly.series.filter(el => earningSeries.find(st => st.id === el.id && st.checked)) })
    }
  }, [barChartTimeline, earningsGraph, earningSeries]);

  useEffect(() => {
    if (!ordersGraph) return;
    switch (chartTimeline) {
      case 'hourly':
        setOrderChartData({ options: { ...chartOptions, dataLabels: { enabled: false }, stroke: { width: 1 }, xaxis: { categories: ordersGraph.graph_hourly.labels } }, series: ordersGraph.graph_hourly.series.filter(el => orderSeries.find(st => st.id === el.id && st.checked)) });
        break;
      case 'weekly':
        setOrderChartData({ options: { ...chartOptions, dataLabels: { enabled: false }, stroke: { width: 1 }, xaxis: { categories: ordersGraph.graph_weekly.labels } }, series: ordersGraph.graph_weekly.series.filter(el => orderSeries.find(st => st.id === el.id && st.checked)) });
        break;
      case '1m':
        setOrderChartData({ options: { ...chartOptions, dataLabels: { enabled: false }, stroke: { width: 1 }, xaxis: { categories: ordersGraph.graph_1m.labels } }, series: ordersGraph.graph_1m.series.filter(el => orderSeries.find(st => st.id === el.id && st.checked)) });
        break;
      default:
        setOrderChartData({ options: { ...chartOptions, dataLabels: { enabled: false }, stroke: { width: 1 }, xaxis: { categories: ordersGraph.graph_weekly.labels } }, series: ordersGraph.graph_weekly.series.filter(el => orderSeries.find(st => st.id === el.id && st.checked)) })
    }
  }, [chartTimeline, ordersGraph, orderSeries]);


  return (
    <div className='charts'>
      <div className='chart-container'>
        <h1 className='heading'>Total Orders</h1>
        {ordersGraph && orderChartData &&
          <div>
            <div>
              <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                <h2 className='heading2'>Filter</h2>
                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                  {orderSeries.map((item, idx) =>
                    <FormControlLabel
                      control={
                        <Checkbox sx={{
                          color: colors[idx],
                          '&.Mui-checked': {
                            color: colors[idx],
                          },
                        }}
                          icon={<CircleOutlinedIcon />}
                          checkedIcon={<CircleIcon />}
                          checked={orderSeries.find(el => +el.id === +item.id).checked} onChange={handleChange} name={item.id} />
                      }
                      label={item.name}
                    />
                  )
                  }
                </FormGroup>
              </FormControl>
            </div>
            <ReactApexChart className="chart-height" options={orderChartData.options} series={orderChartData.series} type="area" height={300} />
          </div>
        }
        <div className='timeline-buttons'>
          <button
            className={`filter-button ${chartTimeline === 'hourly' ? 'active' : ''}`}
            onClick={() => setChartTimeline('hourly')}>
            Hourly
          </button>
          <button
            className={`filter-button ${chartTimeline === 'weekly' ? 'active' : ''}`}
            onClick={() => setChartTimeline('weekly')}>
            Weekly
          </button>
          <button
            className={`filter-button ${chartTimeline === '1m' ? 'active' : ''}`}
            onClick={() => setChartTimeline('1m')}>
            Daily
          </button>
        </div>
      </div>
      <div className='bar-chat-container'>
        <h1 className='heading'>Total Earnings</h1>
        {earningsGraph && barChartData &&
          <div>
            <div>
              <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                <h2 className='heading2'>Filter</h2>
                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                  {earningSeries.map((item, idx) =>
                    <FormControlLabel
                      control={
                        <Checkbox sx={{
                          color: colors[idx],
                          '&.Mui-checked': {
                            color: colors[idx],
                          },
                        }}
                          icon={<CircleOutlinedIcon />}
                          checkedIcon={<CircleIcon />}
                          checked={earningSeries.find(el => +el.id === +item.id).checked} onChange={handleEarningChange} name={item.id} />
                      }
                      label={item.name}
                    />
                  )
                  }
                </FormGroup>

              </FormControl>
            </div>
            <ReactApexChart className="chart-height" options={barChartData.options} series={barChartData.series} type="area" height={300} />
          </div>
        }
        <div className='timeline-buttons'>
          <button
            className={`filter-button ${barChartTimeline === 'hourly' ? 'active' : ''
              }`}
            onClick={() => setBarChartTimeline('hourly')}>
            Hourly
          </button>
          <button
            className={`filter-button ${barChartTimeline === 'weekly' ? 'active' : ''
              }`}
            onClick={() => setBarChartTimeline('weekly')}>
            Weekly
          </button>
          <button
            className={`filter-button ${barChartTimeline === '1m' ? 'active' : ''
              }`}
            onClick={() => setBarChartTimeline('1m')}>
            Daily
          </button>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
};

const mapStateToProps = ({ Orders }) => {
  let { ordersGraph, earningsGraph } = Orders
  return { earningsGraph, ordersGraph }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersChart);
