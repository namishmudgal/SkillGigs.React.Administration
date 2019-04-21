import * as React from 'react';
import { List, Segment, Header, Icon, Label, Item, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

interface Props {
  resumeItems: any;
	appName: string;
	isLoggedIn: boolean;
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default class SkillListingWorkHistory extends React.Component<Props, any> {
  render() {
    const {
      resumeItems,
			appName,
			isLoggedIn
    } = this.props;
    return (
			<Segment basic className="workhistory pad-tp0 blk-cnt">
				<List verticalAlign='middle'>
					<List.Item>
						<List.Content>
							{
								isLoggedIn ?
									<Button.Group floated='right' size="mini" className="addworkhistory">
										<Button positive className="btn-pink txt-wht bdr-rdus-rmv mrgn-mbrgt10">
											Add Work
										</Button>
									</Button.Group> : null
							}
							{
								isLoggedIn ?
									<Button.Group floated='right' size="mini" className="cancelworkhistory">
										<Button positive className="btn-pink txt-wht bdr-rdus-rmv mrgn-mbrgt10">
											Cancel
										</Button>
									</Button.Group> : null
							}
							<Header as="h2" dividing className="heading02">
								Work History
							</Header>
							<Item.Group unstackable divided className="workhistorylist">
								{
									resumeItems.careerRecords && resumeItems.careerRecords.careerRecord.length ?
										resumeItems.careerRecords.careerRecord.map((item: any) =>
											<Item className="item-spc" key={item.careerRecordId}>
												<div className="wfull">
													{
														appName === "TalentMarketplace" && isLoggedIn ?
															<div className="right floated">
																<a href="javascript:void()"><Icon name="edit" className="txt-pink01 t-mtb1" /></a>
																<a href="javascript:void()"><Icon name="delete" className="txt-pink01 t-mtb1" /></a>
															</div> : null
													}
													<NavLink to="/" className="header heading03">
														{item.companyName}
													</NavLink>
													<Item.Meta className="date">
														{
															item.startDate ? `${monthNames[new Date(item.startDate).getMonth()]}, ${new Date(item.startDate).getFullYear()}` : ''
														}&nbsp;-&nbsp;
														{
															item.endDate === '0001-01-01T00:00:00' || item.endDate === null ? 'Current' :
																`${monthNames[new Date(item.endDate).getMonth()]}, ${new Date(item.endDate).getFullYear()}`
														}
													</Item.Meta>
													<p>Located in {item.locationWithCountry}</p>
													<h4 className="heading03 mrg-tp02">Skills Used</h4>
													<Label.Group>
														{
															item.skills && item.skills.skill.length ?
																item.skills.skill.map((skill: any) =>
																	<Label key={skill.skillId} color="blue">
																		{skill.skillName}
																		<Label.Detail>{skill.skillPercent}</Label.Detail>
																	</Label>
																) : null
														}
													</Label.Group>
													<h4 className="heading03 mrg-tp02">Responsibilities Given</h4>
													<List relaxed>
													{
														item.responsibilities && item.responsibilities.responsibility.length ?
														item.responsibilities.responsibility.map((respItem: any, index: number) =>
															<List.Item key={index}>
																{respItem.description}
															</List.Item>
														) : null
													}
													</List>
												</div>
											</Item>
										) : null
								}
							</Item.Group>
						</List.Content>
					</List.Item>
				</List>
			</Segment>
    );
  }
}
