import { connect } from 'react-redux';
import {
  onResume3DRequest,
} from 'src/shared/SkillGigs.React.Redux/administration/redux/actions/ItemsAction';
import ThreeDResumeUI from '../components/ThreeDResumeUI';

const mapStateToProps = (state: any, ownProps: any) => ({
  isLoggedIn: state.admin.auth.loginSuccess,
  ownProps: ownProps.match,
  skillListingError: state.admin.resumeDetails.resumeError,
  resumeItems: state.admin.resumeDetails.resumeItems,
  isListingLoading: state.admin.resumeDetails.isResumeLoading
});

const mapDispatchToProps = (dispatch: any) => ({
  onResume3DRequest: (id: number) =>
    dispatch(onResume3DRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThreeDResumeUI);
