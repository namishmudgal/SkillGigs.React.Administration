import * as React from 'react';
import { List, Segment, Header, Icon, Item, Button } from 'semantic-ui-react';

interface Props {
  resumeItems: any;
	appName: string;
	isLoggedIn: boolean;
}

export default class SkillListingCertifications extends React.Component<Props, any> {
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
								Certification &amp; Awards
							</Header>
							<Item.Group unstackable className="educationhistorydetails">
							{
								resumeItems.certificates && resumeItems.certificates.certificate.length ?
									resumeItems.certificates.certificate.map((item: any) =>
										<Item key={item.certificateId}>
											<div className="wfull">
												{
													appName === "TalentMarketplace" && isLoggedIn ?
														<div className="right floated">
															<a href="javascript:void()"><Icon name="edit" className="txt-pink01 t-mtb1" /></a>
															<a href="javascript:void()"><Icon name="delete" className="txt-pink01 t-mtb1" /></a>
														</div> : null
												}
												<div className="summary">
													<p>
														{item.description}
													</p>
												</div>
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
