import * as React from 'react';
import SGHeader from '../../common/containers/Header';
import Footer from '../../common/containers/Footer';
import MobileLoggedInNavigation from '../../common/components/header/MobileLoggedInNavigation';
import { connect } from 'react-redux';
import {
  logoutSession,
} from 'src/redux/actions/ItemsAction';
import { Button, Icon, Grid, Header, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

interface Props extends React.Props<ContentWrapperListings> {
    children: any;
    isMobileHeaderMenuOpened: boolean;
    isLoggedIn: boolean;
    marginBottom: boolean;
    skillListingItems: any;
    onLogoutSession(): void;
}

class ContentWrapperListings extends React.Component<Props, {}> {
  render() {
    const {
      children,
      isMobileHeaderMenuOpened,
      onLogoutSession,
      isLoggedIn,
      marginBottom,
      skillListingItems
    } = this.props;
    return (
      <div className="body-content">
        {
          isLoggedIn ?
            <MobileLoggedInNavigation
              isMobileHeaderMenuOpened={isMobileHeaderMenuOpened}
              onLogoutSession={onLogoutSession}
            /> : null
        }
        <div id="site-content" className={marginBottom ? 'large-only-mrg-tp60' : ''}>
          <div className="stiky-mb" style={{ top: '0' }}>
            <SGHeader
              isSkillListingHeader={true}
            />
            <div className="ui fluid mobile only top06 wfull btm-bx-shdw">
              <div className="bg-white ">
                <div className="hdr-ht-fix rdus-rmv ">
                  <div className="header fluid">
                    <Grid className="three column mrg-btm-rmv">
                        <div className="column">
                          <div className="ui fluid center mrg-tp02mb">
                            <Image size='tiny' circular centered avatar className="avtr" src={skillListingItems && skillListingItems.profiles && skillListingItems.profiles.pictureUrl && skillListingItems.profiles.pictureUrl !== '' ? `https://s3.amazonaws.com/dev.content.skillgigs.com${skillListingItems.profiles.pictureUrl}` : require('../../../assets/images/gravtar.svg')} alt={skillListingItems.preferredName} />
                          </div>
                        </div>
                        <div className="eleven mrg-tp02mb">
                          <div className="ui fluid ">
                              <div className="profil-nam">
                                <Header as="h2" className="mrg-rmv">{skillListingItems.talentPreferredName}</Header>
                                <span className="txt-pink01 fnt01 mrg-rgt01">
                                  <Icon name="suitcase" /><span id="lblExperienceLevelName">{skillListingItems.experienceLevelName}</span>
                                </span>
                                <span className="txt-pink01 fnt01">
                                  <Icon name="money" />
                                  <span>
                                    $<span id="lblBudget">${skillListingItems.bidCount > 0 ? skillListingItems.bid[0].rate : 0}</span>/<span id="lblBudgetTypeCode">{skillListingItems.budgetTypeName}</span>
                                  </span>
                                </span>
                              </div>
                          </div>
                        </div>
                    </Grid>
                  </div>
                </div>
                <Grid className="one column stackable center aligned page line-ht25">
                  <Grid.Column width="12">
                    <NavLink
                      to={`/Administration/Talent/Resume/${skillListingItems.consultantUrlFriendlyName}`}
                      className="ui positive btn-pink txt-wht button bdr-rdus-rmv"
                      style={{ fontSize: '1rem' }}
                    >
                      View 3D Resume
                    </NavLink>
                  </Grid.Column>
                </Grid>
              </div>
              <Button.Group widths='3' className="top attached hide-element">
                <Button color="black"><Icon name="phone" /></Button>
                <Button color="red"><Icon name="percent" /></Button>
                <Button color="grey"><Icon name="list" /></Button>
              </Button.Group>
            </div>
            </div>
            {children}
          </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  isMobileHeaderMenuOpened: state.admin.isMobileHeaderMenuOpened,
  isLoggedIn: state.admin.auth.loginSuccess,
  children: ownProps.children,
  marginBottom: ownProps.marginBottom,
  skillListingItems: ownProps.skillListingItems
});

const mapDispatchToProps = (dispatch: any) => ({
  onLogoutSession: () => dispatch(logoutSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentWrapperListings);