import { connect } from 'react-redux';
import {
  onCompanyProfileRequest,
  onCultureImageUploadRequest,
  onDeleteImageDetailsRequest
} from 'src/shared/SkillGigs.React.Redux/administration/redux/actions/ItemsAction';
import PhotoManagerUI from '../components/PhotoManagerUI';

const mapStateToProps = (state: any, ownProps: any) => ({
  isLoggedIn: state.admin.auth.loginSuccess,
  ownProps: ownProps.match,
  companyProfileError: state.admin.companyProfile.companyProfileError,
  companyProfileItems: state.admin.companyProfile.companyProfileItems,
  addedImageItemId: state.admin.companyProfile.addedImageItemId,
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
  onCultureImageUploadRequest: (data: any) =>
    dispatch(onCultureImageUploadRequest(data)),
  onDeleteImageDetailsRequest: (data: any) =>
    dispatch(onDeleteImageDetailsRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoManagerUI);
