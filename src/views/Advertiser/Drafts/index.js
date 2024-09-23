import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Edit, Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

import './index.css';
import { getUserDrafts, discardDraftCampaign } from '../../../store/actions/Banner';
import EnhancedTable from '../../../components/table';

const Drafts = (props) => {
  const dispatch = useDispatch();
  const { userDrafts } = useSelector(st => st.Banners);

  const [selected, setSelected] = useState([]);
  const [filteredDrafts, setFilteredDrafts] = useState([]);
  const [filters, setFilters] = useState({ id: '', adName: '', category: '' });

  useEffect(() => dispatch(getUserDrafts()), []);

  useEffect(() => setFilteredDrafts(userDrafts), [userDrafts]);

  useEffect(() => {
    if (!userDrafts) return;

    setFilteredDrafts(userDrafts.filter(el => {
      let condition = true;

      if (filters.id) condition = condition && el.id && el.id.toString().includes(filters.id.toString());
      if (filters.adName) condition = condition && el.adName && el.adName.toLowerCase().includes(filters.adName.toLowerCase());
      if (filters.category) condition = condition && el.category && el.category.toLowerCase().includes(filters.category.toLowerCase());

      return condition;
    }))
  }, [filters]);

  const draftColumns = [
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
  ];

  return (
    <div className='content'>
      <div className='main-container mintedNFT order-table-page'>
        <div className='top-heading-area'>
          <h3>Draft Campaigns</h3>
          <div className='btn-group'>
            <CSVLink data={filteredDrafts.map(el => {
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

        {/* DRAFT TABLE */}
        <EnhancedTable
          rows={filteredDrafts}
          columns={draftColumns}
          count={filteredDrafts.length}
          selected={selected}
          setSelected={setSelected}
          showActions
          showActionButtons
          className="order-table-page"
          actionButtons={[
            {
              component: row => (
                <Tooltip title={'Edit Draft'}>
                  <IconButton
                    size='small'
                    onClick={() => props.history.push({
                      pathname: `/advertiser/createBanner`,
                      state: { campaignId: row.id },
                    })}
                  >
                    <Edit fontSize='small' />
                  </IconButton>
                </Tooltip>
              )
            },
            {
              component: row => (
                <Tooltip title={'Discard Draft'}>
                  <IconButton
                    size='small'
                    onClick={() => dispatch(discardDraftCampaign(row.id))}
                  >
                    <Delete fontSize='small' />
                  </IconButton>
                </Tooltip>
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
          ]}
        />
      </div>
    </div>
  );
};

export default Drafts;