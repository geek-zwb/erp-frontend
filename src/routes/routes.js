/**
 * @file
 * @author Created by geekzwb on 2017/10/13.
 */
import NoMatch from '../common/NoMatch';
import Dashboard from '../modules/Dashboard';
import Login from '../modules/Login';
import Supplier from '../modules/Supplier';
import Type from '../modules/Type';
import Unit from '../modules/Unit';
import Warehouse from '../modules/Warehouse';
import Purchase from '../modules/Purchase';
import Order from '../modules/Order';
import Customer from '../modules/Customer';
import Product from '../modules/Product';

const routes = [
  {
    path: '/',
    exact: true,
    auth: true,
    component: Dashboard
  },
  {
    path: '/dashboard',
    exact: true,
    auth: true,
    component: Dashboard
  },
  {
    path: '/suppliers',
    // exact: true,
    auth: true,
    component: Supplier
  },
  {
    path: '/types',
    exact: true,
    auth: true,
    component: Type
  },
  {
    path: '/units',
    exact: true,
    auth: true,
    component: Unit
  },
  {
    path: '/warehouses',
    exact: true,
    auth: true,
    component: Warehouse
  },
  {
    path: '/purchases',
    exact: true,
    auth: true,
    component: Purchase
  },
  {
    path: '/orders',
    exact: true,
    auth: true,
    component: Order
  },
  {
    path: '/customers',
    exact: true,
    auth: true,
    component: Customer
  },
  {
    path: '/products',
    exact: true,
    auth: true,
    component: Product
  },
  {
    path: '/login',
    exact: true,
    auth: false,
    component: Login
  },
  {
    component: NoMatch
  }
];

export default routes;