/**
 * Created by geekzwb on 2017/8/8.
 * What for:
 */
// import {combineReducers} from 'redux-immutable';

import dashboardReducer from '../../modules/Dashboard/reducers';
import authReducer from '../../modules/Login/reducers';
import suppliersReducer from '../../modules/Supplier/reducers';
import typesReducer from '../../modules/Type/reducers';
import unitsReducer from '../../modules/Unit/reducers';
import warehousesReducer from '../../modules/Warehouse/reducers';
import purchasesReducer from '../../modules/Purchase/reducers';

/*const rootReducer = combineReducers({
  dashboardReducer
});*/

const reducers = {
  dashboardReducer,
  auth: authReducer,
  suppliersReducer,
  typesReducer,
  unitsReducer,
  warehousesReducer,
  purchasesReducer,
};

export default reducers;