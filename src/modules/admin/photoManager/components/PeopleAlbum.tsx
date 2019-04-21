import * as React from 'react';
import { Button, Card, Header, Grid, Image, Icon } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";
import _ from 'lodash';
import { NavLink } from 'react-router-dom';

interface Props {
  addTranslation: any;
  initialize: any;
	people: [];
	profileId: number;
	onEmployerAccountUpdateRequest(data: any): void;
	callbackFromParent(activeState: number): void;
	onDeleteImageDetailsRequest(data: any): void;
}

class PeopleAlbum extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
			firstName: '',
			people: [],
    };
    this.props.addTranslation(anonymousTranslations);
	}
	componentDidMount() {
		this.setState({ people: this.props.people });
	}
	componentWillReceiveProps(nextProps: any) {
		if (this.props.people.length !== nextProps.people.length && nextProps.people.length) {
			this.setState({
				people: nextProps.people
			});
		}
	}
	_onDelete = (pictureId: number) => {
		this.props.onDeleteImageDetailsRequest({ profileId: this.props.profileId, albumPictureId: pictureId });
		const index = this.state.people.findIndex((obj: any) => obj.pictureId === pictureId);
		if (index !== -1) {
			this.state.people.splice(index, 1);
			this.setState({ people: this.state.people });
		}
	}
  render() {
		const {
			callbackFromParent,
			people,
			profileId,
			onDeleteImageDetailsRequest
		} = this.props;
    return (
			<Card fluid className="rdus-none right pad-equal0">
				<Card.Content>
					<Header as="h2" className="heading02 mrg-btm0">
					Company Staff Album
					</Header>
					<p className="fnt08">Showcase your top talent to attract future employees.</p>
					<p className="fnt08">Tell their story by adding their bio using the edit bio feature.</p>
					<NavLink to={`/Administration/Employer/PeopleWizard/${profileId}`}>
						<Button size="large" className="main-primary submit rdus-none mrg-tp04 wfull-mb"><Icon name="upload" /> ADD NEW PICTURE(S)</Button>
					</NavLink>
					<div className="bdr-bt mrg-btm02">&nbsp;</div>
					<Grid stackable>
						<div className="column row mrg-tp03">
						<Grid.Column width={11}>
						<Card.Group itemsPerRow={3}>
						{
								this.state.people.map((ele: any, i: number) =>
									<Card key={i}>
										<div className="icon-btn">
											<NavLink className="ui icon button bg-pink txt-wht lft0" to={`/Administration/Employer/PeopleWizard/${profileId}?pictureId=${ele.pictureId}&albumId=${ele.albumId}`} data-tooltip="Edit" data-position="top center" style={{ borderRadius: '50%', margin: '10px' }}>
												<Icon name="edit" className="fnt07-mb" />
											</NavLink>
											<Button icon className="bg-pink txt-wht bx-rmvbtn" data-tooltip="Delete" data-position="top center" onClick={() => this._onDelete(ele.pictureId)}>
												<Icon name="trash" className="fnt07-mb" />
											</Button>
											<div className="image" style={{ textAlign: 'center' }}>
											<Image
												src={ele.url ? ele.url : 'https://s3.amazonaws.com/dev.content.skillgigs.com/NodeJS/no-pic.png'}
												onError={
													(image: any) => {
														image.target.src = "https://s3.amazonaws.com/dev.content.skillgigs.com/NodeJS/no-pic.png";
														image.target.className = "";
													}
												}
											/>
											</div>
											<Card.Content className="pad-eq6mb">
												<Card.Header className="txt-pink01">{ele.title}</Card.Header>
												<Card.Description>{ele.description}</Card.Description>
											</Card.Content>
										</div>
									</Card>
								)
						}
						</Card.Group>
						</Grid.Column>
							<Grid.Column width={5}>
								<Card fluid className="center aligned mrg-tp07mb">     
									<Card.Content>
										<span className="bg-pink i-stack txt-wht icon-radius fnt22 i-stack-set"> <Icon name="envelope" /></span>
										<Card.Header className="mrg-tp03">Showcase Your Company</Card.Header>
										<Card.Meta className="mrg-tp02">Include a few well-lit photos.Cell phone photos are just fine.</Card.Meta>
										<Card.Meta className="mrg-tp01">Learn more on our <a className="txt-pink01">help center.</a></Card.Meta>
									</Card.Content>
								</Card>
							</Grid.Column>
						</div>
					</Grid>
					<div className="actions mrg-tp04 bdr-tp">
						{/*<div className="ui small button main-primary left floated mrg-tp02">Save</div>*/}
						<Button.Group floated='right' className="mrg-tp02">
							<NavLink className="ui button small" to={`/Administration/Company/${profileId}`}>Back to Profile</NavLink>
						</Button.Group>
					</div>
				</Card.Content>
			</Card>
    );
  }
}

export default (withLocalize(PeopleAlbum) as any);