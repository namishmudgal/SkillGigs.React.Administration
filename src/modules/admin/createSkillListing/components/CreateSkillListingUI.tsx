import * as React from 'react';
import ContentWrapperWithHeader from '../../../wireframe/components/ContentWrapperWithHeader';
import { Grid, Container, Icon, Header, Step, List } from 'semantic-ui-react';
import StepForm1 from './StepForm1';
import StepForm2 from './StepForm2';

interface Props {
  isDesktopLayout: boolean;
}

export default class CreateSkillListingUI extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeIndex: 0,
			skillTitle: '',
			skillTitleError: false,
			skillType: '',
			skillTypeError: false,
			stealthInfo: '',
			desiredSalary: '',
      desiredSalaryError: false,
      skillListings: [],
			locations: [],
			skillExperience: '',
    };
  }
  myCallback = (activeIndex: number, options: any) => {
    this.setState({
      activeIndex,
			skillTitle: options.skillTitle ? options.skillTitle : '',
			skillTitleError: options.skillTitleError ? options.skillTitleError : false,
			skillType: options.skillType ? options.skillType : '',
			skillTypeError: options.skillTypeError ? options.skillTypeError : false,
			stealthInfo: options.stealthInfo ? options.stealthInfo : '',
			desiredSalary: options.desiredSalary ? options.desiredSalary : '',
      desiredSalaryError: options.desiredSalaryError ? options.desiredSalaryError : false,
      skillListings: options.skillListings ? options.skillListings : [],
			locations:  options.locations ? options.locations : [],
			skillExperience: options.skillExperience ? options.skillExperience : '',
    });
  }
  render() {
    const {
      isDesktopLayout
    } = this.props;
    return (
      <ContentWrapperWithHeader>
        <Container className="add-top-xs-padding">
          <Grid stackable className="add-bottom-sm-padding">
            <Grid.Column width={16} className="mobile five wide tablet five wide computer">
              <Grid>
                <div className="mobile hidden row">
                  <div className="sixteen column">
                  <Step.Group vertical>
                    <Step active={this.state.activeIndex === 0} link completed={this.state.activeIndex > 0} onClick={() => this.setState({ activeIndex: 0 })}>
                      <Icon name='pencil alternate' />
                      <Step.Content>
                        <Step.Title>Information</Step.Title>
                        <Step.Description>Your next job particulars</Step.Description>
                      </Step.Content>
                    </Step>

                    <Step link active={this.state.activeIndex > 0} onClick={() => this.setState({ activeIndex: 1 })}>
                      <Icon name='map marker alternate' />
                      <Step.Content>
                        <Step.Title>Finalize</Step.Title>
                        <Step.Description>Enter locations you want to work</Step.Description>
                      </Step.Content>
                    </Step>
                  </Step.Group>
                  </div>
                </div>
              </Grid>
            </Grid.Column>
            <Grid.Column width={isDesktopLayout ? 7 : 16}>
              <Container>
                <Header as='h3' className="add-bottom-xs-padding" style={{ display: this.state.activeIndex === 0 ? 'block' : 'none', marginTop: '0' }}>
                  <Icon name='pencil' />
                  <Header.Content>
                  Create Your Skill Listing
                  <Header.Subheader>
                  Describe the kind of job you want to be hired for and receive job offers from interested employers.
                  </Header.Subheader>
                  </Header.Content>
                </Header>
                <Header as='h3' className="add-bottom-xs-padding" style={{ display: this.state.activeIndex === 1 ? 'block' : 'none', marginTop: '0' }}>
                  <Icon name='pencil' />
                  <Header.Content>
                  Skills &amp; Locations
                  <Header.Subheader>
                  List your primary skills and ideal locations for your next job.
                  </Header.Subheader>
                  </Header.Content>
                </Header>
                {
                  this.state.activeIndex === 0 ?
                  <StepForm1
                    callbackFromParent={this.myCallback}
                    options={{
                      skillTitle: this.state.skillTitle,
                      skillType: this.state.skillType,
                      stealthInfo: this.state.stealthInfo,
                      desiredSalary: this.state.desiredSalary,
                      skillListings: this.state.skillListings,
                      locations: this.state.locations,
                      skillExperience: this.state.skillExperience
                    }}
                  /> :
                    <StepForm2
                      callbackFromParent={this.myCallback}
                      options={{
                        skillTitle: this.state.skillTitle,
                        skillType: this.state.skillType,
                        stealthInfo: this.state.stealthInfo,
                        desiredSalary: this.state.desiredSalary,
                        skillListings: this.state.skillListings,
											  locations: this.state.locations,
											  skillExperience: this.state.skillExperience
                      }}
                    />
                }
              </Container>
            </Grid.Column>
            {
              this.state.activeIndex > 0 ?
                <Grid.Column width={4} className="desktop only">
                  <div className="ui message">
                    <div className="header red-text-color">Example of Job Skills</div>
                    <List as="ul">
                      <List.Item as="li">e.g. Java</List.Item>
                      <List.Item as="li">e.g. Hadoop</List.Item>
                      <List.Item as="li">e.g. AngularJS</List.Item>
                    </List>
                  </div>
                </Grid.Column> : null
            }
          </Grid>
        </Container>
      </ContentWrapperWithHeader>
    );
  }
}
