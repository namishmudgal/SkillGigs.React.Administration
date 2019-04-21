import * as React from 'react';
import SGHeader from '../../common/containers/Header';
import Footer from '../../common/containers/Footer';
import MobileLoggedInNavigation from '../../common/components/header/MobileLoggedInNavigation';
import { connect } from 'react-redux';
import {
  logoutSession,
} from 'src/shared/SkillGigs.React.Redux/administration/redux/actions/ItemsAction';
import { Header, Image } from 'semantic-ui-react';

interface Props extends React.Props<ContentWrapperEmployerEdit> {
    children: any;
    activeState: number;
    companyProfileItems: any;
    isMobileHeaderMenuOpened: boolean;
    onLogoutSession(): void;
    callbackFromParent(activeState: number): void;
}

class ContentWrapperEmployerEdit extends React.Component<Props, {}> {
  render() {
    const {
      children,
      isMobileHeaderMenuOpened,
      onLogoutSession,
      companyProfileItems,
      callbackFromParent,
      activeState
    } = this.props;
    return (
      <div className="body-content">
        <MobileLoggedInNavigation
          isMobileHeaderMenuOpened={isMobileHeaderMenuOpened}
          onLogoutSession={onLogoutSession}
        />
        <div id="site-content">
          <div className="stiky-mb" style={{ top: '0' }}>
            <SGHeader />
            <div className="ui fluid mobile only mrg-tp68mb wfull">
              <div className="bg-white ">
                <div className="content hdr-ht-fix rdus-rmv ">
                    <div className="header fluid">
                      <div className="ui three column grid mrg-btm-rmv">
                          <div className="column">
                            <div className="ui fluid center">
                                <Image className="centered tiny circular avtr" src={companyProfileItems && companyProfileItems.pictureUrl && companyProfileItems.pictureUrl !== '' ? `https://s3.amazonaws.com/dev.content.skillgigs.com${companyProfileItems.pictureUrl}` : require('../../../assets/images/building.svg')} alt={companyProfileItems.preferredName} />
                            </div>
                          </div>
                          <div className="eleven mrg-tp02">
                            <div className="ui fluid ">
                                <div className="content profil-nam">
                                  <Header as="h2" className="mrg-rmv">{companyProfileItems.preferredName}</Header>
                                </div>
                            </div>
                          </div>
                      </div>
                    </div>
                </div>
              </div>
          </div>
          <div className="ui card fluid rdus-none mrg-eq0mb mobile only">
            <div className="ui secondary fluid vertical pointing menu mrg-tp02 mrg-btm02 fnt12-tb fnt12-mb tab-mb mrg-eq0mb">
              <a onClick={() => callbackFromParent(0)} className={`item ${activeState === 0 ? 'active' : 'txt-grey02'}`}>
              Personal Info
              </a>
              <a onClick={() => callbackFromParent(1)} className={`item ${activeState === 1 ? 'active' : 'txt-grey02'}`}>
              Company Info
              </a>
              <a onClick={() => callbackFromParent(2)} className={`item ${activeState === 2 ? 'active' : 'txt-grey02'}`}>
              Change Password
              </a>
            </div>
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
  children: ownProps.children,
  companyProfileItems: ownProps.companyProfileItems,
  activeState: ownProps.activeState,
  callbackFromParent: ownProps.callbackFromParent
});

const mapDispatchToProps = (dispatch: any) => ({
  onLogoutSession: () => dispatch(logoutSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentWrapperEmployerEdit);