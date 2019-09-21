/**
 * @file 无需登录可见
 * @author Created by geekzwb on 2017/10/13.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

// components
import App from '../App';

const PublicRoute = ({component: Component, isAuthenticated, ...rest}) => {
  return <Route
    {...rest}
    render={props => (
      isAuthenticated ? (
        <App>
          <Component {...props} />
        </App>
      ) : (
        <Component/>
      )
    )}
  />;
};

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.getIn(['auth', 'isAuthenticated'], false)
  };
}

export default connect(mapStateToProps)(PublicRoute);