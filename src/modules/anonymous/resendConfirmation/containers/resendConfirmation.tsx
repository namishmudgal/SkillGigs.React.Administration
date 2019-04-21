import { connect } from 'react-redux';
import {
  onRequestEmailResend,
  resetResendEmailError,
} from 'src/redux/actions/ItemsAction';
import ResendConfirmationUI from '../components/ResendConfirmationUI';

const mapStateToProps = (state: any) => ({
  resendConfirmationError: state.admin.resendConfirmation.resendConfirmationError,
  isConfirmationSent: state.admin.resendConfirmation.isConfirmationSent,
});

const mapDispatchToProps = (dispatch: any) => ({
  onRequestEmailResend: (email: any) =>
    dispatch(onRequestEmailResend(email)),
  resetResendEmailError: () =>
    dispatch(resetResendEmailError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResendConfirmationUI);
