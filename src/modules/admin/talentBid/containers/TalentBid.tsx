import { connect } from 'react-redux';
import {
  onGetTalentDetailsRequest,
  onPostTalentBidRequest,
  onGetSelectedTalentSkillsRequest,
  onGetDropDownData,
  onGigListingRequest,
  onGetSgFeeRequest
} from 'src/shared/SkillGigs.React.Redux/administration/redux/actions/ItemsAction';
import TalentBidUI from '../components/TalentBidUI';

const mapStateToProps = (state: any, ownProps: any) => ({
  isLoggedIn: state.admin.auth.loginSuccess,
  ownProps: ownProps.match,
  dropDownData: state.admin.dropDownFiller.dropDownFillerItems,
  gigListingItems: state.admin.gigListing.gigListingItems,
  talentSuggestionItems: state.admin.talentList.talentSuggestionItems,
  talentSuggestionError: state.admin.talentList.talentSuggestionError,
  isTalentLoading: state.admin.talentList.isTalentLoading,
  contractSgFee: state.admin.talentList.contractSgFee,
  sgFee: state.admin.talentList.sgFee,
  talentSkillSuggestionItems: state.admin.talentList.talentSkillSuggestionItems,
  isDesktopLayout: state.browser.screenLayout === "desktop"
});

const mapDispatchToProps = (dispatch: any) => ({
  onGetTalentDetailsRequest: (query: string) =>
    dispatch(onGetTalentDetailsRequest(query)),
  onPostTalentBidRequest: (data: any) =>
    dispatch(onPostTalentBidRequest(data)),
  onGetSelectedTalentSkillsRequest: (id: number) =>
    dispatch(onGetSelectedTalentSkillsRequest(id)),
  getDropDownData: (type: any) =>
    dispatch(onGetDropDownData(type)),
  onGigListingRequest: (id: number) =>
    dispatch(onGigListingRequest(id)),
  onGetSgFeeRequest: (data: any) =>
    dispatch(onGetSgFeeRequest(data)),  
});

export default connect(mapStateToProps, mapDispatchToProps)(TalentBidUI);
