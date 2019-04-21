import { connect } from 'react-redux';
import {
  checkCredentials,
} from 'src/shared/SkillGigs.React.Redux/administration/redux/actions/ItemsAction';
import SearchResultPodUI from '../components/SearchResultPodUI';

const mapStateToProps = (state: any, ownProps: any) => ({
  loginSuccess: state.admin.auth.loginSuccess,
  resultDetails: ownProps.resultDetails,
});

const mapDispatchToProps = (dispatch: any) => ({
  onCheckCredentials: (username: any, password: any) =>
    dispatch(checkCredentials(username, password)),
});

const SearchResultPod = connect(mapStateToProps, mapDispatchToProps)(SearchResultPodUI);
export default SearchResultPod;
