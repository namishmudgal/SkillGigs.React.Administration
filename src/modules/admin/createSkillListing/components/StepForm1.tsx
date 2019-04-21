import * as React from 'react';
import { Form, Input, Icon, Button, Dropdown } from 'semantic-ui-react';

const jobTypeOptions = [
	{ key: 'Contract', value: 'Contract', text: 'Contract' },
	{ key: 'Permanent', value: 'Permanent', text: 'Permanent' }
];

interface Props {
	options: any;
	callbackFromParent(activeIndex: number, options: any): void;
}

export default class CreateSkillListingForm extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
		this.state = {
			activeIndex: 0,
			skillTitle: '',
			skillTitleError: false,
			skillType: '',
			skillTypeError: false,
			stealthInfo: '',
			desiredSalary: '',
			desiredSalaryError: false,
			skillListings: [],
			locations: [],
			skillExperience: '',
		};
	}
	componentDidMount() {
		this.setState({
			skillTitle: this.props.options.skillTitle,
			skillType: this.props.options.skillType,
			stealthInfo: this.props.options.stealthInfo,
			desiredSalary: this.props.options.desiredSalary,
			skillListings: this.props.options.skillListings,
			locations: this.props.options.locations,
			skillExperience: this.props.options.skillExperience,
		});
	}
	_onSkillTitleChange = (e: any) => {
		this.setState({ skillTitle: e.target.value, skillTitleError: false });
	}
	_onSkillTypeChange = (e: any, {value}: {value: any}) => {
		this.setState({ skillType: value, skillTypeError: false });
	}
	_onDesiredSalaryChange = (e: any, {value}: {value: any}) => {
		this.setState({ desiredSalary: value, desiredSalaryError: false });
	}
	_onNextStep = () => {
		if (this.state.skillTitle === '') {
			this.setState({ skillTitleError: true });
		}
		if (this.state.skillType === '') {
			this.setState({ skillTypeError: true });
		}
		if (this.state.desiredSalary === '') {
			this.setState({ desiredSalaryError: true });
		}
		if (this.state.skillTitle !== '' && this.state.skillType !== '' && this.state.desiredSalary !== '') {
			this.props.callbackFromParent(1, {
				skillTitle: this.state.skillTitle,
				skillTitleError: this.state.skillTitleError,
				skillType: this.state.skillType,
				skillTypeError: this.state.skillTypeError,
				stealthInfo: this.state.stealthInfo,
				desiredSalary: this.state.desiredSalary,
				desiredSalaryError: this.state.desiredSalaryError,
				skillListings: this.state.skillListings,
				locations: this.state.locations,
				skillExperience: this.state.skillExperience
			});
		}
	}
  render() {
		const {
			callbackFromParent
		} = this.props;
    return (
						<Form>
							<Form.Field required className="large">
								<label>Title:</label>
								<div className="ui search">
									<Input type="text" id="txtTitle" name="Title" className="large icon" placeholder="For e.g. Awesome Full Stack Developer" onChange={this._onSkillTitleChange} error={this.state.skillTitleError} value={this.state.skillTitle} />
								</div>
							</Form.Field>
							<Form.Field required>
								<label>Job Type:</label>
								<div className="ui large input">
									<Dropdown
										fluid
										placeholder='Select a Type'
										selection
										options={jobTypeOptions}
										onChange={this._onSkillTypeChange}
										error={this.state.skillTypeError}
										value={this.state.skillType}
									/>
								</div>
							</Form.Field>
							<Form.Field className="large">
								<label className="desktop only">Stealth Mode - Hide me from these employers: <Icon name="info circle" color="red" data-content="Hide yourself from companies you do not want to know you are looking for a new Gig. Enter their url(s) in the following format...http://www.skillgigs.com or www.skillgigs.com. Use commas to separate multiple urls." /></label>
								<label className="mobile only">Stealth Mode - Hide me from these employers: <Icon name="info circle" color="red" data-content="Hide yourself from companies you do not want to know you are looking for a new Gig. Enter their url(s) in the following format...http://www.skillgigs.com or www.skillgigs.com. Use commas to separate multiple urls." />></label>
								<Input type="text" className="large" id="txtIncognito" name="incognito" placeholder="For e.g. http://companyname.com" onChange={(e: any, {value}: {value: any}) => this.setState({ stealthInfo: value })} value={this.state.stealthInfo} />
							</Form.Field>
							<div className="contractFields" style={{ display: this.state.skillType === 'Contract' ? 'block' : 'none' }}>
								<Form.Field required className="large">
									<label className="desktop only">Desired Salary:</label>
									<label className="mobile only">Desired Salary:<Icon name="info circle" color="red" data-content="please don't add dollar sign." /></label>
									<div className="ui large labeled input">
										<label className="ui label line-ht30">HOURLY</label>
										<Input type="text" id="txtContractSalary" name="contractSalary" placeholder="For e.g. 250.00, please don't add dollar sign" className="money" onChange={this._onDesiredSalaryChange} error={this.state.desiredSalaryError} value={this.state.desiredSalary} />
									</div>
								</Form.Field>
								<div className="ui clearing center aligned green segment" id="clientRateSegment">
									<div className="ui tiny left floated statistic">
										<div className="value">
											SkillGigs
										</div>
										<div className="label">
											Transparency
										</div>
									</div>
									<div className="ui tiny statistic">
										<div className="value">
											<Icon name="arrow right" />
										</div>
										<div className="label" />
									</div>
									<div className="ui tiny right floated statistic">
										<div className="value" id="clientRate">
											$0.00
										</div>
										<div className="label">
											Billed to Client
										</div>
									</div>
								</div>
							</div>
							<div className="permanentFields" style={{ display: this.state.skillType === 'Permanent' ? 'block' : 'none' }}>
								<Form.Field required className="large">
									<label className="desktop only">Desired Salary:</label>
									<label className="mobile only">Desired Salary:<Icon name="info circle" color="red" data-content="please don't add dollar sign." /></label>
									<div className="ui large labeled input">
										<label className="ui label line-ht30">YEARLY</label>
										<Input type="text" id="txtPermanentSalary" name="permanentSalary" placeholder="For e.g. 50250.00, please don't add dollar sign" className="money" onChange={this._onDesiredSalaryChange} error={this.state.desiredSalaryError} value={this.state.desiredSalary} />
									</div>
								</Form.Field>
							</div>
							<div className="ui right aligned black segment profile-fix-btnmb">
								<Button
									primary
									className="text-uppercase"
									onClick={
										() => this._onNextStep()
									}
								>
								NEXT
								</Button>
							</div>
						</Form>
    );
  }
}
