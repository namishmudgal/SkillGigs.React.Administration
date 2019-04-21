import { connect } from 'react-redux';
import {
  checkCredentials,
  toggleHeaderMenu,
  logoutSession,
} from 'src/shared/SkillGigs.React.Redux/administration/redux/actions/ItemsAction';
import HeaderUI from '../components/header/HeaderUI';

const mapStateToProps = (state: any, ownProps: any) => ({
  isLoggedIn: state.admin.auth.loginSuccess,
  userInfo: state.admin.auth.userInfo,
  socialProfilePicURL: state.admin.auth.socialProfilePicURL,
  isSkillListingHeader: ownProps.isSkillListingHeader,
  isDesktopLayout: state.browser.screenLayout === "desktop"
});

const mapDispatchToProps = (dispatch: any) => ({
  onCheckCredentials: (username: any, password: any) =>
    dispatch(checkCredentials(username, password)),
  toggleHeaderMenu: () => dispatch(toggleHeaderMenu()),
  onLogoutSession: () => dispatch(logoutSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderUI);
