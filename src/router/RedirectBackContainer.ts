import * as React from 'react';
import { connect } from 'react-redux';
import browserHistory from './browserHistory';
import { parseJwt } from '../utilities';

let isLoggedInSession: boolean = false;
if (window.localStorage && window.localStorage.length) {
  const user = window.localStorage.getItem("user");
  isLoggedInSession = user ? JSON.parse(user) : false;
}

interface RedirectBackProps {
  isLoggedIn: boolean;
  Component: string;
  userInfo: any;
}

class RedirectBackContainer extends React.Component<RedirectBackProps, any> {
    componentDidMount() {
      if (this.props.isLoggedIn || isLoggedInSession) {
        const rolesStored: any = localStorage.getItem('roles');
        let roles = '';
        if (rolesStored) {
          roles = JSON.parse(rolesStored);
        }
        if (roles) {
          if (roles.indexOf('CONS') !== -1) {
            window.location.href = '/Talent';
          } else if (roles.indexOf('CLIE') !== -1) {
            window.location.href = '/Employer';
          } else if (roles.indexOf('SA') !== -1 || roles.indexOf('ADMIN') !== -1) {
            window.location.href = '/Administration';
          } else {
            window.location.href = '/SignIn';
          }
        } else {
          window.location.href = '/SignIn';
        }
      }
    }

    render() {

      if (!this.props.isLoggedIn && !isLoggedInSession) {
        return this.props.children;
      } else {
        return null;
      }
    }
  }

  const mapStateToProps = (state: any, ownProps: any) => ({
    isLoggedIn: state.admin.auth.loginSuccess,
    userInfo: state.admin.auth.userInfo,
    Component: ownProps.component,
  });

  export default connect(mapStateToProps, null)(RedirectBackContainer);