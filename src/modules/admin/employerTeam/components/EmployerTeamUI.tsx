import * as React from 'react';
import ContentWrapperWithHeader from '../../../wireframe/components/ContentWrapperWithHeader';
import { Grid, Container, Loader, Card, List, Header, Segment, Form, Icon, Button, Modal, Input, Message } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";
import browserHistory from 'src/router/browserHistory';
import { NavLink } from 'react-router-dom';

interface Props {
  addTranslation: any;
  initialize: any;
  isLoggedIn: boolean;
  match: any;
  employerTeamError: string;
  employerTeamItems: any;
  employerTeamLoading: boolean;
  onGetEmployerTeamRequest(type: any): void;
  onPostEmployerTeamRequest(data: any): void;
}

class EmployerTeamUI extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      modalOpen: false,
      fullName: '',
      fullNameError: false,
      email: '',
      emailError: false,
      jobTitle: '',
      jobTitleError: false,
      phoneNumber: '',
      phoneNumberError: false,
      requiredErrorText: 'Required Fields cannot be empty',
      emailErrorText: 'You must enter valid email',
      phoneErrorText: 'You must enter valid phone number',
      createUserError: false,
			errorDetails: [],
    };
    this.props.addTranslation(anonymousTranslations);
  }
  componentDidMount() {
    this.props.onGetEmployerTeamRequest(this.props.match.params.id);
    if (this.props.employerTeamError !== '') {
      browserHistory.push('/error');
    }
  }
  handleOpen = () => {
    this.setState({
      modalOpen: true,
    });
  }
  handleClose = () => {
    this.setState({
      modalOpen: false,
    });
  }
  _addMember = () => {
    if (this.state.fullName === '') {
			const index = this.state.errorDetails.indexOf(this.state.requiredErrorText);
			if (index === -1) {
				this.state.errorDetails.push(this.state.requiredErrorText);
			}
			this.setState({ fullNameError: true, createUserError: true });
    }
    if (this.state.email === '') {
      const index = this.state.errorDetails.indexOf(this.state.requiredErrorText);
			if (index === -1) {
				this.state.errorDetails.push(this.state.requiredErrorText);
			}
			this.setState({ emailError: true, createUserError: true });
    } else {
			const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const isVaild = re.test(String(this.state.email).toLowerCase());
      if (isVaild && this.state.email.indexOf(this.props.employerTeamItems.domain) !== -1 && !this.props.employerTeamItems.team.some((obj: any) => obj.emailAddress === this.state.email)) {
        const index = this.state.errorDetails.indexOf(this.state.emailErrorText);
				if (index !== -1) {
					this.state.errorDetails.splice(index, 1);
				}
			} else {
				const index = this.state.errorDetails.indexOf(this.state.emailInvalidErrorText);
				if (index === -1) {
					this.state.errorDetails.push(this.state.emailErrorText);
				}
				this.setState({ emailError: true, createUserError: true });
			}
		}
    if (this.state.jobTitle === '') {
      const index = this.state.errorDetails.indexOf(this.state.requiredErrorText);
			if (index === -1) {
				this.state.errorDetails.push(this.state.requiredErrorText);
			}
			this.setState({ jobTitleError: true, createUserError: true });
    }
    if (this.state.phoneNumber === '') {
      const index = this.state.errorDetails.indexOf(this.state.requiredErrorText);
			if (index === -1) {
				this.state.errorDetails.push(this.state.requiredErrorText);
			}
			this.setState({ phoneNumberError: true, createUserError: true });
    } else {
			const re = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
			const isVaild = re.test(String(this.state.phoneNumber).toLowerCase());
			if (isVaild) {
				const index = this.state.errorDetails.indexOf(this.state.phoneErrorText);
				if (index !== -1) {
					this.state.errorDetails.splice(index, 1);
				}
			} else {
				const index = this.state.errorDetails.indexOf(this.state.phoneErrorText);
				if (index === -1) {
					this.state.errorDetails.push(this.state.phoneErrorText);
				}
				this.setState({ phoneNumberError: true, createUserError: true });
			}
		}
    if (!this.state.errorDetails.length) {
      this.props.onPostEmployerTeamRequest(
        {
          profileId: this.props.match.params.id,
          fullName: this.state.fullName,
          email: this.state.email,
          jobTitle: this.state.jobTitle,
          phoneNumber: this.state.phoneNumber,
          source: window.location.href,
          companyName: this.props.employerTeamItems.domain.split('.')[0]
        }
      );
      this.setState({
        modalOpen: false,
        createUserError: false,
        errorDetails: []
      });
    }
  }
  _onFullNameChange = (e: any) => {
    this.setState({ fullName: e.target.value, fullNameError: false, createUserError: false, errorDetails: [] });
  }
  _onEmailChange = (e: any) => {
    this.setState({ email: e.target.value, emailError: false, createUserError: false, errorDetails: [] });
  }
  _onTitleChange = (e: any) => {
    this.setState({ jobTitle: e.target.value, jobTitleError: false, createUserError: false, errorDetails: [] });
  }
  _onPhoneChange = (e: any) => {
    this.setState({ phoneNumber: e.target.value, phoneNumberError: false, createUserError: false, errorDetails: [] });
  }
  render() {
    const {
      employerTeamItems
    } = this.props;
    return (
      <ContentWrapperWithHeader marginBottom={true}>
        <Container>
          <Grid stackable>
            <Grid.Column width={16} className="tm03">
              <Card fluid className="rdus-none">
                <List className="middle aligned mrg-btm0" style={{ padding: '15px 15px 0px 15px' }}>
                  <List.Item>
                    <List.Content className="pad-equal0">
                      <Header as='h2' dividing className="heading02">
                        My Team 
                        <Modal
                          trigger={<Button size="small" primary floated="right" className="btn-pink" id="addTeamMember" onClick={this.handleOpen}><Icon name="add" /> ADD </Button>}
                          open={this.state.modalOpen}
                          onClose={this.handleClose}
                          closeIcon
                        >
                        <Modal.Header>Add New Team Member</Modal.Header>
                          <Modal.Content>
                            <Form>
                              <Form.Group widths={2}>
                                <Form.Field required>
                                  <label>Full Name</label>
                                  <Input placeholder="Full Name" value={this.state.fullName} onChange={this._onFullNameChange} error={this.state.fullNameError} />
                                </Form.Field>
                                <Form.Field>
                                  <label>Email Address</label>
                                  <Input placeholder="Email Address" value={this.state.email} onChange={this._onEmailChange} error={this.state.emailError} />
                                </Form.Field> 
                              </Form.Group>
                              <Form.Group widths={2}>
                                <Form.Field required>
                                  <label>Job Title</label>
                                  <Input placeholder="Job Title" value={this.state.jobTitle} onChange={this._onTitleChange} error={this.state.jobTitleError} />
                                </Form.Field>
                                <Form.Field required>
                                  <label>Phone No.</label>
                                  <Input placeholder="Phone No." value={this.state.phoneNumber} onChange={this._onPhoneChange} error={this.state.phoneNumberError} />
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
                                    id="myTeamError"
                                  /> : null
                              }
                            </Form>
                          </Modal.Content>
                          <div className="actions right aligned">
                            <Button.Group>
                              <Button onClick={this.handleClose}>Cancel</Button>
                              <div className="or"></div>
                              <Button positive className="btn-pink txt-wht bdr-rdus-rmv" onClick={this._addMember}>Save</Button>
                            </Button.Group>
                          </div>
                        </Modal>
                      </Header>
                    </List.Content>
                  </List.Item>
                </List>
                <Segment basic className="mrg-tp-rmv">
                  <table className="ui fixed single line celled table tm20">
                    <thead className="mobile hidden">
                      <tr>
                        <th>Full Name</th>
                        <th>Email Address</th>
                        <th>Invitation Status</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      Object.keys(employerTeamItems).length && employerTeamItems.team && employerTeamItems.team.length ? employerTeamItems.team.map((item: any, i: number) =>
                        <tr className="iconrelmb" key={i}>
                          <td>{item.fullName}</td>
                          <td>{item.emailAddress}</td>
                          <td><span className={`mobile hidden ${item.status === 'Active' ? 'txt-green' : 'txt-pink01'}`}>{item.status}</span></td>
                          <td className="center aligned delte01mb mobile only txt-pink01">Active</td>
                        </tr>
                       ) : null
                    }
                    </tbody>
                  </table>
                </Segment>
              </Card>
            </Grid.Column>
          </Grid>
        </Container>
      </ContentWrapperWithHeader>
    );
  }
}

export default (withLocalize(EmployerTeamUI) as any);