/**
 * Created by geekzwb on 2017/8/8.
 * What for:
 */
// import {combineReducers} from 'redux-immutable';

import dashboardReducer from '../../modules/Dashboard/reducers';
import authReducer from '../../modules/Login/reducers';

/*const rootReducer = combineReducers({
  dashboardReducer
});*/

const reducers = {
  dashboardReducer,
  auth: authReducer
};

export default reducers;