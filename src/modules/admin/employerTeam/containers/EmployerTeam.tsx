import { connect } from 'react-redux';
import {
  onGetEmployerTeamRequest,
  onPostEmployerTeamRequest
} from 'src/shared/SkillGigs.React.Redux/administration/redux/actions/ItemsAction';
import EmployerTeamUI from '../components/EmployerTeamUI';

const mapStateToProps = (state: any, ownProps: any) => ({
  isLoggedIn: state.admin.auth.loginSuccess,
  ownProps: ownProps.match,
  employerTeamError: state.admin.employerTeam.employerTeamError,
  employerTeamItems: state.admin.employerTeam.employerTeamItems,
  employerTeamLoading: state.admin.employerTeam.employerTeamLoading,
  isDesktopLayout: state.browser.screenLayout === "desktop"
});

const mapDispatchToProps = (dispatch: any) => ({
  onGetEmployerTeamRequest: (id: number) =>
    dispatch(onGetEmployerTeamRequest(id)),
  onPostEmployerTeamRequest: (data: any) =>
    dispatch(onPostEmployerTeamRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployerTeamUI);
