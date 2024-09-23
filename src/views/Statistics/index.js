import { Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect, useMemo } from 'react';
import DatePicker from 'react-datepicker';

import './index.css';
import StatsCard from './StatsCard';
import HotProducts from './HotProducts';
import { getOrdersStats, getCombinedOrdersGraph, getCombinedEarningsGraph, getCountriesGraph, getGendersGraph } from '../../store/actions/Order';
import { getAllOrders } from '../../store/actions/Customer';
import { getHotProducts } from '../../store/actions/Product';
import { getAllUsers, getCustomersGraph } from '../../store/actions/User';
import ImportDataModal from '../../components/Modal/index';
import SalesCharts from './SalesCharts';

const Customer = () => {
  const todayDate = new Date();
  const priorDate = new Date(new Date().setDate(todayDate.getDate() - 30));

  const dispatch = useDispatch();
  const { allOrders } = useSelector(st => st.Orders);
  const { hotProducts } = useSelector(st => st.Product);
  const { allUsers } = useSelector(st => st.User);

  // STATES
  const [state, setState] = useState({
    chartTimeline: '7d',
    totalCustomersFilter: 'max',
    totalOrdersFilter: 'max',
    completedOrdersFilter: 'max',
    returnOrdersFilter: 'max',
    totalSalesFilter: 'max',
    pendingSalesFilter: 'max',
    grossSalesFilter: 'max',
    averagePriceFilter: 'max',
  });

  const {
    total_orders_stats,
    completed_order_stats,
    cancelled_order_stats,
    total_sales_stats,
    pending_sales_stats,
    gross_sales_stats,
    average_price_stats,
    total_coustomers_stats
  } = useSelector(st => st.Orders.stats);

  const [openModal, setOpenModal] = useState(false);

  const [ordersStatsLoader, setOrdersStatsLoader] = useState(false);
  const [ordersStatsFromDate, setOrdersStatsFromDate] = useState(priorDate);
  const [ordersStatsToDate, setOrdersStatsToDate] = useState(todayDate);

  // const [readMore, setReadMore] = useState([]);

  useEffect(() => {
    setOrdersStatsLoader(false);
  }, [
    total_orders_stats,
    completed_order_stats,
    cancelled_order_stats,
    total_sales_stats,
    pending_sales_stats,
    gross_sales_stats,
    average_price_stats,
    total_coustomers_stats
  ]);

  useEffect(() => {
    if (!hotProducts) return;
    // setReadMore(Array(hotProducts.length).fill(false))
  }, [hotProducts])

  useEffect(() => {
    dispatch(getCountriesGraph());
    dispatch(getGendersGraph());
    dispatch(getCombinedOrdersGraph());
    dispatch(getCombinedEarningsGraph());
    dispatch(getCustomersGraph());
    dispatch(getHotProducts());
    dispatch(getOrdersStats());

    if (allOrders.length === 0) dispatch(getAllOrders());
    if (allUsers.length === 0) dispatch(getAllUsers());
  }, []);

  const handleAveragePriceChange = filter => setState(st => ({ ...st, averagePriceFilter: filter }));
  const handleTotalGrossFilterChange = filter => setState(st => ({ ...st, grossSalesFilter: filter }));
  const handleTotalSalesFilterChange = filter => setState(st => ({ ...st, totalSalesFilter: filter }));
  const handleTotalOrdersFilterChange = filter => setState(st => ({ ...st, totalOrdersFilter: filter }));
  const handlePendingSalesFilterChange = filter => setState(st => ({ ...st, pendingSalesFilter: filter }));
  const handleReturnOrdersFilterChange = filter => setState(st => ({ ...st, returnOrdersFilter: filter }));
  const handleTotalCustomersFilterChange = filter => setState(st => ({ ...st, totalCustomersFilter: filter }));
  const handleCompletedOrdersFilterChange = filter => setState(st => ({ ...st, completedOrdersFilter: filter }));
  const {
    totalCustomersFilter, totalOrdersFilter, completedOrdersFilter,
    pendingSalesFilter, totalSalesFilter, returnOrdersFilter, grossSalesFilter, averagePriceFilter
  } = state;

  const pieOptions = {
    maintainAspectRatio: false
  };

  const userIdCounts = allOrders.reduce((counts, order) => {
    // Convert userId to a string representation
    const userId = JSON.stringify(order.userId);

    counts[userId] = (counts[userId] || 0) + 1;
    return counts;
  }, {});
  // Initialize sets for repeat buyers and new customers
  const repeatBuyerUserIds = new Set();
  const newCustomerUserIds = new Set();

  // Iterate over user IDs and categorize them
  Object.keys(userIdCounts).forEach(userId => {
    const orderCount = userIdCounts[userId];
    if (orderCount > 1) {
      repeatBuyerUserIds.add(userId);
    } else {
      newCustomerUserIds.add(userId);
    }
  });

  // Count the number of repeat buyers and new customers
  const repeatBuyersCount = repeatBuyerUserIds.size;
  const newCustomersCount = newCustomerUserIds.size;
  const pieData = {
    labels: ['New Customers', 'Repeat Buyers'],
    datasets: [
      {
        data: [newCustomersCount, repeatBuyersCount],
        backgroundColor: [
          'rgba(75, 192, 192, 0.4)',
          'rgba(192, 75, 75, 0.4)'
        ],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(192, 75, 75, 1)'],
        borderWidth: 2
      }
    ]
  };
  const totalAmountSums = allOrders.reduce((sums, order) => {
    const { userId, totalAmount } = order;
    if (userId && userId.name) {
      const name = userId.name; // Access the 'name' property from the 'userId' object
      if (!sums[name]) {
        sums[name] = {
          count: 0,
          totalAmount: 0
        };
      }
      sums[name].count++;
      sums[name].totalAmount += parseFloat(totalAmount);
    }
    return sums;
  }, {});

  // Filtered data based on the active filters
  const filteredTotalSales =
    useMemo(() => {
      if (!total_sales_stats) return 0;
      return totalSalesFilter === '7d'
        ? total_sales_stats.stats_7d
        : totalSalesFilter === '1m'
          ? total_sales_stats.stats_1m
          : total_sales_stats.stats_max;

    }, [total_sales_stats, totalSalesFilter])

  const filteredPendingSales =
    useMemo(() => {
      if (!pending_sales_stats) return 0;
      return pendingSalesFilter === '7d'
        ? pending_sales_stats.stats_7d
        : pendingSalesFilter === '1m'
          ? pending_sales_stats.stats_1m
          : pending_sales_stats.stats_max;

    }, [pending_sales_stats, pendingSalesFilter])

  const filteredGrossSales =
    useMemo(() => {
      if (!gross_sales_stats) return 0;
      return grossSalesFilter === '7d'
        ? gross_sales_stats.stats_7d
        : grossSalesFilter === '1m'
          ? gross_sales_stats.stats_1m
          : gross_sales_stats.stats_max;

    }, [gross_sales_stats, grossSalesFilter])

  const filteredAveragegPrice =
    useMemo(() => {
      if (!average_price_stats) return 0;
      return averagePriceFilter === '7d'
        ? average_price_stats.stats_7d
        : averagePriceFilter === '1m'
          ? average_price_stats.stats_1m
          : average_price_stats.stats_max;

    }, [average_price_stats, averagePriceFilter])

  const filteredTotalCustomers =
    useMemo(() => {
      if (!total_coustomers_stats) return 0;
      return totalCustomersFilter === '7d'
        ? total_coustomers_stats.stats_7d
        : totalCustomersFilter === '1m'
          ? total_coustomers_stats.stats_1m
          : total_coustomers_stats.stats_max;

    }, [total_coustomers_stats, totalCustomersFilter])

  const filteredTotalOrders =
    useMemo(() => {
      if (!total_orders_stats) return 0;
      return totalOrdersFilter === '7d'
        ? total_orders_stats.stats_7d
        : totalOrdersFilter === '1m'
          ? total_orders_stats.stats_1m
          : total_orders_stats.stats_max;

    }, [total_orders_stats, totalOrdersFilter])

  const filteredCompletedOrders =
    useMemo(() => {
      if (!completed_order_stats) return 0;
      return completedOrdersFilter === '7d'
        ? completed_order_stats.stats_7d
        : completedOrdersFilter === '1m'
          ? completed_order_stats.stats_1m
          : completed_order_stats.stats_max;

    }, [completed_order_stats, completedOrdersFilter])

  const filteredReturnOrders =
    useMemo(() => {
      if (!cancelled_order_stats) return 0;
      return returnOrdersFilter === '7d'
        ? cancelled_order_stats.stats_7d
        : returnOrdersFilter === '1m'
          ? cancelled_order_stats.stats_1m
          : cancelled_order_stats.stats_max;

    }, [cancelled_order_stats, returnOrdersFilter])

  const stats_cards = useMemo(
    () => {
      return [
        {
          id: 1,
          title: 'Net Sales',
          value: filteredTotalSales ? filteredTotalSales : 0,
          filter: totalSalesFilter,
          handleFilterChange: handleTotalSalesFilterChange
        },
        {
          id: 2,
          title: 'Pending Sales',
          value: filteredPendingSales ? filteredPendingSales : 0,
          filter: pendingSalesFilter,
          handleFilterChange: handlePendingSalesFilterChange
        },
        {
          id: 3,
          title: 'Gross Sales',
          value: filteredGrossSales ? filteredGrossSales : 0,
          filter: grossSalesFilter,
          handleFilterChange: handleTotalGrossFilterChange
        },
        {
          id: 4,
          title: 'Average Price',
          value: filteredAveragegPrice ? filteredAveragegPrice.toFixed(2) : 0,
          filter: averagePriceFilter,
          handleFilterChange: handleAveragePriceChange
        },
        {
          id: 5,
          title: 'Total Customers',
          value: filteredTotalCustomers ? filteredTotalCustomers : 0,
          filter: totalCustomersFilter,
          handleFilterChange: handleTotalCustomersFilterChange
        },
        {
          id: 6,
          title: 'Total Orders',
          value: filteredTotalOrders ? filteredTotalOrders : 0,
          filter: totalOrdersFilter,
          handleFilterChange: handleTotalOrdersFilterChange
        },
        {
          id: 7,
          title: 'Completed Orders',
          value: filteredCompletedOrders ? filteredCompletedOrders : 0,
          filter: completedOrdersFilter,
          handleFilterChange: handleCompletedOrdersFilterChange
        },
        {
          id: 8,
          title: 'Return Orders',
          value: filteredReturnOrders ? filteredReturnOrders : 0,
          filter: returnOrdersFilter,
          handleFilterChange: handleReturnOrdersFilterChange
        }
      ]
    },
    [
      filteredTotalSales,
      filteredPendingSales,
      filteredGrossSales,
      filteredAveragegPrice,
      filteredTotalCustomers,
      filteredTotalOrders,
      filteredCompletedOrders,
      filteredReturnOrders,
      totalSalesFilter,
      grossSalesFilter,
      averagePriceFilter,
      totalCustomersFilter,
      totalOrdersFilter,
      completedOrdersFilter,
      returnOrdersFilter,
      pendingSalesFilter
    ]
  );

  const applyOrdersStatsFilters = () => {
    if (!ordersStatsFromDate || !ordersStatsToDate) {
      alert('Please select both "From" and "To" dates.');
      return;
    }

    if (ordersStatsFromDate > ordersStatsToDate) {
      alert('"From" date should be earlier than "To" date.');
      return;
    }

    setOrdersStatsLoader(true);
    dispatch(getOrdersStats({ fromDate: ordersStatsFromDate, toDate: ordersStatsToDate }));
  }
  
  return (
    <div className='content'>
      <div className='top-heading-area home-header'>
        <h3>Statistics</h3>
        <button onClick={() => setOpenModal(true)} className="btn-style-one">
          Import Data
        </button>
        <ImportDataModal isOpen={openModal} closeModal={() => setOpenModal(false)} />
      </div>
      <div className='chart-home'>
        <div className='chart-title'>
            <div className='group-form'>
              <label>From: </label>
              <DatePicker
                selected={ordersStatsFromDate}
                onChange={date => setOrdersStatsFromDate(date)}
                dateFormat="dd-MM-yyyy"
              />
            </div>
            <div className='group-form'>
              <label>To: </label>
              <DatePicker
                selected={ordersStatsToDate}
                onChange={date => setOrdersStatsToDate(date)}
                dateFormat="dd-MM-yyyy"
              />
            </div>
            <div>
              <button className='btn-style-one' onClick={() => applyOrdersStatsFilters()}>
                  Apply
              </button>
            </div>
        </div>
      </div>
      {
        ordersStatsLoader ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
            <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
          </div>
        ) : (
          <div className='top-bar'>
            {stats_cards.map(({ title, value, filter, handleFilterChange }) => (
              <StatsCard key={title} value={value} title={title} filter={filter} handleFilterChange={handleFilterChange} />
            ))}
          </div>
        )
      }

      {/* Value Sales Chart */}
      <SalesCharts />

      <div className='bottom-box'>
        {/* Repeat Buyers PieChart*/}
        <div className='pie-chart-container'>
          <Pie data={pieData} options={pieOptions}
            height={400}
            width={300}
          />
        </div>
        
        {/* Hot Products */}
        <HotProducts hotProducts={hotProducts} />
      </div>
      <div className='charts'></div>

    </div>
  );
}

export default Customer;