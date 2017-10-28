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
import { getTypes, updateType, addType, deleteType } from './actions';


const TypePage = styled.div`
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
    title: '产品类别',
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

class Type extends Component {
  constructor(props) {
    super(props);
    this.state = {
      $$dataSource: this.initTypes(this.props.$$types),
      count: this.props.$$types.size,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
  }

  /**
   * dispatch getTypes
   */
  componentDidMount() {
    if (this.props.$$types.isEmpty()) {
      this.props.getTypes();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      $$dataSource: this.initTypes(nextProps.$$types),
      count: nextProps.$$types.size
    })
  }

  initTypes($$propsTypes) {
    return $$propsTypes.map(($$type, index) => {
      return {
        key: $$type.get('id', index),
        id: {
          value: $$type.get('id')
        },
        name: {
          editable: false,
          value: $$type.get('name')
        },
        note: {
          editable: false,
          value: $$type.get('note')
        },
        created_at: {
          value: $$type.get('created_at')
        },
        updated_at: {
          value: $$type.get('updated_at')
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
    let $$typesUpdated = this.props.$$types;
    let idex = '';
    datasChanged.forEach(function (data) {
      const {index, key, value} = data;
      idex = index;
      $$typesUpdated = $$typesUpdated.setIn([index, key], value);
    });
    this.props.updateType({$$typesUpdated, index:idex});
  }

  handleAdd() {
    // const latestId = this.props.$$types.getIn([this.state.count - 1, 'id']);
    const typeNew = {
      name: '分类 ' + Date.now()
    };
    this.props.addType(typeNew);
  }

  deleteOne(index) {
    const id = this.props.$$types.getIn([index, 'id']);
    this.props.deleteType({id, index});
  }

  render() {
    return (
      <TypePage>
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
      </TypePage>
    );
  };
}

Type.propTypes = {
  $$types: PropTypes.object.isRequired,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

function mapStateToProps(state) {
  return {
    $$types: state.getIn(['typesReducer', 'types']),
    message: state.getIn(['typesReducer', 'message']),
    status: state.getIn(['typesReducer', 'status']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTypes: () => {
      dispatch(getTypes());
    },
    /**
     * @param payload {{$$typesUpdated: List, index: Number}}  index 被修改数据的索引 index
     */
    updateType: (payload) => {
      dispatch(updateType(payload));
    },
    addType: (payload) => {
      dispatch(addType(payload));
    },
    deleteType: (payload) => {
      dispatch(deleteType(payload));
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Type));