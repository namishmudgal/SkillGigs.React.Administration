import * as React from 'react';
import { Header, Button, Message, Grid, Icon } from 'semantic-ui-react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { NavLink } from 'react-router-dom';
import uuidv1 from 'uuid/v1';

let file:any = '';

interface Props {
	activeState: number;
	profileId: number;
	albumPictureId: number;
	albumId: any;
	image: any;
	newData: boolean;
	callbackFromParent(activeState: number, image: any, file: any): void;
	onCultureImageUploadRequest(data: any): void;
}

let cropper: any = '';

const getSizeInKb = (size: any) => {
	const sizeInKb = parseFloat(size).toFixed(2);
  return `${sizeInKb} KB.`;
}

export default class StepForm1 extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
			activeState: 0,
			showSuccessMessage: false,
			imageName: '',
			imageSize: '',
			flag: false,
			showDimensionMessage: false,
			showSizeMessage: false
		};
	}
	componentWillReceiveProps(nextProps: any) {
		if (this.props.image !== nextProps.image) {
			let img = document.createElement('img');
			img.src = nextProps.newData ? nextProps.image : `https://s3.amazonaws.com/dev.content.skillgigs.com/NodeJS/${nextProps.image}`;
			img.onerror = () => {
				img.src = "https://s3.amazonaws.com/dev.content.skillgigs.com/NodeJS/no-pic.png";
			}
			let result = document.querySelector('.result');
			if (result !== null) {
				result.innerHTML = '';
				result.appendChild(img);
			}
			cropper = new Cropper(img, {
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
	onImageUpload = (e: any) => {
		this.setState({ showSizeMessage: false });
    if (e.target.files.length) {
			file = e.target.files[0];
			file['dynamicName'] = uuidv1();
			if (file.size > 5242880) {
				this.setState({ showDimensionMessage: true });
			} else {
				const width = e.target.clientWidth;
				const height = e.target.clientHeight;
				this.setState({ showDimensionMessage: false },
					() => {
						if (width > 980 || height > 480) {
							this.setState({ showDimensionMessage: true });
						} else {
							this.setState({ showSuccessMessage: true, flag: true, imageName: file.name, imageSize: file.size });
							const reader = new FileReader();
							reader.onload = (e: any)=> {
								if (e.target.result) {
									let img = document.createElement('img');
									img.src = e.target.result;
									let result = document.querySelector('.result');
									if (result !== null) {
										result.innerHTML = '';
										result.appendChild(img);
									}
									cropper = new Cropper(img, {
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
									setTimeout(() => {
										this.props.onCultureImageUploadRequest({
											file,
											data: e.target.result,
											profileId: this.props.profileId,
											albumTypeCode: 'PEOPL',
											imageType: 'original',
											imageContentType: file.type
										});
									}, 2000)
								}
							};
							reader.readAsDataURL(file);
						}
					}
				);
			}
			e.target.value = '';
    }
  }
  _onNextStep = () => {
		let imgSrc = cropper.getCroppedCanvas().toDataURL();
		if (imgSrc && imgSrc !== '') {
			this.props.onCultureImageUploadRequest({
				file,
				data: imgSrc,
				profileId: this.props.profileId,
				albumTypeCode: 'PEOPL',
				imageType: 'small',
				imageContentType: file.type,
				albumPictureId: this.props.albumPictureId
			});
			this.props.callbackFromParent(1, imgSrc, file);
			this.setState({ showSuccessMessage: false });
		}
	}
  private myRef = React.createRef<HTMLInputElement>();
  render() {
		const {
			callbackFromParent,
			activeState,
			profileId,
			albumPictureId
		} = this.props;
    return (
			<Grid.Column width={9} className={`${activeState === 0 ? '' : 'hide-element'} tm03 txt-center tp90`}>
				<Header as='h2' className="heading02 mrg-btm0 mrg-ntp38mb fnt12-mb">Showcase your employee culture to attract future employees.</Header>
				<p className="fnt08 fnt12-mb">For the best results, take a landscape photo with minimum dimensions of 980 x 480 pixels.</p>
				{
					this.state.showDimensionMessage ?
						<Message negative>
							<Icon name="close" onClick={() => this.setState({ showDimensionMessage: false })} />
							<Message.Header>Invalid Dimensions Detected</Message.Header>
							<p>
							Please select a file with minimum dimensions of 980 x 480 pixels
							</p>
						</Message> : null
				}
				{
					this.state.showSizeMessage ?
						<Message negative>
							<Icon name="close" onClick={() => this.setState({ showDimensionMessage: false })} />
							<Message.Header>Invalid Size Detected</Message.Header>
							<p>
							Please select a file which is less than 5mb
							</p>
						</Message> : null
					}
				<div className="box" style={{ position: 'relative' }}>
					<Button size="large" className="main-primary submit rdus-none mrg-tp07 btn-rmb mrg-tp04mb wfull-mb">
						<Icon name="upload" /> Upload Picture
					</Button>
					<input ref={this.myRef} name="img" type="file" accept="image/*" className="hidden-upload" id="file-input" onChange={this.onImageUpload} style={{ top: '77px' }} />
				</div>
				{
					this.state.showSuccessMessage ?
						<Message positive>
							<Icon name="close" onClick={() => this.setState({ showSuccessMessage: false })} />
							<Message.Header>Successfully Uploaded</Message.Header>
							<p>
							{this.state.imageName} {getSizeInKb(parseInt(this.state.imageSize, 10) / 1024)}
							</p>
						</Message> : null
				}
				<div className="box-2">
          <div className="result"></div>
        </div>
        <div className="box-2 img-result hide">
          <img
						className="cropped" src="" alt="" />
        </div>
				<input type="file" id="file" style={{ display: 'none' }} />
				<div className="actions mrg-tp04 bdr-tp">
					<div className="ui buttons left floated mrg-tp02 wfull-mb">
					<NavLink to={`/Administration/Company/${profileId}`} className="ui small button left floated rdus-nonemb line-ht20-mb">Cancel</NavLink>
					</div>
					<a onClick={this._onNextStep} className="ui small button main-primary right floated mrg-tp02 wfull-mb rdus-nonemb line-ht20-mb">Next</a>
				</div>
		</Grid.Column>
		);
  }
}
