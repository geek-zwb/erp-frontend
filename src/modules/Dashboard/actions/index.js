/**
 * Created by geekzwb on 2017/8/8.
 * What for:
 */
export const DASHBOARD_TEST_REQUEST = 'DASHBOARD_TEST_REQUEST';
export const DASHBOARD_TEST_SUCCESS = 'DASHBOARD_TEST_SUCCESS';
export const DASHBOARD_TEST_FAILURE = 'DASHBOARD_TEST_FAILURE';

export const dashboardTestRequest = (data) => {
  return {type: DASHBOARD_TEST_REQUEST, payload: data};
};

export const dashboardTestSuccess = (data) => {
  return {type: DASHBOARD_TEST_SUCCESS, payload: data};
};

export const dashboardTestFailure = (data) => {
  return {type: DASHBOARD_TEST_FAILURE, payload: data};
};

