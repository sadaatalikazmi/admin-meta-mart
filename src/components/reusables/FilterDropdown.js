import React from 'react';

import ContentLoader from 'react-content-loader';
import Dropdown from 'react-bootstrap/Dropdown';

const FilterDropdown = ({ title, data = [], handleFilterClick }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant='success' id='dropdown-basic'>
        {title}
      </Dropdown.Toggle>
      <Dropdown.Menu
        style={{
          height: 180,
          overflowY: 'scroll'
        }}
      >
        {data.length > 0
          ? data.map(el => (
              <Dropdown.Item
                key={el.name}
                onClick={handleFilterClick}
                as='button'
                data-id={el._id}
              >
                {el.name}
              </Dropdown.Item>
            ))
          : Array(5)
              .fill()
              .map(el => (
                <ContentLoader
                  keu={Math.round(Math.random() * 1000)}
                  speed={2}
                  viewBox='0 0 400 90'
                  backgroundColor='#f3f3f3'
                  foregroundColor='#ecebeb'
                >
                  <rect width='600' height='60' />
                </ContentLoader>
              ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default FilterDropdown;
