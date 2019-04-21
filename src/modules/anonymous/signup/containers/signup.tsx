import { connect } from 'react-redux';
import {
  checkCredentials,
} from 'src/redux/actions/ItemsAction';
import SignUpUI from '../components/SignUpUI';

const mapStateToProps = (state: any) => ({
  loginSuccess: state.admin.auth.loginSuccess,
});

const mapDispatchToProps = (dispatch: any) => ({
  onCheckCredentials: (username: any, password: any) =>
    dispatch(checkCredentials(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpUI);
