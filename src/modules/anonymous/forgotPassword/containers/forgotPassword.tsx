import { connect } from 'react-redux';
import {
  onRequestEmailCode,
  resetForgetPasswordError,
} from 'src/redux/actions/ItemsAction';
import ForgotPasswordUI from '../components/ForgotPasswordUI';

const mapStateToProps = (state: any) => ({
  forgetPasswordError: state.admin.forgetPassword.forgetPasswordError,
  isPasswordSent: state.admin.forgetPassword.isPasswordSent,
});

const mapDispatchToProps = (dispatch: any) => ({
  onRequestEmailCode: (email: any) =>
    dispatch(onRequestEmailCode(email)),
  resetForgetPasswordError: () =>
    dispatch(resetForgetPasswordError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordUI);
