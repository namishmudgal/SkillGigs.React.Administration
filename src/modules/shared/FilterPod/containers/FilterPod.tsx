import { connect } from 'react-redux';
import {
  checkCredentials,
} from 'src/shared/SkillGigs.React.Redux/administration/redux/actions/ItemsAction';
import FilterPodUI from '../components/FilterPodUI';

const mapStateToProps = (state: any, ownProps: any) => ({
	loginSuccess: state.admin.auth.loginSuccess,
  appName: ownProps.appName,
  withSearch: ownProps.withSearch,
  fieldList: ownProps.fieldList,
});

const mapDispatchToProps = (dispatch: any) => ({
  onCheckCredentials: (username: any, password: any) =>
    dispatch(checkCredentials(username, password)),
});

const FilterPod = connect(mapStateToProps, mapDispatchToProps)(FilterPodUI);
export default FilterPod;
