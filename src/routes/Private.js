/**
 * @file 私有页面
 * @author Created by geekzwb on 2017/10/13.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// components
import App from '../App';

const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => {
  return <Route
    {...rest}
    render={props => (
      isAuthenticated ? (
        <App>
          <Component {...props} />
        </App>
      ) : (
        <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
      )
    )}
  />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.object
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.getIn(['auth', 'isAuthenticated'], true)
  };
}

export default connect(mapStateToProps)(PrivateRoute);