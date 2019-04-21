import { connect } from 'react-redux';
import {
  onCompanyProfileRequest,
  onEmployerAccountUpdateRequest
} from 'src/redux/actions/ItemsAction';
import CompanyProfilePageUI from '../components/CompanyProfilePageUI';

const mapStateToProps = (state: any, ownProps: any) => ({
  isLoggedIn: state.admin.auth.loginSuccess,
  ownProps: ownProps.match,
  companyProfileItems: state.admin.companyProfile.companyProfileItems,
  companyProfileError: state.admin.companyProfile.companyProfileError,
  companyGigItems: state.admin.companyProfile.companyGigItems,
  isProfileLoading: state.admin.companyProfile.isProfileLoading,
  isDesktopLayout: state.browser.screenLayout === "desktop"
});

const mapDispatchToProps = (dispatch: any) => ({
  onCompanyProfileRequest: (id: number, gigAPI: boolean) =>
    dispatch(onCompanyProfileRequest(id, gigAPI)),
  onEmployerAccountUpdateRequest: (data: any) =>
    dispatch(onEmployerAccountUpdateRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyProfilePageUI);
