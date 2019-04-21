import { connect } from 'react-redux';
import {
  onSearchRequest,
  onLocationRequest,
  onSearchToggle
} from 'src/shared/SkillGigs.React.Redux/administration/redux/actions/ItemsAction';
import SearchBarWithFiltersUI from '../components/SearchBarWithFiltersUI';

const mapStateToProps = (state: any, ownProps: any) => ({
	isLoggedIn: state.admin.auth.loginSuccess,
  appName: ownProps.appName,
  sortColumn: state.admin.gigSearch.sortColumn,
  sortDirection: state.admin.gigSearch.sortDirection,
  query: state.admin.gigSearch.query,
  type: state.admin.gigSearch.type,
  level: state.admin.gigSearch.level,
  location: state.admin.gigSearch.location,
  locationItems: state.admin.gigSearch.locationItems,
  isLocationLoading: state.admin.gigSearch.isLocationLoading,
  topSkill: state.admin.gigSearch.topSkill,
  skills:  state.admin.gigSearch.skills,
  includeRelocation: state.admin.gigSearch.includeRelocation,
  hidePreviouslyViewedSkillListing: state.admin.gigSearch.hidePreviouslyViewedSkillListing,
  filteredTypes: state.admin.gigSearch.filteredTypes,
  filteredLevels: state.admin.gigSearch.filteredLevels,
  isSearchOpen: state.admin.gigSearch.isSearchOpen,
  dummyClick: state.admin.gigSearch.dummyClick,
  suggestionItems: ownProps.suggestionItems
});

const mapDispatchToProps = (dispatch: any) => ({
  onSearchRequest: (request: any) =>
    dispatch(onSearchRequest(request)),
  onLocationRequest: (request: any) =>
    dispatch(onLocationRequest(request)),
  onSearchToggle: (flag: boolean) =>
    dispatch(onSearchToggle(flag)),
});

const SelectedFilters = connect(mapStateToProps, mapDispatchToProps)(SearchBarWithFiltersUI);
export default SelectedFilters;
