/**
 * Created by geekzwb on 2017/9/22.
 * What for: 右侧边栏
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Input } from 'antd';

const Search = Input.Search;

// styled components
const RightMenuBox = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  justify-content: flex-end;
  align-items: center;
`;
const MenuContent = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & > li {
    margin-right: 20px;
  }
`;
const MenuUl = styled.ul`
  position: absolute;
  top: 30px;
  padding-top: 30px;
  right: 15px;
  z-index: 2;
  color: #fff;
  display: none;
  & li {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #007bbe;
    line-height: 40px;
    text-align: center;
    margin-bottom: 5px;
  }
  & li a {
    color: #fff;
  }
  .menu-ul:hover & {
    display: block;
  }
`;

@withRouter
class RightMenu extends Component {
  render() {
    return (
      <RightMenuBox style={this.props.style}>
        <MenuContent>
          <li>
            <Search
              placeholder="input search text"
              style={{width: 200, height: 30}}
              onSearch={value => console.log(value)}
            />
          </li>
          <li>
            <Link to={'/notification'}>
              <span className="global-icon icon-xiaoxi"></span>
            </Link>
          </li>
          <li className="menu-ul">
            <span>Admin</span>
            <MenuUl>
              <li>
                <span className="global-icon icon-youceyingyongheji"></span>
              </li>
              <li>
                <Link to="/notification">
                  <span className="global-icon icon-xiaoxi"></span>
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <span className="global-icon icon-tuichu"></span>
                </Link>
              </li>
            </MenuUl>
          </li>
        </MenuContent>
      </RightMenuBox>
    );
  };
}

RightMenu.propTypes = {
  style: PropTypes.object
};

export default RightMenu;