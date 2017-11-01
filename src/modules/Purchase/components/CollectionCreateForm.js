/**
 * Created by geekzwb on 2017/10/24.
 * What for:
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Input, Button, Select, DatePicker, AutoComplete } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import HTTPUtil from '../../../utils/Http';

const Error = styled.div`
  color: #f04134;
  line-height: 1.5;
`;
const ProductItemBox = styled.div`
  & .ant-input {
    margin: 3px;
  }
  & h2 {
    margin-bottom: 5px;
  }
  & h2 .ant-btn-danger {
    display: none;
  }
  & h2:hover .ant-btn-danger {
    display: inline-block;
  }
`;

//
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class CollectionCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.cachePropducts = this.props.data.products;
    this.state = {
      autoCompleteResult: [],
      products: this.props.data.products ? this.props.data.products : [],
      productCount: this.props.data.products ? this.props.data.products.length : 0
    };

    this.handleProductChange = this.handleProductChange.bind(this);
    this.handleAddProduct = this.handleAddProduct.bind(this);
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.products !== this.cachePropducts) {
      this.setState({
        products: nextProps.data.products || [],
        productCount: nextProps.data.products ? nextProps.data.products.length : 0
      }, () => {
        this.cachePropducts = nextProps.data.products;
      });
    }
  }

  /**
   * 增加一个产品
   */
  handleAddProduct() {
    this.setState({
      productCount: this.state.productCount + 1,
      products: [
        ...this.state.products,
        {}
      ]
    });
  }

  /**
   * 删除某个产品
   * @param index
   */
  handleDeleteProduct(index) {
    const newProducts = this.state.products.splice(index, 1);
    this.setState({
      productCount: this.state.productCount - 1,
      products: newProducts
    });
  }


  /**
   * 根据 id
   * @param value
   */
  handleProductChange(value) {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      HTTPUtil.get(`product/${value}`).then((res) => {
        // 注意这里 this 指向
        if (res.status === 'success') {
          autoCompleteResult = res.data;
          this.setState({autoCompleteResult});
        }
      }).catch(function (error) {
        //
        console.log('error', error);
      });
    }
  };

  render() {
    const {title, visible, onCancel, onOk, confirmLoading, form, data, suppliers, message} = this.props;
    const {getFieldDecorator} = form;
    const {autoCompleteResult} = this.state;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 8},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
      },
    };

    const supplierSelector = getFieldDecorator('supplier_id', {
      initialValue: data.supplier_id,
      rules: [{required: true, message: 'Please select the supplier!'}],
    })(
      <Select>
        {
          suppliers.map((supplier) => {
            return (
              <Option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </Option>
            );
          })
        }
      </Select>
    );

    const productOptions = autoCompleteResult.map((product) => {
      return <AutoCompleteOption key={product.name}>{product.name}</AutoCompleteOption>;
    });

    const prodctItems = this.state.products.map((product, index) => {
      return (
        <ProductItemBox key={index}>
          <h2>产品{index + 1} <Button type='danger' onClick={this.handleDeleteProduct.bind(index)}>delete</Button></h2>
          {getFieldDecorator(`products[${index}][name]`, {
            initialValue: product.name,
            rules: [{required: true, message: 'Please input product!'}],
          })(
            <AutoComplete
              dataSource={productOptions}
              onChange={this.handleProductChange}
              placeholder="* 输入产品id 或 sku 或 name 查询并选择"
            >
              <Input />
            </AutoComplete>
          )}
          {getFieldDecorator(`products[${index}][count]`, {
            initialValue: product.count,
            rules: [{required: true, message: 'Please input product count!'}],
          })(<Input placeholder="* 购入该产品数量"/>)}
          {getFieldDecorator(`products[${index}][price]`, {
            initialValue: product.price,
            rules: [{required: true, message: 'Please input product price of one!'}],
          })(<Input placeholder="* 购入该产品单价"/>)}
        </ProductItemBox>
      );
    });

    return (
      <Modal
        visible={visible}
        title={title}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
      >
        <Form layout="vertical">
          <FormItem {...formItemLayout} label="订货标识">
            {getFieldDecorator('name', {
              initialValue: data.name || `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`,
              rules: [{required: true, message: '请输入订货标识!'}],
            })(
              <Input />
            )}
            <Error>{message.name}</Error>
          </FormItem>
          <FormItem {...formItemLayout} label="送货单号">
            {getFieldDecorator('delivery_code', {
              initialValue: data.delivery_code,
            })(
              <Input />
            )}
            <Error>{message.delivery_code}</Error>
          </FormItem>
          <FormItem {...formItemLayout} label="运费">
            {getFieldDecorator('delivery_amount', {
              initialValue: data.delivery_amount
            })(
              <Input />
            )}
            <Error>{message.delivery_amount}</Error>
          </FormItem>
          <FormItem  {...formItemLayout}
                     label="发票日期"
          >
            {getFieldDecorator('invoice_date', {
              initialValue: data.invoice_date && moment(data.invoice_date, 'YYYY-MM-DD'),
            })(
              <DatePicker />
            )}
            <Error>{message.invoice_date}</Error>
          </FormItem>
          <FormItem {...formItemLayout} label="发票单号">
            {getFieldDecorator('invoice_code', {
              initialValue: data.invoice_code
            })(
              <Input />
            )}
            <Error>{message.invoice_code}</Error>
          </FormItem>
          <FormItem {...formItemLayout} label="发票金额">
            {getFieldDecorator('invoice_amount', {
              initialValue: data.invoice_amount
            })(
              <Input />
            )}
            <Error>{message.invoice_amount}</Error>
          </FormItem>
          <FormItem {...formItemLayout} label="欠款金额">
            {getFieldDecorator('arrears', {
              initialValue: data.arrears || 0,
            })(<Input />)}
            <Error>{message.arrears}</Error>
          </FormItem>
          <FormItem {...formItemLayout} label="备注">
            {getFieldDecorator('note', {
              initialValue: data.note,
            })(<Input.TextArea />)}
            <Error>{message.note}</Error>
          </FormItem>
          <FormItem {...formItemLayout} label="供应商">
            {supplierSelector}
            <Error>{message.supplier}</Error>
          </FormItem>
          <FormItem {...formItemLayout} label="产品相关信息">
            {prodctItems}
            <div style={{marginTop: '10px'}}>
              <Button type='primary' onClick={this.handleAddProduct}>Add</Button>
            </div>
          </FormItem>
          <Error>{typeof(message) === 'string' ? message : ''}</Error>
        </Form>
      </Modal>
    );
  }
}

/**
 *
 * @type {{title, data: *, onOk, onCancel, message: *}}
 */
CollectionCreateForm.propTypes = {
  title: PropTypes.string.isRequired, // modal title
  data: PropTypes.object, // 表单初始数据
  suppliers: PropTypes.array, // [{name: '供应商15', id:1, ...}]
  onOk: PropTypes.func.isRequired,  // 提交
  onCancel: PropTypes.func.isRequired,  // 取消
  message: PropTypes.oneOfType([  // 错误提示
    PropTypes.string,
    PropTypes.object,
  ]),
};

export default Form.create()(CollectionCreateForm);