import * as React from 'react';
import { Button, Input, Form, Icon, Message } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { Translate } from "react-localize-redux";

export default class SignUpEmployerForm extends React.Component<{}, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			email: '',
			password: '',
			emailError: false,
			emailErrorText: 'You must enter valid email ID',
			passwordError: false,
			passwordErrorText: 'Password Cannot be empty',
			formError: true,
			createUserError: false,
			errorDetails: [],
		};
	}
	_handleSubmit = (e: any) => {
		e.preventDefault();
		let error = false;
		if (this.state.email === '') {
			if (!this.state.emailError) {
				this.state.errorDetails.push(this.state.emailErrorText);
			}
			this.setState({ emailError: true });
			error = true;
		} else {
			const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			const isVaild = re.test(String(this.state.email).toLowerCase());
			if (isVaild) {
				this.setState({ emailError: false });
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
				error = true;
			}
		}
		if (this.state.password === '') {
			if (!this.state.passwordError) {
				this.state.errorDetails.push(this.state.passwordErrorText);
			}
			this.setState({ passwordError: true });
			error = true;
		} else {
			this.setState({ passwordError: false });
			const index = this.state.errorDetails.indexOf(this.state.passwordErrorText);
			if (index !== -1) {
				this.state.errorDetails.splice(index, 1);
			}
		}
		if (error) {
			this.setState({ formError: true, createUserError: true });
			return;
		}
		this.setState({ formError: false, createUserError: false });
	}
	_onEmailChange = (e: any) => {
		this.setState({ email: e.target.value, emailError: false });
	}
	_onPasswordChange = (e: any) => {
		this.setState({ password: e.target.value, passwordError: false });
	}
  render() {
		return (
      <Form size="large" className="pad-eq20mb" onSubmit={this._handleSubmit} loading={!this.state.formError}>
				<div className="ui stacked">
					<Form.Field>
						<label><Translate id="signupEmployer.emailLabel" /></label>
						<Translate>
							{( {translate} ) =>
								<Input icon="user" iconPosition="left" placeholder={translate("signupEmployer.emailPlaceholder")} className="rdus-none ht05" onChange={this._onEmailChange} error={this.state.emailError} />
							}
						</Translate>
					</Form.Field>
					<Form.Field>
						<label><Translate id="signupEmployer.passwordLabel" /></label>
						<Translate>
							{( {translate} ) =>
							<Input icon="lock" iconPosition="left" placeholder={translate("signupEmployer.passwordPlaceholder")} className="rdus-none ht05" onChange={this._onPasswordChange} error={this.state.passwordError} type="password" />
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
							content={translate("signupEmployer.signupBtnText")}
							className="fluid large main-primary submit rdus-none mrg-tp04"
						/>
						}
					</Translate>
					<p className="text-center underline fnt02 highlight mrg-tp01 center aligned"><Translate id="signupEmployer.bottomTextPart1" />"<Translate id="signupEmployer.bottomTextPart2" />"<Translate id="signupEmployer.bottomTextPart3" />
						<a href="#" className="animate-line"><Translate id="signupEmployer.bottomTextPart4" /></a>
					</p>
					<p className="mrg-tp07 underline fnt02 highlight center aligned">
						<NavLink
							to={'/SignIn'}
							className="animate-line"
						>
							<Translate id="signupEmployer.alreadyAccountText" />
						</NavLink>
					</p>
				</div>
      </Form>
    );
  }
}