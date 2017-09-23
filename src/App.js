// basic
import React, { Component } from 'react';

// route
import { Route, Switch, withRouter } from 'react-router-dom';

// global func
import { getBreadInfo } from './utils/globalFunc';

// component
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Dashboard from './modules/Dashboard';
import NoMatch from './common/NoMatch';
import SiderMenu from './common/Layout/SiderMenu';
import RightMenu from './common/Layout/RightMenu'

// style
import styled, { keyframes } from 'styled-components';

import logo from './logo.svg';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

// === styledcomponents
// 注意该keyframes 要在使用前定义
const HeaderLogoSpin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
const HeaderLogo = styled.img.attrs({
  src: logo
})`
  animation: ${HeaderLogoSpin} infinite 20s linear;
  height: 80px;
`;

@withRouter
class App extends Component {
  render() {
    return (
      <Layout style={{height: '100vh', backgroundColor: '#f2f2f4'}}>
        <header
          style={{display: 'flex', alignItems: 'center', width: '100%', height: '110px', backgroundColor: '#007bc6'}}>
          <HeaderLogo/>
        </header>
        <Layout style={{flexDirection: 'row', height: 'calc(100vh - 110px)', backgroundColor: '#f2f2f4'}}>
          {/*左侧导航栏*/}
          <SiderMenu style={{backgroundColor: '#f2f2f4'}} />

          {/*中间内容*/}
          {/*这里写两个 Layout 是为了隐藏滚动条， 遗留问题： box-shadow */}
          <Layout style={{
            margin: '-54px 0 0 15px',
            background: 'none',
            position: 'relative',
            overflowY: 'hidden',
            // boxShadow: '0 0 10px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <div
              style={{
                width: 'calc(100% + 20px)',
                paddingRight: '4px',
                backgroundColor: '#fff',
                overflowY: 'scroll',
                overflowX: 'hidden'
              }}>
              <Breadcrumb
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  top: '0',
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#f2f2f4'
                }}>
                {getBreadInfo(this.props.location.pathname).map((item, index) => <Breadcrumb.Item
                  key={index}>{item}</Breadcrumb.Item>)}
              </Breadcrumb>
              <Content style={{background: '#f2f2f4', margin: '42px 0 0', minHeight: 380}}>
                <div style={{minHeight: 350, backgroundColor: '#fff'}}>
                  <Switch>
                    <Route exact path="/" component={Dashboard}/>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route component={NoMatch}/>
                  </Switch>
                </div>
                <Layout style={{height: '30px', backgroundColor: '#f2f2f4'}}>
                </Layout>
              </Content>
            </div>
          </Layout>

          {/* 右侧栏 */}
          <Sider width={200} style={{backgroundColor: '#f2f2f4', position: 'relative'}}>
            <RightMenu style={{color: 'red'}}>
            </RightMenu>
          </Sider>
        </Layout>
      </Layout>
    );
  }
}

export default App;
