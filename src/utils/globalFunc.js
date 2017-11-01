/**
 * @file  一些通用的，公有的 function
 * @author Created by geekzwb on 2017/9/20.
 */

/**
 * 面包屑
 */
export const getBreadInfo = (url, systemSelected = 'ERP') => {
  const breadConfig = {
    '/dashboard': [systemSelected, '总览'],
    '/customers': [systemSelected, '客户管理', '用户数据'],
    '/suppliers': [systemSelected, '供应商管理'],
    '/products': [systemSelected, '产品管理'],
    '/orders': [systemSelected, '订单管理'],
    '/types': [systemSelected, '产品分类管理'],
    '/units': [systemSelected, '产品计数单位管理'],
    '/purchases': [systemSelected, '采购管理'],
    '/warehouses': [systemSelected, '仓库管理'],
    '/notification': [systemSelected, '通知'],
  };
  let breadInfo = breadConfig[Object.keys(breadConfig).find((item, index) => item === url)];
  if (url === '/') {
    breadInfo = breadConfig['/dashboard'];
  }
  return breadInfo ? breadInfo : ['Order', '404'];
};