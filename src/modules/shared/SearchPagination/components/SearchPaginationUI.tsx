import * as React from 'react';
import { Pagination, Icon } from 'semantic-ui-react';

interface Props {
		totalPageCount: number;
		currentPage: number;
		query: string;
		sortColumn: string;
		sortDirection: string;
		type: string;
		level: string;
		location: string;
		appName: string;
		skills: any;
		hidePreviouslyViewedSkillListing: boolean;
		includeRelocation: boolean;
		isSearchOpen: boolean;
		isDesktopLayout: boolean;
		onSearchToggle(flag: boolean): void;
		onSearchRequest(request: any): any;
}

export default class SearchPaginationUI extends React.Component<Props, any> {
	handlePaginationChange = (e: any, {activePage}: {activePage: any}) =>
		this.props.onSearchRequest({
			pageNumber: activePage,
			pageSize: 24,
			sortColumn: this.props.sortColumn,
			sortDirection: this.props.sortDirection,
			query: this.props.query,
			type: this.props.type,
			level: this.props.level,
			location: this.props.location,
			appName: this.props.appName,
			skills: this.props.skills,
			hidePreviouslyViewedSkillListing: this.props.hidePreviouslyViewedSkillListing,
			includeRelocation: this.props.includeRelocation
		})
	handleClick = () => {
		if (!this.props.isSearchOpen) {
			// this.props.onSearchToggle(true);
		}
	}
  render() {
    const {
			totalPageCount,
			currentPage,
			isDesktopLayout,
		} = this.props;
		return (
			<Pagination
				activePage={currentPage}
				totalPages={totalPageCount}
				ellipsisItem={isDesktopLayout ? { content: <Icon name='ellipsis horizontal' />, icon: true } : null}
				firstItem={isDesktopLayout ? 'First' : null}
        lastItem={isDesktopLayout ? 'Last' : null}
				prevItem={isDesktopLayout ? 'Prev' : undefined}
				nextItem={isDesktopLayout ? 'Next' : undefined}
				onPageChange={(e: any, activePage: any) => this.handlePaginationChange(e, activePage)}
				onClick={this.handleClick}
				style={{ fontSize: isDesktopLayout ? '1rem' : '0.9rem' }}
			/>
    );
  }
}
