import * as React from 'react';
import { Form, Button, Grid, Input } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import browserHistory from 'src/router/browserHistory';

interface Props {
	activeState: number;
	image: any;
	profileId: number;
	albumId: any;
	pictureId: any;
	companyProfileItems: any;
	albumPictureId: number;
	newData: boolean;
	callbackFromParent(activeState: number, image: any): void;
	onUpdateImageDetailsRequest(data: any): void;
	onCultureImageUploadRequest(data: any): void;
}

export default class StepForm3 extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
			activeIndex: 2,
			fullName: '',
			title: '',
			jd: '',
			fav: '',
			image2: ''
		};
	}
	componentDidMount() {
		if (this.props.companyProfileItems && this.props.companyProfileItems.albums && this.props.companyProfileItems.albums.album && this.props.companyProfileItems.albums.album.length) {
			const album = this.props.companyProfileItems.albums.album;
			const filteredAlbum = album ? album.find((obj: any) => obj.albumId === this.props.albumId) : null;
			const filteredPictureObj = filteredAlbum ? filteredAlbum.pictures.picture.find((obj:any) => obj.pictureId === this.props.pictureId) : null;
			this.setState({
				title : filteredPictureObj ? filteredPictureObj.description : '',
				fullName : filteredPictureObj ? filteredPictureObj.title : '',
				jd : filteredPictureObj ? filteredPictureObj.altDescription : '',
				fav : filteredPictureObj ? filteredPictureObj.explanation : '',
			});
			let cropped: any = document.querySelector('.show-final');
			cropped.src = filteredPictureObj ? `https://s3.amazonaws.com/dev.content.skillgigs.com/NodeJS/small-${filteredPictureObj.filename}` : '';
			this.setState({ image2: filteredPictureObj ? filteredPictureObj.filename : '' });
		}
	}
	componentWillReceiveProps(nextProps: any) {
		if (this.props.image !== nextProps.image) {
			let cropped: any = document.querySelector('.show-final');
			cropped.src = nextProps.image;
		}
		if (this.props.albumId !== nextProps.albumId && this.props.pictureId !== nextProps.pictureId && Object.keys(nextProps.companyProfileItems).length) {
			const album = nextProps.companyProfileItems.albums.album;
			const filteredAlbum = album ? album.find((obj: any) => obj.albumId === nextProps.albumId) : null;
			const filteredPictureObj = filteredAlbum ? Array.isArray(filteredAlbum.pictures.picture) ? filteredAlbum.pictures.picture.find((obj:any) => obj.pictureId === nextProps.pictureId) : filteredAlbum.pictures.picture : null;
			this.setState({
				title : filteredPictureObj ? filteredPictureObj.description : '',
				fullName : filteredPictureObj ? filteredPictureObj.title : '',
				jd : filteredPictureObj ? filteredPictureObj.altDescription : '',
				fav : filteredPictureObj ? filteredPictureObj.explanation : '',
			});
			let cropped: any = document.querySelector('.show-final');
			cropped.src = `https://s3.amazonaws.com/dev.content.skillgigs.com/NodeJS/small-${filteredPictureObj.filename}`;
			this.setState({ image2: filteredPictureObj ? filteredPictureObj.filename : '' });
		}
		if (Object.keys(nextProps.companyProfileItems).length !== Object.keys(this.props.companyProfileItems).length) {
			const album = nextProps.companyProfileItems.albums.album;
			const filteredAlbum = album ? album.find((obj: any) => obj.albumId === nextProps.albumId) : null;
			const filteredPictureObj = filteredAlbum ? filteredAlbum.pictures.picture.find((obj:any) => obj.pictureId === nextProps.pictureId) : null;
			this.setState({
				title : filteredPictureObj ? filteredPictureObj.description : '',
				fullName : filteredPictureObj ? filteredPictureObj.title : '',
				jd : filteredPictureObj ? filteredPictureObj.altDescription : '',
				fav : filteredPictureObj ? filteredPictureObj.explanation : '',
			});
			let cropped: any = document.querySelector('.show-final');
			cropped.src = `https://s3.amazonaws.com/dev.content.skillgigs.com/NodeJS/small-${filteredPictureObj.filename}`;
			this.setState({ image2: filteredPictureObj ? filteredPictureObj.filename : '' });
		}
	}
	_onFullNameChange = (e: any) => {
		this.setState({ fullName: e.target.value });
	}
	_onTitleChange = (e: any) => {
		this.setState({ title: e.target.value });
	}
	_onJDChange = (e: any) => {
		this.setState({ jd: e.target.value });
	}
	_onFavChange = (e: any) => {
		this.setState({ fav: e.target.value });
	}
	_onFinishClick = () => {
		this.props.onUpdateImageDetailsRequest({
			albumPictureId: this.props.pictureId !== '' ? this.props.pictureId : this.props.albumPictureId,
			profileId: this.props.profileId,
			title: this.state.fullName,
			description: this.state.title,
			altDescription: this.state.jd,
			explanation: this.state.fav
		});
	}
  render() {
		const {
			activeState,
			callbackFromParent,
			image,
			profileId
		} = this.props;
    return (
			<Grid.Column width={9} className={`${activeState === 2 ? '' : 'hide-element'} tm03 txt-center tp90`}>
				<div className="box-2 img-result">
					<img className="show-final" src="" alt=""
						onError={
							(image: any) => {
								image.target.src = "https://s3.amazonaws.com/dev.content.skillgigs.com/NodeJS/no-pic.png";
							}
						}
					/>
        </div>
				<Form>
					<h4 className="ui dividing header"></h4>
					<Form.Group widths={2}>
						<Form.Field>
							<label className="fnt-wt07">Full Name:</label>
							<Input placeholder='First Name' className="rdus-none ht05" value={this.state.fullName} onChange={this._onFullNameChange} maxLength={50} />
						</Form.Field>
						<Form.Field>
							<label className="fnt-wt07">Job Title (200 characters):</label>
							<Input placeholder="Last Name" className="rdus-none ht05" value={this.state.title} onChange={this._onTitleChange} maxLength={50} />
						</Form.Field>
					</Form.Group>
					<Form.Field>
						<label>Job Description (200 characters):</label>
						<textarea className="rdus-none ht05" value={this.state.jd} onChange={this._onJDChange} maxLength={200}></textarea>
					</Form.Field>
					<Form.Field>
						<label>Favorite Part About Working IQTECHPROS (300 characters):</label>
						<textarea className="rdus-none ht05" value={this.state.fav} onChange={this._onFavChange} maxLength={300}></textarea>
					</Form.Field>
				</Form>
				<div className="actions mrg-tp04 bdr-tp">
					<Button.Group floated="left" className="mrg-tp02 wfull-mb">
						<Button floated="left" className="rdus-nonemb line-ht20-mb" onClick={() => callbackFromParent(1, image !== '' ? image : this.state.image2)}>Previous</Button>
					</Button.Group>
					<Button size="small" className="main-primary right floated mrg-tp02 wfull-mb rdus-nonemb line-ht20-mb" onClick={this._onFinishClick}>Finish</Button>
				</div>
		</Grid.Column>
		);
  }
}
