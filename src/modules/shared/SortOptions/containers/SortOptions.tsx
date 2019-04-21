import { connect } from 'react-redux';
import {
  onSearchRequest,
  onSearchToggle
} from 'src/shared/SkillGigs.React.Redux/administration/redux/actions/ItemsAction';
import SortOptionsUI from '../components/SortOptionsUI';

const mapStateToProps = (state: any, ownProps: any) => ({
  appName: ownProps.appName,
  currentResultCount: state.admin.gigSearch.searchResult.length,
  totalResultCount: state.admin.gigSearch.totalResultCount,
  sortColumn: state.admin.gigSearch.sortColumn,
  sortDirection: state.admin.gigSearch.sortDirection,
  query: state.admin.gigSearch.query,
  type: state.admin.gigSearch.type,
  level: state.admin.gigSearch.level,
  location: state.admin.gigSearch.location,
  skills:  state.admin.gigSearch.skills,
  includeRelocation: state.admin.gigSearch.includeRelocation,
  hidePreviouslyViewedSkillListing: state.admin.gigSearch.hidePreviouslyViewedSkillListing,
  isSearchOpen: state.admin.gigSearch.isSearchOpen
});

const mapDispatchToProps = (dispatch: any) => ({
  onSearchRequest: (request: any) =>
    dispatch(onSearchRequest(request)),
  onSearchToggle: (flag: any) =>
    dispatch(onSearchToggle(flag)),
});

const SortOptions = connect(mapStateToProps, mapDispatchToProps)(SortOptionsUI);
export default SortOptions;
