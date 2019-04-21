import * as React from 'react';
import { Menu, Grid, Dropdown, Image } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as globalTranslations from "../../../../translations/global.json";
import { NavLink } from 'react-router-dom';

interface LoggedInLargeHeaderProps {
  addTranslation: any;
	initialize: any;
	userInfo: any;
	socialProfilePicURL: string;
  onCheckCredentials(username: any, password: any): void;
  onLogoutSession(): void;
}

class LoggedInLargeHeader extends React.Component<LoggedInLargeHeaderProps, any> {
  constructor(props: any) {
    super(props);
		this.props.addTranslation(globalTranslations);
		this.state = {
			signUpImg: 'signuparrow-red.png'
		};
  }
  render() {
		const {
			onLogoutSession,
			userInfo,
			socialProfilePicURL
		} = this.props;
		const trigger = (
			<span>
				<Image avatar src={socialProfilePicURL !== '' ? socialProfilePicURL : userInfo && userInfo.data && userInfo.data.pictureUrl !== '' ? `https://s3.amazonaws.com/dev.content.skillgigs.com${userInfo.data.pictureUrl}` : require('../../../../assets/images/gravtar.svg')} /> {userInfo && userInfo.data && userInfo.data.preferredName ? userInfo.data.preferredName : ''}
			</span>
		);
    return (
		<Grid className="computer only large monitor widescreen monitor">
			<Grid.Column width={5} className="remove-bottom-padding">
				<a href="/" title="SkillGigs">
					<img src={require('../../../../assets/images/mobile-logo-skillgigs.svg')} alt="SkillGigs" width="76" height="55" />
				</a>
			</Grid.Column>
			<Grid.Column width={7} className="remove-bottom-padding">
				<Menu secondary inverted className="remove-top-margin">
					<Menu.Item>
						<NavLink
							to={'/Administration/dashboard'}
							className="item default-noRed"
							title="Dashboard"
						>
							Dashboard
						</NavLink>
						<Dropdown text='Manage' className="item">
							<Dropdown.Menu className="inverted">
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
									to={'/Administration/Employer/Manage/Team/22'}
									className="item"
									title="Employer Team"
								>
									Employer Team
								</NavLink>
							</Dropdown.Menu>
						</Dropdown>
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
							Get a Job
						</NavLink>
					</Menu.Item>
				</Menu>
			</Grid.Column>
			<Grid.Column width={4} className="remove-bottom-padding">
				<Menu inverted className="remove-top-margin secondary">
					<Menu.Item className="right">
						<NavLink
							to={'/Messages'}
							className="item"
							title="Unread Messages"
						>
							<i className="inbox icon" />
              <div className="floating ui red-bg-color circular label">{userInfo && userInfo.unreadMessageCount ? userInfo.unreadMessageCount : 0}</div>
						</NavLink>
						<Dropdown trigger={trigger} id="accountDesktop" className="item">
							<Dropdown.Menu>
								<NavLink
									to={'/Administration/Employer/Account/Edit/22?view=profileInfo'}
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
							</Dropdown.Menu>
						</Dropdown>
					</Menu.Item>
				</Menu>
			</Grid.Column>
		</Grid>
    );
  }
}

export default (withLocalize(LoggedInLargeHeader) as any);
