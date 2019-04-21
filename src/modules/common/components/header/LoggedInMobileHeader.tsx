import * as React from 'react';
import { Menu, Grid } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as globalTranslations from "../../../../translations/global.json";

interface LoggedInMobileHeaderProps {
    addTranslation: any;
    initialize: any;
    onCheckCredentials(username: any, password: any): void;
    toggleHeaderMenu(): void;
}

class LoggedInMobileHeader extends React.Component<LoggedInMobileHeaderProps, any> {
  constructor(props: any) {
    super(props);
		this.props.addTranslation(globalTranslations);
  }
  render() {
    return (
			<Grid className="mobile tablet only remove-top-margin remove-padding">
				<Menu borderless inverted className="sg-grey-bg remove-bottom-margin remove-left-padding remove-right-padding" style={{ width: '100%' }}>
					<div className="item remove-left-padding remove-right-padding add-top-xxs-padding add-bottom-xxs-padding">
						<a href="/" title="SkillGigs">
							<img src={require('../../../../assets/images/mobile-logo-skillgigs.svg')} alt="SkillGigs" width="76" height="55" style={{ width: '76px', height: '55px' }} />
						</a>
					</div>
					<div className="right menu">
						<Menu.Item onClick={this.props.toggleHeaderMenu} href="javascript:void(0)" className="toggle-menu">
							<i className="bars icon" />
						</Menu.Item>
					</div>
				</Menu>
			</Grid>
		);
  }
}

export default (withLocalize(LoggedInMobileHeader) as any);