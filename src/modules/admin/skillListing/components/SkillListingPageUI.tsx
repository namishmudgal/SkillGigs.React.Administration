import * as React from 'react';
import ContentWrapperListings from '../../../wireframe/components/ContentWrapperListings';
import { Grid, Container, Card, Segment, Header, Icon, Image, Menu, Accordion, Loader } from 'semantic-ui-react';
import SkillListingSocial from './SkillListingSocial';
import SkillListingDefaultView from '../../../shared/SkillListingDefaultView/components/SkillListingDefaultView';
import SkillListingWorkHistory from '../../../shared/SkillListingWorkHistory/components/SkillListingWorkHistory';
import SkillListingEducationHistory from '../../../shared/SkillListingEducationHistory/components/SkillListingEducationHistory';
import SkillListingCertifications from '../../../shared/SkillListingCertifications/components/SkillListingCertifications';
import { NavLink } from 'react-router-dom';
import browserHistory from 'src/router/browserHistory';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface Props {
  isLoggedIn: boolean;
  match: any;
  skillListingItems: any;
  skillListingError: string;
  resumeItems: any;
  isListingLoading: boolean;
  onSkillListingRequest(params: any, flag: boolean): void;
}

const timer: any = '';

export default class SkillListingPageUI extends React.Component<Props, any> {
  timer = setInterval(() => {
    if (Object.keys(this.props.skillListingItems).length) {
      this.timeBetweenDates(new Date(this.props.skillListingItems.expiresOn ? this.props.skillListingItems.expiresOn : '0001-01-01T00:00:00'));
    }
  }, 1000);
  _isMounted = false;
  constructor(props: any) {
    super(props);
    this.state = {
      viewType: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0,
      activeIndex: 1,
      isExpired: false
    };
  }
  componentDidMount() {
    this.props.onSkillListingRequest(this.props.match.params.id, true);
    if (this.props.skillListingError !== '') {
      browserHistory.push('/error');
    }
    this._isMounted = true;
  }
  componentWillReceiveProps(nextProps: any) {
    if (this.props.skillListingError !== nextProps.skillListingError && nextProps.skillListingError !== '') {
      browserHistory.push('/error');
    }
  }
  componentWillUnmount() {
    clearInterval(timer);
    this._isMounted = false;
  }
  setView = (id: any) => {
    if (this._isMounted) {
      this.setState({ viewType: id });
    }
  }
  renderSwitch = (params: number) => {
    switch (params) {
      case 0:
        return (
          <SkillListingDefaultView
            appName="EmployerMarketplace"
            skillListingItems={this.props.skillListingItems}
            isLoggedIn={this.props.isLoggedIn}
          />
        );
      case 1:
        return (
          <SkillListingWorkHistory
            appName="EmployerMarketplace"
            resumeItems={this.props.resumeItems}
            isLoggedIn={this.props.isLoggedIn}
          />
        );
      case 2:
        return (
          <SkillListingEducationHistory
            appName="EmployerMarketplace"
            resumeItems={this.props.resumeItems}
            isLoggedIn={this.props.isLoggedIn}
          />
        );
      case 3:
        return (
          <SkillListingCertifications
            appName="EmployerMarketplace"
            resumeItems={this.props.resumeItems}
            isLoggedIn={this.props.isLoggedIn}
          />
        );
      default:
        return (
          <SkillListingDefaultView
            appName="EmployerMarketplace"
            skillListingItems={this.props.skillListingItems}
            isLoggedIn={this.props.isLoggedIn}
          />
        );
    }
  }
  timeBetweenDates = (toDate: any) => {
    const dateEntered = toDate;
    const now = new Date();
    const difference = dateEntered.getTime() - now.getTime();

    if (difference <= 0) {
      clearInterval(timer);
      if (this._isMounted) {
        this.setState({ isExpired: true });
      }
    } else {
      let seconds = Math.floor(difference / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      hours %= 24;
      minutes %= 60;
      seconds %= 60;
      if (this._isMounted) {
        this.setState({
          seconds,
          minutes,
          hours,
          days
        });
      }
    }
  }
  handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    if (this._isMounted) {
      this.setState({ activeIndex: newIndex });
    }
  }
  render() {
    const {
      isLoggedIn,
      match,
      skillListingItems,
      resumeItems,
      isListingLoading
    } = this.props;
    return (
      <ContentWrapperListings marginBottom={false} skillListingItems={skillListingItems}>
      {
        isListingLoading ?
        <Loader active inline='centered' size='large' /> :
         <Container>
          <Grid stackable>
           <Grid.Column width={4}>
             <Card fluid className="rdus-none computer large monitor widescreen monitor mobile hidden">
               <Segment basic textAlign='center'>
                 <a href="#" title="Edit Profile Picture">
                   <Image size='small' circular centered avatar className="avtr avtr-ht t-mtb1" src={skillListingItems && skillListingItems.profiles && skillListingItems.profiles.pictureUrl && skillListingItems.profiles.pictureUrl !== '' ? `https://s3.amazonaws.com/dev.content.skillgigs.com${skillListingItems.profiles.pictureUrl}` : require('../../../../assets/images/gravtar.svg')} alt={skillListingItems.preferredName} />
                 </a>
                 <Header as="h2" className="ui header mrg-rmv pad-tp02 t-ptb1">{skillListingItems.consultantPreferredName}</Header>
                 <span className="txt-pink01 fnt01 mrg-rgt01">
                   <Icon name="suitcase" /><span id="lblExperienceLevelName">{skillListingItems.experienceLevelName}</span>
                 </span>
                 <SkillListingSocial
                   skillListingItems={skillListingItems}
                 />
                 <p>
                   <NavLink to={`/Administration/Talent/Resume/${skillListingItems.consultantUrlFriendlyName}`} className="ui fluid button main-primary">
                     <Icon className="hide-tbt" name='eye' />View 3D Resume
                   </NavLink>
                 </p>
                 <p>
                   <NavLink to="/Talent/OriginalResume/?profileId=1" className="ui fluid grey button ">
                     <Icon className="hide-tbt" name='download' />
                     Download Resume
                   </NavLink>
                 </p>
               </Segment>
             </Card>
             <Card fluid className="rdus-none mobile hidden">
                 <Menu fluid secondary pointing className="vertical mrg-tp02 mrg-btm02 fnt12-tb menu-tab">
                   <NavLink to="#" className="item txt-grey02" style={{ display: 'none' }}>
                     <Icon name="ticket alternate" />
                     Bid History
                   </NavLink>
                   <NavLink to="#" className={`item txt-grey02 ${this.state.viewType === 0 ? 'active' : ''}`} onClick={() => this.setView(0)}>
                     <Icon name="file" />
                     Skill Listing
                   </NavLink>
                   <NavLink to="#" className={`item txt-grey02 ${this.state.viewType === 1 ? 'active' : ''}`} onClick={() => this.setView(1)}>
                     <Icon name="building" />
                      Work History
                   </NavLink>
                   <NavLink to="#" className={`item txt-grey02 ${this.state.viewType === 2 ? 'active' : ''}`} onClick={() => this.setView(2)}>
                     <Icon name="book" />
                     Education History
                   </NavLink>
                   <NavLink to="#" className={`item txt-grey02 ${this.state.viewType === 3 ? 'active' : ''}`} onClick={() => this.setView(3)}>
                     <Icon name="trophy" />
                     Certifications &amp; Awards
                   </NavLink>
                 </Menu>
              </Card>
           </Grid.Column>
           <Grid.Column width={8} className="mobile hidden">
             <Card fluid className="rdus-none tm04">
               {this.renderSwitch(this.state.viewType)}
             </Card>
           </Grid.Column>
           <Grid.Column width={4} className="mobile only" >
             <Card fluid className="rdus-none tm04">
               <Accordion styled>
                 <Accordion.Title active={this.state.activeIndex === 0} index={0} onClick={this.handleClick} style={{ display: 'none' }}>
                   <Icon name='dropdown' />
                   Bid History
                 </Accordion.Title>
                 <Accordion.Content active={this.state.activeIndex === 0} className="segment offerHistory" style={{ display: 'none' }} />
                 <Accordion.Title active={this.state.activeIndex === 1} index={1} onClick={this.handleClick}>
                   <Icon name='dropdown' />
                   Skill Listing
                 </Accordion.Title>
                 <Accordion.Content active={this.state.activeIndex === 1} className="segment skillListing">
                   {this.renderSwitch(0)}
                 </Accordion.Content>
                 <Accordion.Title active={this.state.activeIndex === 2} index={2} onClick={this.handleClick}>
                   <Icon name='dropdown' />
                   Work History
                 </Accordion.Title>
                 <Accordion.Content active={this.state.activeIndex === 2} className="segment workhistory">
                   {this.renderSwitch(1)}
                 </Accordion.Content>
                 <Accordion.Title active={this.state.activeIndex === 3} index={3} onClick={this.handleClick}>
                   <Icon name='dropdown' />
                   Education History
                 </Accordion.Title>
                 <Accordion.Content active={this.state.activeIndex === 3} className="segment educationhistory">
                   {this.renderSwitch(2)}
                 </Accordion.Content>
                 <Accordion.Title active={this.state.activeIndex === 4} index={4} onClick={this.handleClick}>
                   <Icon name='dropdown' />
                   Certifications &amp; Awards
                 </Accordion.Title>
                 <Accordion.Content active={this.state.activeIndex === 4} className="segment certifications">
                   {this.renderSwitch(3)}
                 </Accordion.Content>
               </Accordion>
             </Card>
           </Grid.Column>
           <Grid.Column width={4}>
             <Card fluid className="rdus-none">
               <Card.Content>
                 <Header as='h2' dividing className="heading01">
                   Skill Listing Ends In
                 </Header>
                 {
                   !this.state.isExpired ?
                     <div className="ui basic rmv-pad-tab">
                       <div className="listing-end rmv-pad-tab center aligned">
                         <ul>
                           <li className="">
                               <p>{this.state.days}</p>
                               <span>Days</span>
                           </li>
                           <li className="">
                               <p>{this.state.hours}</p>
                               <span>Hours</span>
                           </li>
                           <li className="">
                               <p>{this.state.minutes}</p>
                               <span>Mins</span>
                           </li>
                         </ul>
                       </div>
                     </div> :
                       <div className="ui basic rmv-pad-tab">
                         <div className="listing-end rmv-pad-tab center aligned">
                           <p>Expired</p>
                         </div>
                       </div>
                 }
               </Card.Content>
             </Card>
             <Card fluid className="rdus-none">
               <Card.Content>
                 <Header as='h2' dividing className="heading01">
                   Current Bid
                 </Header>
                 <div className="ui basic rmv-pad-tab centered aligned">
                   <div className="listing-end rmv-pad-tab center aligned">
                       <ul>
                         <li>
                           <p className="hdng02 txt-balck">${skillListingItems.bidCount > 0 ? skillListingItems.bid[skillListingItems.bid.length - 1].rate : 0}</p>
                           <span>{skillListingItems.budgetTypeName}</span>
                       </li>
                     </ul>
                   </div>
                 </div>
               </Card.Content>
             </Card>
             <Card fluid className="rdus-none">
               <Card.Content>
                 <Header as='h2' dividing className="heading01">
                   3D Resume Completion(%)
                 </Header>
                 {
                   resumeItems.profileCompletion ?
                     <div className="ui basic rmv-pad-tab centered aligned">
                       <div className="listing-end rmv-pad-tab center aligned">
                         <ul>
                           <li>
                             <a href="#">
                             <CircularProgressbar
                               percentage={resumeItems.profileCompletion}
                               text={`${resumeItems.profileCompletion}%`}
                               initialAnimation
                               background
                               backgroundPadding={6}
                               styles={{
                                 path: { stroke: `rgb(244, 61, 122, ${resumeItems.profileCompletion / 100})` },
                                 text: { fill: '#fff', fontSize: '26px', textShadow: 'rgb(255, 255, 255) 0px 1px 1px' },
                                 background: {
                                   fill: '#f53676',
                                 },
                                 trail: { stroke: 'd2d1d1' }
                               }}
                             />
                             </a>
                           </li>
                         </ul>
                       </div>
                     </div> : null
                 }
               </Card.Content>
             </Card>
             {
               skillListingItems.skillListingStatusCode !== 'X' && skillListingItems.skillListingStatusCode !== 'E' ?
               <Card fluid className="rdus-none mobile hidden">
                <Card.Content>
                  <Header as='h2' dividing className="heading01">
                    Desired Salary - <span id="lblMinBid">${skillListingItems.clientRate}</span> / <span id="lblBudgetTypeCode">{skillListingItems.budgetTypeCode}</span>
                  </Header>
                  <Segment basic textAlign="center" className="rmv-pad-tab">
                    <p>
                      <NavLink to={`/Administration/Employer/Bid/${this.props.match.params.id}`} className="ui fluid red button">{skillListingItems && skillListingItems.bid && skillListingItems.bid.length ? 'Edit Your Bid' : 'Bid To Get Started'}</NavLink>
                    </p>
                  </Segment>
                </Card.Content>
              </Card> : null
             }
           </Grid.Column>
         </Grid>
       </Container>
      }
      </ContentWrapperListings>
    );
  }
}
