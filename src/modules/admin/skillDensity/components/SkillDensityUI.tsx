import * as React from 'react';
import ContentWrapperWithHeader from '../../../wireframe/components/ContentWrapperWithHeader';
import { Grid, Container, List, Card, Segment, Header, Button, Icon, Modal, Form, Input, Search, Message } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";
import browserHistory from 'src/router/browserHistory';
import CustomLoader from '../../../loader/components/Loader';
import SkillItem from './SkillItem';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';

interface Props {
  addTranslation: any;
  initialize: any;
  isLoggedIn: boolean;
  match: any;
  skillDensityError: any;
  skillDensityItems: any;
  isSkillDensityLoading: boolean;
  reqSkillSuggestionItems: any;
	isReqSkillLoading: boolean;
  onGetSkillDensityRequest(id: number): void;
  onPostSkillDensityRequest(data: any): void;
  onReqSkillRequest(str: any): void;
}

let profileId = '';
let total = 0;

class SkillDensityUI extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      modalOpen: false,
      localSkillItems: [],
      newSkillObj: {},
      newSkillPercent: 0,
      newSkillPercentError: false,
      newSkillNameError: false,
      createUserError: false,
      isEditPercentError: false,
      skillErrorText: 'Please select a skill name',
      skillDuplicateErrorText: 'Looks like you already have selected this skill',
      percentErrorText: 'Total percentage should be less than equal to 100',
      errorDetails: []
    };
    this.props.addTranslation(anonymousTranslations);
  }
  componentDidMount() {
    this.props.onGetSkillDensityRequest(this.props.match.params.id);
    if (this.props.skillDensityError !== '') {
      browserHistory.push('/error');
    }
    this.setState({
      localSkillItems: this.props.skillDensityItems.map((obj: any) => {return {skillId: obj.skillId, skillPercent: obj.skillPercent, skillName: obj.skillName}}),
    }); 
    profileId = window.location.href.split('?profileId=')[1];
  }
  componentWillReceiveProps(nextProps: any) {
    if (this.props.skillDensityItems.length !== nextProps.skillDensityItems.length && nextProps.skillDensityItems) {
      this.setState({
        localSkillItems: nextProps.skillDensityItems.map((obj: any) => {return {skillId: obj.skillId, skillPercent: obj.skillPercent, skillName: obj.skillName}}),
      });
    }
  }
  handleOpen = () => {
    this.setState({
      modalOpen: true,
      createUserError: false,
      newSkillPercentError: false,
      newSkillNameError: false,
      isEditPercentError: false,
      errorDetails: []
    });
  }
  handleClose = () => {
    this.setState({
      modalOpen: false,
      newSkillObj: {},
      newSkillPercent: 0,
      createUserError: false,
      newSkillPercentError: false,
      newSkillNameError: false,
      errorDetails: []
    });
  }
  _addSkill = () => {
    const rem = 100 - (total + parseInt(this.state.newSkillPercent, 10));
    if (!Object.keys(this.state.newSkillObj).length || this.state.newSkillObj.skillId === '' || !this.state.newSkillObj.skillId) {
      const index = this.state.errorDetails.indexOf(this.state.skillErrorText);
			if (index === -1) {
				this.state.errorDetails.push(this.state.skillErrorText);
			}
      this.setState({
        newSkillNameError: true,
        createUserError: true
      });
    }
    if (rem < 0) {
      const index = this.state.errorDetails.indexOf(this.state.percentErrorText);
			if (index === -1) {
				this.state.errorDetails.push(this.state.percentErrorText);
			}
      this.setState({
        newSkillPercentError: true,
        createUserError: true
      });
    }
    if (!this.state.errorDetails.length) {
      const index = this.state.localSkillItems.indexOf(this.state.newSkillObj);
			if (index === -1) {
				this.state.localSkillItems.push(this.state.newSkillObj);
			}
      this.setState({
        modalOpen: false,
        newSkillObj: {},
        newSkillPercent: 0
      });
    }
  }
  handleSkillSelect = (e: any, {result}: {result: any}) => {
    if (this.state.localSkillItems.filter((obj: any) => result.skillId === obj.skillId).length) {
			const index = this.state.errorDetails.indexOf(this.state.skillDuplicateErrorText);
      if (index === -1) {
        this.state.errorDetails.push(this.state.skillDuplicateErrorText);
      }
      this.setState({
        newSkillObj: {},
        newSkillNameError: true,
        createUserError: true
      });
		} else {
      this.setState({
        newSkillObj: {
          skillId: result.skillId, skillPercent: this.state.newSkillPercent, skillName: result.title 
        }
      });
    }
  }
  _onReqSkillChange = (e: any, {result}: {result: any}) => {
    this.setState({
      createUserError: false,
      errorDetails: []
    });
    if (e.target.value.length > 1) {
			this.props.onReqSkillRequest(e.target.value);
		} else {
      this.setState({
        newSkillObj: {},
      });
    }
  }
  _saveAllSkills = () => {
    if (this.state.localSkillItems.length === 0) {
      const index = this.state.errorDetails.indexOf(this.state.skillErrorText);
			if (index === -1) {
				this.state.errorDetails.push(this.state.skillErrorText);
      }
      this.setState({
        createUserError: true
      });
    }
    if (this.state.errorDetails.length === 0) {
      this.props.onPostSkillDensityRequest({
        accountId: profileId,
        gigId: this.props.match.params.id,
        skills: this.state.localSkillItems
      });
    }
  }
  myCallback = (skillId: number) => {
    const index = this.state.localSkillItems.findIndex((obj: any) => obj.skillId === skillId);
    if (index !== -1) {
      this.state.localSkillItems.splice(index, 1);
    }
    this.setState({
      localSkillItems: this.state.localSkillItems,
    }, () => {
      if (total <= 100) {
        this.setState({
          isEditPercentError: false,
          createUserError: false,
          errorDetails: []
        });
      }
    });
  }
  myCallbackPercent = (skillId: number, skillPercent: number) => {
    const index = this.state.localSkillItems.findIndex((obj: any) => obj.skillId === skillId);
    if (index !== -1) {
      if (skillPercent) {
        this.state.localSkillItems[index].skillPercent = skillPercent;
      } else {
        this.state.localSkillItems[index].skillPercent = 0;
      }
    }
    this.setState({
      localSkillItems: this.state.localSkillItems,
    }, () => {
      if (total > 100) {
        const index = this.state.errorDetails.indexOf(this.state.percentErrorText);
        if (index === -1) {
          this.state.errorDetails.push(this.state.percentErrorText);
        }
        this.setState({
          isEditPercentError: true,
          createUserError: true
        });
      }
    });
  }
  myCallbackReset = () => {
    this.setState({
      errorDetails: [],
      createUserError: false,
      isEditPercentError: false
    });
  }
  render() {
    const {
      skillDensityItems,
      reqSkillSuggestionItems,
      isSkillDensityLoading,
      isReqSkillLoading,
      onPostSkillDensityRequest
    } = this.props;
    total = this.state.localSkillItems.reduce((acc: number, currentVal: any) => acc + currentVal.skillPercent, 0)
    return (
      <ContentWrapperWithHeader marginBottom={false}>
      {
        isSkillDensityLoading ?
          <CustomLoader /> :
              <Container className="tm03 mrg-tp03">
                <Grid stackable>
                  <Grid.Column width={16} className="tm03">
                  <Card fluid className="rdus-none">
                    <List className="ui middle aligned list mrg-btm0" style={{ padding: '15px 15px 0px 15px' }}>
                    <List.Item>
                      <List.Content className="pad-equal0">
                        <Header as='h2' dividing className="heading02"> SQL DBA (Permanent) </Header>
                      </List.Content>
                    </List.Item>
                  </List>
                  <Segment basic className="mrg-tp-rmv">
                    <table className="ui fixed single line celled table tm20">
                      <thead className="mobile hidden">
                        <tr>
                          <th>Skill Name</th>
                          <th>Percent</th>
                          <th style={{ width: '5%' }}>&nbsp;</th> 
                        </tr>
                      </thead>
                      <tbody>
                       {
                         this.state.localSkillItems.map((obj: any, i: number) => {
                           return (
                            <SkillItem
                              callbackFromParent={this.myCallback}
                              skillId={obj.skillId}
                              skillName={obj.skillName}
                              skillPercent={obj.skillPercent}
                              key={i}
                              callbackFromParentPercent={this.myCallbackPercent}
                              callbackFromParentReset={this.myCallbackReset}
                              isError={this.state.isEditPercentError}
                            />
                           );
                         })
                       }
                        <tr className="align-center">
                          <td>
                            <Modal
                              trigger={<Button size="small" primary className="btn-pink" id="lookingfor" onClick={this.handleOpen}><Icon name="add" /> ADD </Button>}
                              open={this.state.modalOpen}
                              onClose={this.handleClose}
                              closeIcon
                            >
                            <Modal.Header>Add skill and Percent</Modal.Header>
                              <Modal.Content>
                                <Form>
	                                <Form.Group widths={2}>
                                    <Form.Field required>
                                      <label>SkillName</label>
                                      <Search
                                        fluid
                                        input={{ placeholder: "Select a skill" }}
                                        onResultSelect={this.handleSkillSelect}
                                        onSearchChange={_.debounce(this._onReqSkillChange, 100, { leading: true })}
                                        results={reqSkillSuggestionItems}
                                        loading={isReqSkillLoading}
                                        error={this.state.newSkillNameError}
                                      />
                                    </Form.Field>
                                    <Form.Field>
                                      <label>Percent</label>
                                      <Input
                                        type="number"
                                        className="rdus-none"
                                        placeholder="Percent"
                                        onChange={(e: any) => {
                                          let tempObj = this.state.newSkillObj;
                                          tempObj['skillPercent'] = parseInt(e.target.value, 10);
                                          this.setState({
                                            newSkillPercent: parseInt(e.target.value, 10),
                                            newSkillObj: tempObj,
                                            newSkillPercentError: false,
                                            createUserError: false,
                                            errorDetails: []
                                          });
                                        }}
                                        error={this.state.newSkillPercentError}
                                        value={this.state.newSkillPercent}
                                      />
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
                                        id="newSkillError"
                                      /> : null
                                    }
                                </Form>
                              </Modal.Content>
                              <div className="actions right aligned">
                                <Button.Group>
                                  <Button onClick={this.handleClose}>Cancel</Button>
                                  <div className="or"></div>
                                  <Button positive className="btn-pink txt-wht bdr-rdus-rmv" onClick={this._addSkill}>Ok</Button>
                                </Button.Group>
                              </div>
                            </Modal>
                            <span className="mobile only txt-pink01 fnt-wt03 mrg-lft03">Grand Total: {total}%</span> 
                          </td>
                          <td><b className="mobile hidden">Grand Total: {total}%</b></td>
                          <td>&nbsp;</td>
                        </tr>
                      </tbody>
                    </table>
                    {
                    this.state.createUserError ?
                    <table><tbody><tr><td>
                        <Message
                        error
                        visible
                        size='mini'
                        header="There was some error with your submission"
                        list={this.state.errorDetails}
                        id="newSkillError"
                      /></td></tr></tbody></table> : null
                    }
                    <table className="ui compact celled fnt01m rdus-none mobile hidden">
                      <tfoot className="full-width">
                        <tr>
                          <th />
                          <th colSpan={3}>
                            <Button.Group className="center aligned">
                              <NavLink
                                to={`/Administration/Search/Gigs/${this.props.match.params.id}`}
                                className="ui button"
                              >
                                Cancel
                              </NavLink>
                              <div className="or" />
                              <Button className="main-primary" onClick={this._saveAllSkills}>Save</Button>
                            </Button.Group>
                          </th>
                        </tr>
                      </tfoot>
                    </table>
                  </Segment>
                  </Card>
                  <div className="ui stiky-mb sticky-btm mobile only">
                    <div className="ui two center aligned column grid">
                      <div className="column">
                      <NavLink
							          to={`/Administration/Search/Gigs/${this.props.match.params.id}`}
							          className="ui button secondary rdus-none"
						          >Cancel
                      </NavLink>
                        <Button secondary className="main-primary rdus-none" onClick={this._saveAllSkills}>Save</Button>
                      </div>
                    </div>
                  </div>
                  </Grid.Column>   
                </Grid>
              </Container>
      }
      </ContentWrapperWithHeader>
    );
  }
}

export default (withLocalize(SkillDensityUI) as any);