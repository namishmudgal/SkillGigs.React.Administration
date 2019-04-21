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
  employerSuggestionItems: any;
  employerGigSuggestionItems: any;
  isEmployerLoading: boolean;
  dropDownData: any;
  skillListingItems: any;
  skillListingError: string;
  isListingLoading: boolean;
  onSkillListingRequest(params: any, flag: boolean): void;
  onGetEmployerDetailsRequest(query: string): void;
  onPostEmployerBidRequest(data: any): void;
  onGetSelectedEmployerGigsRequest(id: number): void;
  getDropDownData(type: any): void;
}

const getExtractedMonth = (date: any) => {
  if (new Date(date).getMonth() < 9) {
    let month = `0${new Date(date).getMonth() + 1}`;
    return month;
  } return new Date(date).getMonth() + 1;
};

const getExtractedDate = (date: any) => {
  if (new Date(date).getDate() < 10) {
    let month = `0${new Date(date).getDate()}`;
    return month;
  } return new Date(date).getDate();
};

class EmployerBidUI extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      profileId: '',
      companyName: '',
      gigId: '',
      profileError: false,
      gigError: false,
      gigDescription: '',
      gigDescriptionError: false,
      gigDuration: '',
			gigDurationTemp: '',
      gigDurationError: false,
      startDate: '',
      initialBid: '',
      bidId: '',
      requiredErrorText: 'Required Fields cannot be empty',
      createUserError: false,
			errorDetails: [],
    };
    this.props.addTranslation(anonymousTranslations);
  }
  componentDidMount() {
    this.props.getDropDownData('duration');
    this.props.onSkillListingRequest(this.props.match.params.id, false);
    if (Object.keys(this.props.skillListingItems).length && this.props.skillListingItems.bid && this.props.skillListingItems.bid.length) {
      const bidObj = this.props.skillListingItems.bid[this.props.skillListingItems.bid.length - 1];
      this.setState({
        profileId: bidObj.profileId,
        gigId: bidObj.gigId,
        gigDescription: bidObj.comments,
        gigDuration: bidObj.idealContractLengthValue,
        gigDurationTemp: bidObj.idealContractLengthName,
        startDate: `${new Date(bidObj.idealStartDate).getFullYear()}-${getExtractedMonth(bidObj.idealStartDate)}-${getExtractedDate(bidObj.idealStartDate)}`,
        initialBid: bidObj.rate,
        bidId: bidObj.bidId,
        companyName: bidObj.companyName
      }, () => {
        if (this.state.profileId !== '') {
          this.props.onGetSelectedEmployerGigsRequest(this.state.profileId);
        }
      });
    }
  }
  componentWillReceiveProps(nextProps: any) {
    if (Object.keys(this.props.skillListingItems).length !== Object.keys(nextProps.skillListingItems).length && nextProps.skillListingItems.bid && nextProps.skillListingItems.bid.length) {
      const bidObj = nextProps.skillListingItems.bid[nextProps.skillListingItems.bid.length - 1];
      this.setState({
        profileId: bidObj.profileId,
        gigId: bidObj.gigId,
        gigDescription: bidObj.comments,
        gigDuration: bidObj.idealContractLengthValue,
        gigDurationTemp: bidObj.idealContractLengthName,
        startDate: `${new Date(bidObj.idealStartDate).getFullYear()}-${getExtractedMonth(bidObj.idealStartDate)}-${getExtractedDate(bidObj.idealStartDate)}`,
        initialBid: bidObj.rate,
        bidId: bidObj.bidId,
        companyName: bidObj.companyName
      }, () => {
        if (this.state.profileId !== '') {
          this.props.onGetSelectedEmployerGigsRequest(this.state.profileId);
        }
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
  handleEmployerSelect = (e: any, {result}: {result: any}) => {
    this.setState({
      profileId: result.profileId,
      companyName: result.title,
    }, () => this.props.onGetSelectedEmployerGigsRequest(this.state.profileId));
  }
  _onEmployerChange = (e: any, {result}: {result: any}) => {
    this.setState({
      createUserError: false,
      profileError: false,
      errorDetails: [],
      companyName: e.target.value
    });
    if (e.target.value.length > 1) {
			this.props.onGetEmployerDetailsRequest(e.target.value);
		}
  }
  _onGigSelectionChange = (e: any, {value}: {value: any}) => {
    this.setState({
      gigId: value,
      createUserError: false,
      gigError: false,
			errorDetails: []
    });
  }
  _onGigDurationChange = (e: any, {value}: {value: any}) => {
		this.setState({
			gigDurationTemp: value,
			gigDuration: this.props.dropDownData.duration.find((obj: any) => obj.value === value).id,
			gigDurationError: false,
			createUserError: false,
			errorDetails: []
		});
  }
  _getDateValue = (e: any) => {
    this.setState({ startDate: e.target.value });
  }
  _setInitialBid = (e: any) => {
    this.setState({ initialBid: e.target.value });
  }
  _placeBid = (type: string) => {
    if (this.state.profileId === '') {
      const index = this.state.errorDetails.indexOf(this.state.requiredErrorText);
			if (index === -1) {
				this.state.errorDetails.push(this.state.requiredErrorText);
			}
			this.setState({ createUserError: true, profileError: true });
    }
    if (this.state.gigId === '') {
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
    if (this.state.gigDuration === '' && this.props.skillListingItems.jobOrderTypeName === 'Contract') {
      const index = this.state.errorDetails.indexOf(this.state.requiredErrorText);
			if (index === -1) {
				this.state.errorDetails.push(this.state.requiredErrorText);
			}
			this.setState({ createUserError: true, gigDurationError: true });
    }
    if (this.state.profileId !== '' && this.state.gigId !== '' && this.state.gigDescription !== '') {
      const data = {
        profileId: this.state.profileId,
        gigId: this.state.gigId,
        rate: this.state.initialBid,
        comments: this.state.gigDescription,
        contractLengthId: this.state.gigDuration,
        idealStartDate: this.state.startDate,
        skillListingId: this.props.match.params.id,
        bidStatusCode: type === 'retract' ? 'R' :  type === 'update' ? '' : 'P',
        bidId: this.state.bidId,
        type
      };
      if (this.props.skillListingItems.jobOrderTypeName === 'Contract') {
        if (this.state.gigDuration !== '') {
          this.props.onPostEmployerBidRequest(data);
        }
      } else {
        this.props.onPostEmployerBidRequest(data);
      }
    }
  }
  render() {
    const {
      employerSuggestionItems,
      isEmployerLoading,
      employerGigSuggestionItems,
      dropDownData,
      skillListingItems
    } = this.props;
    const getDropdownDetails = (arr: []) => {
      let data: any = [];
      arr.map((obj: any, index: number) => {
        data.push({
          'key': obj.jobOrderId,
          'text': obj.title,
          'value': obj.jobOrderId,
          'jobOrderId': obj.jobOrderId
        });
      });
      return data;
    }
    return (
      <ContentWrapperWithHeader marginBottom={true}>
        <Container>
          <Grid stackable textAlign="center">
            <Grid.Column width={16} className="tm03">
              <Card fluid className="rdus-none tm03">
                <Grid stackable>
                  <div className="column form-spc">
                    <h2 className="mrg-tp03 fnt32">{skillListingItems.bidCount > 0 ? `Edit your Bid - Remember to Sell your Gig to ${skillListingItems.profiles ? skillListingItems.profiles.preferredName : ''}` : `Place a Bid - Sell your Gig to ${skillListingItems.profiles ? skillListingItems.profiles.preferredName : ''}`}</h2>
                    {
                      skillListingItems.bidCount > 0 ?
                      <h2 className="mrg-tp02 fnt18">Send your initial bid and include any details in regards to the bid.</h2> : null
                    }
                    <Form size="small" className="small pad-eq20mb mrg-tp05">
                      <div className="ui stacked">
                        <Form.Field required className="select-custm">
                          <label className="mrg-btm01 fnt-wt05 fnt04">Select Your Employer</label>
                          <Search
                            fluid
                            input={{ placeholder: "Select Your Employer" }}
                            onResultSelect={this.handleEmployerSelect}
                            onSearchChange={_.debounce(this._onEmployerChange, 100, { leading: true })}
                            results={employerSuggestionItems}
                            loading={isEmployerLoading}
                            className={this.state.profileError ? 'error' : ''}
                            value={this.state.companyName}
                          />
                        </Form.Field>
                      </div>
                      <div className="ui stacked ">
                        <Form.Field required className="select-custm">
                          <label className="mrg-tp05 mrg-btm01 fnt-wt05 fnt04">Select the Gig you're recruting for:</label>
                          <Dropdown
                            fluid
                            search
                            selection
                            placeholder="Select"
                            className="fnt-size09"
                            options={employerGigSuggestionItems && employerGigSuggestionItems.gigs ? getDropdownDetails(employerGigSuggestionItems.gigs) : []}
                            onChange={this._onGigSelectionChange}
                            value={this.state.gigId}
                            error={this.state.gigError}
                          />
                        </Form.Field>
                      </div>
                      <Form.Field className="mrg-tp05 ">
                        <label className="fnt04 mrg-btm01 fnt-wt05"><b>Initial Bid</b> (Start with an amount that you feel gives you the best opportunity with this candidate, impress them):</label>
                        <div className="ui left input ht05">
                          <Input type="number" placeholder={skillListingItems.budgetTypeName ? `${skillListingItems.budgetTypeName}ly` : ''} className="rdus-none" onChange={this._setInitialBid} value={this.state.initialBid} />
                        </div>
                      </Form.Field>
                      <div className="required inline field left aligned">
                        <div>
                          <label>Talent's Desired Salary: ${skillListingItems.clientRate} / {skillListingItems.budgetTypeName}</label>
                        </div>
                      </div>
                      <Form.Field required className="mrg-tp05 mrg-btm0">
                        <label className="fnt04 mrg-btm01 fnt-wt05">Sell your Gig:</label>
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
                        <div className="field">
                          <label className="fnt04 mrg-btm01 fnt-wt05">Ideal Start Date:</label>
                          <div className="ui left icon input ht05" id="rangestart"> 
                            <input type="date" name="first-name" placeholder="ADD" className="rdus-none" onChange={this._getDateValue} value={this.state.startDate} />
                            <i className="calendar outline icon"></i>
                          </div>
                        </div>
                        <Form.Field required={skillListingItems.jobOrderTypeName === 'Contract'}>
                          <label className="fnt04 mrg-btm01 fnt-wt05">Desired Contract Length:</label>
                          <div className="ui stacked ">
                            <div className="field select-custm">
                              <Dropdown
                                fluid
                                search
                                selection
                                placeholder="Select"
                                className="fnt-size09"
                                options={dropDownData.duration ? dropDownData.duration : []}
                                onChange={this._onGigDurationChange}
                                error={this.state.gigDurationError}
                                value={this.state.gigDurationTemp}
                              />
                            </div>
                          </div>
                        </Form.Field>
                      </div>
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
                      <div className={skillListingItems.bidCount > 0 ? 'three fields' : 'two fields'}>
                        <div className="field">
                          <div className="ui left icon input">
                            <NavLink to={`/Administration/Search/SkillListings/${this.props.match.params.id}`} className="ui fluid large default submit button rdus-none mrg-tp04">CANCEL</NavLink>
                          </div>
                        </div>
                        {
                          skillListingItems.bidCount > 0 ?
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
                          skillListingItems.bidCount > 0 ?
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

export default (withLocalize(EmployerBidUI) as any);