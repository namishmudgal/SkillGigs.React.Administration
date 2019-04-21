import * as React from 'react';
import { Form, Input, Icon, Button, Dropdown } from 'semantic-ui-react';

const expOptions = [
	{ key: 'Less than 1 year (or student)', value: 'Less than 1 year (or student)', text: 'Less than 1 year (or student)' },
	{ key: '1-2 years', value: '1-2 years', text: '1-2 years' },
	{ key: '3-5 years', value: '3-5 years', text: '3-5 years' },
	{ key: '6-10 years', value: '6-10 years', text: '6-10 years' },
	{ key: 'More than 10 years', value: 'More than 10 years', text: 'More than 10 years' }
];

const yourSkill = [
	{ key: 'Java', value: 'Java', text: 'Java' },
	{ key: 'Hadoop', value: 'Hadoop', text: 'Hadoop' },
	{ key: 'AngularJS', value: 'AngularJS', text: 'AngularJS' },
	{ key: 'Labor & Delivery', value: 'Labor & Delivery', text: 'Labor & Delivery' },
	{ key: 'Emergency Room', value: 'Emergency Room', text: 'Emergency Room' }
];

const locationOption = [
	{ key: 'Houston, Tx', value: 'Houston, Tx', text: 'Houston, Tx' },
	{ key: 'New Jersey, Ny', value: 'New Jersey, Ny', text: 'New Jersey, Ny' },
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
			skillListingsError: false,
			locations: [],
			skillExperience: '',
			skillExperienceError: false
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
	_onSkillListingsChange = (e: any, {value}: {value: any}) => {
		this.setState({ skillListings: value, skillListingsError: false });
	}
	_onSkillExperienceChange = (e: any, {value}: {value: any}) => {
		this.setState({ skillExperience: value, skillExperienceError: false });
	}
	_onFormSubmit = () => {
		if (!this.state.skillListings.length) {
			this.setState({ skillListingsError: true });
		}
		if (this.state.skillExperience === '') {
			this.setState({ skillExperienceError: true });
		}
		if (this.state.skillListings.length && this.state.skillExperience !== '') {
			console.log(
				this.state.skillTitle,
				this.state.skillType,
				this.state.stealthInfo,
				this.state.desiredSalary,
				this.state.skillListings,
				this.state.locations,
				this.state.skillExperience
			);
			alert('Form has been submitted successfully!');
		}
	}
  render() {
		const {
			callbackFromParent
		} = this.props;
    return (
						<Form>
							<Form.Field required>
								<label>Add Your Skill(s):</label>
								<div className="ui search">
									<div className="ui large input">
										<Dropdown
											fluid
											multiple
											search
											selection
											placeholder="For e.g. AngularJS"
											options={yourSkill}
											onChange={this._onSkillListingsChange}
											error={this.state.skillListingsError}
											value={this.state.skillListings}
                    />
									</div>
								</div>
							</Form.Field>
							<Form.Field>
								<label>Add Location(s):</label>
								<div className="ui large input">
									<Dropdown
										fluid
										multiple
										search
										selection
										placeholder="For e.g. Houston, TX"
										options={locationOption}
										onChange={(e: any, {value}: {value: any}) => this.setState({ locations: value })}
										value={this.state.locations}
									/>
								</div>
							</Form.Field>
							<Form.Field required>
								<label>Years of Experience:</label>
								<div className="ui large input">
									<Dropdown
										fluid
										placeholder='Select One'
										selection
										options={expOptions}
										onChange={this._onSkillExperienceChange}
										error={this.state.skillExperienceError}
										value={this.state.skillExperience}
									/>
								</div>
							</Form.Field>
							<div className="ui right aligned black segment profile-fix-btnmb">
								<Button
									floated='left'
									className="text-uppercase"
									onClick={
										() => callbackFromParent(0, {
											skillTitle: this.state.skillTitle,
											skillType: this.state.skillType,
											stealthInfo: this.state.stealthInfo,
											desiredSalary: this.state.desiredSalary,
											skillListings: this.state.skillListings,
											locations: this.state.locations,
											skillExperience: this.state.skillExperience
										})
									}
								>
									PREVIOUS
								</Button>
								<Button
									primary
									className="text-uppercase"
									onClick={this._onFormSubmit}
								>
									FINISH
								</Button>
							</div>
						</Form>
    );
  }
}
