import * as React from 'react';
import { List, Header, Icon, Label } from 'semantic-ui-react';
import SkillListingModals from '../../../shared/SkillListingModals';

interface Props {
	items: any;
	isLoggedIn: boolean;
}

export default class RequiredSkillsDefaultView extends React.Component<Props, any> {
  render() {
    const {
		items,
			isLoggedIn,
    } = this.props;
    return (
			<List verticalAlign='middle'>
				<List.Item>
					<List.Content>
						<Header as="h2" dividing className="heading01">
							Required Skills
						</Header>
						<Label.Group>
						{
							items.requiredSkills && items.requiredSkills.length ?
								items.requiredSkills.map((item: any, index: number) => <Label key={index} color="blue">{item.skillName}</Label>) : null
						}
						</Label.Group>
					</List.Content>
				</List.Item>
			</List>
    );
  }
}
