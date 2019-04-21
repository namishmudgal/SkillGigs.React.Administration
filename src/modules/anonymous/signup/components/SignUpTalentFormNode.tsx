import * as React from 'react';
import { Button, Input, Form, Icon, Message } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { Translate } from "react-localize-redux";
import SocialButton from '../../../common/components/SocialButton';

interface Props {
	errorMessage: any;
	requestSignUpNode(username: any, email: any, password: any): void;
	onSocialLoginSuccess(result: any): void;
	resetLoginError(): void;
}

export default class SignUpTalentForm extends React.Component<Props, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			name: '',
			email: '',
			password: '',
			formError: true,
			createUserError: false,
			errorDetails: [],
		};
	}
	componentDidMount() {
    document.addEventListener('keydown', this.enterFunction, false);
	}
	componentWillReceiveProps(nextProps: any) {
		if (nextProps.errorMessage !== this.props.errorMessage && nextProps.errorMessage !== '') {
			this.setState({ errorDetails: nextProps.errorMessage });
			this.setState({ formError: true, createUserError: true });
		}
	}
	componentWillUnmount() {
		document.removeEventListener('keydown', this.enterFunction, false);
	}
	enterFunction = (event: any) => {
		if (event.keyCode === 13) {
			this._handleSubmit(event);
		}
	}
	_handleSubmit = (e: any) => {
		e.preventDefault();
		if (this.state.errorDetails.length) {
			this.setState({ formError: true, createUserError: true });
			return;
		} else {
			this.setState({ formError: false, createUserError: false });
			this.props.requestSignUpNode(this.state.name, this.state.email, this.state.password);
		}
	}
	_onNameChange = (e: any) => {
		this.setState({ name: e.target.value, createUserError: false, errorDetails: [] });
	}
	_onEmailChange = (e: any) => {
		this.setState({ email: e.target.value, createUserError: false, errorDetails: [] });
	}
	_onPasswordChange = (e: any) => {
		this.setState({ password: e.target.value, createUserError: false, errorDetails: [] });
	}
	_handleSocialLoginSuccess = (user: any) => {
		console.log(user);
		this.props.onSocialLoginSuccess(user);
		this.props.resetLoginError();
		this.setState({ createUserError: false, emailError: false, passwordError: false, errorDetails: [] });
	}
	_handleSocialLoginFailure = (err: any) => {
		console.error(err);
	}
  render() {
		return (
      <Form size="large" className="pad-eq20mb" onSubmit={this._handleSubmit} loading={!this.state.formError}>
				<div className="ui stacked">
					<p>
						<SocialButton
							provider='facebook'
							appId='147674342604025'
							onLoginSuccess={this._handleSocialLoginSuccess}
							onLoginFailure={this._handleSocialLoginFailure}
							type='facebook'
						>
							<Icon name="facebook" /> <Translate id="signupTalent.facebookBtnText" />
						</SocialButton>
					</p>
					<p>
						<SocialButton
							provider='linkedin'
							appId='56qe7relfq8v'
							onLoginSuccess={this._handleSocialLoginSuccess}
							onLoginFailure={this._handleSocialLoginFailure}
							type='linkedin'
						>
							<Icon name="linkedin" /> <Translate id="signupTalent.linkedinBtnText" />
						</SocialButton>
					</p>
					<p className="horiz-bar fnt01 mrg-tp03"><span><Translate id="signupTalent.seperatorText" /></span></p>
					<Form.Field>
						<label><Translate id="signupTalent.fullnameLabel" /></label>
						<Translate>
							{( {translate} ) =>
							<Input icon="user" iconPosition="left" placeholder={translate("signupTalent.fullnamePlaceholder")} className="rdus-none ht05" onChange={this._onNameChange} error={this.state.nameError} />
							}
						</Translate>
					</Form.Field>
					<Form.Field>
						<label><Translate id="signupTalent.emailLabel" /></label>
						<Translate>
							{( {translate} ) =>
								<Input icon="mail" iconPosition="left" placeholder={translate("signupTalent.emailPlaceholder")} className="rdus-none ht05" onChange={this._onEmailChange} error={this.state.emailError}
								/>
							}
						</Translate>
					</Form.Field>
					<Form.Field>
						<label><Translate id="signupTalent.passwordLabel" /></label>
						<Translate>
							{( {translate} ) =>
							<Input icon="lock" iconPosition="left" placeholder={translate("signupTalent.passwordPlaceholder")} className="rdus-none ht05" onChange={this._onPasswordChange} error={this.state.passwordError} type="password" />
							}
						</Translate>
					</Form.Field>
					{
						this.state.createUserError ?
						<Translate>
							{( {translate} ) =>
							<Message
								error
								visible
								size='mini'
								header={translate("error.header")}
								list={this.state.errorDetails}
							/>
							}
						</Translate> : null
					}
					<Translate>
						{( {translate} ) =>
						<Button
							content={translate("signupTalent.signupBtnText")}
							className="fluid large main-primary submit rdus-none mrg-tp04"
						/>
						}
					</Translate>
					<p className="text-center underline fnt02 highlight mrg-tp01"><Translate id="signupTalent.bottomTextPart1" />"<Translate id="signupTalent.bottomTextPart2" />"<Translate id="signupTalent.bottomTextPart3" />
						<a href="#" className="animate-line"><Translate id="signupTalent.bottomTextPart4" /></a>
					</p>
					<p className="mrg-tp07 underline fnt02 highlight center aligned">
						<NavLink
							to={'/SignIn'}
							className="animate-line"
						>
							<Translate id="signupTalent.alreadyAccountText" />
						</NavLink>
					</p>
				</div>
      </Form>
    );
  }
}