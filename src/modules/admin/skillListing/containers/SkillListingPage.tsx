import { connect } from 'react-redux';
import {
  onSkillListingRequest,
} from 'src/redux/actions/ItemsAction';
import SkillListingPageUI from '../components/SkillListingPageUI';

const mapStateToProps = (state: any, ownProps: any) => ({
  isLoggedIn: state.admin.auth.loginSuccess,
  ownProps: ownProps.match,
  skillListingItems: state.admin.skillListing.skillListingItems,
  skillListingError: state.admin.skillListing.skillListingError,
  resumeItems: state.admin.skillListing.resumeItems,
  isListingLoading: state.admin.skillListing.isListingLoading
});

const mapDispatchToProps = (dispatch: any) => ({
  onSkillListingRequest: (id: number, flag: boolean) =>
    dispatch(onSkillListingRequest(id, flag)),
});

const SkillListingPage = connect(mapStateToProps, mapDispatchToProps)(SkillListingPageUI);
export default SkillListingPage;
