/**
 * Created by geekzwb on 2017/10/13.
 * What for:
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

// compoennts
import LoginForm from './components/LoginForm';

// action creator
import { login } from './actions';


const LoginPage = styled.div`
  background: #fff;
  height: 100vh;
  width: 100%;
  display: flex;
`;
const LoginCover = styled.div`
  flex: 1;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  & img {
    width: 100%;
    height: auto;
  }
`;
const LoginBox = styled.div`
  margin-top: 100px;
  flex: 0 0 500px;
  height: 100%;
  color: #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LoginHeader = styled.header`
  color: #242a30;
  font-size: 28px;
  font-weight: 300;
`;
const LoginContent = styled.div`
  position: relative;
  padding: 40px;
  color: #999;
  width: 450px;
  margin: 0 auto;
  & .ant-input-affix-wrapper .ant-input {
    min-height: 28px;
    height: 46px;
    padding: 10px 16px;
    font-size: 12px;
  }
  & .login-form-forgot {
    float: right;
  }
  & .login-form-button {
    padding: 10px 16px;
    width: 100%;
    font-size: 18px;
    height: auto;
    margin: 30px 0 20px;
  }
`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        email: 'admin@admin.com',
        password: 'admin'
      }
    };

    this.login = this.login.bind(this);
  }

  /**
   * dispatch login
   * @param credentials
   */
  login(credentials) {
    this.setState({
      credentials
    });
    this.props.login(credentials);
  }

 /* componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) this.props.history.replace('/');
  }*/

  render() {
    if (this.props.isAuthenticated) return <Redirect to="/" />;

    return (
      <LoginPage>
        <LoginCover>
          <img src="http://laravel.ranbl.com/asset_admin/assets/img/login-bg/bg-6.jpg" alt=""/>
        </LoginCover>
        <LoginBox>
          <LoginHeader>
            权限管理
          </LoginHeader>
          <LoginContent>
            <LoginForm login={this.login} message={this.props.message} />
            <p style={{marginTop: 60, paddingTop: 20, textAlign: 'center', borderTop: '1px solid #ccc'}}>
              © rbac All Right Reserved 2017
            </p>
          </LoginContent>
        </LoginBox>
      </LoginPage>
    );
  };
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  message: PropTypes.string || PropTypes.object
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
    message: state.getIn(['auth', 'message'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));