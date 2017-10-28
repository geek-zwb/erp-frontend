/**
 * @file
 * @author Created by geekzwb on 2017/10/13.
 */
import NoMatch from '../common/NoMatch';
import Dashboard from '../modules/Dashboard';
import Login from '../modules/Login';
import Supplier from '../modules/Supplier';

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
    exact: true,
    auth: true,
    component: Supplier
  },
  {
    path: '/users',
    exact: true,
    auth: true,
    component: NoMatch
  },
  {
    path: '/permissions',
    exact: true,
    auth: true,
    component: NoMatch
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