import * as React from 'react';
import ContentWrapperWithHeader from '../../../wireframe/components/ContentWrapperWithHeader';
import { Grid, Container, Icon, Header, Step, List, Transition } from 'semantic-ui-react';
import StartUpForm from './StartUpForm';
import StepForm1 from './StepForm1';
import StepForm2 from './StepForm2';

interface Props {
  isDesktopLayout: boolean;
  dropDownData: any;
  location: any;
  locationItems: any;
  isLocationLoading: boolean;
  reqSkillSuggestionItems: any;
  isReqSkillLoading: boolean;
  desSkillSuggestionItems: any;
  isDesSkillLoading: any;
  jobOrderId: any;
  professionId: any;
  profileId: any;
  match: any;
  onReqSkillRequest(str: any): void;
  onDesSkillRequest(str: any): void;
  getDropDownData(type: any): void;
  getLocationsData(str: any): void;
  onGigCreateRequest(obj: any, step: string): void;
}

export default class CreateGigListingUI extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeIndex: 0,
      type: 'Permanent',
      gigTitle: '',
			gigTitleError: false,
      gigLocation: '',
      gigLocationTemp: '',
			gigLocationError: false,
      workAuthorization: [],
      workAuthorizationTemp: [],
      workAuthorizationError: false,
      gigDuration: '',
      gigDurationTemp: '',
      gigDurationError: false,
      minBudget: '',
      maxBudget: '',
      requiredSkills: [],
      requiredSkillsNew: [],
      desiredSkillsNew: [],
      desiredSkills: [],
      requiredSkillsTemp: [],
      desiredSkillsTemp: [],
			gigDescription: '',
      desiredExp: '',
      desiredExpTemp: '',
    };
  }
  componentDidMount() {
    this.props.getDropDownData('visa,duration,experience');
  }
  myCallback = (activeIndex: number, type: string, options: any) => {
    this.setState({
      activeIndex,
      type,
      gigTitle: options.gigTitle ? options.gigTitle : '',
			gigTitleError: options.gigTitleError ? options.gigTitleError : false,
      gigLocation: options.gigLocation ? options.gigLocation : '',
      gigLocationTemp: options.gigLocationTemp ? options.gigLocationTemp : '',
			gigLocationError: options.gigLocationError ? options.gigLocationError : false,
      workAuthorization: options.workAuthorization ? options.workAuthorization : [],
      workAuthorizationTemp: options.workAuthorizationTemp ? options.workAuthorizationTemp : [],
      workAuthorizationError: options.workAuthorizationError ? options.workAuthorizationError : false,
      minBudget: options.minBudget ? options.minBudget : '',
      maxBudget: options.maxBudget ? options.maxBudget : '',
      gigDuration: options.gigDuration ? options.gigDuration : '',
      gigDurationTemp: options.gigDurationTemp ? options.gigDurationTemp : '',
      gigDurationError: options.gigDurationError ? options.gigDurationError : false,
      requiredSkills:  options.requiredSkills ? options.requiredSkills : [],
      desiredSkills: options.desiredSkills ? options.desiredSkills : [],
      requiredSkillsNew: options.requiredSkillsNew ? options.requiredSkillsNew : [],
      desiredSkillsNew: options.desiredSkillsNew ? options.desiredSkillsNew : [],
      requiredSkillsTemp: options.requiredSkillsTemp ? options.requiredSkillsTemp : [],
      desiredSkillsTemp: options.desiredSkillsTemp ? options.desiredSkillsTemp : [],
			gigDescription: options.gigDescription ? options.gigDescription : '',
      desiredExp: options.desiredExp ? options.desiredExp : '',
      desiredExpTemp: options.desiredExpTemp ? options.desiredExpTemp : ''
    });
  }
  _onNextStep = (type: any) => {
		if (this.state.gigTitle === '') {
			this.setState({ gigTitleError: true });
		}
		if (this.state.gigLocation === '') {
			this.setState({ gigLocationError: true });
		}
		if (!this.state.workAuthorization.length) {
			this.setState({ workAuthorizationError: true });
		}
		if (this.state.gigTitle !== '' && this.state.gigLocation !== '' && this.state.workAuthorization.length) {
			this.myCallback(2, type, {
        gigTitle: this.state.gigTitle,
        gigTitleError: this.state.gigTitleError,
        gigLocation: this.state.gigLocation,
        gigLocationTemp: this.state.gigLocationTemp,
        gigLocationError: this.state.gigLocationError,
        workAuthorization: this.state.workAuthorization,
        workAuthorizationTemp: this.state.workAuthorizationTemp,
        workAuthorizationError: this.state.workAuthorizationError,
        gigDuration: this.state.gigDuration,
        gigDurationTemp: this.state.gigDurationTemp,
        gigDurationError: this.state.gigDurationError,
        minBudget: this.state.minBudget,
        maxBudget: this.state.maxBudget,
        requiredSkills: this.state.requiredSkills,
        desiredSkills: this.state.desiredSkills,
        requiredSkillsNew: this.state.requiredSkillsNew,
        desiredSkillsNew: this.state.desiredSkillsNew,
        requiredSkillsTemp: this.state.requiredSkillsTemp,
      	desiredSkillsTemp: this.state.desiredSkillsTemp,
        gigDescription: this.state.gigDescription,
        desiredExp: this.state.desiredExp,
        desiredExpTemp: this.state.desiredExpTemp
      });
		}
	}
  render() {
    const {
      isDesktopLayout,
      dropDownData,
      getLocationsData,
      location,
		  locationItems,
      isLocationLoading,
      onReqSkillRequest,
      reqSkillSuggestionItems,
      isReqSkillLoading,
      desSkillSuggestionItems,
      isDesSkillLoading,
      onDesSkillRequest,
      onGigCreateRequest,
      jobOrderId,
      professionId,
      profileId,
      match
    } = this.props;
    return (
      <ContentWrapperWithHeader>
        {
          this.state.activeIndex === 0 ?
            <StartUpForm
              callbackFromParent={this.myCallback}
            /> :
            <Container>
              <Grid stackable className="add-bottom-sm-padding">
                <Grid.Column width={16} className="mobile five wide tablet five wide computer">
                  <Grid>
                    <div className="mobile hidden row">
                      <div className="sixteen column">
                      <Step.Group vertical>
                        <Step active={this.state.activeIndex === 1} link completed={this.state.activeIndex > 1} onClick={() => this.setState({ activeIndex: 1 })}>
                          <Icon name='pencil alternate' />
                          <Step.Content>
                            <Step.Title>Information</Step.Title>
                            <Step.Description>Your next gig particulars</Step.Description>
                          </Step.Content>
                        </Step>
                        <Step link active={this.state.activeIndex === 2} onClick={() => this._onNextStep(this.state.type)}>
                          <Icon name='map marker alternate' />
                          <Step.Content>
                            <Step.Title>Finalize</Step.Title>
                            <Step.Description>More about your gig details&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Step.Description>
                          </Step.Content>
                        </Step>
                      </Step.Group>
                      </div>
                    </div>
                  </Grid>
                </Grid.Column>
                <Grid.Column width={isDesktopLayout ? 7 : 16}>
                  <Container>
                    <Transition visible={this.state.activeIndex === 1} animation='fade right' duration={{ hide: 100, show: 1000 }}>
                      <div>
                        <Header as='h3' className="add-bottom-xs-padding" style={{ marginTop: '0' }}>
                          <Icon name='pencil' />
                          <Header.Content>
                          Tell Us About Your Gig
                          <Header.Subheader>
                          Get the best out of SkillGigs by giving us information to source the right talent for your gig!
                          </Header.Subheader>
                          </Header.Content>
                        </Header>
                        <StepForm1
                          type={this.state.type}
                          callbackFromParent={this.myCallback}
                          options={{
                            gigTitle: this.state.gigTitle,
                            gigLocation: this.state.gigLocation,
                            gigLocationTemp: this.state.gigLocationTemp,
                            workAuthorization: this.state.workAuthorization,
                            workAuthorizationTemp: this.state.workAuthorizationTemp,
                            budgetRange: this.state.budgetRange,
                            gigDuration: this.state.gigDuration,
                            gigDurationTemp: this.state.gigDurationTemp,
                            minBudget: this.state.minBudget,
                            maxBudget: this.state.maxBudget,
                            requiredSkills: this.state.requiredSkills,
                            desiredSkills: this.state.desiredSkills,
                            requiredSkillsNew: this.state.requiredSkillsNew,
                            desiredSkillsNew: this.state.desiredSkillsNew,
                            requiredSkillsTemp: this.state.requiredSkillsTemp,
                            desiredSkillsTemp: this.state.desiredSkillsTemp,
                            gigDescription: this.state.gigDescription,
                            desiredExp: this.state.desiredExp,
                            desiredExpTemp: this.state.desiredExpTemp
                          }}
                          dropDownData={dropDownData}
                          getLocationsData={getLocationsData}
                          location={location}
                          locationItems={locationItems}
                          isLocationLoading={isLocationLoading}
                          onGigCreateRequest={onGigCreateRequest}
                          jobOrderId={jobOrderId}
                          professionId={professionId}
                          profileId={profileId}
                          companyId={match.params.id}
                        />
                      </div>
                    </Transition>
                    <Transition visible={this.state.activeIndex === 2} animation='fade right' duration={{ hide: 100, show: 1000 }}>
                      <div>
                        <Header as='h3' className="add-bottom-xs-padding" style={{ marginTop: '0' }}>
                          <Icon name='pencil' />
                          <Header.Content>
                          Add Details To Your Gig
                          <Header.Subheader>
                          SkillGigs' AI uses the skills you list to find talent that is a good match. Be thorough when listing skills!
                          </Header.Subheader>
                          </Header.Content>
                        </Header>
                        <StepForm2
                          type={this.state.type}
                          callbackFromParent={this.myCallback}
                          options={{
                            gigTitle: this.state.gigTitle,
                            gigLocation: this.state.gigLocation,
                            gigLocationTemp: this.state.gigLocationTemp,
                            workAuthorization: this.state.workAuthorization,
                            workAuthorizationTemp: this.state.workAuthorizationTemp,
                            budgetRange: this.state.budgetRange,
                            gigDuration: this.state.gigDuration,
                            gigDurationTemp: this.state.gigDurationTemp,
                            minBudget: this.state.minBudget,
                            maxBudget: this.state.maxBudget,
                            requiredSkills: this.state.requiredSkills,
                            desiredSkills: this.state.desiredSkills,
                            requiredSkillsNew: this.state.requiredSkillsNew,
                            desiredSkillsNew: this.state.desiredSkillsNew,
                            requiredSkillsTemp: this.state.requiredSkillsTemp,
                            desiredSkillsTemp: this.state.desiredSkillsTemp,
                            gigDescription: this.state.gigDescription,
                            desiredExp: this.state.desiredExp,
                            desiredExpTemp: this.state.desiredExpTemp
                          }}
                          dropDownData={dropDownData}
                          onReqSkillRequest={onReqSkillRequest}
                          reqSkillSuggestionItems={reqSkillSuggestionItems}
                          isReqSkillLoading={isReqSkillLoading}
                          desSkillSuggestionItems={desSkillSuggestionItems}
                          isDesSkillLoading={isDesSkillLoading}
                          onDesSkillRequest={onDesSkillRequest}
                          onGigCreateRequest={onGigCreateRequest}
                          jobOrderId={jobOrderId}
                          professionId={professionId}
                          profileId={profileId}
                        />
                      </div>
                    </Transition>
                  </Container>
                </Grid.Column>
                <Transition visible={this.state.activeIndex === 2} animation='fade right' duration={{ hide: 100, show: 1000 }}>
                  <Grid.Column width={4} className="desktop only">
                    <div className="ui message">
                      <div className="header red-text-color">Example of Job Skills</div>
                      <List as="ul">
                        <List.Item as="li">e.g. Java</List.Item>
                        <List.Item as="li">e.g. Hadoop</List.Item>
                        <List.Item as="li">e.g. AngularJS</List.Item>
                        <List.Item as="li">e.g. Labor &amp; Delivery</List.Item>
                        <List.Item as="li">e.g. Emergency Room</List.Item>
                      </List>
                    </div>
                  </Grid.Column>
                </Transition>
              </Grid>
            </Container>
        }
      </ContentWrapperWithHeader>
    );
  }
}
