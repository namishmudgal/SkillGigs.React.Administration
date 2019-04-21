import { connect } from 'react-redux';
import {
  checkCredentialsNode,
  onSocialLoginSuccess,
  resetLoginError
} from 'src/redux/actions/ItemsAction';
import LoginPageUI from '../components/LoginPageUI';

const mapStateToProps = (state: any) => ({
  errorMessage: state.admin.errorMessage
});

const mapDispatchToProps = (dispatch: any) => ({
  onCheckCredentialsNode: (username: any, password: any) =>
    dispatch(checkCredentialsNode(username, password)),
  onSocialLoginSuccess: (result: any) =>
    dispatch(onSocialLoginSuccess(result)),
  resetLoginError: () =>
    dispatch(resetLoginError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageUI);
