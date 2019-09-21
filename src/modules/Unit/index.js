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
import { getUnits, updateUnit, addUnit, deleteUnit } from './actions';


const UnitPage = styled.div`
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
    title: '计数单位',
    dataIndex: 'name',
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
  {
    title: '更新时间',
    dataIndex: 'updated_at',
    width: '20%',
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    width: '20%',
  }
];

class Unit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      $$dataSource: this.initUnits(this.props.$$units),
      count: this.props.$$units.size,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
  }

  /**
   * dispatch getUnits
   */
  componentDidMount() {
    if (this.props.$$units.isEmpty()) {
      this.props.getUnits();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      $$dataSource: this.initUnits(nextProps.$$units),
      count: nextProps.$$units.size
    })
  }

  initUnits($$propsUnits) {
    return $$propsUnits.map(($$unit, index) => {
      return {
        key: $$unit.get('id', index),
        id: {
          value: $$unit.get('id')
        },
        name: {
          editable: false,
          value: $$unit.get('name')
        },
        note: {
          editable: false,
          value: $$unit.get('note')
        },
        created_at: {
          value: $$unit.get('created_at')
        },
        updated_at: {
          value: $$unit.get('updated_at')
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
    let $$unitsUpdated = this.props.$$units;
    let idex = '';
    datasChanged.forEach(function (data) {
      const {index, key, value} = data;
      idex = index;
      $$unitsUpdated = $$unitsUpdated.setIn([index, key], value);
    });
    this.props.updateUnit({$$unitsUpdated, index:idex});
  }

  handleAdd() {
    // const latestId = this.props.$$units.getIn([this.state.count - 1, 'id']);
    const unitNew = {
      name: '单位' + Date.now(),
    };
    this.props.addUnit(unitNew);
  }

  deleteOne(index) {
    const id = this.props.$$units.getIn([index, 'id']);
    this.props.deleteUnit({id, index});
  }

  render() {
    return (
      <UnitPage>
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
      </UnitPage>
    );
  };
}

Unit.propTypes = {
  $$units: PropTypes.object.isRequired,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

function mapStateToProps(state) {
  return {
    $$units: state.getIn(['unitsReducer', 'units']),
    message: state.getIn(['unitsReducer', 'message']),
    status: state.getIn(['unitsReducer', 'status']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUnits: () => {
      dispatch(getUnits());
    },
    /**
     * @param payload {{$$unitsUpdated: List, index: Number}}  index 被修改数据的索引 index
     */
    updateUnit: (payload) => {
      dispatch(updateUnit(payload));
    },
    addUnit: (payload) => {
      dispatch(addUnit(payload));
    },
    deleteUnit: (payload) => {
      dispatch(deleteUnit(payload));
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Unit));