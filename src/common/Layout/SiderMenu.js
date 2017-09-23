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
      case['/orders', '/ordersEdit'].indexOf(location.pathname) !== -1:
        defaultSelectedKeys = '/orders';
        break;
      case['/users', '/usersEdit'].indexOf(location.pathname) !== -1:
        defaultSelectedKeys = '/users';
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
          defaultOpenKeys={['ORDER']}
          onClick={this.onSiderClick.bind(this)}
          style={{height: '100%', borderRight: 0, background: '#f2f2f4'}}
        >
          <SubMenu
            key="ORDER"
            style={{background: '#f2f2f4'}}
            title={<span><Icon type="user"/><span className="nav-text">ORDER</span></span>}
          >
            <Menu.Item key="/dashboard">总览</Menu.Item>
            <Menu.Item key="/users">用户管理</Menu.Item>
            <Menu.Item key="/orders">订单管理</Menu.Item>
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