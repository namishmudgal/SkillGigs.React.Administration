import * as React from 'react';
import ContentWrapperWithHeader from '../../../wireframe/components/ContentWrapperWithHeader';
import { Grid, Container, Input, Card, Form, Search, Dropdown, Message } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";
import _ from 'lodash';
import TextEditor from '../../../common/components/TextEditor';
import { NavLink } from 'react-router-dom';

interface Props {
  addTranslation: any;
  initialize: any;
  isLoggedIn: boolean;
  match: any;
  gigListingItems: any;
  isTalentLoading: boolean;
  dropDownData: any;
  talentSuggestionItems: any;
  talentSkillSuggestionItems: any;
  contractSgFee: number;
  onGetSgFeeRequest(data: any): void;
  onGigListingRequest(params: any): void;
  onGetTalentDetailsRequest(query: string): void;
  onPostTalentBidRequest(data: any): void;
  onGetSelectedTalentSkillsRequest(id: number): void;
  getDropDownData(type: any): void;
}

class TalentBidUI extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      profileId: '',
      talentName: '',
      skillName: '',
      skillListingId: '',
      profileError: false,
      skillListingError: false,
      gigDescription: '',
      gigDescriptionError: false,
      rate: '',
      rateError: false,
      taxTerm: '',
      taxTermTemp: '',
      taxTermError: false,
      requiredErrorText: 'Required Fields cannot be empty',
      createUserError: false,
      errorDetails: [],
      proposalId: '',
      clientRate: 0,
      sgFee: 0
    };
    this.props.addTranslation(anonymousTranslations);
  }
  componentDidMount() {
    this.props.onGigListingRequest(this.props.match.params.id);
    this.props.getDropDownData('taxTerm');
    if (Object.keys(this.props.gigListingItems).length && this.props.gigListingItems.proposals && this.props.gigListingItems.proposals.length) {
      const proposalsObj = this.props.gigListingItems.proposals[this.props.gigListingItems.proposals.length - 1];
      this.setState({
        talentName: `${proposalsObj.firstName} ${proposalsObj.lastName}`,
        profileId: proposalsObj.profileId,
        skillName: proposalsObj.skillListingTitle,
        skillListingId: proposalsObj.skillListingId,
        gigDescription: proposalsObj.message,
        rate: proposalsObj.rate,
        taxTermTemp: proposalsObj.idealTermsName,
        taxTerm: proposalsObj.idealTermsId,
        proposalId: proposalsObj.proposalId
      }, () => {
        if (this.state.profileId !== '') {
          this.props.onGetSelectedTalentSkillsRequest(this.state.profileId);
          this.props.onGetSgFeeRequest({
            profileId: this.state.profileId,
            rate: this.state.rate,
            idealTermsId: this.state.taxTerm,
            gigTypeCode: 'C'
          });
        }
      });
    }
  }
  componentWillReceiveProps(nextProps: any) {
    if (Object.keys(nextProps.gigListingItems).length !== Object.keys(this.props.gigListingItems).length && nextProps.gigListingItems.proposals && nextProps.gigListingItems.proposals.length) {
      const proposalsObj = nextProps.gigListingItems.proposals[nextProps.gigListingItems.proposals.length - 1];
      this.setState({
        talentName: `${proposalsObj.firstName} ${proposalsObj.lastName}`,
        profileId: proposalsObj.profileId,
        skillName: proposalsObj.skillListingTitle,
        skillListingId: proposalsObj.skillListingId,
        gigDescription: proposalsObj.message,
        rate: proposalsObj.rate,
        taxTermTemp: proposalsObj.idealTermsName,
        taxTerm: proposalsObj.idealTermsId,
        proposalId: proposalsObj.proposalId
      }, () => {
        if (this.state.profileId !== '') {
          this.props.onGetSelectedTalentSkillsRequest(this.state.profileId);
          this.props.onGetSgFeeRequest({
            profileId: this.state.profileId,
            rate: this.state.rate,
            idealTermsId: this.state.taxTerm,
            gigTypeCode: 'C'
          });
        }
      });
    }
    if (this.props.contractSgFee !== nextProps.contractSgFee && nextProps.contractSgFee !== 0) {
      this.setState({ clientRate: nextProps.contractSgFee, sgFee: nextProps.sgFee });
    }
  }
  _onRateChange = (e: any) => {
    this.setState({ rate: e.target.value, rateError: false, createUserError: false, errorDetails: [] }, () =>
    {
      this.props.onGetSgFeeRequest({
        profileId: this.state.profileId,
        rate: this.state.rate,
        idealTermsId: this.state.taxTerm,
        gigTypeCode: 'C',
      });
    });
  }
  handleTalentSelect = (e: any, {result}: {result: any}) => {
    this.setState({
      profileId: result.profileId,
      talentName: result.title,
    }, () => this.props.onGetSelectedTalentSkillsRequest(this.state.profileId));
  }
  _onTalentChange = (e: any, {result}: {result: any}) => {
    this.setState({
      createUserError: false,
      profileError: false,
      errorDetails: [],
      talentName: e.target.value
    });
    if (e.target.value.length > 1) {
			this.props.onGetTalentDetailsRequest(e.target.value);
		}
  }
  _onSkillSelectionChange = (e: any, {value}: {value: any}) => {
    this.setState({
      skillName: value,
      skillListingId: this.props.talentSkillSuggestionItems.find((obj: any) => obj.value === value).skillListingId,
      createUserError: false,
      skillListingError: false,
			errorDetails: []
    });
  }
  _onTaxTermChange = (e: any, {value}: {value: any}) => {
		this.setState({
			taxTermTemp: value,
			taxTerm: this.props.dropDownData.taxTerm.find((obj: any) => obj.value === value).id,
			taxTermError: false,
			createUserError: false,
			errorDetails: []
		});
  }
  _placeBid = (type: string) => {
    if (this.state.profileId === '') {
      const index = this.state.errorDetails.indexOf(this.state.requiredErrorText);
			if (index === -1) {
				this.state.errorDetails.push(this.state.requiredErrorText);
			}
			this.setState({ createUserError: true, profileError: true });
    }
    if (this.state.skillListingId === '') {
      const index = this.state.errorDetails.indexOf(this.state.requiredErrorText);
			if (index === -1) {
				this.state.errorDetails.push(this.state.requiredErrorText);
			}
			this.setState({ createUserError: true, gigError: true });
    }
    if (this.state.gigDescription === '') {
      const index = this.state.errorDetails.indexOf(this.state.requiredErrorText);
			if (index === -1) {
				this.state.errorDetails.push(this.state.requiredErrorText);
			}
			this.setState({ createUserError: true, gigDescriptionError: true });
    }
    if (this.state.rate === '') {
      const index = this.state.errorDetails.indexOf(this.state.requiredErrorText);
			if (index === -1) {
				this.state.errorDetails.push(this.state.requiredErrorText);
			}
			this.setState({ createUserError: true, rateError: true });
    }
    if (this.state.profileId !== '' && this.state.skillListingId !== '' && this.state.gigDescription !== '' && this.state.taxTerm !== '' && this.state.rate !== '') {
      const data = {
        profileId: this.state.profileId,
        gigId: this.props.gigListingItems.jobOrderId,
        rate: this.state.rate,
        idealTermsId: this.state.taxTerm,
        skillListingId: this.state.skillListingId,
        clientRate: this.state.clientRate,
        sGFees: this.state.sgFee,
        description: this.state.gigDescription,
        proposalId: this.state.proposalId,
        type
      };
      this.props.onPostTalentBidRequest(data);
    }
  }
  render() {
    const {
      talentSuggestionItems,
      talentSkillSuggestionItems,
      dropDownData,
      gigListingItems,
      isTalentLoading,
    } = this.props;
    return (
      <ContentWrapperWithHeader marginBottom={true}>
        <Container>
          <Grid stackable textAlign="center">
            <Grid.Column width={16} className="tm03">
              <Card fluid className="rdus-none tm03">
                <Grid stackable>
                  <div className="column form-spc">
                    <h2 className="mrg-tp03 fnt32">{gigListingItems.proposals && gigListingItems.proposals.length > 0 ? 'Edit your Bid' : 'Place A Bid'}</h2>
                    {
                      gigListingItems.proposals && gigListingItems.proposals.length > 0 ?
                      <div>
                        <div className="fnt16">We're glad you found your dream gig - now let's get your bid submitted.</div>
                        <div className="mrg-tp01 fnt12 txt-pink01">Please remember that your initial bids are non binding. If the employer likes your bid, they will initiate the interview process.</div>
                      </div> : null
                    }
                    <Form size="small" className="small pad-eq20mb mrg-tp05">
                      <div className="ui stacked">
                        <Form.Field required className="select-custm">
                          <label className="mrg-btm01 fnt-wt05 fnt04">Select Your Talent</label>
                          <Search
                            fluid
                            input={{ placeholder: "Select Your Employer" }}
                            onResultSelect={this.handleTalentSelect}
                            onSearchChange={_.debounce(this._onTalentChange, 100, { leading: true })}
                            results={talentSuggestionItems}
                            loading={isTalentLoading}
                            className={this.state.profileError ? 'error' : ''}
                            value={this.state.talentName}
                          />
                        </Form.Field>
                      </div>
                      <div className="ui stacked ">
                        <Form.Field required className="select-custm">
                          <label className="mrg-tp05 mrg-btm01 fnt-wt05 fnt04">Select the Skill you're applying for:</label>
                          <Dropdown
                            fluid
                            search
                            selection
                            placeholder="Select"
                            className="fnt-size09"
                            options={talentSkillSuggestionItems && talentSkillSuggestionItems.length ? talentSkillSuggestionItems : []}
                            onChange={this._onSkillSelectionChange}
                            value={this.state.skillName}
                            error={this.state.skillListingError}
                          />
                        </Form.Field>
                      </div>
                      <Form.Field required className="mrg-tp05 mrg-btm0">
                        <label className="fnt04 mrg-btm01 fnt-wt05">Cover Letter:</label>
                        <TextEditor
                          onSetEditorHTML={(html: any) => {
                            this.setState({
                              gigDescription: html,
                              gigDescriptionError: html === '' || html === '<p><br></p>' ? true : false,
                            });
                            if (html !== '' && html !== '<p><br></p>') {
                              this.setState({ createUserError: false, errorDetails: [] });
                            }
                          }}
                          makeFormDirty={() => { console.log('makeFormDirty'); }}
                          isError={this.state.gigDescriptionError}
                          content={this.state.gigDescription}
                        />
                      </Form.Field>
                      <div className="two fields mrg-tp05">
                        <Form.Field required>
                          <label className="fnt04 mrg-btm01 fnt-wt05">Tax Term:</label>
                          <div className="ui stacked ">
                            <div className="field select-custm">
                              <Dropdown
                                fluid
                                search
                                selection
                                placeholder="Select"
                                className="fnt-size09"
                                options={dropDownData.taxTerm ? dropDownData.taxTerm : []}
                                onChange={this._onTaxTermChange}
                                error={this.state.taxTermError}
                                value={this.state.taxTermTemp}
                              />
                            </div>
                          </div>
                        </Form.Field>
                        <Form.Field required>
                          <label className="fnt04 mrg-btm01 fnt-wt05">Rate: <span className="fnt02 right floated txt-pink01">Please remember that your initial bids are non binding.</span></label>
                          <Input type="number" label={`${gigListingItems.budgetTypeName}ly`} placeholder='Amount' value={this.state.rate} onChange={this._onRateChange} disabled={this.state.profileId === '' || this.state.taxTerm === ''} error={this.state.rateError} />
                        </Form.Field>
                      </div>
                      {
                        gigListingItems.jobOrderTypeCode === 'C' ?
                          <div className="two fields mrg-tp05">
                            <Form.Field required>
                              <label className="fnt04 mrg-btm01 fnt-wt05">Billed to Client:</label>
                              <Input type="number" value={this.state.clientRate} disabled error={this.state.rateError} />
                            </Form.Field>
                          </div> : null
                      }
                      {
                        this.state.createUserError ?
                          <Message
                            error
                            visible
                            size='mini'
                            header="There was some error with your submission"
                            list={this.state.errorDetails}
                            id="myPlaceBidError"
                          /> : null
                      }
                      <div className={gigListingItems.proposals && gigListingItems.proposals.length > 0 ? 'three fields' : 'two fields'}>
                        <div className="field">
                          <div className="ui left icon input">
                            <NavLink to={`/Administration/Search/Gigs/${this.props.match.params.id}`} className="ui fluid large default submit button rdus-none mrg-tp04">CANCEL</NavLink>
                          </div>
                        </div>
                        {
                          gigListingItems.proposals && gigListingItems.proposals.length > 0 ?
                          <div className="field">
                            <div className="ui left icon input">
                              <button className="ui fluid large main-primary submit button rdus-none mrg-tp04" onClick={() => this._placeBid('update')}>UPDATE YOUR BID</button>
                            </div>
                          </div> :
                            <div className="field">
                              <div className="ui left icon input">
                                <button className="ui fluid large main-primary submit button rdus-none mrg-tp04" onClick={() => this._placeBid('new')}>BID TO GET STARTED</button>
                              </div>
                            </div>
                        }
                        {
                          gigListingItems.proposals && gigListingItems.proposals.length > 0 ?
                          <div className="field">
                            <div className="ui left icon input">
                              <button className="ui fluid large main-primary submit button rdus-none mrg-tp04" onClick={() => this._placeBid('retract')}>RETRACT INITIAL BID</button>
                            </div>
                          </div> : null
                        }
                      </div>
                    </Form>
                  </div>
                </Grid>
              </Card>
            </Grid.Column>
          </Grid>
        </Container>
      </ContentWrapperWithHeader>
    );
  }
}

export default (withLocalize(TalentBidUI) as any);