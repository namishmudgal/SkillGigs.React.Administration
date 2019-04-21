import { connect } from 'react-redux';
import {
  onSuggestionRequest,
  onSearchRequest
} from 'src/redux/actions/ItemsAction';
import EmployerSearchPageUI from '../components/EmployerSearchPageUI';

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

const EmployerSearchPage = connect(mapStateToProps, mapDispatchToProps)(EmployerSearchPageUI);
export default EmployerSearchPage;
