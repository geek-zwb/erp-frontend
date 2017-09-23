/**
 * Created by geekzwb on 2017/8/9.
 * What for: all sagas
 */
// saga 模块引入
import {fork, all} from 'redux-saga/effects';

// 异步逻辑
import {watchLoadDashboard} from '../../modules/Dashboard/sagas';

// 单一进入点， 启动所有 saga
export default function* root() {
  yield all([
    fork(watchLoadDashboard)
  ])
}