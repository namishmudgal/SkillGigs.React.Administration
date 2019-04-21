import * as React from 'react';
import ContentWrapperWithHeader from '../../../wireframe/components/ContentWrapperWithHeader';
import { Grid, Container, Loader, Card, List, Header, Segment, Pagination, Icon, Button, Dropdown, Popup } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";
import GigCard from '../../../common/components/GigCard';
import browserHistory from 'src/router/browserHistory';
import config from '../../../../config';
import { NavLink } from 'react-router-dom';
import { sortingOptionsGigs } from '../../../../utilities/helper';

interface Props {
  addTranslation: any;
  initialize: any;
  isLoggedIn: boolean;
  match: any;
  companyProfileError: string;
  companyGigItems: any;
  isProfileLoading: boolean;
  isDesktopLayout: boolean;
  totalPages: number;
  dropDownData: any;
  onGigPagingRequest(profileId: number, pageNumber: number, pageSize: number, activeState: any): void;
  getDropDownData(type: any): void;
}

class CompanyProfilePageUI extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeState: 'Clear',
      filterOptions: []
    };
    this.props.addTranslation(anonymousTranslations);
  }
  componentDidMount() {
    const filterType = window.location.href.split('?gigType=')[1] ? window.location.href.split('?gigType=')[1] : '';
    const pagingFilter = filterType ? filterType : '';
    this.setState({ activeState: filterType ? filterType : 'Clear' },
      () => {
        this.props.onGigPagingRequest(
          this.props.match.params.id,
          1,
          16,
          pagingFilter
        );
        window.history.pushState(null, '', window.location.href.split('?gigType=')[0]);
      }
    );
    this.props.getDropDownData('gigStatus');
    if (this.props.companyProfileError !== '') {
      browserHistory.push('/error');
    }
    if (typeof this.props.dropDownData.gigStatus !== 'undefined') {
      const option = this.props.dropDownData.gigStatus;
      const index  = option.findIndex((obj: any) => obj.text === 'Clear');
      if (index === -1) {
        option.push({
          text: 'Clear',
          value: 'Clear',
          icon: "eraser",
        });
      }
      this.setState({ filterOptions: option });
    }
  }
  componentWillReceiveProps(nextProps: any) {
    if (this.props.companyProfileError !== nextProps.companyProfileError && nextProps.companyProfileError !== '') {
      browserHistory.push('/error');
    }
    if (nextProps.dropDownData.gigStatus && typeof this.props.dropDownData.gigStatus === 'undefined' && nextProps.dropDownData.gigStatus.length) {
      const option = nextProps.dropDownData.gigStatus;
      const index  = option.findIndex((obj: any) => obj.text === 'Clear');
      if (index === -1) {
        option.push({
          text: 'Clear',
          value: 'Clear',
          icon: "eraser",
        });
      }
      this.setState({ filterOptions: option });
    }
  }
  handlePaginationChange = (e: any, {activePage}: {activePage: any}) => {
    let filterType = '';
    if (this.state.activeState !== 'Clear') {
      filterType = this.state.activeState;
    }
    this.props.onGigPagingRequest(
      this.props.companyGigItems.profileId,
      activePage,
      config.pageSize,
      filterType
    );
  }
  _onGigFilterChange = (e: any, {value}: {value: any}) => {
    if (value !== this.state.activeState) {
      let filterType = '';
      if (value !== 'Clear') {
        filterType = value;
      }
      this.props.onGigPagingRequest(
        this.props.companyGigItems.profileId,
        1,
        16,
        filterType
      );
    }
    this.setState({
			activeState: value,
    });
  }
  render() {
    const {
      companyGigItems,
      isProfileLoading,
      isDesktopLayout,
      totalPages,
      onGigPagingRequest,
      dropDownData
    } = this.props;
    return (
      <ContentWrapperWithHeader marginBottom={true}>
        <Container>
          <Grid stackable>
          <Grid.Column width={16} className="tm03 mrg-tp03">
              <Card fluid className="rdus-none right pad-equal0">
                <Card.Content>
                  <List className="middle aligned">
                    <List.Item>
                      <div className='right floated'>
                        <Dropdown
                          options={this.state.filterOptions}
                          onChange={this._onGigFilterChange}
                          value={this.state.activeState}
                          className='icon top right pointing'
                          text='Filter Options'
                          direction='right'
                          icon='filter'
                          labeled
                          button
                          style={{ fontSize: isDesktopLayout ? '1rem' : '0.8em' }}
                        />
                        <Popup
                          trigger={
                            <NavLink
                              to={`/Administration/Employer/Gig/Wizard/${companyGigItems.profileId}`}
                            >
                              <Button icon className="sg-red-bg-color" style={{ fontSize: isDesktopLayout ? '1rem' : '0.8em' }}>
                                <Icon name='add' />
                              </Button>
                            </NavLink>
                          }
                          content='Post a Gig'
                        />
                      </div>
                      <List.Content className="pad-equal0">
                        <Header as='h2' dividing className="heading02">
                          Our Gigs
                          <span className="ui bg-grey05 circular label txt-wht">{companyGigItems && companyGigItems.totalCount ? companyGigItems.totalCount : 0}</span>
                        </Header>
                      </List.Content>
                    </List.Item>
                  </List>
                  {
                    isProfileLoading ?
                      <Loader active inline='centered' size='large' /> :
                        <Grid.Column width={4} className="ui grid stackable container cards mrg-tp02">
                          {
                            companyGigItems && companyGigItems.gigs ?
                              companyGigItems.gigs.map((item: any) =>
                                <GigCard
                                  expiresOn={item.expiryDate}
                                  gigRole={item.title}
                                  gigLocation={item.location}
                                  viewCount={item.totalViews}
                                  bidCount={item.proposalCount}
                                  key={item.jobOrderId}
                                  gigStatus={item.jobOrderStatusId}
                                  gigId={item.jobOrderId}
                                />
                              ) : null
                          }
                        </Grid.Column>
                  }
                </Card.Content>
              </Card>
              <Segment basic textAlign='center' className="add-top-xs-padding mobile-hide">
                {
                  companyGigItems && companyGigItems.gigs && companyGigItems.gigs.length ?
                    <Pagination
                      activePage={companyGigItems.pageNumber}
                      totalPages={totalPages}
                      ellipsisItem={isDesktopLayout ? { content: <Icon name='ellipsis horizontal' />, icon: true } : null}
                      firstItem={isDesktopLayout ? 'First' : null}
                      lastItem={isDesktopLayout ? 'Last' : null}
                      prevItem={isDesktopLayout ? 'Prev' : undefined}
                      nextItem={isDesktopLayout ? 'Next' : undefined}
                      onPageChange={(e: any, activePage: any) => this.handlePaginationChange(e, activePage)}
                      style={{ fontSize: isDesktopLayout ? '1rem' : '0.9rem' }}
                    /> : null
                }
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
      </ContentWrapperWithHeader>
    );
  }
}

export default (withLocalize(CompanyProfilePageUI) as any);