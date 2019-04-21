import * as React from 'react';
import { Form, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { Translate } from "react-localize-redux";

export const SignUpForm: React.StatelessComponent<{}> = () => {
	return (
		<Form size="large" className="pad-eq20mb">
			<div className="ui stacked">
				<Form.Group widths={2} className="mrg-tp03">
					<Form.Field>
						<Image centered src={require('../../../../assets/images/icons/talent.svg')} size="small" style={{  width: "120px" }} />
						<NavLink
							to={'/SignUp/Talent'}
							className="ui fluid large main-primary submit button rdus-none mrg-tp04"
						>
							<Translate id="signup.talentBtnText" />
						</NavLink>
					</Form.Field>
					<Form.Field>
						<Image centered src={require('../../../../assets/images/icons/employer.svg')} size="small" style={{  width: "120px" }} />
						<NavLink
							to={'/SignUp/Employer'}
							className="ui fluid large main-primary submit button rdus-none mrg-tp04"
						>
							<Translate id="signup.employerBtnText" />
						</NavLink>
					</Form.Field>
				</Form.Group>
				<p className="mrg-tp07 underline fnt02 highlight center aligned">
					<NavLink
						to={'/SignIn'}
						className="animate-line"
					>
						<Translate id="signup.alreadyAccountText" />
					</NavLink>
				</p>
			</div>
		</Form>
	);
};