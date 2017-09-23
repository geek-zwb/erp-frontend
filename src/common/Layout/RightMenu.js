/**
 * Created by geekzwb on 2017/9/22.
 * What for: 右侧边栏
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Tooltip } from 'antd';

// styled components
const RightMenuBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 90px;
  margin-top: -15px;
`;
const MenuHeader = styled.div`
  cursor: pointer;
  flex: 0 0 56px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  span {
    font-size: 22px;
    color: #666;
  }
`;
const MenuItem = MenuHeader.extend`
  flex: 0 0 40px;
  width: 40px;
  opacity: 0;
  ${RightMenuBox}:hover & {
    transition: opacity 1s ease-in-out;
    opacity: 1;
  }
`;

@withRouter
class RightMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RightMenuBox style={this.props.style}>
        <MenuHeader>
          <span className="global-icon icon-youceyingyongheji"></span>
        </MenuHeader>
        <MenuItem>
          <Link to="/notification">
            {/*<Tooltip placement="right" title="消息" >
             <span className="global-icon icon-xiaoxi"></span>
             </Tooltip>*/}
            <span className="global-icon icon-xiaoxi"></span>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/login">
            <span className="global-icon icon-tuichu"></span>
          </Link>
        </MenuItem>
      </RightMenuBox>
    );
  };
}

RightMenu.propTypes = {
  style: PropTypes.object
};

export default RightMenu;