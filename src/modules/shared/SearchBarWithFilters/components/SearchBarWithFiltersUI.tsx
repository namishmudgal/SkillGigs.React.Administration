import * as React from 'react';
import { Segment, Search, Accordion, Divider, Dropdown, Transition, Header, Label, Checkbox, Icon, Loader } from 'semantic-ui-react';
import _ from 'lodash';
import OutsideClickHandler from 'react-outside-click-handler';
import { tagOptionsGig, tagOptionsExperience } from '../../../../utilities/helper';
import Select from 'react-select';

interface Props {
    appName: string;
		suggestionItems: any;
		query: string;
		sortColumn: string;
		sortDirection: string;
		type: string;
		level: string;
		location: any;
		locationItems: any;
		isLocationLoading: boolean;
		topSkill: any;
		skills: any;
		hidePreviouslyViewedSkillListing: boolean;
		includeRelocation: boolean;
		isLoggedIn: boolean;
		filteredTypes: any;
		filteredLevels: any;
		isSearchOpen: boolean;
		dummyClick: boolean;
		onSearchToggle(flag: boolean): void;
		onSuggestionRequest(str: any): void;
		onSearchRequest(request: any): any;
		onLocationRequest(request: any): any;
}

export default class SearchBarWithFiltersUI extends React.Component<Props, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			isLoading: false,
			results: [],
			value: "",
			isLocationLoading: false,
			locationResults: [],
			locationValue: [],
			checkedRelocate: false,
			checkedHideSkill: false
		};
	}
	componentWillMount() {
    this.resetComponent();
	}
	componentWillReceiveProps(nextProps: any) {
    if (Object.keys(nextProps.suggestionItems).length !== Object.keys(this.props.suggestionItems).length) {
      this.setState({ results: nextProps.suggestionItems, isLoading: false });
		}
		if ((nextProps.locationItems.length !== this.props.locationItems.length) || (nextProps.isLocationLoading !== this.props.isLocationLoading && nextProps.locationItems.length) ) {
      this.setState({ locationResults: nextProps.locationItems, isLocationLoading: false });
		}
		if (nextProps.location.length !== this.props.location.length) {
      this.setState({ locationValue: nextProps.location });
		}
	}
	onClickTopSkillLabel = (value: any) => {
		this.props.onSearchRequest({
			pageNumber: 1,
			pageSize: 24,
			sortColumn: this.props.sortColumn,
			sortDirection: this.props.sortDirection,
			type: this.props.type,
			level: this.props.level,
			location:  this.props.location,
			query: this.props.query,
			appName: this.props.appName,
			skills: value,
			hidePreviouslyViewedSkillListing: this.props.hidePreviouslyViewedSkillListing,
			includeRelocation: this.props.includeRelocation
		});
	}
	toggleRelocate = (value: any) => {
		this.setState({checkedRelocate: !this.state.checkedRelocate}, () =>
			this.props.onSearchRequest({
				pageNumber: 1,
				pageSize: 24,
				sortColumn: this.props.sortColumn,
				sortDirection: this.props.sortDirection,
				type: this.props.type,
				level: this.props.level,
				location:  this.props.location,
				query: this.props.query,
				appName: this.props.appName,
				hidePreviouslyViewedSkillListing: this.props.hidePreviouslyViewedSkillListing,
				includeRelocation: this.state.checkedRelocate
			})
		);
	}
	toggleHideSkill = (value: any) => {
		this.setState({checkedHideSkill: !this.state.checkedHideSkill}, () =>
			this.props.onSearchRequest({
				pageNumber: 1,
				pageSize: 24,
				sortColumn: this.props.sortColumn,
				sortDirection: this.props.sortDirection,
				type: this.props.type,
				level: this.props.level,
				location:  this.props.location,
				query: this.props.query,
				appName: this.props.appName,
				hidePreviouslyViewedSkillListing: this.state.checkedHideSkill,
				includeRelocation: this.props.includeRelocation
			})
		);
	}
	resetLocationComponent = () => {
		if (this.props.location.length !== 0) {
			this.props.onSearchRequest({
				pageNumber: 1,
				pageSize: 24,
				sortColumn: this.props.sortColumn,
				sortDirection: this.props.sortDirection,
				type: this.props.type,
				level: this.props.level,
				location: [],
				query: this.props.query,
				appName: this.props.appName,
				skills: this.props.skills,
				hidePreviouslyViewedSkillListing: this.props.hidePreviouslyViewedSkillListing,
				includeRelocation: this.props.includeRelocation
			});
		}
		this.setState({ isLocationLoading: false, locationResults: [], locationValue: [] });
	}
	resetComponent = () => {
		if (this.props.query !== "") {
			this.props.onSearchRequest({
				pageNumber: 1,
				pageSize: 24,
				sortColumn: this.props.sortColumn,
				sortDirection: this.props.sortDirection,
				type: this.props.type,
				level: this.props.level,
				location: this.props.location,
				query: "",
				appName: this.props.appName,
				skills: this.props.skills,
				hidePreviouslyViewedSkillListing: this.props.hidePreviouslyViewedSkillListing,
				includeRelocation: this.props.includeRelocation
			});
		}
		this.setState({ isLoading: false, results: [], value: '' });
	}

	handleResultSelect = (e: any, {result}: {result: any}) => {
		this.props.onSearchRequest({
      pageNumber: 1,
      pageSize: 24,
      sortColumn: this.props.sortColumn,
			sortDirection: this.props.sortDirection,
			query: result.title,
			type: this.props.type,
			level: this.props.level,
			location: this.props.location,
			appName: this.props.appName,
			skills: this.props.skills,
			hidePreviouslyViewedSkillListing: this.props.hidePreviouslyViewedSkillListing,
			includeRelocation: this.props.includeRelocation
    });
		this.setState({ value: result.title });
	}

  handleLocationSelect = (e: any, {result}: {result: any}) => {
		this.setState({ locationValue: [result.title] }, () => {
			this.props.onSearchRequest({
				pageNumber: 1,
				pageSize: 24,
				sortColumn: this.props.sortColumn,
				sortDirection: this.props.sortDirection,
				query: this.props.query,
				type: this.props.type,
				level: this.props.level,
				location: this.state.locationValue,
				appName: this.props.appName,
				skills: this.props.skills,
				hidePreviouslyViewedSkillListing: this.props.hidePreviouslyViewedSkillListing,
				includeRelocation: this.props.includeRelocation
			});
		});
	}

  handleSearchChange = (e: any, {value}: {value: any}) => {
    this.setState({ isLoading: true, value }, () => {
      if (this.state.value.length > 1) {
        this.props.onSuggestionRequest(value);
      } else {
				this.props.onSuggestionRequest('');
			}
    });
    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();
      this.setState({
        isLoading: false,
      });
		}, 300);
	}

	handleLocationChange = (e: any, {value}: {value: any}) => {
    this.setState({ isLocationLoading: true, locationValue: [value] }, () => {
      if (this.state.locationValue.length && this.state.locationValue[0].length > 1) {
        this.props.onLocationRequest(value);
      } else {
				this.props.onLocationRequest('');
			}
    });
    setTimeout(() => {
      if (this.state.locationValue.length && this.state.locationValue[0].length < 1) return this.resetLocationComponent();
      this.setState({
        isLocationLoading: false,
      });
		}, 300);
	}

	handleMultipleLocationOnSelect = (value: any) => {
		const arr: any = [];
		value.map((item: any) => {
			arr.push(item.value);
		});
		this.props.onSearchRequest({
			pageNumber: 1,
			pageSize: 24,
			sortColumn: this.props.sortColumn,
			sortDirection: this.props.sortDirection,
			query: this.props.query,
			type: this.props.type,
			level: this.props.level,
			location: arr,
			appName: this.props.appName,
			skills: this.props.skills,
			hidePreviouslyViewedSkillListing: this.props.hidePreviouslyViewedSkillListing,
			includeRelocation: this.props.includeRelocation
		});
		this.setState({ locationResults: [] });
	}

	handleMultipleLocationInputChange = (value: any) => {
		if (value.length < 1) {
			this.setState({ locationResults: [] });
		} else {
			this.setState({ isLocationLoading: true });
			if (value.length > 2) {
				this.props.onLocationRequest(value);
			}
			setTimeout(() => {
				this.setState({
					isLocationLoading: false,
				});
			}, 200);
		}
	}

	openSearchBox = () => {
		this.props.onSearchToggle(true);
	}
	handleSortingChangeGig = (value: string) =>
		this.props.onSearchRequest({
			pageNumber: 1,
			pageSize: 24,
			sortColumn: this.props.sortColumn,
			sortDirection: this.props.sortDirection,
			level: this.props.level,
			query: this.props.query,
			location: this.props.location,
			type:  value === 'Clear' ? '' : value,
			appName: this.props.appName,
			skills: this.props.skills,
			hidePreviouslyViewedSkillListing: this.props.hidePreviouslyViewedSkillListing,
			includeRelocation: this.props.includeRelocation
		})
	handleSortingChangeExp = (value: string) =>
		this.props.onSearchRequest({
			pageNumber: 1,
			pageSize: 24,
			sortColumn: this.props.sortColumn,
			sortDirection: this.props.sortDirection,
			type: this.props.type,
			query: this.props.query,
			location: this.props.location,
			level: value === 'Clear' ? '' : value,
			appName: this.props.appName,
			skills: this.props.skills,
			hidePreviouslyViewedSkillListing: this.props.hidePreviouslyViewedSkillListing,
			includeRelocation: this.props.includeRelocation
		})
	handleOutsideClick = () => {
		this.props.onSearchToggle(false);
	}
  render() {
    const {
			appName,
			type,
			level,
			topSkill,
			skills,
			isLoggedIn,
			filteredTypes,
			filteredLevels,
			isSearchOpen
		} = this.props;
		const { isLoading, value, results, isLocationLoading, locationResults, locationValue } = this.state;
		const typeOptions = appName === 'EmployerMarketplace' ? filteredLevels : tagOptionsExperience;
		const gigOptions = appName === 'EmployerMarketplace' ? filteredTypes : tagOptionsGig;
		const placeholderText = appName === 'EmployerMarketplace' ? 'Search for Top Talent' : 'Search for Top Gigs';
		return (
			<OutsideClickHandler onOutsideClick={this.handleOutsideClick}>
        <Segment className="sg-small-searchBox">
					<Accordion className="sg-searchBar-accordian">
						<Accordion.Title active={isSearchOpen} onClick={this.openSearchBox}>
							<Search
								category
								loading={isLoading}
								onResultSelect={this.handleResultSelect}
								onSearchChange={_.debounce(this.handleSearchChange, 100, { leading: true })}
								results={this.props.suggestionItems}
								value={value}
								fluid
								className="sg-searchBar-input"
								input={{ icon: 'search', iconPosition: 'left', placeholder: placeholderText }}
							/>
						</Accordion.Title>
						<Accordion.Content active={isSearchOpen}>
							<Transition visible={isSearchOpen} animation='slide down' duration={300}>
								<div>
									<div className="field">
										{	appName === 'TalentMarketplace' ?
											<Search
												fluid
												input={{ icon: 'map', iconPosition: 'left', placeholder: "Location" }}
												className="sg-searchBarLocation-input"
												onResultSelect={this.handleLocationSelect}
												onSearchChange={_.debounce(this.handleLocationChange, 100, { leading: true })}
												results={locationResults}
												value={locationValue[0]}
												loading={isLocationLoading}
											/> :
												<Header as='h4'>
													<Icon name="map" color="grey" style={{ fontSize: '1em' }} />
													<Header.Content style={{ width: '100%' }}>
														<Select
															placeholder='Locations'
															isMulti
															isSearchable
															onChange={this.handleMultipleLocationOnSelect}
															options={locationResults}
															onInputChange={this.handleMultipleLocationInputChange}
															isLoading={isLocationLoading}
															components={
																{
																	DropdownIndicator: () => null,
																	IndicatorSeparator: () => null,
																	LoadingIndicator: () => <Loader active inline />
																}
															}
															className="sg-location-select"
														/>
													</Header.Content>
												</Header>
										}
									</div>
									{
										Object.keys(topSkill).length && appName === 'EmployerMarketplace' ?
											<div>
												<Header as='h4' style={{ margin: 'calc(2rem - .14285714em) 0 1rem' }}>Top Skills in the Marketplace</Header>
												<div className="ui labels">
												{
													Object.keys(topSkill).map(
														(key, index) =>
															<Label
																as='a'
																key={index}
																color={skills.some((item: any) => item === topSkill[key]) ? 'blue' : undefined}
																onClick={
																	() => {
																		const index1 = skills.indexOf(topSkill[key]);
																		let skillItem = [];
																		if (index1 === -1) {
																			skillItem = [...skills, topSkill[key]];
																		} else {
																			skillItem = skills;
																			skillItem.splice(index1, 1);
																		}
																		this.onClickTopSkillLabel(
																			skillItem
																		);
																	}
																}
															>
																{key}
															</Label>
														)
												}
												</div>
											</div> : null
									}
									<Divider />
									<div className="fields">
											<label className="mobile only">&nbsp;</label>
											<div className="field">
													<Dropdown text={type === '' ? 'Filter by Gig Types' : type} icon='filter' labeled button className='icon' style={{ fontSize: '1rem' }}>
														<Dropdown.Menu>
															{
																gigOptions.map((option: any) =>
																	<Dropdown.Item
																		key={option.value}
																		active={type === option.value}
																		{...option}
																		onClick={
																			() => {
																				this.handleSortingChangeGig(option.value);
																			}
																		}
																	/>)
															}
														</Dropdown.Menu>
													</Dropdown>
											</div>
											<div className="field">
													<label className="mobile only">&nbsp;</label>
													<Dropdown text={level === '' ? 'Filter by Experience Levels' : level} icon='filter' labeled button className='icon' style={{ fontSize: '1rem' }}>
														<Dropdown.Menu>
															{
																typeOptions.map((option: any) =>
																	<Dropdown.Item
																		key={option.value}
																		active={level === option.value}
																		{...option}
																		onClick={
																			() => {
																				this.handleSortingChangeExp(option.value);
																			}
																		}
																	/>)
															}
														</Dropdown.Menu>
													</Dropdown>
											</div>
											{
												appName === 'EmployerMarketplace' ?
													<div className="field">
														<label className="mobile only">&nbsp;</label>
														<Checkbox toggle label='Include Talent Willing To Relocate' checked={this.state.checkedRelocate} onChange={this.toggleRelocate} />
													</div> : null
											}
											{
												appName === 'EmployerMarketplace' && isLoggedIn ?
													<div className="field">
														<label className="mobile only">&nbsp;</label>
														<Checkbox toggle label='Hide Previously Viewed Skill Listings' checked={this.state.checkedHideSkill} onChange={this.toggleHideSkill} />
													</div> : null
											}
									</div>
								</div>
							</Transition>
						</Accordion.Content>
					</Accordion>
        </Segment>
			</OutsideClickHandler>
    );
  }
}