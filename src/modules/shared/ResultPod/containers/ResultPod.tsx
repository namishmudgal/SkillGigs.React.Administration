import { connect } from 'react-redux';
import {
  checkCredentials,
} from 'src/shared/SkillGigs.React.Redux/administration/redux/actions/ItemsAction';
import ResultPodUI from '../components/ResultPodUI';

const mapStateToProps = (state: any, ownProps: any) => ({
  loginSuccess: state.admin.auth.loginSuccess,
  resultDetails: ownProps.resultDetails,
  appName: ownProps.appName,
});

const mapDispatchToProps = (dispatch: any) => ({
  onCheckCredentials: (username: any, password: any) =>
    dispatch(checkCredentials(username, password)),
});

const ResultPod = connect(mapStateToProps, mapDispatchToProps)(ResultPodUI);
export default ResultPod;
