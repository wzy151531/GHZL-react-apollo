import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
import { getAuthority } from '../utils/authority';
import { Exception404 } from '../Exception/Exception404';

class AuthRouter extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    const auth = getAuthority();
    const isLogin = auth && auth[0] !== 'guest';
    const neededAuthority = this.props.authority || [];
    return (
      <Route {...rest} render={props => {
        if (props.match.url === '/login') {
          // 若已经登录再访问login页面则重定向至'/'
          return isLogin ? <Redirect to="/"/> : <Component {...props}/>;
        }
        if (isLogin) {
          let hasAuthority = true;
          auth.forEach(m => {
            if (neededAuthority.length !== 0 && neededAuthority.indexOf(m) === -1) {
              hasAuthority = false;
            }
          });
          return hasAuthority ? <Component {...props}/> : <Exception404/>;
        } else {
          return (
            <Redirect to="/login"/>
          );
        }
      }}/>
    );
  }
}

export default withRouter(AuthRouter);