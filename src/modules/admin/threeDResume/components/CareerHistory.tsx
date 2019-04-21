import * as React from 'react';
import { Grid, Card, Header, List, Label } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

interface Props {
    addTranslation: any;
		initialize: any;
		resumeItems: any;
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

class CareerHistory extends React.Component<Props, any> {
  constructor(props: any) {
		super(props);
		this.props.addTranslation(anonymousTranslations);
		this.state = {
			value: 0,
		};
	}
	handleChangeHorizontal = (value: any) => {
    this.setState({
			value
    });
  }
  render() {
		const horizontalLabels = {};
		if (this.props.resumeItems.careerRecords && this.props.resumeItems.careerRecords.careerRecord.length) {
			const array = this.props.resumeItems.careerRecords.careerRecord;
			array.sort((a: any, b: any) => {
				const dateA: any = new Date(a.startDate);
				const dateB: any = new Date(b.startDate);
				return dateA - dateB;
			});
			array.map((item: any, index: number) => {
				if (index > 0) {
					horizontalLabels[index] = item.endDate === '0001-01-01T00:00:00' || !item.endDate ? 'Current' : new Date(item.endDate).getFullYear();
				} else {
					horizontalLabels[index] = new Date(item.startDate).getFullYear();
				}
			});
		}
		const {
      resumeItems
		} = this.props;
		const createMarkup = (html: any) => {
			return {__html: html};
		};
    return (
			<Grid.Column width={16}>
				<Card fluid className="rdus-none right pad-equal0">
					<Card.Content>
						<List className="middle aligned">
							<List.Item>
								<List.Content className="pad-equal0">
									<Header as='h2' dividing className="heading02">
										Career History
									</Header>
								</List.Content>
							</List.Item>
						</List>
						<Slider
							min={0}
							max={this.props.resumeItems.careerRecords ? this.props.resumeItems.careerRecords.careerRecord.length - 1 : 0}
							value={this.state.value}
							labels={horizontalLabels}
							onChange={this.handleChangeHorizontal}
							className="sg-range-slider"
						/>
						<Grid.Column width={16} className="mrg-tp035 sg-careerHistory-box">
							{
								resumeItems.careerRecords && resumeItems.careerRecords.careerRecord.length ?
									resumeItems.careerRecords.careerRecord.map((item: any, index: number) =>
										<div className="ui unstackable mrg-tp03" key={item.careerRecordId} style={{ display : this.state.value === index ? 'block' : 'none' }}>
											<h2>{item.title} @ {item.companyName}</h2>
											<div className="meta date">
												{
													item.startDate ? `${monthNames[new Date(item.startDate).getMonth()]}, ${new Date(item.startDate).getFullYear()}` : ''
												}&nbsp;-&nbsp;
												{
													item.endDate === '0001-01-01T00:00:00' || !item.endDate ? 'Current' :
														`${monthNames[new Date(item.endDate).getMonth()]}, ${new Date(item.endDate).getFullYear()}`
												}
											</div>
											<h3 className="heading03 mrg-tp02">Role Description</h3>
											<p>{item.description}</p>
											<h3 className="heading03 mrg-tp02">Responsibilities:</h3>
											{
												item.responsibilities && item.responsibilities.responsibility.length ?
												<div
													dangerouslySetInnerHTML={createMarkup(item.responsibilities.items[0].description)}
												/> : <div />
											}
											<h3 className="heading03 mrg-tp02">Skill Strengths (Breakdown in Percentages)</h3>
											<Label.Group>
												{
													item.skills && item.skills.skill.length ?
														item.skills.skill.map((otherItem: any) =>
															<Label color="blue" key={otherItem.skillId}>
																{otherItem.skillName}
																<Label.Detail>{otherItem.skillPercent}%</Label.Detail>
															</Label>
														) : null
												}
											</Label.Group>
											<h4 className="heading03 mrg-tp02">Project Description</h4>
											<p>{item.projectDescription}</p>
										</div>
								) : 'No History Found'
							}
						</Grid.Column>
					</Card.Content>
				</Card>
			</Grid.Column>
    );
  }
}

export default (withLocalize(CareerHistory) as any);