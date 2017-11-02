/**
 * @file  左侧导航栏
 * @author Created by geekzwb on 2017/9/19.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import { withRouter } from 'react-router-dom';

const {Sider} = Layout;


@withRouter
class SiderMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

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
      case location.pathname.includes('suppliers'):
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
      <Sider
        style={{background: '#f0f0f2', ...style}}
        trigger={null}
        collapsible={true}
        collapsed={this.state.collapsed}
      >
        <div style={{height: '42px', lineHeight: '42px', textAlign: 'center'}}>
          <h2 style={{color:'#0f83e6'}} onClick={this.toggle}>
            <span style={{marginRight: '20px',whiteSpace: 'nowrap'}}>ENSUN ERP</span>
            <Icon
              className="trigger"
              style={{display: this.state.collapsed ? 'none': 'inline-block'}}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            />
          </h2>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[defaultSelectedKeys]}
          selectedKeys={[defaultSelectedKeys]}
          // defaultOpenKeys={['ERP']}
          onClick={this.onSiderClick.bind(this)}
          style={{height: '100%', borderRight: 0, background: '#f2f2f4'}}
        >
          <Menu.Item key="/dashboard">
            <Icon type="pie-chart"/><span>总览</span>
          </Menu.Item>
          <Menu.Item key="/products">
            <Icon type="gift"/><span>产品管理</span>
          </Menu.Item>
          <Menu.Item key="/orders"><Icon type="book"/><span>订单(发货)管理</span></Menu.Item>
          <Menu.Item key="/types"><Icon type="appstore-o"/><span>产品分类管理</span></Menu.Item>
          <Menu.Item key="/units"><Icon type="api"/><span>产品计数单位管理</span></Menu.Item>
          <Menu.Item key="/suppliers"><Icon type="contacts"/><span>供应商管理</span></Menu.Item>
          <Menu.Item key="/purchases"><Icon type="shop"/><span>采购管理</span></Menu.Item>
          <Menu.Item key="/customers">
            <Icon type="team"/><span>客户管理</span>
          </Menu.Item>
          <Menu.Item key="/warehouses"><Icon type="database"/><span>仓库管理</span></Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

SiderMenu.propTypes = {
  style: PropTypes.object,
};

export default SiderMenu;