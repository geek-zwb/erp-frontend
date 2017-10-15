/**
 * @file  一些通用的，公有的 function
 * @author Created by geekzwb on 2017/9/20.
 */

/**
 * 面包屑
 */
export const getBreadInfo = (url, systemSelected = '权限管理') => {
  const breadConfig = {
    '/system': ['权限管理', '选择系统'],
    '/dashboard': [systemSelected, '总览'],
    '/notification': [systemSelected, '通知'],
    '/users': [systemSelected, '用户管理', '用户数据'],
    '/roles': [systemSelected, '角色管理'],
    '/permissions': [systemSelected, '权限管理'],
  };
  let breadInfo = breadConfig[Object.keys(breadConfig).find((item, index) => item === url)];
  if (url === '/') {
    breadInfo = breadConfig['/dashboard'];
  }
  return breadInfo ? breadInfo : ['Order', '404'];
};