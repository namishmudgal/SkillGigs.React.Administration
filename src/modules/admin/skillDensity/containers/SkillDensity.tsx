import { connect } from 'react-redux';
import {
  onGetSkillDensityRequest,
  onPostSkillDensityRequest,
  onReqSkillRequest
} from 'src/redux/actions/ItemsAction';
import SkillDensityUI from '../components/SkillDensityUI';

const mapStateToProps = (state: any, ownProps: any) => ({
  isLoggedIn: state.admin.auth.loginSuccess,
  ownProps: ownProps.match,
  skillDensityError: state.admin.skillDensity.skillDensityError,
  skillDensityItems: state.admin.skillDensity.skillDensityItems,
  isSkillDensityLoading: state.admin.skillDensity.isSkillDensityLoading,
  reqSkillSuggestionItems: state.admin.gig.reqSkillSuggestionItems,
  isReqSkillLoading: state.admin.gig.isReqSkillLoading,
});

const mapDispatchToProps = (dispatch: any) => ({
  onGetSkillDensityRequest: (id: number) =>
    dispatch(onGetSkillDensityRequest(id)),
  onPostSkillDensityRequest: (data: any) =>
    dispatch(onPostSkillDensityRequest(data)),
  onReqSkillRequest: (str: any) =>
    dispatch(onReqSkillRequest(str)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SkillDensityUI);
