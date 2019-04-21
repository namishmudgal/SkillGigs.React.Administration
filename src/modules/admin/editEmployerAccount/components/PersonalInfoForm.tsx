import * as React from 'react';
import { Button, Search, Segment, Input, Form, List, Header, Message } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";
import _ from 'lodash';

interface Props {
  addTranslation: any;
  initialize: any;
	isLoggedIn: boolean;
	companyProfileItems: any;
	location: any;
	locationItems: any;
	isLocationLoading: boolean;
	profileId: number;
	getLocationsData(str: any): void;
	onEmployerAccountUpdateRequest(data: any): void;
}

class PersonalInfoForm extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      firstName: '',
			lastName: '',
			displayName: '',
			jobTitle: '',
			email: '',
			phone: '',
			address1: '',
			address2: '',
			cityState: '',
			cityStateId: '',
			zipCode: '',
			firstNameError: false,
			lastNameError: false,
			displayNameError: false,
			jobTitleError: false,
			emailError: false,
			phoneError: false,
			locationResults: [],
			isLocationLoading: false,
			errorText: 'Required field cannot be empty',
			emailErrorText: 'You must enter valid email',
			createUserError: false,
			errorDetails: [],
			formError: true,
    };
    this.props.addTranslation(anonymousTranslations);
	}
	componentDidMount() {
		const obj = this.props.companyProfileItems;
		if (Object.keys(this.props.companyProfileItems).length) {
			this.setState({
				firstName: obj.firstName,
				lastName: obj.lastName,
				displayName: obj.preferredName,
				jobTitle: obj.jobTitle,
				email: obj.emailAddress,
				phone: obj.mobilePhone,
				address1: obj.addressLine1,
				address2: obj.addressLine2,
				cityState: obj.location,
				zipCode: obj.zipCode
			});
		}
	}
	componentWillReceiveProps(nextProps: any) {
		if (Object.keys(nextProps.companyProfileItems).length && Object.keys(this.props.companyProfileItems).length !== Object.keys(nextProps.companyProfileItems).length) {
			const obj = nextProps.companyProfileItems;
			this.setState({
				firstName: obj.firstName,
				lastName: obj.lastName,
				displayName: obj.preferredName,
				jobTitle: obj.jobTitle,
				email: obj.emailAddress,
				phone: obj.mobilePhone,
				address1: obj.addressLine1,
				address2: obj.addressLine2,
				cityState: obj.location,
				zipCode: obj.zipCode,
				createUserError: false,
				errorDetails: [],
				formError: true,
			});
		}
		if ((nextProps.locationItems.length !== this.props.locationItems.length) || (nextProps.isLocationLoading !== this.props.isLocationLoading && nextProps.locationItems.length) ) {
      this.setState({ locationResults: nextProps.locationItems, isLocationLoading: false });
		}
		if (nextProps.location.length !== this.props.location.length) {
      this.setState({ cityState: nextProps.location[0] });
		}
  }
	_onFirstNameChange = (e: any) => {
		this.setState({ firstName: e.target.value, firstNameError: false, createUserError: false, errorDetails: [] });
	}
	_onLastNameChange = (e: any) => {
		this.setState({ lastName: e.target.value, lastNameError: false, createUserError: false, errorDetails: [] });
	}
	_onDisplayNameChange = (e: any) => {
		this.setState({ displayName: e.target.value, displayNameError: false, createUserError: false, errorDetails: [] });
	}
	_onJobTitleChange = (e: any) => {
		this.setState({ jobTitle: e.target.value, jobTitleError: false, createUserError: false, errorDetails: [] });
	}
	_onEmailChange = (e: any) => {
		this.setState({ email: e.target.value, emailError: false, createUserError: false, errorDetails: [] });
	}
	_onPhoneChange = (e: any) => {
		this.setState({ phone: e.target.value, phoneError: false, createUserError: false, errorDetails: [] });
	}
	_onAddress1Change = (e: any) => {
		this.setState({ address1: e.target.value });
	}
	_onAddress2Change = (e: any) => {
		this.setState({ address2: e.target.value });
	}
	_onZipCodeChange = (e: any) => {
		this.setState({ zipCode: e.target.value });
	}
	_onPersonalInfoSave = async () => {
		if (this.state.firstName === '') {
			this.setState({ firstNameError: true });
			const index = this.state.errorDetails.indexOf(this.state.errorText);
			if (index === -1) {
				await this.state.errorDetails.push(this.state.errorText);
			}
		}
		if (this.state.lastName === '') {
			this.setState({ lastNameError: true });
			const index = this.state.errorDetails.indexOf(this.state.errorText);
			if (index === -1) {
				await this.state.errorDetails.push(this.state.errorText);
			}
		}
		if (this.state.displayName === '') {
			this.setState({ displayNameError: true });
			const index = this.state.errorDetails.indexOf(this.state.errorText);
			if (index === -1) {
				await this.state.errorDetails.push(this.state.errorText);
			}
		}
		if (this.state.jobTitle === '') {
			this.setState({ jobTitleError: true });
			const index = this.state.errorDetails.indexOf(this.state.errorText);
			if (index === -1) {
				await this.state.errorDetails.push(this.state.errorText);
			}
		}
		if (this.state.phone === '') {
			this.setState({ phoneError: true });
			const index = this.state.errorDetails.indexOf(this.state.errorText);
			if (index === -1) {
				await this.state.errorDetails.push(this.state.errorText);
			}
		}
		if (this.state.email === '') {
			this.setState({ emailError: true });
			const index = this.state.errorDetails.indexOf(this.state.errorText);
			if (index === -1) {
				await this.state.errorDetails.push(this.state.errorText);
			}
		} else {
			const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			const isVaild = re.test(String(this.state.email).toLowerCase());
			if (!isVaild) {
				this.setState({ emailError: true });
				const index = this.state.errorDetails.indexOf(this.state.emailErrorText);
				if (index === -1) {
					await this.state.errorDetails.push(this.state.emailErrorText);
				}
			} else {
				await this.setState({ formError: false });
			}
		}
		if (this.state.firstName !== '' && this.state.lastName !== '' && this.state.displayName !== '' && this.state.jobTitle !== '' && !this.state.emailError && this.state.phone !== '') {
			this.props.onEmployerAccountUpdateRequest({
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				displayName: this.state.displayName,
				jobTitle: this.state.jobTitle,
				email: this.state.email,
				phone: this.state.phone,
				address1: this.state.address1,
				address2: this.state.address2,
				cityStateId: this.state.cityStateId,
				zipCode: this.state.zipCode,
				profileId: this.props.profileId
			});
			setTimeout(() => this.setState({ formError: true }), 500);
		} else {
			this.setState({ formError: true, createUserError: true });
		}
	}
	resetLocationComponent = () => {
		this.setState({ isLocationLoading: false, locationResults: [], cityState: '' });
	}
	handleLocationChange = (e: any, {value}: {value: any}) => {
    this.setState({ isLocationLoading: true, cityState: value, cityStateError: false, createUserError: false, errorDetails: [] }, () => {
      if (this.state.cityState !== '') {
        this.props.getLocationsData(value);
      } else {
				this.props.getLocationsData('');
			}
    });
    setTimeout(() => {
      if (this.state.cityState === '') return this.resetLocationComponent();
      this.setState({
        isLocationLoading: false,
      });
		}, 300);
	}
	handleLocationSelect = (e: any, {result}: {result: any}) => {
		this.setState({ cityState: result.title, cityStateId: result.id });
	}
  render() {
    return (
			<Segment basic id="personalInfoEdit">
					<List className="middle aligned">
						<List.Item>
								<List.Content className="pad-equal0">
									<Header as='h2' dividing className="heading02">Personal Info</Header>
								</List.Content>
						</List.Item>
					</List>
					<div className="ui fluid">
						<Form size='small' className="pad-eq20mb" loading={!this.state.formError}>
								<div className="ui stacked">
								<Form.Group widths={2}>
									<Form.Field required>
										<label className="fnt-wt07">First Name:</label>
										<Input placeholder='First Name' className="rdus-none ht05" value={this.state.firstName} onChange={this._onFirstNameChange} error={this.state.firstNameError} maxLength={50} />
									</Form.Field>
									<Form.Field>
										<label className="fnt-wt07">Last Name:</label>
										<Input placeholder="Last Name" className="rdus-none ht05" value={this.state.lastName} onChange={this._onLastNameChange} error={this.state.lastNameError} maxLength={50} />
									</Form.Field>
								</Form.Group>
								<Form.Group widths={2}>
									<Form.Field required>
										<label className="fnt-wt07">Display Name:</label>
										<Input placeholder="Display Name" className="rdus-none ht05" value={this.state.displayName} onChange={this._onDisplayNameChange} error={this.state.displayNameError} maxLength={128} />
									</Form.Field>
									<Form.Field required>
										<label className="fnt-wt07">Job Title:</label>
										<Input placeholder="Job Title" className="rdus-none ht05" value={this.state.jobTitle} onChange={this._onJobTitleChange} error={this.state.jobTitleError} maxLength={128} />
									</Form.Field>
								</Form.Group>
								<Form.Group widths={2}>
									<Form.Field required>
										<label className="fnt-wt07">Email:</label>
										<Input placeholder="Email" className="rdus-none ht05" value={this.state.email} onChange={this._onEmailChange} error={this.state.emailError} maxLength={50} />
									</Form.Field>
									<Form.Field required>
										<label className="fnt-wt07">Phone:</label>
										<Input placeholder="Phone" className="rdus-none ht05" value={this.state.phone} onChange={this._onPhoneChange} error={this.state.phoneError} minLength={10} maxLength={20} />
									</Form.Field>
								</Form.Group>
								<Form.Group widths={2}>
									<Form.Field>
										<label className="fnt-wt07">Address (line 1):</label>
										<Input placeholder="Address (line 1)" className="rdus-none ht05" value={this.state.address1} onChange={this._onAddress1Change} error={this.state.address1Error} maxLength={128} />
									</Form.Field>
									<Form.Field>
										<label className="fnt-wt07">Address (line 2):</label>
										<Input placeholder="Address (line 2)" className="rdus-none ht05" value={this.state.address2} onChange={this._onAddress2Change} error={this.state.address2Error} maxLength={128} />
									</Form.Field>
								</Form.Group>
								<Form.Group widths={2}>
									<Form.Field>
										<label className="fnt-wt07">City, State:</label>
										<div className="ui large input">
											<Search
												fluid
												size={"large"}
												placeholder="City, State"
												value={this.state.cityState}
												onResultSelect={this.handleLocationSelect}
												onSearchChange={_.debounce(this.handleLocationChange, 100, { leading: true })}
												results={this.state.locationResults}
												loading={this.state.isLocationLoading}
												className={this.state.cityStateError ? 'location-search-error fnt-size09' : 'fnt-size09'}
												style={{ width: '100%' }}
											/>
										</div>
									</Form.Field>
									<Form.Field>
										<label className="fnt-wt07">Zip Code:</label>
										<Input placeholder="Zip Code" className="rdus-none ht05" value={this.state.zipCode} onChange={this._onZipCodeChange} error={this.state.zipCodeError} minLength={5} maxLength={10} />
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
											id="personalInfoError"
										/> : null
								}
									<Button
										primary
										className="main-primary"
										size="large"
										onClick={
											() => this._onPersonalInfoSave()
										}
										>
										Save
									</Button>
								</div>
						</Form>
					</div>
			</Segment>
    );
  }
}

export default (withLocalize(PersonalInfoForm) as any);