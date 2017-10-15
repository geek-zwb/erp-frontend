/**
 * Created by geekzwb on 2017/10/14.
 * What for:
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styled from 'styled-components';

const Error = styled.div`
  color: #f04134;
  line-height: 1.5;
`;

//
const FormItem = Form.Item;

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values);
        console.log('Received values of form: ', values);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      message: nextProps.message
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{required: true, message: 'Please input your username!'}],
          })(
            <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="Username"/>
          )}
          <Error>{this.props.message.username}</Error>
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{required: true, message: 'Please input your Password!'}],
          })(
            <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password" placeholder="Password"/>
          )}
        </FormItem>
        <Error>{typeof(this.state.message) === 'string' ? this.state.message : ''}</Error>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
        </FormItem>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        <div>
          Not a member yet? Click <Link to={'/resister'}>here</Link> to register.
        </div>
      </Form>
    );
  };
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  message: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.object,
    ''
  ]),
};

export default Form.create()(LoginForm);