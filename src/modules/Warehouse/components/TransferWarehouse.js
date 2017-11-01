/**
 * Created by geekzwb on 2017/10/24.
 * What for:
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Input, Button, Select, AutoComplete } from 'antd';
import styled from 'styled-components';
import HTTPUtil from '../../../utils/Http';

const Error = styled.div`
  color: #f04134;
  line-height: 1.5;
`;
const Success = styled.div`
  text-align: center;
  color: green;
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

class TransferWarehouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoCompleteResult: [],
      products: [{}],
      productCount: 0,
      visible: this.props.visible,
      confirmLoading: false,
      message: '',
      successMessage: '',
    };

    this.handleProductChange = this.handleProductChange.bind(this);
    this.handleAddProduct = this.handleAddProduct.bind(this);
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
    this.onOk = this.onOk.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.visible !== this.state.visible || nextState !== this.state;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
    });
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
      products: newProducts,
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

  onOk() {
    this.setState({confirmLoading: true, message: '', successMessage: ''});
    this.props.form.validateFields((err, values) => {
      if (!err) {
        HTTPUtil.post('warehouse/transfer', values).then((res) => {
          if (res.status === 'success') {
            this.setState({successMessage: '转移成功~', confirmLoading: false});
            setTimeout(()=>{
              this.setState({successMessage: '', products:[{}]});
            }, 3000);
          } else {
            this.setState({message: res.message, confirmLoading: false});
          }
        }).catch((err) => {
          this.setState({
            message: '网络错误!',
            confirmLoading: false
          });
        });
      }
    });
  }

  render() {
    const {title, onCancel, form, warehouses} = this.props;
    const {getFieldDecorator} = form;
    const {autoCompleteResult, confirmLoading, visible, message, successMessage} = this.state;

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

    const warehouseFrom = getFieldDecorator('from', {
      initialValue: 1,
      rules: [{required: true, message: 'Please select the warehouse!'}],
    })(
      <Select>
        {
          warehouses.map((warehouse) => {
            return (
              <Option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </Option>
            );
          })
        }
      </Select>
    );
    const warehouseTo = getFieldDecorator('to', {
      initialValue: 2,
      rules: [{required: true, message: 'Please select the warehouse!'}],
    })(
      <Select>
        {
          warehouses.map((warehouse) => {
            return (
              <Option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </Option>
            );
          })
        }
      </Select>
    );

    const productOptions = autoCompleteResult.map((product) => {
      return <AutoCompleteOption key={product.id}
                                 value={product.id}>{`${product.name} ${product.sku}`}</AutoCompleteOption>;
    });

    const prodctItems = this.state.products.map((product, index) => {
      return (
        <ProductItemBox key={index}>
          <h2>产品{index + 1} <Button type='danger' onClick={this.handleDeleteProduct.bind(index)}>delete</Button></h2>
          {getFieldDecorator(`products[${index}][id]`, {
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
          })(<Input placeholder="* 转移的产品数量"/>)}
        </ProductItemBox>
      );
    });

    return (
      <Modal
        visible={visible}
        title={title}
        onCancel={onCancel}
        onOk={this.onOk}
        confirmLoading={confirmLoading}
      >
        <Form layout="vertical">
          <FormItem {...formItemLayout} label="从仓库">
            {warehouseFrom}
            <Error>{message.from}</Error>
          </FormItem><FormItem {...formItemLayout} label="转移到仓库">
          {warehouseTo}
          <Error>{message.to}</Error>
        </FormItem>
          <FormItem {...formItemLayout} label="产品相关信息">
            {prodctItems}
            <div style={{marginTop: '10px'}}>
              <Button type='primary' onClick={this.handleAddProduct}>Add</Button>
            </div>
          </FormItem>
          <Error>{typeof(message) === 'string' ? message : ''}</Error>
          <Success>{successMessage}</Success>
        </Form>
      </Modal>
    );
  }
}

/**
 *
 * @type {{title, data: *, onOk, onCancel, message: *}}
 */
TransferWarehouse.propTypes = {
  title: PropTypes.string.isRequired, // modal title
  warehouses: PropTypes.array, //
  onCancel: PropTypes.func.isRequired,  // 取消
};

export default Form.create()(TransferWarehouse);