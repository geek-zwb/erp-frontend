/**
 * Created by geekzwb on 2017/8/8.
 * What for:
 */
import {fromJS} from 'immutable';
import {DASHBOARD_TEST_REQUEST, DASHBOARD_TEST_SUCCESS, DASHBOARD_TEST_FAILURE} from '../actions';

const initState = {
  testData: 'this is data',
  status: 'wait'
};
const $$initState = fromJS(initState);

const dashboardReducer = (state = $$initState, action) => {
  switch (action.type) {
    case DASHBOARD_TEST_REQUEST:
      return fromJS({
        testData: 'this is request',
        status: 'request'
      });
    case DASHBOARD_TEST_SUCCESS:
      return fromJS({
        testData: action.payload,
        status: 'success'
      });
    case DASHBOARD_TEST_FAILURE:
      return {
        testData: 'this is data',
        status: 'failure'
      };
    default:
      return state;
  }
};

export default dashboardReducer;