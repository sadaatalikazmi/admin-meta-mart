import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { toast } from 'react-toastify';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import './index.css';
import { getAllBanners, setAllBanners, setBannerStatus } from '../../store/actions/Banner';
import EnhancedTable from '../../components/table';
import ImportDataModal from '../../components/Modal/index';
import ChangeStatusModal from '../../components/ChangeStatusModal';

const Banners = (props) => {
  const dispatch = useDispatch();
  const { allBanners } = useSelector(st => st.Banners);

  const [selected, setSelected] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [filteredBanners, setFilteredBanners] = useState([]);
  const [bannerId, setBannerId] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isStatusModal, setIsStatusModal] = useState(false);
  const [message, setMessage] = useState('');
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [filters, setFilters] = useState({ id: '', adName: '', category: '', amount: '', status: '' });

  const getBannersColors = (status) => {
    switch (status) {
      case 'active':
        return {
          backgroundColor: '#03A9F4',
          color: '#fff'
        }
      case 'pending':
        return {
          backgroundColor: '#FFC107',
          color: '#fff'
        }
      case 'approved':
        return {
          backgroundColor: '#00C853',
          color: '#fff'

        }
      case 'suspended':
        return {
          backgroundColor: '#808080',
          color: '#fff'

        }
      case 'rejected':
        return {
          backgroundColor: '#D50000',
          color: '#fff'
        }
      case 'expired':
        return {
          backgroundColor: '#673AB7',
          color: '#fff'
        }

      default: return {
        backgroundColor: '#00C853',
        color: '#fff'
      }
    }
  };

  useEffect(() => dispatch(getAllBanners()), []);

  useEffect(() => setFilteredBanners(allBanners), [allBanners]);

  useEffect(() => {
    if (!allBanners) return;

    setFilteredBanners(allBanners.filter(el => {
      let condition = true;

      if (filters.id) condition = condition && el.id && el.id.toString().includes(filters.id.toString());
      if (filters.adName) condition = condition && el.adName && el.adName.toLowerCase().includes(filters.adName.toLowerCase());
      if (filters.category) condition = condition && el.category && el.category.toLowerCase().includes(filters.category.toLowerCase());
      if (filters.amount) condition = condition && el.amount && el.amount.includes(filters.amount.toString());
      if (filters.status) condition = condition && el.status && el.status.toLowerCase().includes(filters.status.toLowerCase());

      return condition;
    }));
  }, [filters]);

  const toggleStatusModal = () => {
    setMessage('');
    setIsStatusModal(!isStatusModal);
  };

  const changeStatus = () => {
    if ((selectedStatus === 'approved' || selectedStatus === 'suspended' || selectedStatus === 'rejected') && message === '') return toast.error('Please enter message');
    setIsStatusLoading(true);

    const updatedBanners = allBanners.map(banner => {
      if (banner.id === bannerId) {
        return {
          ...banner,
          status: selectedStatus
        };
      }
      return banner;
    });

    dispatch(setBannerStatus({ campaignId: bannerId, status: selectedStatus, message }));
    dispatch(setAllBanners({ data: updatedBanners }));
    setIsStatusLoading(false);
    toggleStatusModal();
  };

  const handleStatusChange = (bannerId, bannerStatus) => {
    setBannerId(bannerId);
    setSelectedStatus(bannerStatus);

    if (bannerStatus === 'approved' || bannerStatus === 'suspended' || bannerStatus === 'rejected') return toggleStatusModal();
    else {
      const updatedBanners = allBanners.map(banner => {
        if (banner.id === bannerId) {
          return {
            ...banner,
            status: bannerStatus
          };
        }
        return banner;
      });

      dispatch(setBannerStatus({ campaignId: bannerId, status: bannerStatus, message }));
      dispatch(setAllBanners({ data: updatedBanners }));
    }
  };

  const viewBannerDetails = (banner) => {
    props.history.push(`/home/banners/${banner.id}`);
  };

  const bannerColumns = [
    {
      label: 'ID',
      accessor: 'id',
      id: 'id',
      filterable: true
    },
    {
      label: 'Campaign Name',
      accessor: 'adName',
      id: 'adName'
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
  ];

  return (
    <div className='content'>
      <div className='main-container mintedNFT banner-table-page order-table-page'>
        <div className='top-heading-area'>
          <h3>All Ads</h3>
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
            <button onClick={() => setOpenModal(true)} className="btn-style-one">
              Import Data
            </button>
            <ImportDataModal isOpen={openModal} closeModal={() => setOpenModal(false)} />
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
          actionButtons={[
            {
              component: row => (
                <select
                  size='small'
                  value={row.status}
                  className='banners-select'
                  defaultValue={row.status}
                  disabled={['active', 'approved', 'rejected', 'expired'].includes(row.status)}
                  onChange={(event) => { handleStatusChange(row.id, event.target.value) }}
                  style={{
                    ...getBannersColors(row.status),
                    opacity: ['active', 'approved', 'rejected', 'expired'].includes(row.status) ? 0.25 : 1,
                  }}
                >
                  {row.status === 'active' && <option value={row.status} style={{ color: '#03A9F4', backgroundColor: '#fff' }}>{row.status.toUpperCase()}</option>}
                  {row.status === 'pending' && <option value={row.status} style={{ color: '#FFC107', backgroundColor: '#fff' }}>{row.status.toUpperCase()}</option>}
                  {row.status === 'expired' && <option value={row.status} style={{ color: '#673AB7', backgroundColor: '#fff' }}>{row.status.toUpperCase()}</option>}
                  {row.status !== 'approved' && <option value='approved' style={{ color: '#00C853', backgroundColor: '#fff' }}>APPROVED</option>}
                  {row.status !== 'suspended' && <option value='suspended' style={{ color: '#808080', backgroundColor: '#fff' }}>SUSPENDED</option>}
                  {row.status === 'approved' && <option value={row.status} style={{ color: '#00C853', backgroundColor: '#fff' }}>{row.status.toUpperCase()}</option>}
                  {row.status === 'suspended' && <option value={row.status} style={{ color: '#808080', backgroundColor: '#fff' }}>{row.status.toUpperCase()}</option>}
                </select>
              )
            }
          ]}

          actions={[{
            component:
              <Tooltip title={'View Details'}>
                <IconButton size='small'>
                  <VisibilityIcon fontSize='small' />
                </IconButton>
              </Tooltip>,
            onClick: row => viewBannerDetails(row)
          }]}

          // specialTableRows={[{
          //   accessor: 'Status',
          //   id: 'status',
          //   type: 'banners',
          //   label: 'status',
          //   onChange: handleStatusChange
          // }]}

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
          ]}
        />
      </div>

      <ChangeStatusModal
        isStatusModal={isStatusModal}
        toggleStatusModal={toggleStatusModal}
        status={selectedStatus}
        message={message}
        setMessage={setMessage}
        changeStatus={changeStatus}
        isLoading={isStatusLoading}
      />

    </div>
  );
};

export default Banners;