import * as React from 'react';
import { Grid, Card, Header, List, Image } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";
import Carousel from 'nuka-carousel';

interface Props {
    addTranslation: any;
		initialize: any;
		resumeItems: any;
}

class EducationHistory extends React.Component<Props, any> {
  constructor(props: any) {
		super(props);
    this.props.addTranslation(anonymousTranslations);
  }
  render() {
		const {
      resumeItems
    } = this.props;
    return (
			<Grid.Column width={16}>
				<Card fluid className="rdus-none right pad-equal0">
					<Card.Content>
						<List className="middle aligned">
							<List.Item>
								<List.Content className="pad-equal0">
									<Header as='h2' dividing className="heading02">
										Education History
									</Header>
								</List.Content>
							</List.Item>
						</List>
						<Carousel slidesToShow={1} slidesToScroll={1} className="education-slide" autoplay={resumeItems.educations && resumeItems.educations.education.length && resumeItems.educations.education.length > 1} speed={1000} autoplayInterval={2000} wrapAround={true} swiping={true}>
						{
							resumeItems.educations && resumeItems.educations.education.length ?
								resumeItems.educations.education.map((item: any) =>
									<Grid key={item.academicRecordId}>
										<Grid.Column width={16} className="center aligned mobile only">
											<Image src={require('../../../../assets/images/resume-education-badge.svg')} fluid style={{width: '400px'}} />
											<div className="education_year fnt08m">{item.yearCompleted}</div>
											<div className="education_school ">{item.courseTypeName}</div>
										</Grid.Column>
										<Grid.Column width={10} className="center aligned mobile hidden">
											<Image src={require('../../../../assets/images/resume-education-badge.svg')} fluid style={{width: '400px'}} />
											<div className="education_year fnt08m">{item.yearCompleted}</div>
											<div className="education_school ">{item.schoolName}</div>
										</Grid.Column>
										<Grid.Column width={6} className="mobile hidden">
										<div className="mrg-tp015 mobile hidden">
											<p>{item.courseTypeName}</p>
											<h2 className="txt-pink01 mrg-btm-rmv fnt24">{item.courseName}</h2>
										</div>
										</Grid.Column>
									</Grid>
							) : null
						}
						</Carousel>
					</Card.Content>
				</Card>
			</Grid.Column>
    );
  }
}

export default (withLocalize(EducationHistory) as any);