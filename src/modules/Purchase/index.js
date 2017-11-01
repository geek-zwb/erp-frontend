/**
 * Created by geekzwb on 2017/10/23.
 * What for:
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'antd';
import { List, fromJS } from 'immutable';

// components
import EditableTable from '../../common/Table/EditableTable';
import CollectionCreateForm from './components/CollectionCreateForm';

// action creator
import {getSuppliers} from '../Supplier/actions'
import { getPurchases, updatePurchases, addPurchase, deletePurchase } from './actions';


const PurchasePage = styled.div`
  background: #fff;
  width: 100%;
  width: 100%;
  display: flex;
`;
const TableBox = styled.div`
  flex: 1;
  margin: 20px;
  .editable-row-text {
    padding: 5px;
  }
  .editable-row-operations a {
    margin-right: 10px;
  }
  .editable-add-btn {
    margin-bottom: 8px;
  }
`;

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 60,
    fixed: 'left'
  },
  {
    title: '订货标识',
    dataIndex: 'name',
    width: 120
  }, {
    title: '创建时间',
    dataIndex: 'created_at',
    width: 135,
  }, {
    title: '供应商',
    dataIndex: 'supplier_id',
    width: 150,
  },{
    title: '送货单号',
    dataIndex: 'delivery_code',
    width: 100,
  },{
    title: '运费',
    dataIndex: 'delivery_amount',
    width: 100,
  }, {
    title: '欠款',
    dataIndex: 'arrears',
    width: 100,
  }, {
    title: '产品总数',
    dataIndex: 'count',
    width: 100,
  }, {
    title: '花费',
    dataIndex: 'totalCost',
    width: 100,
  },
  {
    title: '更新时间',
    dataIndex: 'updated_at',
    width: 135,
  },
  {
    title: '备注',
    dataIndex: 'note',
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    width: 135,
    fixed: 'right'
  }
];

class Purchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      $$purchases: this.props.$$purchases || List(),
      count: 0,
      pagination: this.props.pagination,
      visible: false,
      title: '',
      confirmLoading: false,
      singleData: {},  // 新增或者修改某个 purchase
      currentIndex: '', // 当前修改项在 $$purchases 中的 index
      modalType: 'add',
      suppliers: this.props.$$suppliers.toJS()
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.saveFormRef = this.saveFormRef.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.showModal = this.showModal.bind(this);
    this.editMore = this.editMore.bind(this);
  }

  /**
   * dispatch getPurchases
   */
  componentDidMount() {
    if(this.props.$$suppliers.isEmpty()) {
      this.props.getSuppliers();
    }
    if (!this.props.status.includes('purchase_request')) {
      this.props.getPurchases({page: this.props.pagination.current});
    }
  }

  componentWillReceiveProps(nextProps) {
    const confirmLoading = nextProps.status.includes('request');
    if (nextProps.status.includes('success')) {
      // 新增或者修改成功后隐藏 modal
      const visible = false;
      this.setState({
        visible,
        confirmLoading,
        $$purchases: nextProps.$$purchases,
        suppliers: nextProps.$$suppliers.toJS(),
        count: nextProps.$$purchases.size,
        pagination: nextProps.pagination,
      })
    } else {
      this.setState({
        confirmLoading,
        $$purchases: nextProps.$$purchases,
        suppliers: nextProps.$$suppliers.toJS(),
        count: nextProps.$$purchases.size,
        pagination: nextProps.pagination,
      })
    }
  }

  /**
   * 返回 JSD， 表格需要的数据格式
   * @param $$purchases
   */
  initPurchases($$purchases) {
    const supplierOptions = this.props.$$suppliers.toJS().map((supplier) => {
      return {
        key: supplier.id,
        value: supplier.name,
      };
    });
    return $$purchases.map(($$purchase, index) => {
      return {
        key: $$purchase.get('id', index),
        id: {
          value: $$purchase.get('id')
        },
        name: {
          editable: false,
          value: $$purchase.get('name')
        },
        supplier_id: {
          editable: false,
          value: $$purchase.get('supplier_id'),
          options:supplierOptions
        },
        delivery_code: {
          editable: false,
          value: $$purchase.get('delivery_code')
        },
        delivery_amount: {
          editable: false,
          value: $$purchase.get('delivery_amount')
        },
        arrears: {
          editable: false,
          value: $$purchase.get('arrears')
        },
        count: {
          value: $$purchase.get('count')
        },
        totalCost: {
          value: $$purchase.get('totalCost')
        },
        created_at: {
          value: $$purchase.get('created_at')
        },
        note: {
          editable: false,
          value: $$purchase.get('note')
        },
        updated_at: {
          value: $$purchase.get('updated_at')
        },
      };
    });
  }

  /**
   * 更新表格数据
   * props.data {Object[]} data[index][key].value = value;
   * @param dataChanged {Object[]} [{index, key, value}]
   */
  handleChange(datasChanged) {
    let $$purchasesUpdated = this.state.$$purchases;
    let idex = '';
    datasChanged.forEach(function (data) {
      const {index, key, value} = data;
      idex = index;
      $$purchasesUpdated = $$purchasesUpdated.setIn([index, key], value);
    });

    this.props.updatePurchases({$$purchasesUpdated, index: idex, currentPage: this.props.pagination.current});
  }

  /**
   * 处理分页，排序，筛选等等
   * @param pagination
   * @param filters
   * @param sorter
   */
  handleTableChange(pagination, filters, sorter) {
    this.props.getPurchases({page: pagination.current});
  }

  /**
   * Modal 表单新增确认
   */
  handleAdd() {
    const form = this.form;
    form.validateFields((err, fieldsValue) => {
      console.log('fieldsValue', fieldsValue);
      if (err) {
        return;
      }
      form.resetFields();
      const values = {
        ...fieldsValue,
        invoice_date: (fieldsValue['invoice_date'] && fieldsValue['invoice_date'].format('YYYY-MM-DD')) || '1000-01-01',
      };
      this.props.addPurchase({lastPage: this.state.pagination.lastPage, ...values});
      this.setState({
        singleData: values,
        confirmLoading: true,
      });
    });
  }

  /**
   * Modal 表单修改确认
   */
  handleEdit() {
    const form = this.form;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      form.resetFields();
      const values = {
        ...fieldsValue,
        invoice_date: (fieldsValue['invoice_date'] && fieldsValue['invoice_date'].format('YYYY-MM-DD')) || '1000-01-01',
      };
      const purchase = this.state.$$purchases.get(this.state.currentIndex).toJS();

      const $$purchasesUpdated = this.state.$$purchases.set(this.state.currentIndex, fromJS({...purchase,...values}));

      this.props.updatePurchases({$$purchasesUpdated, index: this.state.currentIndex, currentPage: this.props.pagination.current});
      this.setState({
        singleData: values,
        confirmLoading: true,
      });
    });
  }

  saveFormRef(form) {
    this.form = form;
  }

  /**
   * 显示新增
   */
  showModal() {
    this.setState({
      visible: true,
      title: '新增订货单',
      singleData: {},
      modalType: 'add'
    });
  }

  /**
   * 取消修改或新增
   */
  handleCancel() {
    this.setState({
      visible: false,
      confirmLoading: false,
    });
  }

  /**
   * 删除某一个 purchase
   * @param index
   */
  deleteOne(index) {
    const id = this.props.$$purchases.getIn([index, 'id']);
    this.props.deletePurchase({id, index, currentPage: this.state.pagination.current});
  }

  /**
   * table cell More 按钮
   * @param index  修改项的索引
   */
  editMore(index) {
    this.setState({
      visible: true,
      title: '修改订货单',
      singleData: this.getSingleData(index, this.state.$$purchases),
      currentIndex: index, // 当前修改项
      modalType: 'edit'
    });
  }

  /**
   * 返回 JSD 的 Modal 表单数据
   * @param index
   * @param $$Purchases
   * @returns
   */
  getSingleData(index, $$Purchases) {
    const purchase = $$Purchases.get(index).toJS();
    return {
      ...purchase
    }
  }

  render() {
    const {visible, confirmLoading, modalType, pagination} = this.state;

    const $$dataSource = this.initPurchases(this.state.$$purchases);

    return (
      <PurchasePage>
        <TableBox>
          <Button className="editable-add-btn" onClick={this.showModal}>Add</Button>
          <CollectionCreateForm
            ref={this.saveFormRef}
            visible={visible}
            title={this.state.title}
            onOk={modalType === 'add' ? this.handleAdd : this.handleEdit}
            onCancel={this.handleCancel}
            confirmLoading={confirmLoading}
            message={this.props.message}
            data={this.state.singleData}
            suppliers={this.state.suppliers}
          />
          <EditableTable
            scroll={{ x: '120%', y: '100%' }}
            pagination={pagination}
            editMore={this.editMore}
            columns={columns}
            data={$$dataSource.toJS()}
            handleChange={this.handleChange}
            handleTableChange={this.handleTableChange}
            deleteOne={this.deleteOne}
            loading={this.props.status.includes('request')}
          />
        </TableBox>
      </PurchasePage>
    );
  };
}

Purchase.propTypes = {
  $$purchases: PropTypes.object.isRequired,
  $$suppliers: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  status: PropTypes.string,
  getSuppliers: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    $$purchases: state.getIn(['purchasesReducer', 'purchases', 'data']),
    $$suppliers: state.getIn(['suppliersReducer', 'suppliers']),
    pagination: {
      total: state.getIn(['purchasesReducer', 'purchases', 'total']),
      current: state.getIn(['purchasesReducer', 'purchases', 'current_page']),
      pageSize: state.getIn(['purchasesReducer', 'purchases', 'per_page']),
      lastPage: state.getIn(['purchasesReducer', 'purchases', 'last_page']),
    },
    message: state.getIn(['purchasesReducer', 'message']),
    status: state.getIn(['purchasesReducer', 'status']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPurchases: (payload = {}) => {
      dispatch(getPurchases(payload));
    },
    /**
     * @param payload {{$$purchasesUpdated: List, index: Number}}  index 被修改数据的索引 index
     */
    updatePurchases: (payload) => {
      dispatch(updatePurchases(payload));
    },
    addPurchase: (payload) => {
      dispatch(addPurchase(payload));
    },
    deletePurchase: (payload) => {
      dispatch(deletePurchase(payload));
    },
    getSuppliers: () => {
      dispatch(getSuppliers());
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Purchase));