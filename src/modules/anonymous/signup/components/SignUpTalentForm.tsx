import * as React from 'react';
import { Button, Input, Form, Icon, Message } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { Translate } from "react-localize-redux";
import SocialButton from '../../../common/components/SocialButton';

interface Props {
	errorMessage: string;
	isEmailAlreadyExist: boolean;
	emailVerificationError: any;
	requestSignUpNode(username: any, email: any, password: any): void;
	verifyEmail(email: any): void;
	onSocialLoginSuccess(result: any): void;
	resetLoginError(): void;
}

let emailExistError = false;

export default class SignUpTalentForm extends React.Component<Props, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			name: '',
			nameError: false,
			fullnameEmptyErrorText: "FullName cannot be empty",
			email: '',
			password: '',
			emailError: false,
			emailErrorText: 'You must enter valid email',
			emailEmptyErrorText: 'Email cannot be empty',
			passwordError: false,
			passwordErrorText: 'Password cannot be empty',
			formError: true,
			createUserError: false,
			errorDetails: [],
		};
	}
	componentDidMount() {
    document.addEventListener('keydown', this.enterFunction, false);
	}
	componentWillReceiveProps(nextProps: any) {
		if (nextProps.isEmailAlreadyExist !== this.props.isEmailAlreadyExist && nextProps.isEmailAlreadyExist) {
			emailExistError = true;
			this.setState({ formError: true, createUserError: true, emailError: true });
			const index = this.state.errorDetails.indexOf(nextProps.emailVerificationError);
			if (index === -1) {
				this.state.errorDetails.push(nextProps.emailVerificationError);
			}
			const index2 = this.state.errorDetails.indexOf(this.state.emailErrorText);
			if (index2 !== -1) {
				this.state.errorDetails.splice(index2, 1);
			}
		}
		if (nextProps.isEmailAlreadyExist !== this.props.isEmailAlreadyExist && !nextProps.isEmailAlreadyExist) {
			emailExistError = false;
			this.setState({ emailError: false, createUserError: this.state.errorDetails.length });
			const index1 = this.state.errorDetails.indexOf(nextProps.emailVerificationError);
			if (index1 !== -1) {
				this.state.errorDetails.splice(index1, 1);
			}
			const index2 = this.state.errorDetails.indexOf(this.state.emailErrorText);
			if (index2 !== -1) {
				this.state.errorDetails.splice(index2, 1);
			}
		}
		if (nextProps.errorMessage !== this.props.errorMessage && nextProps.errorMessage !== '') {
			this.setState({ formError: true });
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
		if (this.state.name === '') {
			const index = this.state.errorDetails.indexOf(this.state.fullnameEmptyErrorText);
			if (index === -1) {
				this.state.errorDetails.push(this.state.fullnameEmptyErrorText);
			}
			this.setState({ nameError: true });
		} else {
			this.setState({ nameError: false });
			const index = this.state.errorDetails.indexOf(this.state.fullnameEmptyErrorText);
			if (index !== -1) {
				this.state.errorDetails.splice(index, 1);
			}
		}
		if (this.state.email === '') {
			const index = this.state.errorDetails.indexOf(this.state.emailEmptyErrorText);
			if (index === -1) {
				this.state.errorDetails.push(this.state.emailEmptyErrorText);
			}
			this.setState({ emailError: true });
		} else {
			const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			const isVaild = re.test(String(this.state.email).toLowerCase());
			if (isVaild) {
				this.setState({ emailError: emailExistError });
				const index = this.state.errorDetails.indexOf(this.state.emailErrorText);
				if (index !== -1) {
					this.state.errorDetails.splice(index, 1);
				}
			} else {
				const index = this.state.errorDetails.indexOf(this.state.emailErrorText);
				if (index === -1) {
					this.state.errorDetails.push(this.state.emailErrorText);
				}
				this.setState({ emailError: true });
			}
		}
		if (this.state.password === '') {
			const index = this.state.errorDetails.indexOf(this.state.passwordErrorText);
			if (index === -1) {
				this.state.errorDetails.push(this.state.passwordErrorText);
			}
			this.setState({ passwordError: true });
		} else {
			this.setState({ passwordError: false });
			const index = this.state.errorDetails.indexOf(this.state.passwordErrorText);
			if (index !== -1) {
				this.state.errorDetails.splice(index, 1);
			}
		}
		if (this.state.errorDetails.length) {
			this.setState({ formError: true, createUserError: true });
			return;
		} else {
			this.setState({ formError: false, createUserError: false });
			this.props.requestSignUpNode(this.state.name, this.state.email, this.state.password);
		}
	}
	_onNameChange = (e: any) => {
		this.setState({ name: e.target.value, nameError: false, createUserError: false, errorDetails: this.props.isEmailAlreadyExist ? [this.props.emailVerificationError] : [] });
	}
	_onEmailChange = (e: any) => {
		this.setState({ email: e.target.value, emailError: false, createUserError: false, errorDetails: [] });
	}
	_onPasswordChange = (e: any) => {
		this.setState({ password: e.target.value, passwordError: false, createUserError: false, errorDetails: this.props.isEmailAlreadyExist ? [this.props.emailVerificationError] : [] });
	}
	_chkEmailToVerify = () => {
			const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			const isVaild = re.test(String(this.state.email).toLowerCase());
			if (isVaild) {
				this.props.verifyEmail(this.state.email);
			}
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
							<Input icon="user" iconPosition="left" placeholder={translate("signupTalent.fullnamePlaceholder")} className="rdus-none ht05" onChange={this._onNameChange} error={this.state.nameError} id="signUpTalentName" />
							}
						</Translate>
					</Form.Field>
					<Form.Field>
						<label><Translate id="signupTalent.emailLabel" /></label>
						<Translate>
							{( {translate} ) =>
								<Input icon="user" iconPosition="left" placeholder={translate("signupTalent.emailPlaceholder")} className="rdus-none ht05" onChange={this._onEmailChange} error={this.state.emailError} id="signUpTalentEmail"
									onBlur={
										() => {
											if (this.state.email !== '') {
												this._chkEmailToVerify();
											}
										}
									}
								/>
							}
						</Translate>
					</Form.Field>
					<Form.Field>
						<label><Translate id="signupTalent.passwordLabel" /></label>
						<Translate>
							{( {translate} ) =>
							<Input icon="lock" iconPosition="left" placeholder={translate("signupTalent.passwordPlaceholder")} className="rdus-none ht05" onChange={this._onPasswordChange} error={this.state.passwordError} type="password" id="signUpTalentPassword" />
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
								id="signUpTalentError"
							/>
							}
						</Translate> : null
					}
					<Translate>
						{( {translate} ) =>
						<Button
							content={translate("signupTalent.signupBtnText")}
							className="fluid large main-primary submit rdus-none mrg-tp04"
							id="signUpTalentButton"
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