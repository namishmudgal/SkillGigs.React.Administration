import { connect } from 'react-redux';
import {
  onVerifyEmail,
  requestSignUpNode,
  onSocialLoginSuccess,
  resetLoginError
} from 'src/shared/SkillGigs.React.Redux/administration/redux/actions/ItemsAction';
import SignUpTalentUI from '../components/SignUpTalentUI';

const mapStateToProps = (state: any) => ({
  isEmailAlreadyExist: state.admin.signUp.isEmailAlreadyExist,
  emailVerificationError: state.admin.signUp.emailVerificationError,
  errorMessage: state.admin.errorMessage,
});

const mapDispatchToProps = (dispatch: any) => ({
  verifyEmail: (email: any) =>
    dispatch(onVerifyEmail(email)),
  requestSignUpNode: (username: any, email: any, password: any) =>
    dispatch(requestSignUpNode(username, email, password)),
  onSocialLoginSuccess: (result: any) =>
    dispatch(onSocialLoginSuccess(result)),
  resetLoginError: () =>
    dispatch(resetLoginError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpTalentUI);
