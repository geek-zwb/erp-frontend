/**
 * Created by geekzwb on 2017/10/31.
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
import { getUnits } from '../Unit/actions';
import { getTypes } from '../Type/actions';
import { getProducts, updateProduct, addProduct, deleteProduct } from './actions';


const ProductPage = styled.div`
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
    title: '产品名',
    dataIndex: 'name',
    width: 120
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
    width: 120
  }, {
    title: '单位',
    dataIndex: 'unit_id',
    width: 50,
  }, {
    title: '分类',
    dataIndex: 'type_id',
    width: 100,
  }, {
    title: '库存(总 / 家 / 亚马逊)',
    dataIndex: 'inventory',
    width: 150,
  }, {
    title: '采购数量',
    dataIndex: 'inQty',
    width: 100,
  }, {
    title: '总成本',
    dataIndex: 'totalCost',
    width: 100,
  }, {
    title: '已售数量',
    dataIndex: 'outQty',
    width: 100,
  }, {
    title: '总收入',
    dataIndex: 'income',
    width: 100,
  }, {
    title: '订单数',
    dataIndex: 'orderCount',
    width: 100,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    width: 135,
  },
  {
    title: '更新时间',
    dataIndex: 'updated_at',
    width: 135,
  },
  {
    title: '描述',
    dataIndex: 'description',
    width: 150,
  },
  {
    title: '备注',
    dataIndex: 'note',
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    width: 165,
    fixed: 'right'
  }
];

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      $$products: this.props.$$products || List(),
      count: 0,
      pagination: this.props.pagination,
      visible: false,
      title: '',
      confirmLoading: false,
      singleData: {},  // 新增或者修改某个 product
      currentIndex: '', // 当前修改项在 $$products 中的 index
      modalType: 'add',
      units: this.props.$$units.toJS(),
      types: this.props.$$types.toJS()
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
   * dispatch getProducts
   */
  componentDidMount() {
    if (this.props.$$units.isEmpty()) {
      this.props.getUnits();
    }
    if (this.props.$$types.isEmpty()) {
      this.props.getTypes();
    }
    if (!this.props.status.includes('product_request')) {
      this.props.getProducts({page: this.props.pagination.current});
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
        $$products: nextProps.$$products,
        units: nextProps.$$units.toJS(),
        types: nextProps.$$types.toJS(),
        count: nextProps.$$products.size,
        pagination: nextProps.pagination,
      })
    } else {
      this.setState({
        confirmLoading,
        $$products: nextProps.$$products,
        units: nextProps.$$units.toJS(),
        types: nextProps.$$types.toJS(),
        count: nextProps.$$products.size,
        pagination: nextProps.pagination,
      })
    }
  }

  /**
   * 返回 JSD， 表格需要的数据格式
   * @param $$products
   */
  initProducts($$products) {
    const unitOptions = this.props.$$units.toJS().map((unit) => {
      return {
        key: unit.id,
        value: unit.name,
      };
    });
    const typeOptions = this.props.$$types.toJS().map((type) => {
      return {
        key: type.id,
        value: type.name,
      };
    });
    return $$products.map(($$product, index) => {
      return {
        key: $$product.get('id', index),
        id: {
          value: $$product.get('id')
        },
        sku: {
          editable: false,
          value: $$product.get('sku')
        },
        name: {
          editable: false,
          value: $$product.get('name')
        },
        unit_id: {
          editable: false,
          value: $$product.get('unit_id'),
          options: unitOptions
        },
        type_id: {
          editable: false,
          value: $$product.get('type_id'),
          options: typeOptions
        },
        description: {
          editable: false,
          value: $$product.get('description'),
        },
        inventory: {
          value: `${$$product.get('inventory')} / ${$$product.getIn(['warehouses', 0, 'pivot', 'inventory'], 0)} / ${$$product.getIn(['warehouses', 1, 'pivot', 'inventory'], 0)}
           `
        },
        inQty: {
          value: $$product.get('inQty')
        },
        totalCost: {
          value: $$product.get('totalCost')
        },
        outQty: {
          value: $$product.get('outQty')
        },
        income: {
          value: $$product.get('income')
        },
        orderCount: {
          value: $$product.get('orderCount')
        },
        created_at: {
          value: $$product.get('created_at')
        },
        note: {
          editable: false,
          value: $$product.get('note')
        },
        updated_at: {
          value: $$product.get('updated_at')
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
    let $$productsUpdated = this.state.$$products;
    let idex = '';
    datasChanged.forEach(function (data) {
      const {index, key, value} = data;
      idex = index;
      $$productsUpdated = $$productsUpdated.setIn([index, key], value);
    });

    this.props.updateProduct({$$productsUpdated, index: idex, currentPage: this.props.pagination.current});
  }

  /**
   * 处理分页，排序，筛选等等
   * @param pagination
   * @param filters
   * @param sorter
   */
  handleTableChange(pagination, filters, sorter) {
    this.props.getProducts({page: pagination.current});
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
      this.props.addProduct({lastPage: this.state.pagination.lastPage, ...values});
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
      const product = this.state.$$products.get(this.state.currentIndex).toJS();

      const $$productsUpdated = this.state.$$products.set(this.state.currentIndex, fromJS({...product, ...values}));

      this.props.updateProduct({
        $$productsUpdated,
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
      title: '新增产品',
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
   * 删除某一个 product
   * @param index
   */
  deleteOne(index) {
    const id = this.props.$$products.getIn([index, 'id']);
    this.props.deleteProduct({id, index, currentPage: this.state.pagination.current});
  }

  /**
   * table cell More 按钮
   * @param index  修改项的索引
   */
  editMore(index) {
    this.setState({
      visible: true,
      title: '修改产品信息',
      singleData: this.getSingleData(index, this.state.$$products),
      currentIndex: index, // 当前修改项
      modalType: 'edit'
    });
  }

  /**
   * 返回 JSD 的 Modal 表单数据
   * @param index
   * @param $$Products
   * @returns
   */
  getSingleData(index, $$Products) {
    const product = $$Products.get(index).toJS();
    return {
      ...product
    }
  }

  render() {
    const {visible, confirmLoading, modalType, pagination} = this.state;

    const $$dataSource = this.initProducts(this.state.$$products);

    return (
      <ProductPage>
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
            units={this.state.units}
            types={this.state.types}
          />
          <EditableTable
            scroll={{x: '170%', y: '100%'}}
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
      </ProductPage>
    );
  };
}

Product.propTypes = {
  $$products: PropTypes.object.isRequired,
  $$units: PropTypes.object.isRequired,
  $$types: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  status: PropTypes.string,
  getUnits: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    $$products: state.getIn(['productsReducer', 'products', 'data']),
    $$units: state.getIn(['unitsReducer', 'units']),
    $$types: state.getIn(['typesReducer', 'types']),
    pagination: {
      total: state.getIn(['productsReducer', 'products', 'total']),
      current: state.getIn(['productsReducer', 'products', 'current_page']),
      pageSize: state.getIn(['productsReducer', 'products', 'per_page']),
      lastPage: state.getIn(['productsReducer', 'products', 'last_page']),
    },
    message: state.getIn(['productsReducer', 'message']),
    status: state.getIn(['productsReducer', 'status']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: (payload = {}) => {
      dispatch(getProducts(payload));
    },
    /**
     * @param payload {{$$productsUpdated: List, index: Number}}  index 被修改数据的索引 index
     */
    updateProduct: (payload) => {
      dispatch(updateProduct(payload));
    },
    addProduct: (payload) => {
      dispatch(addProduct(payload));
    },
    deleteProduct: (payload) => {
      dispatch(deleteProduct(payload));
    },
    getUnits: () => {
      dispatch(getUnits());
    },
    getTypes: () => {
      dispatch(getTypes());
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Product));