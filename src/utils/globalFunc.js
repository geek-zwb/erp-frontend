/**
 * @file  一些通用的，公有的 function
 * @author Created by geekzwb on 2017/9/20.
 */

/**
 * 面包屑
 */
export const getBreadInfo = (url) => {
  const breadConfig = {
    '/dashboard': ['Order', '总览'],
    '/notification': ['Order', '通知'],
    '/users': ['Order', '用户管理', '用户数据'],
    '/orders': ['Order', '订单管理', '订单数据'],
  };
  let breadInfo = breadConfig[Object.keys(breadConfig).find((item, index) => item === url)];
  if (url === '/') {
    breadInfo = breadConfig['/dashboard'];
  }
  return breadInfo ? breadInfo : ['Order', '404'];
};