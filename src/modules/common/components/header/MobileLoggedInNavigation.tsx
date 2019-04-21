import * as React from 'react';
import { Menu } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as globalTranslations from "../../../../translations/global.json";
import { NavLink } from 'react-router-dom';

interface MobileLoggedInNavigationProps {
    addTranslation: any;
		initialize: any;
		isMobileHeaderMenuOpened: boolean;
		onLogoutSession(): void;
		toggleHeaderMenu(): void;
}

class MobileLoggedInNavigation extends React.Component<MobileLoggedInNavigationProps, any> {
	constructor(props: any) {
    super(props);
		this.props.addTranslation(globalTranslations);
  }
   render() {
		const {
			isMobileHeaderMenuOpened,
			onLogoutSession,
		} = this.props;
    return (
			<Menu className={`left vertical sidebar overlay uncover animating ${isMobileHeaderMenuOpened ? 'visible' : null}`} style={{zIndex: '99'}}>
				<NavLink
					to={'/Administration/dashboard'}
					className="item"
					title="Dashboard"
				>
					Dashboard
				</NavLink>
        <div className="item">
          <div className="ui small active"> <i className="block layout icon" /> Manage</div>
          <div className="menu">
						<NavLink
							to={'/Messages'}
							className="item"
							title="Employer Messages"
						>
							Employer Messages
						</NavLink>
						<NavLink
							to={'/Administration/Employer/Manage/Gigs/22'}
							className="item"
							title="Employer Listings"
						>
							Employer Listings
						</NavLink>
						<NavLink
							to={'/Talent/Manage/Interviews'}
							className="item"
							title="Employer Interviews"
						>
							Employer Interviews
						</NavLink>
						<NavLink
							to={'/Talent/Manage/Bids'}
							className="item"
							title="Employer Bids"
						>
							Employer Bids
						</NavLink>
						<NavLink
							to={'/Talent/Manage/Watchlist'}
							className="item"
							title="Employer Favorites"
						>
							Employer Favorites
						</NavLink>
						<NavLink
							to={'/Talent/Manage/Watchlist'}
							className="item"
							title="Employer Favorites"
						>
							Employer Favorites
						</NavLink>
						<NavLink
							to={'/Administration/Employer/Manage/Team/22'}
							className="item"
							title="Employer Team"
						>
							Employer Team
						</NavLink>
          </div>
        </div>
				<NavLink
					to={'/Talent/Search'}
					className="item"
					title="Search"
				>
					Search
				</NavLink>
				<NavLink
					to={'/TalentV2/SkillListing/Wizard/Information'}
					className="active red-bg-color item"
					title="Get A Job"
				>
					Get A Job
				</NavLink>

				<div className="item">
					<div className="ui small active txt-pink01"> <i className="user icon" />Saachi Roye</div>
					<div className="menu">
						<NavLink
							to={'/Talent/Account/Settings'}
							className="item"
							title="Account Settings"
						>
							Account Settings
						</NavLink>
						<NavLink
							to={'/Administration/Talent/Resume/Start'}
							className="item"
							title="Edit 3D Resume"
						>
							Edit 3D Resume
						</NavLink>
						<NavLink
							to={'/Talent/Invite/Friends'}
							className="item"
							title="Invite Friends"
						>
							Invite Friends
						</NavLink>
						<a
							onClick={onLogoutSession}
							className="item"
							title="Sign Out"
						>
							Sign Out
						</a>
					</div>
				</div>
			</Menu>
		);
  }
}

export default (withLocalize(MobileLoggedInNavigation) as any);