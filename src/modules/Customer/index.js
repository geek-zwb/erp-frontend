/**
 * Created by geekzwb on 2017/10/23.
 * What for:
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button, message } from 'antd';

// components
import EditableTable from '../../common/Table/EditableTable';

// action creator
import { getCustomers, updateCustomer, addCustomer, deleteCustomer } from './actions';


const CustomerPage = styled.div`
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
    width: 50,
  }, {
    title: '名字',
    dataIndex: 'name',
    width: '15%',
  }, {
    title: '邮箱',
    dataIndex: 'email',
    width: '12%',
  }, {
    title: '联系电话',
    dataIndex: 'phone',
    width: '10%',
  }, {
    title: '收货地址',
    dataIndex: 'address',
    width: '10%'
  }, {
    title: 'birthday',
    dataIndex: 'birthday',
    width: 110,
  }, {
    title: '备注',
    dataIndex: 'note',
    width: '15%',
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    width: '10%',
  },
  {
    title: '共下过订单(次)',
    dataIndex: 'orders_count',
    width: '5%',
  },
  {
    title: 'operation',
    dataIndex: 'operation',
  }
];

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      $$dataSource: this.initCustomers(this.props.$$customers),
      count: this.props.$$customers.size,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
  }

  /**
   * dispatch getCustomers
   */
  componentDidMount() {
    if (this.props.$$customers.isEmpty()) {
      this.props.getCustomers();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      $$dataSource: this.initCustomers(nextProps.$$customers),
      count: nextProps.$$customers.size
    })
  }

  componentDidUpdate() {
    if (this.props.status.includes('fail')) {
      const messages = this.props.message;
      if (typeof (messages) === 'string') {
        message.error(messages);
      } else {
        for(let err in messages) {
          message.error(messages[err]);
        }
      }
    }
  }

  initCustomers($$propsCustomers) {
    return $$propsCustomers.map(($$customer, index) => {
      return {
        key: $$customer.get('id', index),
        id: {
          value: $$customer.get('id')
        },
        name: {
          editable: false,
          value: $$customer.get('first_name') + ' ' + $$customer.get('last_name')
        },
        email: {
          editable: false,
          value: $$customer.get('email')
        },
        phone: {
          editable: false,
          value: $$customer.get('phone')
        },
        address: {
          editable: false,
          value: $$customer.get('address')
        },
        birthday: {
          editable: false,
          value: $$customer.get('birthday')
        },
        note: {
          editable: false,
          value: $$customer.get('note')
        },
        created_at: {
          value: $$customer.get('created_at')
        },
        orders_count: {
          value: $$customer.get('orders_count')
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
    let $$customersUpdated = this.props.$$customers;
    let idex = '';
    datasChanged.forEach(function (data) {
      const {index, key, value} = data;
      idex = index;
      $$customersUpdated = $$customersUpdated.setIn([index, key], value);
    });
    this.props.updateCustomer({$$customersUpdated, index: idex});
  }

  handleAdd() {
    const customerNew = {
      name: 'first_name last_name',
      email: Date.now() + '@test.com'
    };
    this.props.addCustomer(customerNew);
  }

  deleteOne(index) {
    const id = this.props.$$customers.getIn([index, 'id']);
    this.props.deleteCustomer({id, index});
  }

  render() {
    return (
      <CustomerPage>
        <TableBox>
          <Button className="editable-add-btn" onClick={this.handleAdd}>Add</Button>
          <EditableTable
            columns={columns}
            data={this.state.$$dataSource.toJS()}
            handleChange={this.handleChange}
            deleteOne={this.deleteOne}
            loading={this.props.status.includes('request')}
            handleTableChange={() => {
            }}
          />
        </TableBox>
      </CustomerPage>
    );
  };
}

Customer.propTypes = {
  $$customers: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

function mapStateToProps(state) {
  return {
    $$customers: state.getIn(['customersReducer', 'customers', 'data']),
    pagination: {
      total: state.getIn(['customersReducer', 'customers', 'total']),
      current: state.getIn(['customersReducer', 'customers', 'current_page']),
      pageSize: state.getIn(['customersReducer', 'customers', 'per_page']),
      lastPage: state.getIn(['customersReducer', 'customers', 'last_page']),
    },
    message: state.getIn(['customersReducer', 'message']),
    status: state.getIn(['customersReducer', 'status']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCustomers: () => {
      dispatch(getCustomers());
    },
    /**
     * @param payload {{$$customersUpdated: List, index: Number}}  index 被修改数据的索引 index
     */
    updateCustomer: (payload) => {
      dispatch(updateCustomer(payload));
    },
    addCustomer: (payload) => {
      dispatch(addCustomer(payload));
    },
    deleteCustomer: (payload) => {
      dispatch(deleteCustomer(payload));
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Customer));