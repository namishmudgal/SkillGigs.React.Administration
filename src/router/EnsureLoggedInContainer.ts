import * as React from 'react';
import { connect } from 'react-redux';
import browserHistory from './browserHistory';

let isLoggedInSession: boolean = false;
if (window.localStorage && window.localStorage.length) {
  const user = window.localStorage.getItem("user");
  isLoggedInSession = user ? JSON.parse(user) : false;
}

interface EnsureLoggedInProps {
  isLoggedIn: boolean;
  Component: string;
}

class EnsureLoggedInContainer extends React.Component<EnsureLoggedInProps, any> {
    componentDidMount() {
      if (!this.props.isLoggedIn && !isLoggedInSession) {
        browserHistory.push("/SignIn");
      }
    }

    render() {

      if (this.props.isLoggedIn || isLoggedInSession) {
        return this.props.children;
      } else {
        return null;
      }
    }
  }

  const mapStateToProps = (state: any, ownProps: any) => ({
    isLoggedIn: state.admin.auth.loginSuccess,
    Component: ownProps.component,
  });

  export default connect(mapStateToProps, null)(EnsureLoggedInContainer);