import * as React from 'react';
import { Button, Input, Form, Icon, Message } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { Translate } from "react-localize-redux";
import SocialButton from '../../../common/components/SocialButton';

interface Props {
	errorMessage: any;
	onCheckCredentialsNode(username: any, password: any): void;
	onSocialLoginSuccess(result: any): void;
	resetLoginError(): void;
}

export default class LoginForm extends React.Component<Props, any> {
	constructor(props: any) {
		super(props);
		this.state = {
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
			this.props.onCheckCredentialsNode(this.state.email, this.state.password);
		}
	}
	_onEmailChange = (e: any) => {
		this.setState({ email: e.target.value, createUserError: false, errorDetails: [] });
		this.props.resetLoginError();
	}
	_onPasswordChange = (e: any) => {
		this.setState({ password: e.target.value, createUserError: false, errorDetails: [] });
		this.props.resetLoginError();
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
		const {
			errorMessage
		} = this.props;
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
							<Icon name="facebook" /> <Translate id="login.facebookBtnText" />
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
							<Icon name="linkedin" /> <Translate id="login.linkedinBtnText" />
						</SocialButton>
					</p>
					<p className="horiz-bar fnt01 mrg-tp03"><span><Translate id="login.seperatorText" /></span></p>
					<Form.Group widths={2} className="mrg-tp03">
						<Form.Field>
							<label><Translate id="login.emailLabel" /></label>
							<Translate>
								{( {translate} ) =>
									<Input icon="user" iconPosition="left" placeholder={translate("login.emailPlaceholder")} className="rdus-none ht05" onChange={this._onEmailChange} error={this.state.emailError} id="signInEmail" />
								}
							</Translate>
						</Form.Field>
						<Form.Field>
							<label><Translate id="login.passwordLabel" /></label>
							<Translate>
								{( {translate} ) =>
								<Input icon="lock" iconPosition="left" placeholder={translate("login.passwordPlaceholder")} className="rdus-none ht05" onChange={this._onPasswordChange} error={this.state.passwordError} type="password" id="signInPassword" />
								}
							</Translate>
						</Form.Field>
					</Form.Group>
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
								id="signInError"
							/>
							}
						</Translate> : null
					}
					<Translate>
						{( {translate} ) =>
						<Button
							content={translate("login.signInBtnText")}
							className="fluid large main-primary submit rdus-none mrg-tp04"
							data-auto="signInButton"
						/>
						}
					</Translate>
					<p className="text-center mrg-tp07 underline fnt02 highlight">
						<NavLink
							title="Forgot Password"
							to={'/ForgotPwd'}
							className="animate-line"
						>
							<Translate id="login.forgotPasswordText" />
						</NavLink>
						&nbsp;|&nbsp;
						<NavLink
							title="Resend Confirmation Email"
							to={'/Resend/Confirmation'}
							className="animate-line"
						>
							<Translate id="login.resendConfirmationText" />
						</NavLink>
						&nbsp;|&nbsp;
						<NavLink
							title="Sign Up For SkillGigs"
							to={'/SignUp'}
							className="animate-line"
						>
							<Translate id="login.signupText" />
						</NavLink>
					</p>
				</div>
      </Form>
    );
  }
}
