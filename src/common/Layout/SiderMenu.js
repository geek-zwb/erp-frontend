/**
 * @file  左侧导航栏
 * @author Created by geekzwb on 2017/9/19.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import { withRouter } from 'react-router-dom';

const {SubMenu} = Menu;
const {Sider} = Layout;


@withRouter
class SiderMenu extends Component {
  onSiderClick(e) {
    const {location, history} = this.props;
    if (location.pathname === e.key) return;
    history.push(e.key)
  }

  render() {

    const {location, style} = this.props;

    let defaultSelectedKeys = '';
    switch (true) {
      case['/', '/dashboard'].indexOf(location.pathname) !== -1:
        defaultSelectedKeys = '/dashboard';
        break;
      case['/products'].indexOf(location.pathname) !== -1:
        defaultSelectedKeys = '/products';
        break;
      case['/orders'].indexOf(location.pathname) !== -1:
        defaultSelectedKeys = '/orders';
        break;
      case['/types'].indexOf(location.pathname) !== -1:
        defaultSelectedKeys = '/types';
        break;
      case['/units'].indexOf(location.pathname) !== -1:
        defaultSelectedKeys = '/units';
        break;
      case['/suppliers'].indexOf(location.pathname) !== -1:
        defaultSelectedKeys = '/suppliers';
        break;
      case['/purchases'].indexOf(location.pathname) !== -1:
        defaultSelectedKeys = '/purchases';
        break;
      case['/customers'].indexOf(location.pathname) !== -1:
        defaultSelectedKeys = '/customers';
        break;
      case['/warehouses'].indexOf(location.pathname) !== -1:
        defaultSelectedKeys = '/warehouses';
        break;
      default:
        defaultSelectedKeys = '/dashboard';
    }

    return (
      <Sider style={style}>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[defaultSelectedKeys]}
          selectedKeys={[defaultSelectedKeys]}
          defaultOpenKeys={['ERP']}
          onClick={this.onSiderClick.bind(this)}
          style={{height: '100%', borderRight: 0, background: '#f2f2f4'}}
        >
          <SubMenu
            key="ERP"
            style={{background: '#f2f2f4'}}
            title={<span><Icon type="user"/><span className="nav-text">权限管理</span></span>}
          >
            <Menu.Item key="/dashboard">总览</Menu.Item>
            <Menu.Item key="/products">产品管理</Menu.Item>
            <Menu.Item key="/orders">订单管理</Menu.Item>
            <Menu.Item key="/types">产品分类管理</Menu.Item>
            <Menu.Item key="/units">产品计数单位管理</Menu.Item>
            <Menu.Item key="/suppliers">供应商管理</Menu.Item>
            <Menu.Item key="/purchases">订货管理</Menu.Item>
            <Menu.Item key="/customers">客户管理</Menu.Item>
            <Menu.Item key="/warehouses">仓库管理</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    )
  }
}

SiderMenu.propTypes = {
  style: PropTypes.object,
};

export default SiderMenu;