import * as React from 'react';
import LoggedInLargeHeader from './LoggedInLargeHeader';
import LoggedInMobileHeader from './LoggedInMobileHeader';
import { Container } from 'semantic-ui-react';

interface HeaderUIProps {
    isLoggedIn: boolean;
    userInfo: any;
    socialProfilePicURL: string;
    isSkillListingHeader: boolean;
    isDesktopLayout: boolean;
    onCheckCredentials(username: any, password: any): void;
    toggleHeaderMenu(): void;
    onLogoutSession(): void;
}

export default class HeaderUI extends React.Component<HeaderUIProps, any> {
  constructor(props: any) {
    super(props);
		this.state = {
			activeIndex: null,
			signUpImg: 'signuparrow-red.png'
		};
  }
  render() {
    const {
      isLoggedIn,
      onLogoutSession,
      userInfo,
      socialProfilePicURL,
      isSkillListingHeader,
      isDesktopLayout
    } = this.props;
    return (
        <header
          className={
            isLoggedIn ?
            'ui inverted grey-bg-color center header segment no-border-radius remove-top-margin remove-padding' :
              isSkillListingHeader ? 'ui inverted grey-bg-color center header segment no-border-radius remove-top-margin remove-padding' : isDesktopLayout ? 'ui inverted grey-bg-color center header segment no-border-radius remove-top-margin remove-padding' : 'sg-sticky-menu'
          }
        >
          <LoggedInLargeHeader
            onLogoutSession={onLogoutSession}
            userInfo={userInfo}
            socialProfilePicURL={socialProfilePicURL}
          />
          <LoggedInMobileHeader
            toggleHeaderMenu={this.props.toggleHeaderMenu}
          />
				</header>
    );
  }
}