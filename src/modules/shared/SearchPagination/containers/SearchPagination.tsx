import { connect } from 'react-redux';
import {
	onSearchRequest,
	onSearchToggle
} from 'src/redux/actions/ItemsAction';
import SearchPaginationUI from '../components/SearchPaginationUI';

const mapStateToProps = (state: any, ownProps: any) => ({
	totalPageCount: Math.ceil(state.admin.gigSearch.totalResultCount / 24),
	currentPage: state.admin.gigSearch.currentPage,
	sortColumn: state.admin.gigSearch.sortColumn,
	sortDirection: state.admin.gigSearch.sortDirection,
	query: state.admin.gigSearch.query,
	type: state.admin.gigSearch.type,
	level: state.admin.gigSearch.level,
	location: state.admin.gigSearch.location,
	appName: ownProps.appName,
	skills:  state.admin.gigSearch.skills,
	includeRelocation: state.admin.gigSearch.includeRelocation,
	hidePreviouslyViewedSkillListing: state.admin.gigSearch.hidePreviouslyViewedSkillListing,
	isSearchOpen: state.admin.gigSearch.isSearchOpen,
	isDesktopLayout: state.browser.screenLayout === "desktop"
});

const mapDispatchToProps = (dispatch: any) => ({
	onSearchRequest: (request: any) =>
		dispatch(onSearchRequest(request)),
	onSearchToggle: (flag: any) =>
    dispatch(onSearchToggle(flag)),
});

const SearchPagination = connect(mapStateToProps, mapDispatchToProps)(SearchPaginationUI);
export default SearchPagination;
