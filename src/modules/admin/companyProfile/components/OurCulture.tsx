import * as React from 'react';
import { Grid, Card, Header, Icon, Image } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";
import Carousel from 'nuka-carousel';
import { NavLink } from 'react-router-dom';

interface Props {
    addTranslation: any;
		initialize: any;
		isDesktopLayout: boolean;
		images: [];
		profileId: number;
}

class OurCulture extends React.Component<Props, any> {
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
							Our Culture
							<span className="right floated fnt06 txt-grey01"><b className="mobile hidden fnt-wt04">Show off your company's culture via professionally taken photos of your offices.</b> 
							<NavLink to={`/Administration/Employer/PhotoManager/${profileId}?albumCode=1`} className="mrg-lft02"><Icon name="edit" className="txt-pink01 fnt04" /></NavLink></span>
						</Header>
						{
							this.props.images.length ?
								<Carousel slidesToShow={isDesktopLayout && this.props.images.length >= 1 ? 3 : 1} slidesToScroll={isDesktopLayout ? 3 : 1} cellSpacing={30} cellAlign={this.props.images.length === 1 ? 'center' : 'left'}>
									{
									this.props.images.map((ele: any, i: number) =>
										<Image
											key={i}
											src={ele.url ? ele.url : 'https://s3.amazonaws.com/dev.content.skillgigs.com/NodeJS/no-pic.png'}
											onError={
												(image: any) => {
													image.target.src = "https://s3.amazonaws.com/dev.content.skillgigs.com/NodeJS/no-pic.png";
													image.target.className = "";
												}
											}
										/>
									)
									}
								</Carousel> :
									<div style={{ textAlign: 'center' }}><img src={require('../../../../assets/images/digs-all-alt2.jpg')} /></div>
						}
					</Card.Content>
				</Card>
			</Grid.Column>
    );
  }
}

export default (withLocalize(OurCulture) as any);