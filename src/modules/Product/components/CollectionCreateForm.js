/**
 * Created by geekzwb on 2017/10/31.
 * What for:
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Input, Select, DatePicker } from 'antd';
import styled from 'styled-components';
import moment from 'moment';

const Error = styled.div`
  color: #f04134;
  line-height: 1.5;
`;

//
const FormItem = Form.Item;
const Option = Select.Option;

class CollectionCreateForm extends React.Component {
  render() {
    const {title, visible, onCancel, onOk, confirmLoading, form, data, units, types, message} = this.props;
    const {getFieldDecorator} = form;

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

    const unitSelector = getFieldDecorator('unit_id', {
      initialValue: data.unit_id,
      rules: [{required: true, message: 'Please select the unit!'}],
    })(
      <Select>
        {
          units.map((unit) => {
            return (
              <Option key={unit.id} value={unit.id}>
                {unit.name}
              </Option>
            );
          })
        }
      </Select>
    );
    const typeSelector = getFieldDecorator('type_id', {
      initialValue: data.type_id,
      rules: [{required: true, message: 'Please select the unit!'}],
    })(
      <Select>
        {
          types.map((type) => {
            return (
              <Option key={type.id} value={type.id}>
                {type.name}
              </Option>
            );
          })
        }
      </Select>
    );

    return (
      <Modal
        visible={visible}
        title={title}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
      >
        <Form layout="vertical">
          <FormItem {...formItemLayout} label="产品名称">
            {getFieldDecorator('name', {
              initialValue: data.name,
              rules: [{required: true, message: '请输入产品名称!'}],
            })(
              <Input />
            )}
            <Error>{message.name}</Error>
          </FormItem>
          <FormItem {...formItemLayout} label="SKU">
            {getFieldDecorator('sku', {
              initialValue: data.sku,
              rules: [{required: true, message: '请输入产品sku!'}],
            })(
              <Input />
            )}
            <Error>{message.name}</Error>
          </FormItem>
          <FormItem {...formItemLayout} label="单位">
            {unitSelector}
            <Error>{message.unit}</Error>
          </FormItem>
          <FormItem {...formItemLayout} label="分类">
            {typeSelector}
            <Error>{message.type}</Error>
          </FormItem>
          <FormItem {...formItemLayout} label="产品描述">
            {getFieldDecorator('description', {
              initialValue: data.description,
            })(<Input.TextArea />)}
            <Error>{message.description}</Error>
          </FormItem>
          <FormItem {...formItemLayout} label="备注">
            {getFieldDecorator('note', {
              initialValue: data.note,
            })(<Input.TextArea />)}
            <Error>{message.note}</Error>
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
  units: PropTypes.array, // [{name: '计量单位', id:1, ...}]
  onOk: PropTypes.func.isRequired,  // 提交
  onCancel: PropTypes.func.isRequired,  // 取消
  message: PropTypes.oneOfType([  // 错误提示
    PropTypes.string,
    PropTypes.object,
  ]),
};

export default Form.create()(CollectionCreateForm);