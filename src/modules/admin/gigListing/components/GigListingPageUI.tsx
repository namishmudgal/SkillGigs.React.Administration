import * as React from 'react';
import ContentWrapperListingsGig from '../../../wireframe/components/ContentWrapperListingsGig';
import { Grid, Container, Card, Segment, Header, Icon, Image, Menu, Modal, Loader, List } from 'semantic-ui-react';
import RequiredSkillsDefaultView from '../../../shared/RequiredSkillsDefaultView/components/RequiredSkillsDefaultView';
import DesiredSkillsView from '../../../shared/DesiredSkillsView/components/DesiredSkillsView';
import DetailsView from '../../../shared/DetailsView/components/DetailsView';
import DescriptionView from '../../../shared/DescriptionView/components/DescriptionView';
import { NavLink } from 'react-router-dom';
import browserHistory from 'src/router/browserHistory';

interface Props {
  isLoggedIn: boolean;
  match: any;
  gigListingItems: any;
  gigListingError: string;
  isListingLoading: boolean;
  onGigListingRequest(params: any): void;
  onGigCreateRequest(obj: any, step: string): void;
}

let timer: any = '';

export default class GigListingPageUI extends React.Component<Props, any> {
  timer = setInterval(() => {
    if (Object.keys(this.props.gigListingItems).length) {
      this.timeBetweenDates(new Date(this.props.gigListingItems.expiryDate));
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
      isExpired: false,
      modalDeleteOpen: false,
      modalExtendOpen: false
    };
  }
  componentDidMount() {
    this.props.onGigListingRequest(this.props.match.params.id);
    if (this.props.gigListingError !== '') {
      browserHistory.push('/error');
    }
    this._isMounted = true;
  }
  componentWillReceiveProps(nextProps: any) {
    if (this.props.gigListingError !== nextProps.gigListingError && nextProps.gigListingError !== '') {
      browserHistory.push('/error');
    }
    if (this.props.gigListingItems.expiryDate !== nextProps.gigListingItems.expiryDate) {
      this.setState({ isExpired: false });
      timer = setInterval(() => {
        if (Object.keys(nextProps.gigListingItems).length) {
          this.timeBetweenDates(new Date(nextProps.gigListingItems.expiryDate));
        }
      }, 1000);
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
  handleDeleteOpen = () => this.setState({ modalDeleteOpen: true });
  handleDeleteClose = () => this.setState({ modalDeleteOpen: false });
  handleExtendOpen = () => this.setState({ modalExtendOpen: true });
  handleExtendClose = () => this.setState({ modalExtendOpen: false });
  _deleteGig = () => this.props.onGigCreateRequest({ jobOrderId: this.props.gigListingItems.jobOrderId, profileId: this.props.gigListingItems.profileId }, 'delete');
  _extendGig = () => {
    this.props.onGigCreateRequest({ jobOrderId: this.props.gigListingItems.jobOrderId, profileId: this.props.gigListingItems.profileId }, 'extend');
    this.setState({ modalExtendOpen: false });
  }
  render() {
    const {
      isLoggedIn,
      match,
      gigListingItems,
      isListingLoading
    } = this.props;
    return (
      <ContentWrapperListingsGig marginBottom={false} gigListingItems={gigListingItems}>
      {
        isListingLoading ?
        <Loader active inline='centered' size='large' /> :
         <Container>
          <Grid stackable>
           <Grid.Column width={4}>
             <Card fluid className="rdus-none computer large monitor widescreen monitor mobile hidden">
                <Segment basic textAlign='center'>
                  <a href="#" title="Edit Profile Picture">
                    <Image size='small' circular centered avatar className="avtr avtr-ht t-mtb1" src={gigListingItems && gigListingItems.clientPictureUrl !== '' ? `https://s3.amazonaws.com/dev.content.skillgigs.com${gigListingItems.clientPictureUrl}` : require('../../../../assets/images/gravtar.svg')} alt={gigListingItems.clientPictureUrl} />
                  </a>
                  <Header as="h2" className="mrg-rmv pad-tp02 t-ptb1">{gigListingItems.clientCompanyName}</Header>
                <p>
                  <NavLink to={`/Administration/Company/${gigListingItems.profileId}`} className="ui fluid button main-primary mrg-tp02 mrg-btm02">
                    <Icon className="hide-tbt" name='eye' />VIEW PROFILE
                  </NavLink>
                </p>
               </Segment>
             </Card>
             <Card fluid className="rdus-none computer large monitor widescreen monitor mobile hidden">
              <Segment basic textAlign='center' className="mrg-rmv t-mtb1">
                <h2 className="heading01">
                  <Icon name="share" /> Share This Gig
                </h2>
                <a href="https://stackexchange.com/sroye98/showcase-project" target="_blank">
                  <i className="profile-icn pad-equa02">
                    <img src={require('../../../../assets/images/icons/facebook.svg')} />
                  </i>
                </a>
                <a href="https://stackexchange.com/sroye98/showcase-project" target="_blank">
                  <i className="profile-icn pad-equa02">
                    <img src={require('../../../../assets/images/icons/linkedin.svg')} />
                  </i>
                </a>
                <a href="https://stackexchange.com/sroye98/showcase-project" target="_blank">
                  <i className="profile-icn pad-equa02">
                    <img src={require('../../../../assets/images/icons/twitter.svg')} />
                  </i>
                </a>
              </Segment>
            </Card>
            <div className="tm04">
              <Card fluid className="rdus-none computer large monitor widescreen monitor">
                <List className="middle aligned divided">
                  <h2 className="heading04">Actions</h2>
                  {
                    gigListingItems.jobOrderStatusCode !== "X" ?
                    <List.Item>
                      <List.Content>
                        <a className="txt-grey02">CURRENT MATCHES(0)</a>
                      </List.Content>
                    </List.Item> : null
                  }
                  {
                    gigListingItems.jobOrderStatusCode !== "X" ?
                      <List.Item>
                        <List.Content>
                          <a className="txt-grey02">FIND MATCHES</a>
                        </List.Content>
                      </List.Item> : null
                  }
                  {
                    gigListingItems.jobOrderStatusCode !== "X" ?
                      <List.Item>
                        <List.Content>
                          <a className="txt-grey02">EDIT THIS LISTING</a>
                        </List.Content>
                      </List.Item> : null
                  }
                  {
                    gigListingItems.jobOrderStatusCode !== "P" && gigListingItems.jobOrderStatusCode !== "X" ?
                      <List.Item>
                        <List.Content>
                          <a className="txt-grey02">PUBLISH THIS LSITING</a>
                        </List.Content>
                      </List.Item> : null
                  }
                  {
                    gigListingItems.jobOrderStatusCode !== "X" && gigListingItems.jobOrderStatusCode !== "D" ?
                    <List.Item>
                      <List.Content>
                      <Modal
                        trigger={<a onClick={this.handleExtendOpen} className="txt-grey02">EXTEND THIS LISTING</a>}
                        open={this.state.modalExtendOpen}
                        onClose={this.handleExtendClose}
                        closeIcon
                      >
                        <Modal.Header>Extend</Modal.Header>
                        <Modal.Content>
                          <p>Are you sure you want to extend this listing?</p>
                        </Modal.Content>
                        <div className="actions right aligned">
                          <div className="ui buttons">
                            <button className="ui button" onClick={this.handleExtendClose}>Cancel</button>
                            <div className="or"></div>
                            <button className="ui positive btn-pink txt-wht button bdr-rdus-rmv" onClick={this._extendGig}>Ok</button>
                          </div>
                        </div>
                      </Modal>
                      </List.Content>
                    </List.Item> : null
                  }
                  {
                    gigListingItems.jobOrderStatusCode !== "X" ?
                      <List.Item>
                        <List.Content>
                        <Modal
                          trigger={<a onClick={this.handleDeleteOpen} className="txt-grey02">DELETE THIS LISTING</a>}
                          open={this.state.modalDeleteOpen}
                          onClose={this.handleDeleteClose}
                          closeIcon
                        >
                          <Modal.Header>Delete</Modal.Header>
                          <Modal.Content>
                            <p>Are you sure you want to delete this listing?</p>
                          </Modal.Content>
                          <div className="actions  right aligned">
                            <div className="ui buttons">
                              <button className="ui button" onClick={this.handleDeleteClose}>Cancel</button>
                              <div className="or"></div>
                              <button className="ui positive btn-pink txt-wht button bdr-rdus-rmv" onClick={this._deleteGig}>Ok</button>
                            </div>
                          </div>
                        </Modal>
                        </List.Content>
                      </List.Item> : null
                  }
                  {
                    gigListingItems.jobOrderStatusCode !== "X" ?
                      <List.Item>
                        <List.Content>
                          <NavLink to={`/Administration/Gig/SkillDensity/${this.props.match.params.id}?profileId=${gigListingItems.profileId}`} className="txt-grey02">ENTER SKILL DENSITY</NavLink>
                        </List.Content>
                      </List.Item> : null
                  }
                  <List.Item>
                    <List.Content>
                      <a className="txt-grey02">VIEW OTHER GIGS</a>
                    </List.Content>
                  </List.Item>
                </List>
              </Card>
            </div>
           </Grid.Column>
           <Grid.Column width={8}>
             <Card fluid className="rdus-none">
              <Segment basic className="ht-cnt">
                <List verticalAlign='middle'>
                  <List.Item>
                    <List.Content>
                      <Header as="h2" dividing className="heading02">
                        {gigListingItems.title}
                      </Header>
                      <p>
                        <Icon name="map marker" /> {gigListingItems.locationWithCountry} &nbsp;&nbsp; <Icon name="tag" /> {gigListingItems.gigTypeName}
                      </p>
                    </List.Content>
                  </List.Item>
                </List>
                <RequiredSkillsDefaultView
                  items={gigListingItems}
                  isLoggedIn={isLoggedIn}
                />
                <DesiredSkillsView
                  items={gigListingItems}
                  isLoggedIn={isLoggedIn}
                />
                <DetailsView
                  items={gigListingItems}
                  isLoggedIn={isLoggedIn}
                />
                <DescriptionView
                  items={gigListingItems}
                  isLoggedIn={isLoggedIn}
                />
               </Segment>
             </Card>
           </Grid.Column>
           <Grid.Column width={4}>
             <Card fluid className="rdus-none">
               <Card.Content>
                 <Header as='h2' dividing className="heading01">
                   Gig Listing Ends In
                 </Header>
                 {
                   !this.state.isExpired ?
                     <div className="ui basic rmv-pad-tab">
                       <div className="listing-end rmv-pad-tab center aligned">
                         <ul>
                           <li className="">
                               <p>{gigListingItems.jobOrderStatusCode !== 'D' ? this.state.days : '-'}</p>
                               <span>Days</span>
                           </li>
                           <li className="">
                               <p>{gigListingItems.jobOrderStatusCode !== 'D' ? this.state.hours : '-'}</p>
                               <span>Hours</span>
                           </li>
                           <li className="">
                               <p>{gigListingItems.jobOrderStatusCode !== 'D' ? this.state.minutes : '-'}</p>
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
                           <p className="hdng02 txt-balck">${gigListingItems.proposals && gigListingItems.proposals.length ? gigListingItems.proposals[gigListingItems.proposals.length - 1].rate : 0}</p>
                           <span>{gigListingItems.budgetTypeName}</span>
                       </li>
                       {
                          gigListingItems.jobOrderStatusCode === 'P' ?
                            <p>
                              <NavLink to={`/Administration/Talent/Bid/${this.props.match.params.id}`} className="ui fluid button main-primary mrg-tp8">{gigListingItems.proposals && gigListingItems.proposals.length ? 'UPDATE YOUR BID' : 'BID ON GIG'}</NavLink>
                            </p> : null
                       }
                        <p>
                          <NavLink to="/Administration/Talent/Resume" className="ui fluid button mrg-tp8">ADD TO FAVORITES</NavLink>
                        </p>
                      </ul>
                    </div>
                  </div>
                </Card.Content>
             </Card>
             <Card fluid className="rdus-none">
               <Card.Content>
                <Header as='h2' dividing className="heading01">
                  Received Bids
                </Header>
                <div className="ui basic rmv-pad-tab centered aligned">
                  <List relaxed>
                  {
                    gigListingItems.proposals && gigListingItems.proposals.length ?
                      gigListingItems.proposals.map((item: any, index: number) =>
                        <List.Item key={index}>
                          <div>
                            <List.Header> {item.preferredName} </List.Header>
                            <List.Description>{item.gigLocation} • ${item.rate}/{item.budgetTypeCode}</List.Description>
                          </div>
                        </List.Item>
                    ) : 'No Bids Available'
                  }
                 </List>
                </div>
               </Card.Content>
             </Card>
           </Grid.Column>
         </Grid>
       </Container>
      }
      </ContentWrapperListingsGig>
    );
  }
}
