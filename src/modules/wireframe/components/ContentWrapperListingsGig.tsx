import * as React from 'react';
import SGHeader from '../../common/containers/Header';
import Footer from '../../common/containers/Footer';
import MobileLoggedInNavigation from '../../common/components/header/MobileLoggedInNavigation';
import { connect } from 'react-redux';
import {
  logoutSession,
} from 'src/shared/SkillGigs.React.Redux/administration/redux/actions/ItemsAction';
import { Button, Icon, Grid, Header, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

interface Props extends React.Props<ContentWrapperListingsGig> {
    children: any;
    isMobileHeaderMenuOpened: boolean;
    isLoggedIn: boolean;
    marginBottom: boolean;
    gigListingItems: any;
    onLogoutSession(): void;
}

class ContentWrapperListingsGig extends React.Component<Props, {}> {
  render() {
    const {
      children,
      isMobileHeaderMenuOpened,
      onLogoutSession,
      isLoggedIn,
      marginBottom,
      gigListingItems
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
                            <Image size='tiny' circular centered avatar className="avtr" src={gigListingItems && gigListingItems.clientPictureUrl !== '' ? `https://s3.amazonaws.com/dev.content.skillgigs.com${gigListingItems.clientPictureUrl}` : require('../../../assets/images/gravtar.svg')} alt={gigListingItems.employerCompanyName} />
                          </div>
                        </div>
                        <div className="eleven mrg-tp02mb mrg-btm02">
                          <div className="ui fluid ">
                              <div className="profil-nam">
                                <Header as="h2" className="mrg-rmv">{gigListingItems.clientCompanyName}</Header>
                              </div>
                          </div>
                          <div className="ui basic mrg-rmv t-mtb1 pad-tp01">
                            <p><Icon name="share" /> Share This Gig</p>
                            <a href="https://stackexchange.com/sroye98/showcase-project" target="_blank">
                              <i className="profile-icn pad-equa02">
                                <img src={require('../../../assets/images/icons/facebook.svg')} />
                              </i>
                            </a>
                            <a href="https://stackexchange.com/sroye98/showcase-project" target="_blank">
                              <i className="profile-icn pad-equa02">
                                <img src={require('../../../assets/images/icons/linkedin.svg')} />
                              </i>
                            </a>
                            <a href="https://stackexchange.com/sroye98/showcase-project" target="_blank">
                              <i className="profile-icn pad-equa02">
                                <img src={require('../../../assets/images/icons/twitter.svg')} />
                              </i>
                            </a>
                          </div>
                          <NavLink to={`/Administration/Company/${gigListingItems.profileId}`} className="ui fluid button main-primary mrg-tp01" style={{ fontSize: '1rem' }}>
                            <Icon className="hide-tbt" name='eye' />VIEW PROFILE
                          </NavLink>
                        </div>
                    </Grid>
                  </div>
                </div>
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
  gigListingItems: ownProps.gigListingItems
});

const mapDispatchToProps = (dispatch: any) => ({
  onLogoutSession: () => dispatch(logoutSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentWrapperListingsGig);