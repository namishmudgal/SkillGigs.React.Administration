import * as React from 'react';
import { Button, Input, Form, Icon, Message } from 'semantic-ui-react';
import { Translate } from "react-localize-redux";

interface Props {
	resendConfirmationError: string;
	isConfirmationSent: boolean;
	resetResendEmailError(): void;
	onRequestEmailResend(email: any): void;
}

let error = false;

export default class ResendConfirmationForm extends React.Component<Props, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			email: '',
			emailError: false,
			emailErrorText: 'You must enter valid email',
			formError: true,
			createUserError: false,
			errorDetails: [],
			sucessMessage: "Email has been sent. Sometimes it take upto 5 minutes to receive the email. Please hang tight!",
			showSuccessMessage: false
		};
	}
	componentWillReceiveProps(nextProps: any) {
		if (nextProps.resendConfirmationError !== this.props.resendConfirmationError && nextProps.resendConfirmationError !== '') {
			this.setState({ formError: true, createUserError: true, emailError: true });
			const index = this.state.errorDetails.indexOf(nextProps.resendConfirmationError);
			if (index === -1) {
				this.state.errorDetails.push(nextProps.resendConfirmationError);
			}
			const index2 = this.state.errorDetails.indexOf(this.state.emailErrorText);
			if (index2 !== -1) {
				this.state.errorDetails.splice(index2, 1);
			}
			this.setState({ showSuccessMessage: false });
		}
		if (nextProps.isConfirmationSent !== this.props.isConfirmationSent && nextProps.isConfirmationSent) {
			this.setState({ formError: true, createUserError: false, emailError: false, showSuccessMessage: true }, () => {
				this.setState({ email: '' });
			});
		}
		if (nextProps.isConfirmationSent !== this.props.isConfirmationSent && !nextProps.isConfirmationSent) {
			this.setState({ showSuccessMessage: false });
		}
  }
	_handleSubmit = (e: any) => {
		e.preventDefault();
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
				if (this.props.resendConfirmationError !== '') {
					error = true;
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
		if (error) {
			this.setState({ formError: true, createUserError: true });
			return;
		} else {
			this.setState({ formError: false, createUserError: false });
			this.props.onRequestEmailResend(this.state.email);
		}
	}
	_onEmailChange = (e: any) => {
		this.setState({ email: e.target.value, emailError: false, createUserError: false, errorDetails: [] });
		error = false;
		this.props.resetResendEmailError();
	}
  render() {
		return (
      <Form size="large" className="pad-eq20mb" onSubmit={this._handleSubmit} loading={!this.state.formError}>
				<div className="ui stacked">
					<Form.Field>
						<label><Translate id="resendconfirmation.emailLabel" /></label>
						<Translate>
							{( {translate} ) =>
								<Input icon="user" iconPosition="left" placeholder={translate("resendconfirmation.emailPlaceholder")} className="rdus-none ht05" onChange={this._onEmailChange} error={this.state.emailError} id="resendEmailInput" />
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
					{
						this.state.showSuccessMessage ?
						<Message positive size='mini' id="resendEmailSuccess">
							<p>
								<strong>Success </strong>{this.state.sucessMessage}
							</p>
						</Message> : null
					}
					<Translate>
						{( {translate} ) =>
							<Button
								content={translate("resendconfirmation.sendConfirmationBtnText")}
								className="fluid large main-primary submit rdus-none mrg-tp04"
							/>
						}
					</Translate>
					<p className="mrg-tp07" />
				</div>
      </Form>
    );
  }
}
