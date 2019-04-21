import { connect } from 'react-redux';
import {
  onSuggestionRequest,
  onSearchRequest
} from 'src/shared/SkillGigs.React.Redux/administration/redux/actions/ItemsAction';
import CreateSkillListingUI from '../components/CreateSkillListingUI';

const mapStateToProps = (state: any) => ({
  isDesktopLayout: state.browser.screenLayout === "desktop",
  isLoggedIn: state.admin.auth.loginSuccess
});

const mapDispatchToProps = (dispatch: any) => ({
  onSuggestionRequest: (str: any) =>
    dispatch(onSuggestionRequest(str)),
  onSearchRequest: (request: any) =>
    dispatch(onSearchRequest(request)),
});

const CreateSkillListing = connect(mapStateToProps, mapDispatchToProps)(CreateSkillListingUI);
export default CreateSkillListing;
