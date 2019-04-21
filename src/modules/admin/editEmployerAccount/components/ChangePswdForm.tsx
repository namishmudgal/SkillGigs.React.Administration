import * as React from 'react';
import { Segment, List, Header, Form, Button, Input } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";

interface Props {
  addTranslation: any;
  initialize: any;
  isLoggedIn: boolean;
  dropDownData: any;
  onGigPagingRequest(profileId: number, pageNumber: number, pageSize: number, activeState: any): void;
  getDropDownData(type: any): void;
}

class ChangePswdForm extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      oldPassword: '',
			oldPasswordError: false,
			newPassword: '',
			newPasswordError: false,
			confirmNewPassword: '',
      confirmNewPasswordError: false,
    };
    this.props.addTranslation(anonymousTranslations);
	}
	_onOldPasswordChange = () => {

	}
	_onNewPasswordChange = () => {

	}
	_onConfirmNewPasswordChange = () => {

	}
	_onChangePasswordSave = () => {

	}
  render() {
    return (
      <Segment basic id="changePasswordEdit">
				<List className="middle aligned">
					<List.Item>
							<List.Content className="pad-equal0">
								<Header as='h2' dividing className="heading02">Change Password</Header>
							</List.Content>
					</List.Item>
				</List>
				<div className="ui fluid">
					<Form size='small' className="pad-eq20mb">
						<div className="ui stacked">
							<Form.Group widths={2}>
								<Form.Field>
									<label className="fnt-wt07">Old Password:</label>
									<Input type="password" placeholder="Old Password" className="rdus-none ht05" value={this.state.oldPassword} onChange={this._onOldPasswordChange} error={this.state.oldPasswordError} />
								</Form.Field>
							</Form.Group>
							<Form.Group widths={2}>
								<Form.Field>
									<label className="fnt-wt07">New Password:</label>
									<Input type="password" placeholder="New Password" className="rdus-none ht05" value={this.state.newPassword} onChange={this._onNewPasswordChange} error={this.state.newPasswordError} />
								</Form.Field>
							</Form.Group>
							<Form.Group widths={2}>
								<Form.Field>
									<label className="fnt-wt07">Confirm New Password:</label>
									<Input placeholder="Confirm New Password" className="rdus-none ht05" value={this.state.confirmNewPassword} onChange={this._onConfirmNewPasswordChange} error={this.state.confirmNewPasswordError} />
								</Form.Field>
							</Form.Group>
							<Button
									primary
									className="main-primary"
									size="large"
									onClick={
										() => this._onChangePasswordSave()
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

export default (withLocalize(ChangePswdForm) as any);