import { connect } from 'react-redux';
import {
  onCompanyProfileRequest,
  onUpdateImageDetailsRequest,
  onDeleteImageDetailsRequest,
  onCultureImageUploadRequest
} from 'src/shared/SkillGigs.React.Redux/administration/redux/actions/ItemsAction';
import PeopleWizardUI from '../components/PeopleWizardUI';

const mapStateToProps = (state: any, ownProps: any) => ({
  isDesktopLayout: state.browser.screenLayout === "desktop",
  ownProps: ownProps.match,
  companyProfileError: state.admin.companyProfile.companyProfileError,
  companyProfileItems: state.admin.companyProfile.companyProfileItems,
  albumPictureId: state.admin.companyProfile.addedImageItemId,
  isProfileLoading: state.admin.companyProfile.isProfileLoading,
  profileId: state.admin.gig.gigDataItems.profileId ? state.admin.gig.gigDataItems.profileId : null,
});

const mapDispatchToProps = (dispatch: any) => ({
  onCompanyProfileRequest: (id: number, gigAPI: boolean) =>
    dispatch(onCompanyProfileRequest(id, gigAPI)),
  onUpdateImageDetailsRequest: (data: any) =>
    dispatch(onUpdateImageDetailsRequest(data)),
  onDeleteImageDetailsRequest: (data: any) =>
    dispatch(onDeleteImageDetailsRequest(data)),
  onCultureImageUploadRequest: (data: any) =>
    dispatch(onCultureImageUploadRequest(data)),
});

const PeopleWizard = connect(mapStateToProps, mapDispatchToProps)(PeopleWizardUI);
export default PeopleWizard;
