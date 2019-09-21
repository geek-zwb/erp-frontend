/**
 * Created by geekzwb on 2017/8/9.
 * What for: all sagas
 */
// saga 模块引入
import {fork, all} from 'redux-saga/effects';

// 异步逻辑
import {watchLoadDashboard} from '../../modules/Dashboard/sagas';
import watchLogin from '../../modules/Login/sagas';
import {watchGetSuppliers, watchUpdateSupplier, watchAddSupplier, watchDeleteSupplier} from '../../modules/Supplier/sagas';
import {watchGetTypes, watchUpdateType, watchAddType, watchDeleteType} from '../../modules/Type/sagas';
import {watchGetUnits, watchUpdateUnit, watchAddUnit, watchDeleteUnit} from '../../modules/Unit/sagas';
import {watchGetWarehouses, watchUpdateWarehouse, watchAddWarehouse, watchDeleteWarehouse} from '../../modules/Warehouse/sagas';
import {watchGetPurchases, watchUpdatePurchase, watchAddPurchase, watchDeletePurchase} from '../../modules/Purchase/sagas';
import {watchGetOrders, watchUpdateOrder, watchAddOrder, watchDeleteOrder} from '../../modules/Order/sagas';
import {watchGetCustomers, watchUpdateCustomer, watchAddCustomer, watchDeleteCustomer} from '../../modules/Customer/sagas';
import {watchGetProducts, watchUpdateProduct, watchAddProduct, watchDeleteProduct} from '../../modules/Product/sagas';

// 单一进入点， 启动所有 saga
export default function* root() {
  yield all([
    fork(watchLoadDashboard),
    fork(watchLogin),

    fork(watchGetSuppliers),
    fork(watchUpdateSupplier),
    fork(watchAddSupplier),
    fork(watchDeleteSupplier),

    fork(watchGetTypes),
    fork(watchUpdateType),
    fork(watchAddType),
    fork(watchDeleteType),

    fork(watchGetUnits),
    fork(watchUpdateUnit),
    fork(watchAddUnit),
    fork(watchDeleteUnit),

    fork(watchGetWarehouses),
    fork(watchUpdateWarehouse),
    fork(watchAddWarehouse),
    fork(watchDeleteWarehouse),

    fork(watchGetPurchases),
    fork(watchUpdatePurchase),
    fork(watchAddPurchase),
    fork(watchDeletePurchase),

    fork(watchGetOrders),
    fork(watchUpdateOrder),
    fork(watchAddOrder),
    fork(watchDeleteOrder),

    fork(watchGetCustomers),
    fork(watchUpdateCustomer),
    fork(watchAddCustomer),
    fork(watchDeleteCustomer),

    fork(watchGetProducts),
    fork(watchUpdateProduct),
    fork(watchAddProduct),
    fork(watchDeleteProduct),
  ])
}