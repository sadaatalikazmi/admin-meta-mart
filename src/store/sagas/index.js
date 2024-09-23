import { all } from 'redux-saga/effects';
import authSagas from './Auth';
import Rack from "./Rack";
import Shelf from './Shelf';
import Slot from './Slot';
import Product from './Product';
import User from './User';
import Customer from './Customer';
import Orders from './Order';
import Banners from './Banner';
import Payments from './Payments';

export default function* rootSaga() {
  yield all([
    authSagas(),
    Rack(),
    Shelf(),
    Slot(),
    Product(),
    User(),
    Customer(),
    Orders(),
    Banners(),
    Payments(),
  ]);
}

