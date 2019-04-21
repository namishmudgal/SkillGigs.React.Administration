import { connect } from 'react-redux';
import {
  onGetEmployerDetailsRequest,
  onPostEmployerBidRequest,
  onGetSelectedEmployerGigsRequest,
  onGetDropDownData,
  onSkillListingRequest
} from 'src/shared/SkillGigs.React.Redux/administration/redux/actions/ItemsAction';
import EmployerBidUI from '../components/EmployerBidUI';

const mapStateToProps = (state: any, ownProps: any) => ({
  isLoggedIn: state.admin.auth.loginSuccess,
  ownProps: ownProps.match,
  employerSuggestionError: state.admin.employerList.employerSuggestionError,
  employerSuggestionItems: state.admin.employerList.employerSuggestionItems,
  isEmployerLoading: state.admin.employerList.isEmployerLoading,
  employerGigSuggestionItems: state.admin.employerList.employerGigSuggestionItems,
  dropDownData: state.admin.dropDownFiller.dropDownFillerItems,
  skillListingItems: state.admin.skillListing.skillListingItems,
  skillListingError: state.admin.skillListing.skillListingError,
  isListingLoading: state.admin.skillListing.isListingLoading,
  isDesktopLayout: state.browser.screenLayout === "desktop"
});

const mapDispatchToProps = (dispatch: any) => ({
  onGetEmployerDetailsRequest: (query: string) =>
    dispatch(onGetEmployerDetailsRequest(query)),
  onPostEmployerBidRequest: (data: any) =>
    dispatch(onPostEmployerBidRequest(data)),
  onGetSelectedEmployerGigsRequest: (id: number) =>
    dispatch(onGetSelectedEmployerGigsRequest(id)),
  getDropDownData: (type: any) =>
    dispatch(onGetDropDownData(type)),
  onSkillListingRequest: (id: number, flag: boolean) =>
    dispatch(onSkillListingRequest(id, flag)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployerBidUI);
