import { connect } from 'react-redux';
import {
  onSuggestionRequest,
  onSearchRequest
} from 'src/redux/actions/ItemsAction';
import GigSearchPageUI from '../components/GigSearchPageUI';

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

const GigSearchPage = connect(mapStateToProps, mapDispatchToProps)(GigSearchPageUI);
export default GigSearchPage;