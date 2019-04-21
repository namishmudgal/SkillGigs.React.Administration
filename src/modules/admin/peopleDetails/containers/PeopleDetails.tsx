import { connect } from 'react-redux';
import {
  onCompanyProfileRequest
} from 'src/shared/SkillGigs.React.Redux/administration/redux/actions/ItemsAction';
import PeopleDetailsUI from '../components/PeopleDetailsUI';

const mapStateToProps = (state: any, ownProps: any) => ({
  isLoggedIn: state.admin.auth.loginSuccess,
  ownProps: ownProps.match,
  companyProfileError: state.admin.companyProfile.companyProfileError,
  companyProfileItems: state.admin.companyProfile.companyProfileItems,
  isDesktopLayout: state.browser.screenLayout === "desktop"
});

const mapDispatchToProps = (dispatch: any) => ({
  onCompanyProfileRequest: (id: number, gigAPI: boolean) =>
    dispatch(onCompanyProfileRequest(id, gigAPI)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PeopleDetailsUI);
