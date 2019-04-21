import * as React from 'react';
import { List, Segment, Header, Icon, Item, Button } from 'semantic-ui-react';

interface Props {
  resumeItems: any;
	appName: string;
	isLoggedIn: boolean;
}

export default class SkillListingEducationHistory extends React.Component<Props, any> {
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
											Add Education
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
								Education History
							</Header>
							<Item.Group unstackable className="educationhistorydetails">
							{
								resumeItems.educations && resumeItems.educations.education.length ?
									resumeItems.educations.education.map((item: any) =>
										<Item key={item.academicRecordId}>
											<div className="wfull">
												{
													appName === "TalentMarketplace" && isLoggedIn ?
														<div className="right floated">
															<a href="javascript:void()"><Icon name="edit" className="txt-pink01 t-mtb1" /></a>
															<a href="javascript:void()"><Icon name="delete" className="txt-pink01 t-mtb1" /></a>
														</div> : null
												}
												<div className="summary">
													<a className="txt-pink01">
														{item.courseTypeName}
													</a> from {item.schoolName}
												</div>
												<Item.Meta className="date">
													{
														item.yearCompleted
													}
												</Item.Meta>
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
