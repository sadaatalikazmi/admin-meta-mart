import React from 'react';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StatsCard = ({ title, filter, value, handleFilterChange }) => {
  return (
    <div
      className={`top-box ${filter === '7d' ? 'active' : ''}`}
    >
      <h3 className='box-h3'>
        <FontAwesomeIcon icon={faChartLine} className='sales-icon' />
      </h3>
      <h3 className='box-h3'>{title}</h3>
      <p className='box-counter sales'>
        {(title.includes('Sales') || title.includes('Price')) ? `${value}$` : value}
      </p>
      {/* <div className='filter-buttons'>
        <button
          className={`filter-button  ${filter === '7d' ? 'active' : ''
            }`}
          onClick={() => handleFilterChange('7d')}
        >
          7 Days
        </button>
        <button
          className={`filter-button ${filter === '1m' ? 'active' : ''
            }`}
          onClick={() => handleFilterChange('1m')}
        >
          1 Month
        </button>
        <button
          className={`filter-button ${filter === 'max' ? 'active' : ''
            }`}
          onClick={() => handleFilterChange('max')}
        >
          Max
        </button>
      </div> */}
    </div>
  )
}

export default StatsCard