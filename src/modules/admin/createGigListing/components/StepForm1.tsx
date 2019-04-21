import * as React from 'react';
import _ from 'lodash';
import { Form, Input, Icon, Button, Dropdown, Label, Search, Message } from 'semantic-ui-react';
import { removeEmpty } from '../../../../utilities/helper';

interface Props {
	type: string;
	options: any;
	dropDownData: any;
	location: any;
	locationItems: any;
	isLocationLoading: boolean;
	jobOrderId: any;
	professionId: any;
	profileId: any;
	companyId: any;
	callbackFromParent(activeIndex: number, type: string, options: any): void;
	getLocationsData(str: any): void;
	onGigCreateRequest(obj: any, step: string): void;
}

export default class CreateSkillListingForm extends React.Component<Props, any> {
  constructor(props: any) {
		super(props);
		this.state = {
			activeIndex: 0,
			gigTitle: '',
			gigTitleError: false,
			gigLocation: '',
			gigLocationTemp: '',
			gigLocationError: false,
			workAuthorization: [],
			workAuthorizationTemp: [],
			workAuthorizationError: false,
			minBudget: '',
			minBudgetError: false,
			maxBudget: '',
			maxBudgetError: false,
			gigDuration: '',
			gigDurationTemp: '',
			gigDurationError: false,
			requiredSkills: [],
			requiredSkillsNew: [],
      desiredSkillsNew: [],
			desiredSkills: [],
			requiredSkillsTemp: [],
      desiredSkillsTemp: [],
			gigDescription: '',
			desiredExp: '',
			desiredExpTemp: '',
			errorText: 'Required field cannot be empty',
			budgetNumberErrorText: 'Only numeric values are allowed',
			budgetMinErrorText: 'Minimum should be less than maximum',
			createUserError: false,
			errorDetails: [],
			formError: true,
			isLocationLoading: false,
			locationResults: [],
		};
	}
	componentDidMount() {
		this.setState({
			gigTitle: this.props.options.gigTitle,
			gigLocation: this.props.options.gigLocation,
			gigLocationTemp: this.props.options.gigLocationTemp,
			workAuthorization: this.props.options.workAuthorization,
			workAuthorizationTemp: this.props.options.workAuthorizationTemp,
			gigDuration: this.props.options.gigDuration,
			gigDurationTemp: this.props.options.gigDurationTemp,
			minBudget: this.props.options.minBudget,
      maxBudget: this.props.options.maxBudget,
			requiredSkills: this.props.options.requiredSkills,
			desiredSkills: this.props.options.desiredSkills,
			requiredSkillsNew: this.props.options.requiredSkillsNew,
			desiredSkillsNew: this.props.options.desiredSkillsNew,
			requiredSkillsTemp: this.props.options.requiredSkillsTemp,
      desiredSkillsTemp: this.props.options.desiredSkillsTemp,
			gigDescription: this.props.options.gigDescription,
			desiredExp: this.props.options.desiredExp,
			desiredExpTemp: this.props.options.desiredExpTemp
		});
	}
	componentWillReceiveProps(nextProps: any) {
    if ((nextProps.locationItems.length !== this.props.locationItems.length) || (nextProps.isLocationLoading !== this.props.isLocationLoading && nextProps.locationItems.length) ) {
      this.setState({ locationResults: nextProps.locationItems, isLocationLoading: false });
		}
		if (nextProps.location.length !== this.props.location.length) {
      this.setState({ gigLocation: nextProps.location[0] });
		}
	}
	_onGigTitleChange = (e: any) => {
		this.setState({ gigTitle: e.target.value, gigTitleError: false, createUserError: false, errorDetails: [] });
	}
	_onWorkAuthorizationChange = (e: any, {value}: {value: any}) => {
		const arr: any = [];
		this.setState({ workAuthorizationTemp: value, workAuthorizationError: false });
		value.map((val: any) => {
			arr.push(this.props.dropDownData.visa.find((obj: any) => obj.value === val).id);
		});
		this.setState({ workAuthorization: arr, createUserError: false, errorDetails: [] });
	}
	_onGigDurationChange = (e: any, {value}: {value: any}) => {
		this.setState({
			gigDurationTemp: value,
			gigDuration: this.props.dropDownData.duration.find((obj: any) => obj.value === value).id,
			gigDurationError: false,
			createUserError: false,
			errorDetails: []
		});
	}
	_onNextStep = async (type: any) => {
		if (this.state.gigTitle === '') {
			this.setState({ gigTitleError: true });
			const index = this.state.errorDetails.indexOf(this.state.errorText);
			if (index === -1) {
				this.state.errorDetails.push(this.state.errorText);
			}
		}
		if (this.state.gigLocation === '') {
			this.setState({ gigLocationError: true });
			const index = this.state.errorDetails.indexOf(this.state.errorText);
			if (index === -1) {
				this.state.errorDetails.push(this.state.errorText);
			}
		}
		if (!this.state.workAuthorization.length) {
			this.setState({ workAuthorizationError: true });
			const index = this.state.errorDetails.indexOf(this.state.errorText);
			if (index === -1) {
				this.state.errorDetails.push(this.state.errorText);
			}
		}
		if ((this.state.minBudget !== '' && this.state.minBudget <= 0) || (this.state.minBudget !== '' && !/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:(\.|,)\d+)?$/.test(this.state.minBudget)) || (parseInt(this.state.minBudget.replace(/\,/g, ''), 10) > parseInt(this.state.maxBudget.replace(/\,/g, ''), 10) && this.state.maxBudget !== '')) {
			let error = this.state.budgetMinErrorText;
			if (this.state.minBudget !== '' && !/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:(\.|,)\d+)?$/.test(this.state.minBudget)) {
				error = this.state.budgetNumberErrorText;
			}
			await this.setState({ minBudgetError: true, formError: true, createUserError: true });
			const index = this.state.errorDetails.indexOf(error);
			if (index === -1) {
				await this.state.errorDetails.push(error);
			}
		} else {
			await this.setState({ minBudgetError: false, formError: false, createUserError: false });
		}
		if ((this.state.maxBudget !== '' && this.state.maxBudget <= 0) || (this.state.maxBudget !== '' && !/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:(\.|,)\d+)?$/.test(this.state.maxBudget))) {
			await this.setState({ maxBudgetError: true, formError: true, createUserError: true });
			const index = this.state.errorDetails.indexOf(this.state.budgetNumberErrorText);
			if (index === -1) {
				await this.state.errorDetails.push(this.state.budgetNumberErrorText);
			}
		} else {
			await this.setState({ maxBudgetError: false, formError: false, createUserError: false });
		}
		if (type !== 'Permanent' && this.state.gigDuration === '') {
			this.setState({ gigDurationError: true });
		}
		if (this.state.gigTitle !== '' && this.state.gigLocation !== '' && this.state.workAuthorization.length && !this.state.errorDetails.length) {
			this.props.callbackFromParent(2, type, {
				gigTitle: this.state.gigTitle,
				gigTitleError: this.state.gigTitleError,
				gigLocation: this.state.gigLocation,
				gigLocationTemp: this.state.gigLocationTemp,
				gigLocationError: this.state.gigLocationError,
				workAuthorization: this.state.workAuthorization,
				workAuthorizationTemp: this.state.workAuthorizationTemp,
				workAuthorizationError: this.state.workAuthorizationError,
				minBudget: this.state.minBudget,
				maxBudget: this.state.maxBudget,
				gigDuration: this.state.gigDuration,
				gigDurationTemp: this.state.gigDurationTemp,
				gigDurationError: this.state.gigDurationError,
				requiredSkills: this.state.requiredSkills,
				desiredSkills: this.state.desiredSkills,
				requiredSkillsNew: this.state.requiredSkillsNew,
				desiredSkillsNew: this.state.desiredSkillsNew,
				requiredSkillsTemp: this.state.requiredSkillsTemp,
				desiredSkillsTemp: this.state.desiredSkillsTemp,
				gigDescription: this.state.gigDescription,
				desiredExp: this.state.desiredExp,
				desiredExpTemp: this.state.desiredExpTemp
			});
			const data = {
				companyId: this.props.companyId,
				gigTitle: this.state.gigTitle,
				gigLocation: this.state.gigLocation,
				workAuthorization: this.state.workAuthorization,
				minBudget: this.state.minBudget,
				maxBudget: this.state.maxBudget,
				gigDuration: this.state.gigDuration,
				type,
				jobOrderId: this.props.jobOrderId,
				professionId: this.props.professionId,
				profileId: this.props.profileId,
				jobOrderStatusCode: 'D'
			};
			setTimeout(() => this.setState({ formError: true }), 500);
			this.props.onGigCreateRequest(removeEmpty(data), 'step1');
		} else {
			this.setState({ formError: true, createUserError: true });
		}
	}
	resetLocationComponent = () => {
		this.setState({ isLocationLoading: false, locationResults: [], gigLocation: '' });
	}
	handleLocationChange = (e: any, {value}: {value: any}) => {
    this.setState({ isLocationLoading: true, gigLocationTemp: value, gigLocationError: false, gigLocation: '', createUserError: false, errorDetails: [] }, () => {
      if (this.state.gigLocationTemp !== '' && this.state.gigLocationTemp.length > 1) {
        this.props.getLocationsData(value);
      } else {
				this.props.getLocationsData('');
			}
    });
    setTimeout(() => {
      if (this.state.gigLocationTemp === '') return this.resetLocationComponent();
      this.setState({
        isLocationLoading: false,
      });
		}, 300);
	}
	handleLocationSelect = (e: any, {result}: {result: any}) => {
		this.setState({ gigLocation: result.id, gigLocationTemp: result.title });
	}
  render() {
		const {
			type,
			dropDownData
		} = this.props;
    return (
						<Form loading={!this.state.formError}>
							<Form.Field required className="small">
								<label>Gig Title:</label>
								<Input type="text" id="txtTitle" name="Title" value={this.state.gigTitle} className="large icon fnt-size10" placeholder="For e.g. Full Stack Web Developer or Registered Nurse" onChange={this._onGigTitleChange} error={this.state.gigTitleError} />
							</Form.Field>
							<Form.Field required>
								<label>Gig Location:</label>
								<Search
									fluid
									size={"large"}
									placeholder="For e.g. Houston, TX"
									value={this.state.gigLocationTemp}
									onResultSelect={this.handleLocationSelect}
									onSearchChange={_.debounce(this.handleLocationChange, 100, { leading: true })}
									results={this.state.locationResults}
									loading={this.state.isLocationLoading}
									className={this.state.gigLocationError ? 'location-search-error fnt-size09' : 'fnt-size10'}
								/>
							</Form.Field>
							{
								type === 'Contract' ?
								<Form.Field required>
									<label>Gig Duration:</label>
									<div className="ui large input">
										<Dropdown
											fluid
											search
											selection
											placeholder="Select"
											className="fnt-size09"
											options={dropDownData.duration}
											onChange={this._onGigDurationChange}
											error={this.state.gigDurationError}
											value={this.state.gigDurationTemp}
										/>
									</div>
								</Form.Field> : null
							}
							<Form.Group widths={2}>
								<Form.Field required>
									<label>Work Authorization:</label>
									<div className="ui large input">
										<Dropdown
											fluid
											search
											selection
											multiple
											placeholder="Select one or more"
											className="fnt-size09"
											options={dropDownData.visa}
											onChange={this._onWorkAuthorizationChange}
											error={this.state.workAuthorizationError}
											value={this.state.workAuthorizationTemp}
										/>
									</div>
								</Form.Field>
								<Form.Field>
									<label className="desktop only">Budget Range:</label>
									<div className="ui large labeled input fnt-size10">
										<label className="ui label line-ht25">{type === 'Contract' ? 'HOURLY($)' : 'YEARLY($)'}</label>
										<Input type='text' value={this.state.minBudget} placeholder='minimum' id="txtPermanentSalaryMin" name="permanentSalaryMin" className="money" onChange={(e: any) => this.setState({ minBudget: e.target.value, minBudgetError: false, createUserError: false, errorDetails: [] })} error={this.state.minBudgetError} />
										<Label className="line-ht25">-</Label>
										<Input type="text" value={this.state.maxBudget} id="txtPermanentSalaryMax" name="permanentSalaryMax" placeholder="maximum" className="money" onChange={(e: any) => this.setState({ maxBudget: e.target.value, maxBudgetError: false, createUserError: false, errorDetails: [] })} error={this.state.maxBudgetError} />
									</div>
								</Form.Field>
							</Form.Group>
							{
								this.state.createUserError ?
									<Message
										error
										visible
										size='mini'
										header="There was some error with your submission"
										list={this.state.errorDetails}
										id="gigCreateError"
									/> : null
							}
							<div className="ui right aligned black segment profile-fix-btnmb">
								<Button
									primary
									className="text-uppercase"
									onClick={
										() => this._onNextStep(type)
									}
									size="small"
								>
								NEXT
								</Button>
							</div>
						</Form>
    );
  }
}
