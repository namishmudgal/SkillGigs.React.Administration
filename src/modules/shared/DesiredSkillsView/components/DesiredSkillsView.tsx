import * as React from 'react';
import { List, Segment, Header, Icon, Label, Item, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

interface Props {
  items: any;
	isLoggedIn: boolean;
}

export default class DesiredSkillsView extends React.Component<Props, any> {
  render() {
    const {
      items,
			isLoggedIn
    } = this.props;
    return (
			<List verticalAlign='middle'>
				<List.Item>
					<List.Content>
						<Header as="h2" dividing className="heading01">
						Desired Skills
						</Header>
						<Label.Group>
						{
							items.optionalSkills && items.optionalSkills.length ?
								items.optionalSkills.map((item: any, index: number) => <Label key={index} color="blue">{item.skillName}</Label>) : null
						}
						</Label.Group>
					</List.Content>
				</List.Item>
			</List>
    );
  }
}
