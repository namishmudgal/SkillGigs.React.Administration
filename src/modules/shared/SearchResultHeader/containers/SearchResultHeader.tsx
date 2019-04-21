import { connect } from 'react-redux';
import {
  checkCredentials,
} from 'src/shared/SkillGigs.React.Redux/administration/redux/actions/ItemsAction';
import SearchResultHeaderUI from '../components/SearchResultHeaderUI';

const mapStateToProps = (state: any, ownProps: any) => ({
	loginSuccess: state.admin.auth.loginSuccess,
  resultCount: ownProps.resultCount,
  totalCount: ownProps.totalCount,
});

const mapDispatchToProps = (dispatch: any) => ({
  onCheckCredentials: (username: any, password: any) =>
    dispatch(checkCredentials(username, password)),
});

const SearchResultHeader = connect(mapStateToProps, mapDispatchToProps)(SearchResultHeaderUI);
export default SearchResultHeader;
