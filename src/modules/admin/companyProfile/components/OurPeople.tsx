import * as React from 'react';
import { Grid, Card, Header, Image, Icon } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";
import Carousel from 'nuka-carousel';
import { NavLink } from 'react-router-dom';

interface Props {
    addTranslation: any;
		initialize: any;
		isDesktopLayout: boolean;
		people: [];
		profileId: number;
}

class OurPeople extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.props.addTranslation(anonymousTranslations);
  }

  render() {
		const {
			isDesktopLayout,
			profileId
		} = this.props;
    return (
			<Grid.Column width={16}>
				<Card fluid className="rdus-none right pad-equal0">
					<Card.Content>
						<Header as='h2' dividing className="heading02">
							Our People
							<span className="right floated fnt06 txt-grey01"><NavLink to={`/Administration/Employer/PhotoManager/${profileId}?albumCode=2`} className="mrg-lft02"><Icon name="edit" className="txt-pink01 fnt04" /></NavLink></span>
						</Header>
						{
							this.props.people.length ?
								<Carousel slidesToShow={isDesktopLayout && this.props.people.length > 1 ? 3 : 1} slidesToScroll={isDesktopLayout ? 3 : 1} cellSpacing={60} slideWidth={this.props.people.length > 1 ? 0.9  : 1} className={this.props.people.length > 1 ? 'people-slide' : 'people-slide-empty'}>
									{
									this.props.people.map((ele: any, i: number) =>
										<Card key={i}>
											<Image
												src={`${ele.url ? ele.url : 'https://s3.amazonaws.com/dev.content.skillgigs.com/NodeJS/no-pic.png'}`}
												className="sg-people-gravatar"
												onError={
													(image: any) => {
														image.target.src = "https://s3.amazonaws.com/dev.content.skillgigs.com/NodeJS/no-pic.png";
													}
												}
											/>
											<Card.Content>
												<Card.Header className="fnt22">{ele.title && ele.title !== '' ? ele.title : <p>&nbsp;</p>}</Card.Header>
													<Card.Meta>
														<div className="fnt06 txt-balck mrg-tp5">{ele.description && ele.description !== '' ? ele.description :  <p>&nbsp;</p>}</div>
													</Card.Meta>
													<Card.Description className="txt-pink01 mrg-tp02">
													<NavLink
														to={`/Administration/Employer/Profile/Users/${profileId}?pictureId=${ele.pictureId}&albumId=${ele.albumId}`}
													>
														CLICK TO MEET {ele.title ? ele.title.toUpperCase() : ''}
													</NavLink>
												</Card.Description>
											</Card.Content>
										</Card>
									)
								}
								</Carousel> :
									<img src={require('../../../../assets/images/people-1-alt2.jpg')} />
						}
					</Card.Content>
				</Card>
			</Grid.Column>
    );
  }
}

export default (withLocalize(OurPeople) as any);