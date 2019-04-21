import * as React from 'react';
import { Grid, Container, Card, Segment, Header, Icon, Image, Menu} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

interface Props {
  skillListingItems: any;
  appName: string;
}

export default class SkillListingCertifications extends React.Component<Props, any> {
  render() {
    const {
      skillListingItems,
      appName,
    } = this.props;
    return (
			<div>
				<div className="ui small modal skilllisting fullstack bdr-rdus-rmv long leaf">
						<i className="close cross icon" />
						<div className="header">
								Title
						</div>
						<div className="content">
								<div className="ui form title">
									<div className=" large field required">
											<label>Title:</label>
											<div className="ui search ">
												<div className="ui large icon input">
														<input type="text" id="txtTitle" name="Title" className="prompt" placeholder="Improve your chances of getting multiple offers by calling out your top 3 achievements. Here is an example: 5 years of hands on experience at top brands such as apple facebook etc., 3 years of experience with Dev Ops, implementing..." value="Testing Published Date 2" />
												</div>
												<div className="results" />
											</div>
									</div>
									<div className="ui error message" />
								</div>
						</div>
						<div className="actions right aligned">
								<div className="ui buttons">
									<button className="ui deny button">Cancel</button>
									<div className="or" />
									<button className="ui positive btn-pink txt-wht button bdr-rdus-rmv " id="btnUpdateTitle">Save</button>
								</div>
						</div>
					</div>
					<div className="ui small modal skilllisting objective bdr-rdus-rmv long leaf">
						<i className="close cross icon" />
						<div className="header">
								Career Summary
						</div>
						<div className="content">
								<div className="ui form careerobjective">
									<div className=" large field required">
											<label>Career Summary:</label>
											<div className="ui large input">
												<textarea id="txtObjective" name="Objective" placeholder="">JQA</textarea>
											</div>
									</div>
									<div className="ui error message" />
								</div>
						</div>
						<div className="actions right aligned">
								<div className="ui buttons">
									<button className="ui deny button">Cancel</button>
									<div className="or" />
									<button className="ui positive btn-pink txt-wht button bdr-rdus-rmv " id="btnUpdateObjective">Save</button>
								</div>
						</div>
					</div>
					<div className="ui small modal skilllisting primskills bdr-rdus-rmv long leaf">
						<i className="close cross icon" />
						<div className="header">
								Primary Skills
						</div>
						<div className="content">
								<div className="ui form skills">
									<div className="field">
											<div className=" field required">
												<label>Add Your Skill(s):</label>
												<div className="ui large input">
														<div className="ui fluid search dropdown multiple selection">
															<select id="ddlSkills" name="skills">
																	<option value="" />
																	<div className="results" />
																	<option value="55" className="addition">55</option>
																	<option value="225" className="addition">225</option>
																	<option value="641" className="addition">641</option>
															</select>
															<i className="dropdown icon" /><a className="ui label transition visible" data-value="55" style={{display: 'inline-block'}}>Java<i className="delete icon" /></a>
															<a className="ui label transition visible" data-value="225" style={{display: 'inline-block'}}>Jdbc<i className="delete icon" /></a>
															<a className="ui label transition visible" data-value="641" style={{display: 'inline-block'}}>Java Database Connectivity<i className="delete icon" /></a>
															<input className="search" /><span className="sizer" />
															<div className="text" />
															<div className="menu transition hidden">
																	<div className="item active filtered" data-value="55" data-text="Java">Java</div>
																	<div className="item active filtered" data-value="225" data-text="Jdbc">Jdbc</div>
																	<div className="item active filtered" data-value="641" data-text="Java Database Connectivity">Java Database Connectivity</div>
															</div>
														</div>
												</div>
											</div>
									</div>
									<div className="ui error message" />
								</div>
						</div>
						<div className="actions right aligned">
								<div className="ui buttons">
									<button className="ui deny button">Cancel</button>
									<div className="or" />
									<button className="ui positive btn-pink txt-wht button bdr-rdus-rmv" id="btnUpdateSkills">Save</button>
								</div>
						</div>
					</div>
					<div className="ui small modal skilllisting priminfo bdr-rdus-rmv long leaf">
						<i className="close cross icon" />
						<div className="header">Primary Info</div>
						<div className="content">
								<div className="ui form primaryinfo">
									<div className=" field required">
											<label>Your Current Location:</label>
											<div className="ui large input">
												<div className="ui fluid search dropdown  selection">
														<select id="ddlCurrentLocation" name="currentLocation">
															<option value="">For e.g. Houston, TX</option>
															<div className="results" />
															<option value="18563" className="addition">18563</option>
														</select>
														<i className="dropdown icon" /><input className="search" />
														<div className="text">Houston, PA</div>
														<div className="menu">
															<div className="item active selected" data-value="18563" data-text="Houston, PA">Houston, PA</div>
														</div>
												</div>
											</div>
									</div>
									<div className="two fields">
											<div className=" field required">
												<label>Job Types:</label>
												<div className="ui large input">
														<div className="ui fluid dropdown  selection">
															<select id="ddlJobTypes" name="type">
																	<option value="">Select a Type</option>
																	<option value="C">Contract</option>
																	<option value="P">Permanent</option>
																	<option value="D">Per Diem</option>
															</select>
															<i className="dropdown icon" />
															<div className="text">Permanent</div>
															<div className="menu">
																	<div className="item" data-value="C">Contract</div>
																	<div className="item active selected" data-value="P">Permanent</div>
																	<div className="item" data-value="D">Per Diem</div>
															</div>
														</div>
												</div>
											</div>
											<div className="field ">
												<label className="mobile-hide">&nbsp;</label>
												<div className="ui toggle checkbox mrg-tp01">
														<input type="checkbox" id="chkRemotely" name="remote" checked />
														<label>Work Remotely</label>
												</div>
											</div>
									</div>
									<div className=" large field ">
											<label className="mobile-hide">Stealth Mode - Hide me from these employers</label>
											<label className="largescreen-hide">Stealth Mode - Hide me from these employers</label>
											<div className="ui large input">
												<input type="text" id="txtIncognito" name="incognito" placeholder="For e.g. http://companyname.com" value="" className="" />
											</div>
									</div>
									<div className="contractFields field" style={{display: 'none'}}>
											<div className=" large field required">
												<label className="mobile-hide">Desired Salary:</label>
												<label className="largescreen-hide">Desired Salary:</label>
												<div className="ui large labeled input">
														<label className="ui label line-ht30">HOURLY</label>
														<input type="text" id="txtContractSalary" name="contractSalary" placeholder="For e.g. 250.00, please don't add dollar sign or comma" value="321" className="money" />
												</div>
											</div>
											<div className="ui clearing center aligned green segment" id="clientRateSegment">
												<div className="ui grid container mrg-tp5">
														<div className="seven wide column sg-transparency">
															<div>SkillGig</div>
															<span> Transparency</span>
														</div>
														<div className="two wide column sg-transparency"><i className="arrow right icon" /></div>
														<div className="seven wide column sg-transparency">
															<div className="value" id="clientRate">$0.00</div>
															<span> Billed to Client</span>
														</div>
												</div>
											</div>
									</div>
									<div className="permanentFields field">
											<div className=" large field required">
												<label className="mobile-hide">Desired Salary:</label>
												<label className="largescreen-hide">Desired Salary:</label>
												<div className="ui large labeled input">
														<label className="ui label line-ht30">YEARLY</label>
														<input type="text" id="txtPermanentSalary" name="permanentSalary" placeholder="For e.g. 50250.00, please don't add dollar sign or comma" value="321"className="money" />
												</div>
											</div>
									</div>
									<div className=" field required">
											<label>Years of Experience:</label>
											<div className="ui large input">
												<div className="ui fluid dropdown  selection">
														<select id="ddlExperiences" name="experience">
															<option value="">Select One</option>
															<option value="1">Less than 1 year (or student)</option>
															<option value="2" selected>1-2 years</option>
															<option value="3">3-5 years</option>
															<option value="4">6-10 years</option>
															<option value="5">More than 10 years</option>
														</select>
														<i className="dropdown icon" />
														<div className="text">1-2 years</div>
														<div className="menu">
															<div className="item" data-value="1">Less than 1 year (or student)</div>
															<div className="item active selected" data-value="2">1-2 years</div>
															<div className="item" data-value="3">3-5 years</div>
															<div className="item" data-value="4">6-10 years</div>
															<div className="item" data-value="5">More than 10 years</div>
														</div>
												</div>
											</div>
									</div>
									<div className="ui error message" />
								</div>
						</div>
						<div className="actions right aligned">
								<div className="ui buttons">
									<button className="ui deny button">Cancel</button>
									<div className="or" />
									<button className="ui positive btn-pink txt-wht button bdr-rdus-rmv" id="btnUpdatePrimaryInfo">Save</button>
								</div>
						</div>
					</div>
					<div className="ui small modal skilllisting primlocation bdr-rdus-rmv long leaf">
						<i className="close cross icon" />
						<div className="header">
								Willing to Relocate
						</div>
						<div className="content">
								<div className="ui form locations">
									<div className="field">
											<div className=" field required">
												<label>Add Location(s) you want to work remotely or relocate to as well:</label>
												<div className="ui large input">
														<div className="ui fluid search dropdown multiple selection">
															<select id="ddlLocations" name="locations" multiple>
																	<option value="">For e.g. Houston, TX</option>
																	<div className="results" />
																	<option value="9487" className="addition">9487</option>
																	<option value="11109" className="addition">11109</option>
															</select>
															<i className="dropdown icon" /><a className="ui label transition visible" data-value="9487" style={{display: 'inline-block'}}>Houston, MS<i className="delete icon" /></a>
															<a className="ui label transition visible" data-value="11109" style={{display: 'inline-block'}}>Houston, TX<i className="delete icon" /></a>
															<input className="search" /><span className="sizer" />
															<div className="default text">For e.g. Houston, TX</div>
															<div className="menu transition hidden">
																	<div className="item active filtered" data-value="9487" data-text="Houston, MS">Houston, MS</div>
																	<div className="item active filtered" data-value="11109" data-text="Houston, TX">Houston, TX</div>
															</div>
														</div>
												</div>
											</div>
											<div className="ui error message" />
									</div>
								</div>
						</div>
						<div className="actions right aligned">
								<div className="ui buttons">
									<button className="ui deny button">Cancel</button>
									<div className="or" />
									<button className="ui positive btn-pink txt-wht button bdr-rdus-rmv" id="btnUpdateLocations">Save</button>
								</div>
						</div>
					</div>
					<div className="ui small modal skilllisting lookingfor bdr-rdus-rmv long">
						<i className="close cross icon" />
						<div className="header">
								Description
						</div>
						<div className="content">
								<div className="ui form description">
									<div className=" large field ">
											<label>To get the best job offers, tell us what you want to do in your next job:</label>
											<div className="ui large input">
												<textarea id="txtDescription" name="description" placeholder="" />
											</div>
									</div>
								</div>
						</div>
						<div className="actions right aligned">
								<div className="ui buttons">
									<button className="ui deny button">Cancel</button>
									<div className="or" />
									<button className="ui positive btn-pink txt-wht button bdr-rdus-rmv" id="btnUpdateDescription">Save</button>
								</div>
						</div>
					</div>
			</div>
		);
  }
}
