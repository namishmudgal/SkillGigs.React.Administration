import * as React from 'react';
import { Segment, Dropdown, Header } from 'semantic-ui-react';
import { tagOptionsSortTalent, tagOptionsSortEmployer } from '../../../../utilities/helper';

interface Props {
		appName: string;
		currentResultCount: number;
		totalResultCount: number;
		query: string;
		sortColumn: string;
		sortDirection: string;
		type: string;
		level: string;
		location: any;
		skills: any;
		hidePreviouslyViewedSkillListing: boolean;
		includeRelocation: boolean;
		isSearchOpen: boolean;
		onSearchToggle(flag: boolean): void;
		onSearchRequest(request: any): any;
}

export default class SortOptionsUI extends React.Component<Props, any> {
	constructor(props: any) {
		super(props);
		this.state = { sortLabel: 'Most Recent' };
	}
	handleClick = () => {
		if (!this.props.isSearchOpen) {
			// this.props.onSearchToggle(true);
		}
	}
	handleSortingChange = (value: string, direction: string) =>
		this.props.onSearchRequest({
			pageNumber: 1,
			pageSize: 24,
			sortColumn: value,
			sortDirection: direction,
			query: this.props.query,
			type: this.props.type,
			level: this.props.level,
			location: this.props.location,
			appName: this.props.appName,
			skills: this.props.skills,
			hidePreviouslyViewedSkillListing: this.props.hidePreviouslyViewedSkillListing,
			includeRelocation: this.props.includeRelocation
		})
  render() {
    const {
			appName,
			totalResultCount,
			currentResultCount,
			sortColumn,
			sortDirection
		} = this.props;
		const sortingOptions = appName === 'TalentMarketplace' ? tagOptionsSortTalent : tagOptionsSortEmployer;
		return (
      <Segment clearing basic>
				<Dropdown text={sortColumn === '' ? 'Sort Options' : this.state.sortLabel} direction='right' icon='sort' labeled button className='icon top right pointing right floated' onClick={this.handleClick} style={{ fontSize: '1rem' }}>
					<Dropdown.Menu>
						<Dropdown.Header icon='sort' content='Sort by' />
						<Dropdown.Menu scrolling>
							{
								sortingOptions.map(option =>
									<Dropdown.Item
										key={option.value}
										active={sortColumn + sortDirection === option.activeState + option.direction}
										onClick={
											() => {
												this.setState({ sortLabel: option.value});
												this.handleSortingChange(option.activeState, option.direction);
											}
										}
									>
										{option.value}
									</Dropdown.Item>
								)
							}
						</Dropdown.Menu>
					</Dropdown.Menu>
				</Dropdown>
				<Header as='h3' className="remove-top-margin add-top-xxs-padding">{currentResultCount} results found out of {totalResultCount}</Header>
			</Segment>
    );
  }
}
