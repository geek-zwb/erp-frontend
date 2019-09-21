/**
 * Created by geekzwb on 2017/10/30.
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
import { getOrders, updateOrders, addOrder, deleteOrder } from './actions';


const OrderPage = styled.div`
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
  }, {
    title: '订单(发货)标识',
    dataIndex: 'name',
    width: 100
  }, {
    title: '订单号(amazu)',
    dataIndex: 'order_code',
    width: 100
  }, {
    title: '创建时间',
    dataIndex: 'created_at',
    width: 135,
  }, {
    title: '客户信息',
    children: [{
      title: 'Id',
      dataIndex: 'customer_id',
      key: 'customer_id',
      width: 50,
    }, {
      title: 'Name',
      dataIndex: 'customer_name',
      key: 'customer_name',
      width: 100,
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 100,
    }, {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: 100,
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 100,
    }],
  }, {
    title: '发货时间',
    dataIndex: 'delivery_date',
    width: 100,
  }, {
    title: '快递单号',
    dataIndex: 'delivery_code',
    width: 100,
  },{
    title: '运费',
    dataIndex: 'delivery_amount',
    width: 100,
  }, {
    title: '快递公司',
    dataIndex: 'delivery_company',
    width: 100,
  }, {
    title: '共几种产品',
    dataIndex: 'productsCount',
    width: 100,
  }, {
    title: '产品总个数',
    dataIndex: 'count',
    width: 100,
  }, {
    title: '销售金额',
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

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      $$orders: this.props.$$orders || List(),
      count: 0,
      pagination: this.props.pagination,
      visible: false,
      title: '',
      confirmLoading: false,
      singleData: {},  // 新增或者修改某个 order
      currentIndex: '', // 当前修改项在 $$orders 中的 index
      modalType: 'add',
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
   * dispatch getOrders
   */
  componentDidMount() {
    if (!this.props.status.includes('order_request')) {
      this.props.getOrders({page: this.props.pagination.current});
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
        $$orders: nextProps.$$orders,
        count: nextProps.$$orders.size,
        pagination: nextProps.pagination,
      })
    } else {
      this.setState({
        confirmLoading,
        $$orders: nextProps.$$orders,
        count: nextProps.$$orders.size,
        pagination: nextProps.pagination,
      })
    }
  }

  /**
   * 返回 JSD， 表格需要的数据格式
   * @param $$orders
   */
  initOrders($$orders) {
    return $$orders.map(($$order, index) => {
      return {
        key: $$order.get('id', index),
        id: {
          value: $$order.get('id')
        },
        name: {
          editable: false,
          value: $$order.get('name')
        },
        customer_id: {
          value: $$order.getIn(['customer', 'id']),
        },
        customer_name: {
          value: $$order.getIn(['customer', 'name']),
        },
        email: {
          value: $$order.getIn(['customer', 'email']),
        },
        phone: {
          value: $$order.getIn(['customer', 'phone']),
        },
        address: {
          value: $$order.getIn(['customer', 'address']),
        },
        order_code: {
          editable: false,
          value: $$order.get('order_code')
        },
        delivery_date: {
          editable: false,
          value: $$order.get('delivery_date')
        },
        delivery_code: {
          editable: false,
          value: $$order.get('delivery_code')
        },
        delivery_company: {
          editable: false,
          value: $$order.get('delivery_company')
        },
        delivery_amount: {
          editable: false,
          value: $$order.get('delivery_amount')
        },
        productsCount: {
          value: $$order.get('productsCount')
        },
        count: {
          value: $$order.get('count')
        },
        totalCost: {
          value: $$order.get('totalCost')
        },
        note: {
          editable: false,
          value: $$order.get('note')
        },
        created_at: {
          value: $$order.get('created_at')
        },
        updated_at: {
          value: $$order.get('updated_at')
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
    console.log('datasChanged', datasChanged);
    let $$ordersUpdated = this.state.$$orders;
    let idex = '';
    datasChanged.forEach(function (data) {
      const {index, key, value} = data;
      idex = index;
      $$ordersUpdated = $$ordersUpdated.setIn([index, key], value);
    });

    this.props.updateOrders({$$ordersUpdated, index: idex, currentPage: this.props.pagination.current});
  }

  /**
   * 处理分页，排序，筛选等等
   * @param pagination
   * @param filters
   * @param sorter
   */
  handleTableChange(pagination, filters, sorter) {
    this.props.getOrders({page: pagination.current});
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
        delivery_date: (fieldsValue['delivery_date'] && fieldsValue['delivery_date'].format('YYYY-MM-DD')) || '1000-01-01',
      };
      this.props.addOrder({lastPage: this.state.pagination.lastPage, ...values});
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
        delivery_date: (fieldsValue['delivery_date'] && fieldsValue['delivery_date'].format('YYYY-MM-DD')) || '1000-01-01',
      };
      const order = this.state.$$orders.get(this.state.currentIndex).toJS();

      const $$ordersUpdated = this.state.$$orders.set(this.state.currentIndex, fromJS({...order, ...values}));

      this.props.updateOrders({
        $$ordersUpdated,
        index: this.state.currentIndex,
        currentPage: this.props.pagination.current
      });
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
      title: '新增订单（发货）',
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
   * 删除某一个 order
   * @param index
   */
  deleteOne(index) {
    const id = this.props.$$orders.getIn([index, 'id']);
    this.props.deleteOrder({id, index, currentPage: this.state.pagination.current});
  }

  /**
   * table cell More 按钮
   * @param index  修改项的索引
   */
  editMore(index) {
    this.setState({
      visible: true,
      title: '修改订单（发货）信息',
      singleData: this.getSingleData(index, this.state.$$orders),
      currentIndex: index, // 当前修改项
      modalType: 'edit'
    });
  }

  /**
   * 返回 JSD 的 Modal 表单数据
   * @param index
   * @param $$Orders
   * @returns
   */
  getSingleData(index, $$Orders) {
    const order = $$Orders.get(index).toJS();
    return {
      ...order
    }
  }

  render() {
    const {visible, confirmLoading, modalType, pagination} = this.state;

    const $$dataSource = this.initOrders(this.state.$$orders);

    return (
      <OrderPage>
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
            customers={this.state.customers}
          />
          <EditableTable
            scroll={{x: '200%', y: '100%'}}
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
      </OrderPage>
    );
  };
}

Order.propTypes = {
  $$orders: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  status: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    $$orders: state.getIn(['ordersReducer', 'orders', 'data']),
    pagination: {
      total: state.getIn(['ordersReducer', 'orders', 'total']),
      current: state.getIn(['ordersReducer', 'orders', 'current_page']),
      pageSize: state.getIn(['ordersReducer', 'orders', 'per_page']),
      lastPage: state.getIn(['ordersReducer', 'orders', 'last_page']),
    },
    message: state.getIn(['ordersReducer', 'message']),
    status: state.getIn(['ordersReducer', 'status']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getOrders: (payload = {}) => {
      dispatch(getOrders(payload));
    },
    /**
     * @param payload {{$$ordersUpdated: List, index: Number}}  index 被修改数据的索引 index
     */
    updateOrders: (payload) => {
      dispatch(updateOrders(payload));
    },
    addOrder: (payload) => {
      dispatch(addOrder(payload));
    },
    deleteOrder: (payload) => {
      dispatch(deleteOrder(payload));
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Order));