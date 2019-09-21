/**
 * Created by geekzwb on 2017/8/8.
 * dashboard test
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { dashboardTestRequest } from './actions';

import EventBox from './components/EventBox';

//============ styled components
const DashboardBox = styled.div`
  text-align: center;
  padding: 10px;
`;
const Event = styled.div`
  position: absolute;
  z-index: 1;
  width: calc(100% - 20px);
`;
const EventContainer = styled.div`
  background: #fff;
  width:100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Charts = styled.div`
  width: 100%;
  margin-top: 120px;
  padding: 20px;
`;
const OverView = styled.div`
  min-height: 600px;
  width: 100%;
  overflow: hidden;
`;
const Content = styled.div`
  clear: both;
  &:after {
    content: "";
    clear: both;
    display: block;
  }
  & .content-left {
    margin-right: 290px;
  }
  & .content-right {
    float: right;
    width: 270px;
  }
`;

const eventBoxStyle = {
  borderRadius: '5px',
  flex: '0 1 25%',
  border: '1px solid #f2f2f4',
  padding: '10px',
  background: '#fcfbff',
  color: '#007cc1',
  fontSize: '24px',
  height: '70px'
};

/**
 * @class Dashboard 总览
 */
@withRouter
class Dashboard extends Component {
  componentDidMount() {
    // request testData
    this.props.dashboardTestRequest();
  }

  render() {
    const eventsCount = {
      revenue: 1000,
      orderCount: 20,
      overHead: 40,
      netProfit: 40
    };
    const eventsCountPercent = {
      revenue: 9, // 营收
      orderCount: 13, // 订单总量占比
      overHead: 9, // 占全年开销占比
      netProfit: 10 // 全年占比利润
    };

    return (
      <DashboardBox>
        <Event>
          <EventContainer>
            <EventBox style={{...eventBoxStyle, marginRight: '10px'}} eventsCount={eventsCount.revenue} title="当月营业额"
                      options={{
                        textColor: '#333',
                        width: 50,
                        radius: 22,
                        percent: eventsCountPercent.revenue,
                        color: ['#e2e7f1', '#007cc1']
                      }}/>
            <EventBox style={{...eventBoxStyle, marginRight: '10px', color: '#e42d1e'}}
                      eventsCount={eventsCount.orderCount}
                      title="当月订单总数"
                      options={{
                        textColor: '#333',
                        width: 50,
                        radius: 22,
                        percent: eventsCountPercent.orderCount,
                        color: ['#e2e7f1', '#e42d1e']
                      }}/>
            <EventBox style={{...eventBoxStyle, marginRight: '10px', color: '#ffae00'}}
                      eventsCount={eventsCount.overHead} title="当月开销总额"
                      options={{
                        textColor: '#333',
                        width: 50,
                        radius: 22,
                        percent: eventsCountPercent.overHead,
                        color: ['#e2e7f1', '#ffae00']
                      }}/>
            <EventBox style={{...eventBoxStyle, color: '#2ca35a'}} eventsCount={eventsCount.netProfit} title="当月净利润"
                      options={{
                        textColor: '#333',
                        width: 50,
                        radius: 22,
                        percent: eventsCountPercent.netProfit,
                        color: ['#e2e7f1', '#2ca35a']
                      }}/>
          </EventContainer>
          <h2>当月数据统计与全年占比分析</h2>
        </Event>

        <Charts>
          <OverView>
            <Content>
              <div className="content-left">
                <p> TODO 当月每日订单量折线图</p>
              </div>
              <div className="content-right">
                <p> TODO 当月产品销量 TOP5</p>
              </div>
            </Content>
            <p> TODO 当年每月订单量折线图</p>
            <p> TODO 当年产品销量 TOP10</p>
            <p> TODO 当年每月收支利润折线图</p>
          </OverView>
        </Charts>

      </DashboardBox>
    );
  };
}

/**
 * props 类型检测
 * @type {{$$testData, $$dashboardReducer, dashboardTestRequest}}
 */
Dashboard.propTypes = {
  $$testData: PropTypes.string.isRequired,
  $$dashboardReducer: PropTypes.object.isRequired,
  dashboardTestRequest: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    $$testData: state.getIn(['dashboardReducer', 'testData']),
    $$dashboardReducer: state.get('dashboardReducer')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dashboardTestRequest: () => {
      dispatch(dashboardTestRequest());
    }
  };
}

// connect store with component
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);