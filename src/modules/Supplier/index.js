/**
 * Created by geekzwb on 2017/10/28.
 * What for:
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'antd';
import {Route} from 'react-router-dom';

// components
import EditableTable from '../../common/Table/EditableTable';
import SupplierDetail from './components/SupplierDetail';

// action creator
import { getSuppliers, updateSupplier, addSupplier, deleteSupplier } from './actions';


const SupplierPage = styled.div`
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
    width: '5%',
  }, {
    title: '供应商',
    dataIndex: 'name',
    width: '15%',
  }, {
    title: '联系电话',
    dataIndex: 'phone',
    width: '10%',
  }, {
    title: '供应商地址',
    dataIndex: 'address',
    width: '20%',
  }, {
    title: '备注',
    dataIndex: 'note',
    width: '20%',
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    width: '10%',
  },
  {
    title: '更新时间',
    dataIndex: 'updated_at',
    width: '10%',
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    width: '20%',
  }
];

class Supplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      $$dataSource: this.initSuppliers(this.props.$$suppliers),
      count: this.props.$$suppliers.size,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
    this.showDetail = this.showDetail.bind(this);
  }

  /**
   * dispatch getSuppliers
   */
  componentDidMount() {
    if (this.props.$$suppliers.isEmpty()) {
      this.props.getSuppliers();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      $$dataSource: this.initSuppliers(nextProps.$$suppliers),
      count: nextProps.$$suppliers.size
    })
  }

  initSuppliers($$propsSuppliers) {
    return $$propsSuppliers.map(($$supplier, index) => {
      return {
        key: $$supplier.get('id', index),
        id: {
          value: $$supplier.get('id')
        },
        name: {
          editable: false,
          value: $$supplier.get('name')
        },
        phone: {
          editable: false,
          value: $$supplier.get('phone')
        },
        address: {
          editable: false,
          value: $$supplier.get('address')
        },
        note: {
          editable: false,
          value: $$supplier.get('note')
        },
        created_at: {
          value: $$supplier.get('created_at')
        },
        updated_at: {
          value: $$supplier.get('updated_at')
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
    let $$suppliersUpdated = this.props.$$suppliers;
    let idex = '';
    datasChanged.forEach(function (data) {
      const {index, key, value} = data;
      idex = index;
      $$suppliersUpdated = $$suppliersUpdated.setIn([index, key], value);
    });
    this.props.updateSupplier({$$suppliersUpdated, index:idex});
  }

  handleAdd() {
    // const latestId = this.props.$$suppliers.getIn([this.state.count - 1, 'id']);
    const supplierNew = {
      name: '供应商' + Date.now(),
      phone: '0592-1029385'
    };
    this.props.addSupplier(supplierNew);
  }

  deleteOne(index) {
    const id = this.props.$$suppliers.getIn([index, 'id']);
    this.props.deleteSupplier({id, index});
  }

  showDetail(index) {
    const id = this.props.$$suppliers.getIn([index, 'id']);
    this.props.history.push(`${this.props.match.url}/${id}`);
  }

  render() {
    const {match, $$suppliers, status} = this.props;
    return (
      <SupplierPage>
        <Route path={`${match.url}/:supplierId`}
               render={ (props) => <SupplierDetail $$suppliers={$$suppliers} {...props}/>}/>
        <Route exact path={match.url}
               render={() => (
                 <TableBox>
                   <Button className="editable-add-btn" onClick={this.handleAdd}>Add</Button>
                   <EditableTable
                     showDetail={this.showDetail}
                     columns={columns}
                     data={this.state.$$dataSource.toJS()}
                     handleChange={this.handleChange}
                     deleteOne={this.deleteOne}
                     loading={status.includes('request')}
                     handleTableChange={() => {
                     }}
                   />
                 </TableBox>
               )}
        />
      </SupplierPage>
    );
  };
}

Supplier.propTypes = {
  $$suppliers: PropTypes.object.isRequired,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

function mapStateToProps(state) {
  return {
    $$suppliers: state.getIn(['suppliersReducer', 'suppliers']),
    message: state.getIn(['suppliersReducer', 'message']),
    status: state.getIn(['suppliersReducer', 'status']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSuppliers: () => {
      dispatch(getSuppliers());
    },
    /**
     * @param payload {{$$suppliersUpdated: List, index: Number}}  index 被修改数据的索引 index
     */
    updateSupplier: (payload) => {
      dispatch(updateSupplier(payload));
    },
    addSupplier: (payload) => {
      dispatch(addSupplier(payload));
    },
    deleteSupplier: (payload) => {
      dispatch(deleteSupplier(payload));
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Supplier));