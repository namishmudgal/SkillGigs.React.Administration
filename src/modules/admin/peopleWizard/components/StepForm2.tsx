import * as React from 'react';
import { Header, Button, Grid, Icon } from 'semantic-ui-react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

interface Props {
	activeState: number;
	image: any;
	profileId: number;
	file: any;
	albumId: any;
	albumPictureId: number;
	newData: boolean;
	callbackFromParent(activeState: number, image: any): void;
	onCultureImageUploadRequest(data: any): void;
}

let cropper: any = '';
let file = '';

export default class StepForm2 extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = { activeIndex: 0, image: '' };
	}
	componentWillReceiveProps(nextProps: any) {
		if (this.props.image !== nextProps.image) {
			file = nextProps.file;
			let cropped: any = document.querySelector('.show-cropped');
			cropped.src = nextProps.newData ? nextProps.image : `https://s3.amazonaws.com/dev.content.skillgigs.com/NodeJS/small-${nextProps.image}`;
			this.setState({ image: nextProps.image });
			cropper = new Cropper(cropped, {
				aspectRatio: 2/3,
				viewMode: 2,
				minContainerWidth: 500,
				minContainerHeight: 250,
				minCanvasWidth: 500,
				minCanvasHeight : 250,
				crop(event) {
					file['cropHeight'] = event.detail.height;
					file['cropWidth'] = event.detail.width;
				}
			});
		}
	}
	_onNextStep = () => {
		if (this.props.albumId && this.props.albumId !== '' && this.props.albumId !== null) {
			this.props.callbackFromParent(2, this.props.image);
		} else {
			let imgSrc = cropper.getCroppedCanvas().toDataURL();
			this.props.onCultureImageUploadRequest({
				file,
				data: imgSrc,
				profileId: this.props.profileId,
				albumTypeCode: 'PEOPL',
				imageType: 'headshot',
				imageContentType: this.props.file.type,
				albumPictureId: this.props.albumPictureId
			});
			this.setState({ image: imgSrc });
			this.props.callbackFromParent(2, imgSrc);
		}
	}
  render() {
		const {
			callbackFromParent,
			activeState,
			image
		} = this.props;
    return (
			<Grid.Column width={9} className={`${activeState === 1 ? '' : 'hide-element'} tm03 txt-center tp90`}>
				<Header as='h2' className="heading02 mrg-btm0 mrg-ntp38mb fnt12-mb">Create Employee Head Shot</Header>
				<p className="fnt08 fnt12-mb">For the best results, use cropping tool to select the image area.</p>
				<div className="box-2 img-result">
          <img
						className="show-cropped"
						src=""
						alt=""
						onError={
							(image: any) => {
								image.target.src = "https://s3.amazonaws.com/dev.content.skillgigs.com/NodeJS/no-pic.png";
							}
						}
					/>
        </div>
				<div className="actions mrg-tp04 bdr-tp">
					<Button.Group floated="left" className="mrg-tp02 wfull-mb">
						<Button floated="left" className="rdus-nonemb line-ht20-mb" onClick={() => callbackFromParent(0, this.state.image)}>Previous</Button>
					</Button.Group>
					<a onClick={this._onNextStep} className="ui small button main-primary right floated mrg-tp02 wfull-mb rdus-nonemb line-ht20-mb">Next</a>
				</div>
		</Grid.Column>
		);
  }
}
