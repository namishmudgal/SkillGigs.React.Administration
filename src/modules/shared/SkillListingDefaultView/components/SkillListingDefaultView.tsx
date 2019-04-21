import * as React from 'react';
import { List, Segment, Header, Icon, Label } from 'semantic-ui-react';
import SkillListingModals from '../../../shared/SkillListingModals';

interface Props {
  skillListingItems: any;
	appName: string;
	isLoggedIn: boolean;
}

export default class SkillListingDefaultView extends React.Component<Props, any> {
  render() {
    const {
      skillListingItems,
			appName,
			isLoggedIn,
    } = this.props;
    return (
			<Segment basic className="skillListing partial pad-tp0 blk-cnt">
				<List verticalAlign='middle'>
					<List.Item>
						<div className="right floated">
							<a href="#"><Icon name="edit" className="txt-pink01 mrg-tp01 t-mtb1" /></a>
						</div>
						<List.Content>
							<Header as="h2" dividing className="heading02">
								{skillListingItems.title}
							</Header>
							<div className="right floated">
								<a href="#"><Icon name="edit" className="txt-pink01 mrg-tp01 t-mtb1" /></a>
							</div>
							<p className="pad-tp01">
								{skillListingItems.profiles ? skillListingItems.profiles.objective : ''}
							</p>
						</List.Content>
					</List.Item>
				</List>
				<List verticalAlign='middle'>
					<List.Item>
						<div className="right floated">
							<a href="#"><Icon name="edit" className="txt-pink01 mrg-tp01" /></a>
						</div>
						<List.Content>
							<Header as="h2" dividing className="heading02">
									Primary Skills
							</Header>
							<Label.Group>
								{
									skillListingItems.skill && skillListingItems.skill.length ?
										skillListingItems.skill.map((item: any, index: number) => <Label key={index} color="blue">{item.skillName}</Label>) : null
								}
							</Label.Group>
						</List.Content>
					</List.Item>
				</List>
				<List verticalAlign='middle'>
					<List.Item>
						<div className="right floated">
							<a href="#"><Icon name="edit" className="txt-pink01 mrg-tp01" /></a>
						</div>
						<List.Content>
							<Header as="h2" dividing className="heading01">
									Primary Info
							</Header>
							<Label.Group size='large'>
								{skillListingItems.profiles && skillListingItems.profiles.locationWithCountry !== '' ? <Label color="blue" className="btn-grey-rdus">{skillListingItems.profiles.locationWithCountry }</Label> : null}
								{skillListingItems.jobOrderTypeName ? <Label color="blue" className="btn-grey-rdus">{`${skillListingItems.jobOrderTypeName} Skill Listing`}</Label> : null}
								{skillListingItems.profiles ? <Label color="blue" className="btn-grey-rdus">{skillListingItems.profiles.visaStatusName }</Label> : null}
							</Label.Group>
						</List.Content>
					</List.Item>
				</List>
				<List verticalAlign='middle'>
					<List.Item>
						<div className="right floated">
							<a href="#"><Icon name="edit" className="txt-pink01 mrg-tp01" /></a>
						</div>
						<List.Content>
							<Header as="h2" dividing className="heading01">
									Willing to Relocate
							</Header>
							<Label.Group>
							{
								skillListingItems.locations && skillListingItems.locations.length ?
									skillListingItems.locations.map((item: any, index: number) => <Label key={index} className="btn-grey-rdus">{item.locationWithCountry}</Label>) : null
							}
							</Label.Group>
						</List.Content>
					</List.Item>
				</List>
				<List verticalAlign='middle'>
					<List.Item>
						<div className="right floated">
							<a href="#"><Icon name="edit" className="txt-pink01 mrg-tp01" /></a>
						</div>
						<List.Content>
							<Header as="h2" dividing className="heading01">
								What {skillListingItems.talentPreferredName} is looking for...
							</Header>
							<p>{skillListingItems.description}</p>
						</List.Content>
					</List.Item>
					{
						appName === "TalentMarketplace" && isLoggedIn ?
							<SkillListingModals /> : null
					}
				</List>
			</Segment>
    );
  }
}
