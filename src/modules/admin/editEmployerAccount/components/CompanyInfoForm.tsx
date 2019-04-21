import * as React from 'react';
import { Segment, List, Header, Form, Button, Dropdown, Input, Message } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";

interface Props {
  addTranslation: any;
  initialize: any;
	isLoggedIn: boolean;
	dropDownData: any;
	companyProfileItems: any;
	profileId: number;
	getDropDownData(type: any): void;
	onEmployerAccountUpdateRequest(data: any): void;
}

class CompanyInfoForm extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
			companyName: '',
			companyNameError: false,
			industry: '',
			industryId: '',
			industryError: false,
			year: '',
			yearError: false,
			companyType: '',
			companyTypeId: '',
    	companySizeId: '',
			companyTypeError: false,
			companySize: '',
			companySizeError: false,
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
		this.setState({
			companyName: obj.companyName,
			industry: obj.industryName,
			year: obj.yearFounded,
			companyType: obj.companyType,
			companySize: obj.companySize,
		});
	}
	componentWillReceiveProps(nextProps: any) {
		if (Object.keys(nextProps.companyProfileItems).length && Object.keys(this.props.companyProfileItems).length !== Object.keys(nextProps.companyProfileItems).length) {
			const obj = nextProps.companyProfileItems;
			this.setState({
				companyName: obj.companyName,
				industry: obj.industryName,
				year: obj.yearFounded,
				companyType: obj.companyType,
				companySize: obj.companySize,
			});
		}
  }
	_onCompanyNameChange = (e: any) => {
		this.setState({ companyName: e.target.value, companyNameError: false, createUserError: false, errorDetails: [] });
	}
	_onIndustryChange = (e: any, {value}: {value: any}) => {
		this.setState({
			industry: value,
			industryId: this.props.dropDownData.industry.find((obj: any) => obj.value === value).id,
			industryError: false,
			createUserError: false,
			errorDetails: []
		});
	}
	_onYearChange = (e: any) => {
		this.setState({ year: e.target.value, yearError: false, createUserError: false, errorDetails: [] });
	}
	_onCompanyTypeChange = (e: any, {value}: {value: any}) => {
		this.setState({
			companyType: value,
			companyTypeId: this.props.dropDownData.companyType.find((obj: any) => obj.value === value).id,
			companyTypeError: false,
			createUserError: false,
			errorDetails: []
		});
	}
	_onCompanySizeChange = (e: any, {value}: {value: any}) => {
		this.setState({
			companySize: value,
			companySizeId: this.props.dropDownData.companySize.find((obj: any) => obj.value === value).id,
			companySizeError: false,
			createUserError: false,
			errorDetails: []
		});
	}
	_onCompanyInfoSave = async () => {
		if (this.state.companyName === '') {
			this.setState({ companyNameError: true });
			const index = this.state.errorDetails.indexOf(this.state.errorText);
			if (index === -1) {
				await this.state.errorDetails.push(this.state.errorText);
			}
		}
		if (this.state.industry === '') {
			this.setState({ industryError: true });
			const index = this.state.errorDetails.indexOf(this.state.errorText);
			if (index === -1) {
				await this.state.errorDetails.push(this.state.errorText);
			}
		}
		if (this.state.year === '') {
			this.setState({ yearError: true });
			const index = this.state.errorDetails.indexOf(this.state.errorText);
			if (index === -1) {
				await this.state.errorDetails.push(this.state.errorText);
			}
		}
		if (this.state.companyType === '') {
			this.setState({ companyTypeError: true });
			const index = this.state.errorDetails.indexOf(this.state.errorText);
			if (index === -1) {
				await this.state.errorDetails.push(this.state.errorText);
			}
		}
		if (this.state.companySize === '') {
			this.setState({ companySizeError: true });
			const index = this.state.errorDetails.indexOf(this.state.errorText);
			if (index === -1) {
				await this.state.errorDetails.push(this.state.errorText);
			}
		} else{
			await this.setState({ formError: false });
		}
		if (!this.state.errorDetails.length) {
			this.props.onEmployerAccountUpdateRequest({
				companyName: this.state.companyName,
				industryId: this.state.industryId,
				year: this.state.year,
				companyTypeId: this.state.companyTypeId,
				companySizeId: this.state.companySizeId,
				profileId: this.props.profileId
			});
			setTimeout(() => this.setState({ formError: true }), 500);
		} else {
			this.setState({ formError: true, createUserError: true });
		}
	}
  render() {
		const {
			dropDownData
		} = this.state;
    return (
      <Segment basic id="companyInfoEdit">
				<List className="middle aligned">
					<List.Item>
							<List.Content className="pad-equal0">
								<Header as='h2' dividing className="heading02">Company Info</Header>
							</List.Content>
					</List.Item>
				</List>
				<div className="ui fluid ">
					<Form size='small' className="pad-eq20mb" loading={!this.state.formError}>
							<div className="ui stacked ">
							<Form.Group widths={2}>
									<Form.Field required>
										<label className="fnt-wt07">Company Name:</label>
										<Input placeholder="Company Name" className="rdus-none ht05" value={this.state.companyName} onChange={this._onCompanyNameChange} error={this.state.companyNameError} minLength={10} maxLength={128} />
									</Form.Field>
									<Form.Field required>
										<label className="fnt-wt07">Industry:</label>
										<div className="ui large input">
											<Dropdown
												fluid
												search
												selection
												placeholder="Select"
												options={this.props.dropDownData.industry}
												onChange={this._onIndustryChange}
												error={this.state.industryError}
												value={this.state.industry}
											/>
										</div>
									</Form.Field>
								</Form.Group>
								<Form.Group widths={2}>
									<Form.Field required>
										<label className="fnt-wt07">Year Founded:</label>
										<Input placeholder="Year Founded" className="rdus-none ht05" value={this.state.year} onChange={this._onYearChange} error={this.state.yearError} />
									</Form.Field>
									<Form.Field required>
										<label className="fnt-wt07">Company Type:</label>
										<div className="ui large input">
											<Dropdown
												fluid
												search
												selection
												placeholder="Select"
												options={this.props.dropDownData.companyType}
												onChange={this._onCompanyTypeChange}
												error={this.state.companyTypeError}
												value={this.state.companyType}
											/>
										</div>
									</Form.Field>
								</Form.Group>
								<Form.Group widths={2}>
									<Form.Field required>
										<label>Company Size:</label>
										<div className="ui large input">
											<Dropdown
												fluid
												search
												selection
												placeholder="Select"
												options={this.props.dropDownData.companySize}
												onChange={this._onCompanySizeChange}
												error={this.state.companySizeError}
												value={this.state.companySize}
											/>
										</div>
									</Form.Field>
									<Form.Field />
								</Form.Group>
								{
									this.state.createUserError ?
										<Message
											error
											visible
											size='mini'
											header="There was some error with your submission"
											list={this.state.errorDetails}
											id="companyInfoError"
										/> : null
								}
								<Button
									primary
									className="main-primary"
									size="large"
									onClick={
										() => this._onCompanyInfoSave()
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

export default (withLocalize(CompanyInfoForm) as any);