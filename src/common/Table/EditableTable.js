/**
 * Created by geekzwb on 2017/10/18.
 * What for:
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Button, Icon } from 'antd';
import styled from 'styled-components';

// component
import EditableCell from './EditableCell';

const ShowWhenHover = styled.span`
  opacity: 0;
  .ant-table-row:hover & {
    opacity: 0.8;
  }
`;

class EditableTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
    this.cacheDataChange = [];
    this.columns = this.handleColumns(this.props.columns);
  }

  /**
   * 给 column 增加 render 方法
   * @param propsColumns
   */
  handleColumns(propsColumns) {
    return propsColumns.map((column, index) => {
      const render = column.dataIndex === 'operation' ?
        (
          (text, record, index) => {
            // FIXME: 当数据中没有 name 属性，或者name 不为可更改项时，将出现问题
            const {editable} = this.state.data[index].name;

            return (
              <div className="editable-row-operations">
                {
                  editable ?
                    <span>
                    <a onClick={() => this.editDone(index, 'save')}>
                      <Icon type="check"/>
                    </a>
                      &nbsp;
                      <a onClick={() => this.editDone(index, 'cancel')}><Icon type="close"/></a>
                  </span>
                    :
                    <span>
                    <a onClick={() => this.edit(index)}><Icon type="edit"/></a>
                  </span>
                }
                <span>
                  <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteOne(index)}>
                    <a><Icon style={{color: 'red'}} type="delete"/></a>
                  </Popconfirm>
                </span>

                {
                  typeof (this.props.editMore) !== 'function' ? '' : (
                    <ShowWhenHover>
                      <Button onClick={this.props.editMore.bind('', index)}>
                        More
                      </Button>
                    </ShowWhenHover>
                  )
                }

              </div>
            );
          }
        ) : (
          (text, record, index) => this.renderColumns(this.state.data, index, column.dataIndex, text)
        );
      return {
        ...column,
        render
      }
    });
  }

  renderColumns(data, index, key, text) {
    const txt = text || '';
    const {editable, status, options} = data[index][key];
    if (typeof editable === 'undefined') {
      return txt;
    }
    return (
      <EditableCell
        options={options}
        editable={editable}
        value={txt}
        onChange={value => this.handleChange(key, index, value)}
        status={status}
      />
    );
  }

  /**
   *
   * @param key
   * @param index
   * @param value
   */
  handleChange(key, index, value) {
    const {data} = this.state;

    // 只有在改变值并保存时才通知 父组件
    if (data[index][key].value !== value) {
      data[index][key].value = value;
      this.setState({data});
      this.cacheDataChange.push({index, key, value});
    }
  }

  edit(index) {
    const {data} = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = true;
      }
    });
    this.setState({data});
  }

  /**
   *
   * @param index 数据的第几项
   * @param type save|cancel
   */
  editDone(index, type) {
    const {data} = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = false;
        data[index][item].status = type;
      }
    });
    this.setState({data}, () => {
      Object.keys(data[index]).forEach((item) => {
        if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
          delete data[index][item].status;
        }
      });
    });
  }

  deleteOne(index) {
    this.props.deleteOne(index);
  }
  
  componentDidUpdate() {
    if(this.cacheDataChange.length > 0) {
      // 通知父组件改变了数据
      this.props.handleChange(this.cacheDataChange);
      this.cacheDataChange.length = 0;
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        data: nextProps.data
      }
    );
    this.columns = this.handleColumns(nextProps.columns);
  }

  render() {
    const {data} = this.state;
    const dataSource = data.map((item) => {
      const obj = {};
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'key' ? item[key] : item[key].value;
      });
      return obj;
    });
    const columns = this.columns;
    return (
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        onChange={this.props.handleTableChange}
        loading={this.props.loading}
        pagination={this.props.pagination}
      />
    );
  }
}

EditableTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleTableChange: PropTypes.func.isRequired,
  deleteOne: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pagination: PropTypes.object
};

export default EditableTable;