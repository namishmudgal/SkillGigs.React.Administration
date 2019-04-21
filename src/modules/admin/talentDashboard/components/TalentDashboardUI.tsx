import * as React from 'react';
import ContentWrapperWithHeader from '../../../wireframe/components/ContentWrapperWithHeader';
import { Grid, Container, Icon, Card, List, Header, Button } from 'semantic-ui-react';
import DashboardSearchBar from '../../../shared/DashboardSearchBar';
import { NavLink } from 'react-router-dom';
import GigCard from '../../../common/components/GigCard';
import  { gigItems } from '../../../../data/admin';

interface Props {
    setLoginfailed(): void;
}

export default class TalentDashboardUI extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = { activeIndex: 0 };
  }
  handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }
  render() {
    return (
      <ContentWrapperWithHeader>
        <DashboardSearchBar
          title={'Explore SkillGigs Users With Just Simple Search...'}
          placeholder={'Job title, keywords or company name'}
        />
        <Container className="add-top-xs-padding">
          <Grid stackable>
          <Grid.Column width={16}>
            <Button.Group widths='5'>
              <Button><NavLink
                        to={`/Administration/Talent/SkillListing/Wizard`}
                      ><Icon name='plus' size='large' />Create A Skill Listing</NavLink></Button>
              <Button><Icon name='pencil' size='large' /><NavLink
                        to={`/Administration/Search/SkillListings/14744`}
                      >Edit A Skill Listing</NavLink></Button>
              <Button><Icon name='tv' size='large' />View 3D Resume</Button>
              <Button><Icon name='pencil' size='large' />View 3D Resume</Button>
              <Button><Icon name='star' size='large' />Favorites</Button>
            </Button.Group>
          </Grid.Column>
          <Grid.Column width={16}>
            <Card fluid className="rdus-none right pad-equal0">
              <Card.Content>
                <List className="middle aligned">
                  <List.Item>
                    <List.Content floated='right'>
                      <NavLink
                        to={`/Administration/Employer/Manage/Gigs/776`}
                        className="txt-pink01"
                      >
                        View All Skill Listings
                      </NavLink>
                    </List.Content>
                    <List.Content className="pad-equal0">
                      <Header as='h2' dividing className="heading02">
                        My Open Skill Listings
                        <span className="ui bg-grey05 circular label txt-wht">{gigItems && gigItems.items ? gigItems.items.length : 0}</span>
                      </Header>
                    </List.Content>
                  </List.Item>
                </List>
                <Grid.Column width={4} className="ui grid stackable container cards mrg-tp02">
                  {
                    gigItems && gigItems.items ?
                      gigItems.items.map((item: any, index: number) => {
                        if (index < 4) {
                          return (
                            <GigCard
                              expiresOn={item.expiresOn}
                              gigRole={item.title}
                              gigLocation={item.location}
                              viewCount={item.totalViews}
                              bidCount={item.proposalCount}
                              key={item.gigId}
                              gigStatus={item.jobOrderStatusId}
                              gigId={item.jobOrderId}
                            />
                          );
                        }
                        return;
                      }) : null
                  }
                </Grid.Column>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={16}>
            <Card fluid className="rdus-none right pad-equal0">
              <Card.Content>
                <List className="middle aligned">
                  <List.Item>
                    <List.Content floated='right'>
                      <NavLink
                        to={`/Administration/Employer/Manage/Gigs/776`}
                        className="txt-pink01"
                      >
                        View All Skill Listings
                      </NavLink>
                    </List.Content>
                    <List.Content className="pad-equal0">
                      <Header as='h2' dividing className="heading02">
                        My Inyerviews
                        <span className="ui bg-grey05 circular label txt-wht">{gigItems && gigItems.items ? gigItems.items.length : 0}</span>
                      </Header>
                    </List.Content>
                  </List.Item>
                </List>
                <Grid.Column width={4} className="ui grid stackable container cards mrg-tp02">
                  {
                    gigItems && gigItems.items ?
                      gigItems.items.map((item: any, index: number) => {
                        if (index < 4) {
                          return (
                            <GigCard
                              expiresOn={item.expiresOn}
                              gigRole={item.title}
                              gigLocation={item.location}
                              viewCount={item.totalViews}
                              bidCount={item.proposalCount}
                              key={item.gigId}
                              gigStatus={item.jobOrderStatusId}
                              gigId={item.jobOrderId}
                            />
                          );
                        }
                        return;
                      }) : null
                  }
                </Grid.Column>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={16}>
            <Card fluid className="rdus-none right pad-equal0">
              <Card.Content>
                <List className="middle aligned">
                  <List.Item>
                    <List.Content floated='right'>
                      <NavLink
                        to={`/Administration/Employer/Manage/Gigs/776`}
                        className="txt-pink01"
                      >
                        View All Skill Listings
                      </NavLink>
                    </List.Content>
                    <List.Content className="pad-equal0">
                      <Header as='h2' dividing className="heading02">
                        My Bids on Gigs
                        <span className="ui bg-grey05 circular label txt-wht">{gigItems && gigItems.items ? gigItems.items.length : 0}</span>
                      </Header>
                    </List.Content>
                  </List.Item>
                </List>
                <Grid.Column width={4} className="ui grid stackable container cards mrg-tp02">
                  {
                    gigItems && gigItems.items ?
                      gigItems.items.map((item: any, index: number) => {
                        if (index < 4) {
                          return (
                            <GigCard
                              expiresOn={item.expiresOn}
                              gigRole={item.title}
                              gigLocation={item.location}
                              viewCount={item.totalViews}
                              bidCount={item.proposalCount}
                              key={item.gigId}
                              gigStatus={item.jobOrderStatusId}
                              gigId={item.jobOrderId}
                            />
                          );
                        }
                        return;
                      }) : null
                  }
                </Grid.Column>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={16}>
            <Card fluid className="rdus-none right pad-equal0">
              <Card.Content>
                <List className="middle aligned">
                  <List.Item>
                    <List.Content floated='right'>
                      <NavLink
                        to={`/Administration/Employer/Manage/Gigs/776`}
                        className="txt-pink01"
                      >
                        View All Skill Listings
                      </NavLink>
                    </List.Content>
                    <List.Content className="pad-equal0">
                      <Header as='h2' dividing className="heading02">
                        My Favorites
                        <span className="ui bg-grey05 circular label txt-wht">{gigItems && gigItems.items ? gigItems.items.length : 0}</span>
                      </Header>
                    </List.Content>
                  </List.Item>
                </List>
                <Grid.Column width={4} className="ui grid stackable container cards mrg-tp02">
                  {
                    gigItems && gigItems.items ?
                      gigItems.items.map((item: any, index: number) => {
                        if (index < 4) {
                          return (
                            <GigCard
                              expiresOn={item.expiresOn}
                              gigRole={item.title}
                              gigLocation={item.location}
                              viewCount={item.totalViews}
                              bidCount={item.proposalCount}
                              key={item.gigId}
                              gigStatus={item.jobOrderStatusId}
                              gigId={item.jobOrderId}
                            />
                          );
                        }
                        return;
                      }) : null
                  }
                </Grid.Column>
              </Card.Content>
            </Card>
          </Grid.Column>
         </Grid>
        </Container>
      </ContentWrapperWithHeader>
    );
  }
}
