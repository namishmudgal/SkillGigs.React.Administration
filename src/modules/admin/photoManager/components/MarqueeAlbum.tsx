import * as React from 'react';
import { Button, Card, Header, Grid, Image, Icon, Message } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import uuidv1 from 'uuid/v1';

let uploadedFileSrc = '';
let uploadedFile: any = '';

interface Props {
  addTranslation: any;
  initialize: any;
	images: [];
	profileId: number;
	addedImageItemId: any;
	onCultureImageUploadRequest(data: any): void;
	callbackFromParent(activeState: number): void;
	onDeleteImageDetailsRequest(data: any): void;
}

class MarqueeAlbum extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
			file: '',
			images: []
    };
    this.props.addTranslation(anonymousTranslations);
	}
	componentDidMount() {
		this.setState({ images: this.props.images });
	}
	componentWillReceiveProps(nextProps: any) {
		if (this.props.images.length !== nextProps.images.length && nextProps.images.length) {
			this.setState({
				images: nextProps.images,
				showDimensionMessage: false
			});
		}
		if (nextProps.addedImageItemId !== this.props.addedImageItemId && nextProps.addedImageItemId && nextProps.addedImageItemId !== null) {
			this.state.images.push({
				pictureId: nextProps.addedImageItemId,
				url: uploadedFileSrc
			});
		}
	}
	onImageUpload = (e: any) => {
		this.setState({ showDimensionMessage: false });
    if (e.target.files.length) {
			uploadedFile = e.target.files[0];
			uploadedFile['dynamicName'] = uuidv1();
			if (uploadedFile.size > 5242880) {
				this.setState({ showDimensionMessage: true });
			} else {
				const reader = new FileReader();
				reader.onload = (e: any)=> {
					if (e.target.result) {
						uploadedFileSrc = e.target.result;
						this.props.onCultureImageUploadRequest({
							file: uploadedFile,
							data: e.target.result,
							profileId: this.props.profileId,
							albumTypeCode: 'MARQE',
							imageType: 'original',
							imageContentType: uploadedFile.type
						});
					}
				};
				reader.readAsDataURL(e.target.files[0]);
			}
			e.target.value = '';
    }
	}
	_onDelete = (pictureId: number) => {
		this.props.onDeleteImageDetailsRequest({ profileId: this.props.profileId, albumPictureId: pictureId });
		const index = this.state.images.findIndex((obj: any) => obj.pictureId === pictureId);
		if (index !== -1) {
			this.state.images.splice(index, 1);
			this.setState({ images: this.state.images });
		}
	}
  render() {
		const {
			callbackFromParent,
			profileId,
		} = this.props;
    return (
			<Card fluid className="rdus-none right pad-equal0">
				<Card.Content>
					<Header as="h2" className="heading02 mrg-btm0">
					Marquee Album
					</Header>
					<p className="fnt08">Please select one photo to be your marquee photo. If you only have one photo it will automatically be selected.</p>
					<div style={{ position: 'relative' }}>
						<Button size="large" className="main-primary submit rdus-none mrg-tp04 wfull-mb">
							<Icon name="upload" /> ADD NEW PICTURE(S)
						</Button>
						<input name="img" type="file" accept="image/*" id="marquee-image" className="hidden-upload" onChange={this.onImageUpload} />
					</div>
					{
					this.state.showDimensionMessage ?
						<Message negative>
							<Icon name="close" onClick={() => this.setState({ showDimensionMessage: false })} />
							<Message.Header>Invalid Size Detected</Message.Header>
							<p>
							Please select a file which is less than 5mb
							</p>
						</Message> : null
					}
					<div className="bdr-bt mrg-btm02">&nbsp;</div>
					<Grid stackable>
						<div className="column row mrg-tp03">
						<Grid.Column width={11}>
						<Card.Group itemsPerRow={3}>
							{
								this.state.images.length ? this.state.images.map((ele: any, i: number) =>
									<Card key={i}>
										<div className="icon-btn">
											<Button icon className="bg-pink txt-wht bx-rmvbtn" data-tooltip="Delete" data-position="top center" onClick={() => this._onDelete(ele.pictureId)}>
												<Icon name="trash" className="fnt07-mb" />
											</Button>
											<div className="image" style={{ textAlign: 'center' }}>
												<Image
													className="wireframe"
													src={ele.url ? ele.url : 'https://s3.amazonaws.com/dev.content.skillgigs.com/NodeJS/no-pic.png'}
													onError={
														(image: any) => {
															image.target.src = "https://s3.amazonaws.com/dev.content.skillgigs.com/NodeJS/no-pic.png";
															image.target.className = "ui wireframe image";
														}
													}
												/>
											</div>
										</div>
									</Card>
								) : null
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
						{/* <div className="ui small button main-primary left floated mrg-tp02">Save</div> */}
						<Button.Group floated='right' className="mrg-tp02">
							<NavLink className="ui button btn-fnt" to={`/Administration/Company/${profileId}`}>Back to Profile</NavLink>
							<div className="or"></div>
							<Button positive className="btn-pink txt-wht bdr-rdus-rmv" onClick={() => callbackFromParent(1)}>Next</Button>
						</Button.Group>
					</div>
				</Card.Content>
			</Card>
    );
  }
}

export default (withLocalize(MarqueeAlbum) as any);