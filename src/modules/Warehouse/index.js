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

// components
import EditableTable from '../../common/Table/EditableTable';

// action creator
import { getWarehouses, updateWarehouse, addWarehouse, deleteWarehouse } from './actions';


const WarehousePage = styled.div`
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
    title: '仓库',
    dataIndex: 'name',
    width: '15%',
  }, {
    title: '状态',
    dataIndex: 'status',
    width: '15%',
  }, {
    title: '备注',
    dataIndex: 'note',
    width: '20%',
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    width: '20%',
  },
  /*  {
   title: '更新时间',
   dataIndex: 'updated_at',
   width: '20%',
   },*/
  {
    title: 'operation',
    dataIndex: 'operation',
    width: '20%',
  }
];

class Warehouse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      $$dataSource: this.initWarehouses(this.props.$$warehouses),
      count: this.props.$$warehouses.size,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
  }

  /**
   * dispatch getWarehouses
   */
  componentDidMount() {
    if (this.props.$$warehouses.isEmpty()) {
      this.props.getWarehouses();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      $$dataSource: this.initWarehouses(nextProps.$$warehouses),
      count: nextProps.$$warehouses.size
    })
  }

  initWarehouses($$propsWarehouses) {
    return $$propsWarehouses.map(($$warehouse, index) => {
      return {
        key: $$warehouse.get('id', index),
        id: {
          value: $$warehouse.get('id')
        },
        name: {
          editable: false,
          value: $$warehouse.get('name')
        },
        status: {
          editable: false,
          options: [
            {key: '1', value: '使用中'},
            {key: '0', value: '未使用'},
          ],
          value: $$warehouse.get('status') ? '1' : '0'
        },
        note: {
          editable: false,
          value: $$warehouse.get('note')
        },
        created_at: {
          value: $$warehouse.get('created_at')
        },
        /*updated_at: {
         value: $$warehouse.get('updated_at')
         },*/
      };
    });
  }

  /**
   * 更新表格数据
   * props.data {Object[]} data[index][key].value = value;
   * @param dataChanged {Object[]} [{index, key, value}]
   */
  handleChange(datasChanged) {
    let $$warehousesUpdated = this.props.$$warehouses;
    let idex = '';
    datasChanged.forEach(function (data) {
      const {index, key, value} = data;
      idex = index;
      $$warehousesUpdated = $$warehousesUpdated.setIn([index, key], value);
    });
    this.props.updateWarehouse({$$warehousesUpdated, index: idex});
  }

  handleAdd() {
    // const latestId = this.props.$$warehouses.getIn([this.state.count - 1, 'id']);
    const warehouseNew = {
      name: '仓库' + Date.now(),
      status: true,
    };
    this.props.addWarehouse(warehouseNew);
  }

  deleteOne(index) {
    const id = this.props.$$warehouses.getIn([index, 'id']);
    this.props.deleteWarehouse({id, index});
  }

  render() {
    return (
      <WarehousePage>
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
      </WarehousePage>
    );
  };
}

Warehouse.propTypes = {
  $$warehouses: PropTypes.object.isRequired,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

function mapStateToProps(state) {
  return {
    $$warehouses: state.getIn(['warehousesReducer', 'warehouses']),
    message: state.getIn(['warehousesReducer', 'message']),
    status: state.getIn(['warehousesReducer', 'status']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getWarehouses: () => {
      dispatch(getWarehouses());
    },
    /**
     * @param payload {{$$warehousesUpdated: List, index: Number}}  index 被修改数据的索引 index
     */
    updateWarehouse: (payload) => {
      dispatch(updateWarehouse(payload));
    },
    addWarehouse: (payload) => {
      dispatch(addWarehouse(payload));
    },
    deleteWarehouse: (payload) => {
      dispatch(deleteWarehouse(payload));
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Warehouse));