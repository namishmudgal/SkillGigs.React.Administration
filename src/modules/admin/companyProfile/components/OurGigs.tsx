import * as React from 'react';
import { Grid, Card, Header, List } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";
import GigCard from '../../../common/components/GigCard';
import { NavLink } from 'react-router-dom';

interface Props {
    addTranslation: any;
		initialize: any;
		gigItems: any;
		match: any;
}

class OurGigs extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.props.addTranslation(anonymousTranslations);
  }

  render() {
		const {
			gigItems,
			match
		} = this.props;
    return (
			<Grid.Column width={16}>
				<Card fluid className="rdus-none right pad-equal0">
					<Card.Content>
						<List className="middle aligned">
							<List.Item>
								<List.Content floated='right'>
									<NavLink
										to={`/Administration/Employer/Manage/Gigs/${match.params.id}`}
										className="txt-pink01"
									>
										View All Gigs
									</NavLink>
								</List.Content>
								<List.Content className="pad-equal0">
									<Header as='h2' dividing className="heading02">
										Our Gigs
										<span className="ui bg-grey05 circular label txt-wht">{gigItems && gigItems.totalCount ? gigItems.totalCount : 0}</span>
									</Header>
								</List.Content>
							</List.Item>
						</List>
						<Grid.Column width={4} className="ui grid stackable container cards mrg-tp02">
							{
								gigItems && gigItems.gigs ?
									gigItems.gigs.map((item: any, index: number) => {
										if (index < 4) {
											return (
												<GigCard
													expiresOn={item.expiryDate}
													gigRole={item.title}
													gigLocation={item.location}
													viewCount={item.totalViews}
													bidCount={item.proposalCount}
													key={item.jobOrderId}
													gigStatus={item.jobOrderStatusId}
													gigId={item.jobOrderId}
												/>
											);
										}
										return;
									}) : null
							}
						</Grid.Column>
					</Card.Content>
				</Card>
			</Grid.Column>
    );
  }
}

export default (withLocalize(OurGigs) as any);