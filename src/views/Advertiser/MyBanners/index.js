import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Edit, GetApp } from '@mui/icons-material';
import { IconButton, Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

import './index.css';
import { getUserBanners } from '../../../store/actions/Banner';
import { togglePaymentMethodModal } from '../../../store/actions/Payments';
import EnhancedTable from '../../../components/table';
import PaymentMethodModal from '../../../components/PaymentMethodModal';
import generateInvoice from '../../../components/utils/generateInvoice';

const MyBanners = (props) => {
  const dispatch = useDispatch();
  const { userBanners } = useSelector(st => st.Banners);
  const { isPaymentMethodModal } = useSelector(st => st.Payments);

  const [selected, setSelected] = useState([]);
  const [filteredBanners, setFilteredBanners] = useState([]);
  const [filters, setFilters] = useState({ id: '', adName: '', category: '', amount: '', status: '', isPaid: '' });
  const [amount, setAmount] = useState(null);
  const [campaignId, setCampaignId] = useState(null);

  useEffect(() => dispatch(getUserBanners()), []);

  useEffect(() => setFilteredBanners(userBanners), [userBanners]);

  useEffect(() => {
    if (!userBanners) return;

    setFilteredBanners(userBanners.filter(el => {
      let condition = true;

      if (filters.id) condition = condition && el.id && el.id.toString().includes(filters.id.toString());
      if (filters.adName) condition = condition && el.adName && el.adName.toLowerCase().includes(filters.adName.toLowerCase());
      if (filters.category) condition = condition && el.category && el.category.toLowerCase().includes(filters.category.toLowerCase());
      if (filters.amount) condition = condition && el.amount && el.amount.includes(filters.amount.toString());
      if (filters.status) condition = condition && el.status && el.status.toLowerCase().includes(filters.status.toLowerCase());

      return condition;
    }))
  }, [filters]);

  const handlePayment = (campaign) => {
    setAmount(Number(campaign.remainingAmount));
    setCampaignId(campaign.id);

    dispatch(togglePaymentMethodModal(true));
  };

  const bannerColumns = [
    {
      label: 'ID',
      accessor: 'id',
      id: 'id'
    },
    {
      label: 'Campaign Name',
      accessor: 'adName',
      id: 'adName',
      filterable: true
    },
    {
      label: 'Category',
      accessor: 'category',
      id: 'category',
      filterable: true
    },
    {
      label: 'Amount',
      accessor: 'amount',
      id: 'amount'
    },
    {
      label: 'Status',
      accessor: 'status',
      id: 'status'
    },
  ];

  return (
    <div className='content'>
      <div className='main-container mintedNFT order-table-page'>
        <div className='top-heading-area'>
          <h3>My Campaigns</h3>
          <div className='btn-group'>
            <CSVLink data={filteredBanners.map(el => {
              let newObj = {
                id: el.id,
                userId: el.userId,
                category: el.category,
                type: el.type,
                amount: el.amount,
                status: el.status,
              }
              return newObj;
            })}>
              <button className="btn-style-one">Export Data</button>
            </CSVLink>
          </div>
        </div>

        {/* BANNER TABLE */}
        <EnhancedTable
          rows={filteredBanners}
          columns={bannerColumns}
          count={filteredBanners.length}
          selected={selected}
          setSelected={setSelected}
          showActions
          showActionButtons
          className="order-table-page"
          actions={[{
            component:
              <Tooltip title={'View Details'}>
                <IconButton size='small'>
                  <VisibilityIcon fontSize='small' />
                </IconButton>
              </Tooltip>,
            onClick: row => props.history.push(`/advertiser/myBanners/${row.id}`)
          }]}
          actionButtons={[
            {
              component: row => (
                <Tooltip title={'Edit Ad'}>
                  <IconButton
                    size='small'
                    disabled={row.status === 'rejected' || row.status === 'expired'}
                    onClick={() => props.history.push(`/advertiser/editBanner/${row.id}`)}
                  >
                    <Edit fontSize='small' />
                  </IconButton>
                </Tooltip>
              )
            },
            {
              component: row => (
                <Tooltip title={'Get Invoice'}>
                  <IconButton
                    size='small'
                    disabled={row.status !== 'expired'}
                    onClick={() => generateInvoice(row)}
                  >
                    <GetApp fontSize='small' />
                  </IconButton>
                </Tooltip>
              )
            },
            {
              component: row => (
                <Button
                  size='small'
                  className='btn-style-one'
                  onClick={() => handlePayment(row)}
                  disabled={row.remainingAmount === null || Number(row.remainingAmount) === 0}
                >
                  {row.remainingAmount >= 0 ? 'Pay' : row.remainingAmount < 0 ? 'Refund' : ''}
                </Button>
              )
            },
          ]}
          showFilters
          filters={[
            {
              label: 'ID',
              name: 'id',
              value: filters.id,
              type: 'text',
              id: 'id',
              handleChange: (e) => setFilters(st => ({ ...st, [e.target.name]: e.target.value }))
            },
            {
              label: 'Campaign Name',
              name: 'adName',
              value: filters.adName,
              type: 'text',
              id: 'adName',
              handleChange: (e) => setFilters(st => ({ ...st, [e.target.name]: e.target.value }))
            },
            {
              label: 'Category',
              name: 'category',
              value: filters.category,
              type: 'text',
              id: 'category',
              handleChange: (e) => setFilters(st => ({ ...st, [e.target.name]: e.target.value }))
            },
            {
              label: 'Amount',
              name: 'amount',
              value: filters.amount,
              type: 'text',
              id: 'amount',
              handleChange: (e) => setFilters(st => ({ ...st, [e.target.name]: e.target.value }))
            },
            {
              label: 'Status',
              name: 'status',
              value: filters.status,
              type: 'text',
              id: 'status',
              handleChange: (e) => setFilters(st => ({ ...st, [e.target.name]: e.target.value }))
            },
          ]}
        />

        {isPaymentMethodModal && amount && campaignId && <PaymentMethodModal amount={amount} isRedirect={false} history={props.history} bannerId={campaignId} />}

      </div>
    </div>
  );
};

export default MyBanners;