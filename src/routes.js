import Statistics from './views/Statistics/index.js';
import SalesCharts from './views/Statistics/SalesCharts.js';
import ItemsCategoriesCharts from './views/Statistics/ItemsCategoriesCharts/index.js';
import Demographics from './views/Statistics/Demographics.js';
import BannersCharts from './views/Statistics/BannersCharts.js';
import Rack from './views/Racks/index.js';
import Shelf from './views/Shelf/index.js';
import Slot from './views/Slot/index.js';
import Products from './views/Products/index.js';
import Users from './views/User/index.js';
import Orders from './views/Orders/index.js';
import Banners from './views/Banners/index.js';
import Dashboard from './views/Advertiser/Dashboard/index.js';
import CreateBanner from './views/Advertiser/CreateBanner/index.js';
import MyBanners from './views/Advertiser/MyBanners/index.js';
import BannerDetails from './components/BannerDetails/index.js';
import EditBanner from './components/EditBanner/index.js';
import PaymentDetails from './views/Advertiser/PaymentDetails/index.js';
import AccountSetting from './views/Advertiser/AccountSetting/index.js';
import Drafts from './views/Advertiser/Drafts/index.js';

export const routes = [
  {
    layout: '/home',
    path: '#',
    name: 'Statistics',
    // component: Statistics,
    icon: 'tim-icons icon-plus-circle'
  },
  {
    layout: '/home',
    path: '/',
    component: Statistics,
    hidden: true
  },
  {
    layout: '/home',
    path: '/racks',
    name: 'Racks',
    component: Rack,
    icon: 'tim-icons icon-plus-circle'
  },
  {
    layout: '/home',
    path: '/slots',
    name: 'Slot',
    component: Slot,
    icon: 'tim-icons icon-plus-circle'
  },
  {
    layout: '/home',
    path: '/products',
    name: 'Products',
    component: Products,
    icon: 'tim-icons icon-plus-circle'
  },
  {
    layout: '/home',
    path: '/users',
    name: 'Users',
    component: Users,
    icon: 'tim-icons icon-plus-circle'
  },
  {
    layout: '/home',
    path: '/orders',
    name: 'Orders',
    component: Orders,
    icon: 'tim-icons icon-plus-circle'
  },
  {
    layout: '/home',
    path: '/banners',
    name: 'Ads',
    component: Banners,
    icon: 'tim-icons icon-plus-circle'
  },
  {
    layout: '/home',
    path: '/banners/:bannerId',
    name: 'BannerDetails',
    component: BannerDetails,
    icon: 'tim-icons icon-plus-circle',
    hidden: true,
  },
  {
    layout: '/home',
    path: '/ValueSales',
    name: 'Value Sales',
    component: SalesCharts,
    icon: 'tim-icons icon-plus-circle',
    hidden: true
  },
  {
    layout: '/home',
    path: '/ItemsCategoriesCharts',
    name: 'Items & Categories',
    component: ItemsCategoriesCharts,
    icon: 'tim-icons icon-plus-circle',
    hidden: true
  },
  {
    layout: '/home',
    path: '/Demographics',
    name: 'Demographics',
    component: Demographics,
    icon: 'tim-icons icon-plus-circle',
    hidden: true
  },
  {
    layout: '/home',
    path: '/BannersCharts',
    name: 'BannersCharts',
    component: BannersCharts,
    icon: 'tim-icons icon-plus-circle',
    hidden: true
  },
];

export const superAdminRoutes = [
  {
    layout: '/home',
    path: '/Statistics',
    name: 'Statistics',
    component: Statistics,
    icon: 'tim-icons icon-plus-circle'
  },
  {
    layout: '/home',
    path: '/',
    component: Statistics,
    hidden: true
  },
  {
    layout: '/home',
    path: '/racks',
    name: 'Racks',
    component: Rack,
    icon: 'tim-icons icon-plus-circle'
  },
  {
    layout: '/home',
    path: '/shelves',
    name: 'Shelf',
    component: Shelf,
    icon: 'tim-icons icon-plus-circle'
  },
  {
    layout: '/home',
    path: '/slots',
    name: 'Slot',
    component: Slot,
    icon: 'tim-icons icon-plus-circle'
  },
  {
    layout: '/home',
    path: '/products',
    name: 'Products',
    component: Products,
    icon: 'tim-icons icon-plus-circle'
  },
  {
    layout: '/home',
    path: '/users',
    name: 'Users',
    component: Users,
    icon: 'tim-icons icon-plus-circle'
  },
  {
    layout: '/home',
    path: '/orders',
    name: 'Orders',
    component: Orders,
    icon: 'tim-icons icon-plus-circle'
  }
];

export const advertiser_routes = [
  {
    layout: '/advertiser',
    path: '/createBanner',
    name: 'New Campaign',
    component: CreateBanner,
    icon: 'tim-icons icon-plus-circle'
  },
  {
    layout: '/advertiser',
    path: '#',
    name: 'Dashboard',
    icon: 'tim-icons icon-plus-circle'
  },
  {
    layout: '/advertiser',
    path: '/',
    component: Dashboard,
    hidden: true
  },
  {
    layout: '/advertiser',
    path: '/myBanners',
    name: 'My Campaigns',
    component: MyBanners,
    icon: 'tim-icons icon-plus-circle'
  },
  {
    layout: '/advertiser',
    path: '/drafts',
    name: 'Draft Campaigns',
    component: Drafts,
    icon: 'tim-icons icon-plus-circle'
  },
  {
    layout: '/advertiser',
    path: '/myBanners/:bannerId',
    name: 'BannerDetails',
    component: BannerDetails,
    icon: 'tim-icons icon-plus-circle',
    hidden: true,
  },
  {
    layout: '/advertiser',
    path: '/editBanner/:bannerId',
    name: 'EditBanner',
    component: EditBanner,
    icon: 'tim-icons icon-plus-circle',
    hidden: true,
  },
  {
    layout: '/advertiser',
    path: '/PaymentDetails',
    name: 'Payment Details',
    component: PaymentDetails,
    icon: 'tim-icons icon-plus-circle',
  },
  {
    layout: '/advertiser',
    path: '/AccountSetting',
    name: 'Account Settings',
    component: AccountSetting,
    icon: 'tim-icons icon-plus-circle',
  },
];