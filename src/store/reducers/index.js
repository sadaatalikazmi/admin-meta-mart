import Auth from "./Auth";
import { combineReducers } from "redux";
import Rack from "./Rack";
import Shelf from "./Shelf";
import Slot from "./Slot";
import Product from "./Product";
import User from './User';
import Customer from './Customer';
import Orders from './Order';
import Banners from './Banner';
import Payments from './Payments';

export default combineReducers(
  {
    Auth: Auth,
    Rack: Rack,
    Shelf: Shelf,
    Slot: Slot,
    Product: Product,
    User: User,
    Customer: Customer,
    Orders: Orders,
    Banners: Banners,
    Payments: Payments,
  });
