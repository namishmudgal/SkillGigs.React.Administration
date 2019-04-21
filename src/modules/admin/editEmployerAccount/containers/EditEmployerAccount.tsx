import { connect } from 'react-redux';
import {
  onCompanyProfileRequest,
  onLocationRequest,
  onGetDropDownData,
  onEmployerAccountUpdateRequest
} from 'src/redux/actions/ItemsAction';
import EditEmployerAccountUI from '../components/EditEmployerAccountUI';

const mapStateToProps = (state: any, ownProps: any) => ({
  isLoggedIn: state.admin.auth.loginSuccess,
  ownProps: ownProps.match,
  companyProfileError: state.admin.companyProfile.companyProfileError,
  companyProfileItems: state.admin.companyProfile.companyProfileItems,
  isProfileLoading: state.admin.companyProfile.isProfileLoading,
  location: state.admin.gigSearch.location,
  locationItems: state.admin.gigSearch.locationItems,
  isLocationLoading: state.admin.gigSearch.isLocationLoading,
  dropDownData: state.admin.dropDownFiller.dropDownFillerItems,
  isDesktopLayout: state.browser.screenLayout === "desktop"
});

const mapDispatchToProps = (dispatch: any) => ({
  onCompanyProfileRequest: (id: number, gigAPI: boolean) =>
    dispatch(onCompanyProfileRequest(id, gigAPI)),
  getLocationsData: (str: any) =>
    dispatch(onLocationRequest(str)),
  getDropDownData: (type: any) =>
    dispatch(onGetDropDownData(type)),
  onEmployerAccountUpdateRequest: (data: any) =>
    dispatch(onEmployerAccountUpdateRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEmployerAccountUI);
