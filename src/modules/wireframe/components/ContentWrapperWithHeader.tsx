import * as React from 'react';
import Header from '../../common/containers/Header';
import Footer from '../../common/containers/Footer';
import MobileLoggedInNavigation from '../../common/components/header/MobileLoggedInNavigation';
import { connect } from 'react-redux';
import {
  logoutSession,
} from 'src/shared/SkillGigs.React.Redux/administration/redux/actions/ItemsAction';

interface Props extends React.Props<ContentWrapperWithHeader> {
    children: any;
    isMobileHeaderMenuOpened: boolean;
    isLoggedIn: boolean;
    marginBottom: boolean;
    onLogoutSession(): void;
}

class ContentWrapperWithHeader extends React.Component<Props, {}> {
  render() {
    const {
      children,
      isMobileHeaderMenuOpened,
      onLogoutSession,
      isLoggedIn,
      marginBottom
    } = this.props;
    return (
      <div className="body-content">
        {
          isLoggedIn ?
            <MobileLoggedInNavigation
              isMobileHeaderMenuOpened={isMobileHeaderMenuOpened}
              onLogoutSession={onLogoutSession}
            /> : null
        }
        <Header />
          <div id="site-content" className='mrg-tp09mb'>
            {children}
          </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  isMobileHeaderMenuOpened: state.admin.isMobileHeaderMenuOpened,
  isLoggedIn: state.admin.auth.loginSuccess,
  children: ownProps.children,
  marginBottom: ownProps.marginBottom,
});

const mapDispatchToProps = (dispatch: any) => ({
  onLogoutSession: () => dispatch(logoutSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentWrapperWithHeader);