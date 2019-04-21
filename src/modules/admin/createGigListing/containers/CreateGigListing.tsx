import { connect } from 'react-redux';
import {
  onSearchRequest,
  onGetDropDownData,
  onLocationRequest,
  onReqSkillRequest,
  onDesSkillRequest,
  onGigCreateRequest
} from 'src/shared/SkillGigs.React.Redux/administration/redux/actions/ItemsAction';
import CreateGigListingUI from '../components/CreateGigListingUI';

const mapStateToProps = (state: any, ownProps: any) => ({
  isDesktopLayout: state.browser.screenLayout === "desktop",
  ownProps: ownProps.match,
  dropDownData: state.admin.dropDownFiller.dropDownFillerItems,
  location: state.admin.gigSearch.location,
  locationItems: state.admin.gigSearch.locationItems,
  isLocationLoading: state.admin.gigSearch.isLocationLoading,
  reqSkillSuggestionItems: state.admin.gig.reqSkillSuggestionItems,
  desSkillSuggestionItems: state.admin.gig.desSkillSuggestionItems,
  isReqSkillLoading: state.admin.gig.isReqSkillLoading,
  isDesSkillLoading: state.admin.gig.isDesSkillLoading,
  jobOrderId: state.admin.gig.gigDataItems.jobOrderId ? state.admin.gig.gigDataItems.jobOrderId : null,
  professionId: state.admin.gig.gigDataItems.professionId ? state.admin.gig.gigDataItems.professionId : null,
  profileId: state.admin.gig.gigDataItems.profileId ? state.admin.gig.gigDataItems.profileId : null,
});

const mapDispatchToProps = (dispatch: any) => ({
  onSearchRequest: (request: any) =>
    dispatch(onSearchRequest(request)),
  getDropDownData: (type: any) =>
    dispatch(onGetDropDownData(type)),
  getLocationsData: (str: any) =>
    dispatch(onLocationRequest(str)),
  onReqSkillRequest: (str: any) =>
    dispatch(onReqSkillRequest(str)),
  onDesSkillRequest: (str: any) =>
    dispatch(onDesSkillRequest(str)),
  onGigCreateRequest: (obj: any, step: string) =>
    dispatch(onGigCreateRequest(obj, step))
});

const CreateGigListing = connect(mapStateToProps, mapDispatchToProps)(CreateGigListingUI);
export default CreateGigListing;
