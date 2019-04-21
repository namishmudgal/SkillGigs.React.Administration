import * as React from 'react';
import { Form, Input, Loader, Button, Dropdown, Message } from 'semantic-ui-react';
import TextEditor from '../../../common/components/TextEditor';
import CreatableSelect from 'react-select/lib/Creatable';
import { removeEmpty } from '../../../../utilities/helper';
import { browser } from 'src/redux/reducer/browser';
import browserHistory from 'src/router/browserHistory';

interface Props {
	type: string;
	options: any;
	dropDownData: any;
	reqSkillSuggestionItems: any;
	isReqSkillLoading: boolean;
  desSkillSuggestionItems: any;
	isDesSkillLoading: any;
	jobOrderId: any;
	professionId: any;
	profileId: any;
	onDesSkillRequest(str: any): void;
	onReqSkillRequest(str: any): void;
	callbackFromParent(activeIndex: number, type: string, options: any): void;
	onGigCreateRequest(obj: any, step: string): void;
}

export default class CreateSkillListingForm extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
			activeIndex: 0,
			gigTitle: '',
			gigLocation: '',
			gigLocationTemp: '',
			workAuthorization: [],
			workAuthorizationTemp: [],
			minBudget: '',
      maxBudget: '',
			gigDuration: '',
			gigDurationTemp: '',
			requiredSkills: [],
			requiredSkillsOptions: [],
			requiredSkillsError: false,
			requiredSkillsNew: [],
			requiredSkillsTemp: [],
      desiredSkillsTemp: [],
      desiredSkillsNew: [],
			desiredSkills: [],
			desiredSkillsOptions: [],
			gigDescription: '',
			gigDescriptionError: false,
			desiredExp: '',
			desiredExpTemp: '',
			desiredExpError: false,
			isReqSkillLoading: false,
			isDesSkillLoading: false,
			errorText: 'Required field cannot be empty',
			createUserError: false,
			errorDetails: [],
			formError: true
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
			requiredSkillsTemp: this.props.options.requiredSkillsTemp,
      desiredSkillsTemp: this.props.options.desiredSkillsTemp,
			requiredSkillsNew: this.props.options.requiredSkillsNew,
      desiredSkillsNew: this.props.options.desiredSkillsNew,
			gigDescription: this.props.options.gigDescription,
			desiredExp: this.props.options.desiredExp,
			desiredExpTemp: this.props.options.desiredExpTemp
		});
	}
	componentWillReceiveProps(nextProps: any) {
    if (nextProps.reqSkillSuggestionItems.length !== this.props.reqSkillSuggestionItems.length && nextProps.isReqSkillLoading !== this.props.isReqSkillLoading) {
      this.setState({ requiredSkillsOptions: nextProps.reqSkillSuggestionItems, isReqSkillLoading: false });
		}
		if (nextProps.desSkillSuggestionItems.length !== this.props.desSkillSuggestionItems.length && nextProps.isDesSkillLoading !== this.props.isDesSkillLoading) {
      this.setState({ desiredSkillsOptions: nextProps.desSkillSuggestionItems, isDesSkillLoading: false });
		}
	}
	_onDesiredExpChange = (e: any, {value}: {value: any}) => {
		this.setState({
			desiredExpTemp: value,
			desiredExp: this.props.dropDownData.experience.find((obj: any) => obj.value === value).id,
			desiredExpError: false,
			createUserError: false,
			errorDetails: []
		});
	}
	_onFormSubmit = () => {
		if (!this.state.requiredSkills.length && !this.state.requiredSkillsNew.length) {
			this.setState({ requiredSkillsError: true });
			const index = this.state.errorDetails.indexOf(this.state.errorText);
			if (index === -1) {
				this.state.errorDetails.push(this.state.errorText);
			}
		}
		if (this.state.desiredExp === '') {
			this.setState({ desiredExpError: true });
			const index = this.state.errorDetails.indexOf(this.state.errorText);
			if (index === -1) {
				this.state.errorDetails.push(this.state.errorText);
			}
		}
		if (this.state.gigDescription === '' || this.state.gigDescription === '<p><br></p>') {
			this.setState({ gigDescriptionError: true });
			const index = this.state.errorDetails.indexOf(this.state.errorText);
			if (index === -1) {
				this.state.errorDetails.push(this.state.errorText);
			}
		}
		if ((this.state.requiredSkills.length || this.state.requiredSkillsNew.length) && this.state.desiredExp !== '' && this.state.gigDescription !== '' && this.state.gigDescription !== '<p><br></p>') {
			this.setState({ formError: false, createUserError: false });
			const data = {
				gigTitle: this.state.gigTitle,
				gigLocation: this.state.gigLocation,
				workAuthorization: this.state.workAuthorization,
				minBudget: this.state.minBudget,
        maxBudget: this.state.maxBudget,
				gigDuration: this.state.gigDuration,
				type: this.props.type,
				requiredSkills: this.state.requiredSkills,
				desiredSkills: this.state.desiredSkills,
				requiredSkillsNew: this.state.requiredSkillsNew,
        desiredSkillsNew: this.state.desiredSkillsNew,
				gigDescription: this.state.gigDescription,
				desiredExp: this.state.desiredExp,
				jobOrderId: this.props.jobOrderId,
				professionId: this.props.professionId,
				profileId: this.props.profileId,
				jobOrderStatusCode: 'P'
			};
			this.props.onGigCreateRequest(removeEmpty(data), 'step2');
		} else {
			this.setState({ formError: true, createUserError: true });
		}
	}
	handleMultipleReqSkillInputChange = (value: any) => {
		this.setState({ isReqSkillLoading: true, requiredSkillsError: false, createUserError: false, errorDetails: [] });
		if (value.length > 1) {
			this.props.onReqSkillRequest(value);
		} else if (value.length < 1) {
			this.setState({ requiredSkillsOptions: [] });
		}
		setTimeout(() => {
			this.setState({
				isReqSkillLoading: false,
			});
		}, 200);
	}
	handleMultipleReqSkillOnSelect = (value: any) => {
		const arr1: any = value.filter((val: any) => val.__isNew__);
		const newArr1: any = [];
		arr1.map((item: any) => {
			newArr1.push(item.value);
		});
		const arr2: any = value.filter((val: any) => !val.__isNew__);
		const newArr2: any = [];
		arr2.map((item: any) => {
			newArr2.push(item.skillId);
		});
		this.setState({ requiredSkills: newArr2, requiredSkillsNew: newArr1, requiredSkillsTemp: value, requiredSkillsOptions: [] });
	}
	handleMultipleDesSkillInputChange = (value: any) => {
		this.setState({ isDesSkillLoading: true });
		if (value.length > 1) {
			this.props.onDesSkillRequest(value);
		} else if (value.length < 1) {
			this.setState({ desiredSkillsOptions: [] });
		}
		setTimeout(() => {
			this.setState({
				isDesSkillLoading: false,
			});
		}, 200);
	}
	handleMultipleDesSkillOnSelect = (value: any) => {
		const arr1: any = value.filter((val: any) => val.__isNew__);
		const newArr1: any = [];
		arr1.map((item: any) => {
			newArr1.push(item.value);
		});
		const arr2: any = value.filter((val: any) => !val.__isNew__);
		const newArr2: any = [];
		arr2.map((item: any) => {
			newArr2.push(item.skillId);
		});
		this.setState({ desiredSkills: newArr2, desiredSkillsNew: newArr1, desiredSkillsTemp: value, desiredSkillsOptions: [] });
	}
  render() {
		const {
			callbackFromParent,
			type,
			dropDownData
		} = this.props;
    return (
						<Form loading={!this.state.formError}>
							<Form.Field required>
								<label>Add REQUIRED Skill(s):</label>
								<CreatableSelect
									placeholder='For e.g. AngularJS'
									isMulti
									isSearchable
									onChange={this.handleMultipleReqSkillOnSelect}
									options={this.state.requiredSkillsOptions}
									onInputChange={this.handleMultipleReqSkillInputChange}
									isLoading={this.state.isReqSkillLoading}
									components={
										{
											DropdownIndicator: () => null,
											IndicatorSeparator: () => null,
											LoadingIndicator: () => <Loader active inline />
										}
									}
									value={this.state.requiredSkillsTemp}
									className={this.state.requiredSkillsError ? 'sg-reactSelect-error' : ''}
								/>
							</Form.Field>
							<Form.Field>
								<label>Add DESIRED Skill(s):</label>
								<CreatableSelect
									placeholder='For e.g. AngularJS'
									isMulti
									isSearchable
									onChange={this.handleMultipleDesSkillOnSelect}
									options={this.state.desiredSkillsOptions}
									onInputChange={this.handleMultipleDesSkillInputChange}
									isLoading={this.state.isDesSkillLoading}
									components={
										{
											DropdownIndicator: () => null,
											IndicatorSeparator: () => null,
											LoadingIndicator: () => <Loader active inline />
										}
									}
									value={this.state.desiredSkillsTemp}
								/>
							</Form.Field>
							<Form.Field required>
								<label>Gig Description:</label>
								<div className="ui large input">
									<TextEditor
										onSetEditorHTML={(html: any) => {
											this.setState({
												gigDescription: html,
												gigDescriptionError: html === '' || html === '<p><br></p>' ? true : false,
											});
											if (html !== '' && html !== '<p><br></p>') {
												this.setState({ createUserError: false, errorDetails: [] });
											}
										}}
										makeFormDirty={() => { console.log('makeFormDirty'); }}
										isError={this.state.gigDescriptionError}
										content={this.state.gigDescription}
									/>
								</div>
							</Form.Field>
							<Form.Field required>
								<label>Desired Experience:</label>
								<div className="ui large input">
									<Dropdown
										fluid
										search
										selection
										className="fnt-size09"
										placeholder="Select"
										options={dropDownData.experience}
										onChange={this._onDesiredExpChange}
										error={this.state.desiredExpError}
										value={this.state.desiredExpTemp}
									/>
								</div>
							</Form.Field>
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
									floated='left'
									className="text-uppercase"
									size="small"
									onClick={
										() => callbackFromParent(
											1,
											type,
											{
												gigTitle: this.state.gigTitle,
												gigLocation: this.state.gigLocation,
												gigLocationTemp: this.state.gigLocationTemp,
												workAuthorization: this.state.workAuthorization,
												workAuthorizationTemp: this.state.workAuthorizationTemp,
												minBudget: this.state.minBudget,
        								maxBudget: this.state.maxBudget,
												gigDuration: this.state.gigDuration,
												gigDurationTemp: this.state.gigDurationTemp,
												requiredSkills: this.state.requiredSkills,
												desiredSkills: this.state.desiredSkills,
												requiredSkillsNew: this.state.requiredSkillsNew,
												desiredSkillsNew: this.state.desiredSkillsNew,
												requiredSkillsTemp: this.state.requiredSkillsTemp,
      									desiredSkillsTemp: this.state.desiredSkillsTemp,
												gigDescription: this.state.gigDescription,
												desiredExp: this.state.desiredExp,
											}
										)
									}
								>
									PREVIOUS
								</Button>
								<Button primary className="text-uppercase" onClick={this._onFormSubmit} size="small">FINISH</Button>
							</div>
						</Form>
    );
  }
}
