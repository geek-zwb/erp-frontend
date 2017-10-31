/**
 * Created by geekzwb on 2017/10/30.
 * What for:
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Input, Button, DatePicker, AutoComplete } from 'antd';
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
const AutoCompleteOption = AutoComplete.Option;

class CollectionCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.cachePropducts = this.props.data.products;
    this.state = {
      autoCompleteResult: [],
      customerSearchResult: [],
      products: this.props.data.products ? this.props.data.products : [],
      productCount: this.props.data.products ? this.props.data.products.length : 0
    };

    this.handleProductChange = this.handleProductChange.bind(this);
    this.handleCustomerChange = this.handleCustomerChange.bind(this);
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
   * 根据 id, name, email 查询到某个 customer
   * @param value
   */
  handleCustomerChange(value) {
    let customerSearchResult;
    if (!value) {
      customerSearchResult = [];
    } else {
      HTTPUtil.get(`customer/${value}`).then((res) => {
        // 注意这里 this 指向
        if (res.status === 'success') {
          customerSearchResult = res.data;
          this.setState({customerSearchResult});
        }
      }).catch(function (error) {
        //
        console.log('error', error);
      });
    }
  };

  /**
   * 根据 id, name， sku
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
    const {title, visible, onCancel, onOk, confirmLoading, form, data, message} = this.props;
    const {getFieldDecorator} = form;
    const {autoCompleteResult, customerSearchResult} = this.state;

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

    const customerOptions = customerSearchResult.map((customer) => {
      return <AutoCompleteOption key={customer.email} value={customer.email}>{customer.name + ' ' + customer.email}</AutoCompleteOption>;
    });


    const productOptions = autoCompleteResult.map((product) => {
      return <AutoCompleteOption key={product.name}>{product.name}</AutoCompleteOption>;
    });

    const prodctItems = this.state.products.map((product, index) => {
      return (
        <ProductItemBox key={index}>
          <h2>产品{index + 1} <Button type='danger' onClick={this.handleDeleteProduct.bind(index)}>delete</Button></h2>
          {getFieldDecorator(`products[${index}][name]`, {
            initialValue: product.name,
            rules: [{required: true, message: 'Please select the product!'}],
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
          })(<Input placeholder="* 售出该产品数量"/>)}
          {getFieldDecorator(`products[${index}][price]`, {
            initialValue: product.price,
            rules: [{required: true, message: 'Please input product price of one!'}],
          })(<Input placeholder="* 售出该产品单价"/>)}
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
          <FormItem {...formItemLayout} label="订单(发货)标识">
            {getFieldDecorator('name', {
              initialValue: data.name || `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`,
              rules: [{required: true, message: '请输入订单标识!'}],
            })(
              <Input />
            )}
            <Error>{message.name}</Error>
          </FormItem>
          <FormItem {...formItemLayout} label="客户email(收货人唯一标识)">
            {getFieldDecorator(`customer_email`, {
              initialValue: data.customer && data.customer.email,
              rules: [{required: true, message: 'Please input and select customer!'}],
            })(
              <AutoComplete
                dataSource={customerOptions}
                onChange={this.handleCustomerChange}
                placeholder="* 输入客户id 或 email 或 name 查询并选择"
              >
                <Input />
              </AutoComplete>
            )}
            <Error>{message.customer_email}</Error>
          </FormItem>
          <FormItem {...formItemLayout} label="订单编号(亚马逊等)">
            {getFieldDecorator('order_code', {
              initialValue: data.order_code,
            })(
              <Input />
            )}
            <Error>{message.order_code}</Error>
          </FormItem>
          <FormItem {...formItemLayout} label="订单状态">
            {getFieldDecorator('status', {
              initialValue: data.status || '已发货',
              rules: [{required: true, message: 'Please input the order status!'}],
            })(
              <Input />
            )}
            <Error>{message.status}</Error>
          </FormItem>
          <FormItem  {...formItemLayout}
                     label="发货日期"
          >
            {getFieldDecorator('delivery_date', {
              initialValue: data.delivery_date && moment(data.delivery_date, 'YYYY-MM-DD'),
            })(
              <DatePicker />
            )}
            <Error>{message.delivery_date}</Error>
          </FormItem>
          <FormItem {...formItemLayout} label="快递单号">
            {getFieldDecorator('delivery_code', {
              initialValue: data.delivery_code
            })(
              <Input />
            )}
            <Error>{message.delivery_code}</Error>
          </FormItem>
          <FormItem {...formItemLayout} label="快递公司">
            {getFieldDecorator('delivery_company', {
              initialValue: data.delivery_company
            })(
              <Input />
            )}
            <Error>{message.delivery_company}</Error>
          </FormItem>
          <FormItem {...formItemLayout} label="备注">
            {getFieldDecorator('note', {
              initialValue: data.note,
            })(<Input.TextArea />)}
            <Error>{message.note}</Error>
          </FormItem>
          <FormItem {...formItemLayout} label="* 产品相关信息">
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
  onOk: PropTypes.func.isRequired,  // 提交
  onCancel: PropTypes.func.isRequired,  // 取消
  message: PropTypes.oneOfType([  // 错误提示
    PropTypes.string,
    PropTypes.object,
  ]),
};

export default Form.create()(CollectionCreateForm);