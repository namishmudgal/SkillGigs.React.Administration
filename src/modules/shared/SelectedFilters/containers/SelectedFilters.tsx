import { connect } from 'react-redux';
import {
  checkCredentials,
} from 'src/redux/actions/ItemsAction';
import SelectedFiltersUI from '../components/SelectedFiltersUI';

const mapStateToProps = (state: any, ownProps: any) => ({
	loginSuccess: state.admin.auth.loginSuccess,
	appName: ownProps.appName,
});

const mapDispatchToProps = (dispatch: any) => ({
  onCheckCredentials: (username: any, password: any) =>
    dispatch(checkCredentials(username, password)),
});

const SelectedFilters = connect(mapStateToProps, mapDispatchToProps)(SelectedFiltersUI);
export default SelectedFilters;
