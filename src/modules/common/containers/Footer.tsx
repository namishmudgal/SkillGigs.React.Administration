import { connect } from 'react-redux';
import {
  checkCredentials,
} from 'src/shared/SkillGigs.React.Redux/administration/redux/actions/ItemsAction';
import FooterUI from '../components/footer/FooterUI';

const mapStateToProps = (state: any) => ({
  loginSuccess: state.admin.auth.loginSuccess,
});

const mapDispatchToProps = (dispatch: any) => ({
  onCheckCredentials: (username: any, password: any) =>
    dispatch(checkCredentials(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FooterUI);