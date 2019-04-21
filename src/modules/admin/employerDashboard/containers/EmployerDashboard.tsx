import { connect } from 'react-redux';
import {
  onSuggestionRequest,
  onSearchRequest
} from 'src/shared/SkillGigs.React.Redux/administration/redux/actions/ItemsAction';
import EmployerDashboardUI from '../components/EmployerDashboardUI';

const mapStateToProps = (state: any) => ({
  suggestionItems: state.admin.gigSearch.suggestionItems,
  searchResult: state.admin.gigSearch.searchResult,
  isLoading: state.admin.gigSearch.isLoading,
  isLoggedIn: state.admin.auth.loginSuccess
});

const mapDispatchToProps = (dispatch: any) => ({
  onSuggestionRequest: (str: any) =>
    dispatch(onSuggestionRequest(str)),
  onSearchRequest: (request: any) =>
    dispatch(onSearchRequest(request)),
});

const EmployerDashboard = connect(mapStateToProps, mapDispatchToProps)(EmployerDashboardUI);
export default EmployerDashboard;
