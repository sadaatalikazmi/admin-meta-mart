import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import '../index.css';
import ItemsCharts from './ItemsCharts';
import CategoriesCharts from './CategoriesCharts'; 
import ByCategoriesCharts from './ByCategoriesCharts';
import SubCategoriesCharts from './SubCategoriesCharts';

const ItemsCategoriesCharts = () => {

  return (
    <>
    <div className='content'>
      <div className='top-heading-area home-header'>
        <h3>Items & Categories</h3>
      </div>
      <div className='chart-container combined-chart'>
        <Tabs>
          <TabList>
            <Tab>Items</Tab>
            <Tab>Categories</Tab>
            <Tab>By Categories</Tab>
            <Tab>Sub Categories</Tab>
          </TabList>

          {/* Items */}
          <TabPanel>
            <ItemsCharts />
          </TabPanel>

          {/* Categories */}
          <TabPanel>
            <CategoriesCharts />
          </TabPanel>

          {/* By Categories */}
          <TabPanel>
            <ByCategoriesCharts />
          </TabPanel>

           {/* Sub Categories */}
           <TabPanel>
            <SubCategoriesCharts />
          </TabPanel>

        </Tabs>
      </div>
      </div>
    </>
  );
};

export default ItemsCategoriesCharts;