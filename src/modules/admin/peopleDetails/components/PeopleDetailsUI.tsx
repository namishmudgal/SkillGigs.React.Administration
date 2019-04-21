import * as React from 'react';
import ContentWrapperWithHeader from '../../../wireframe/components/ContentWrapperWithHeader';
import { Grid, Container, Image, Card, List, Header, Segment, Form, Icon, Button } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";
import { NavLink } from 'react-router-dom';

interface Props {
  addTranslation: any;
  initialize: any;
  companyProfileError: string;
  companyProfileItems: any;
  match: any;
  isProfileLoading: boolean;
  isDesktopLayout: boolean;
  onCompanyProfileRequest(params: any, gigAPI: boolean): void;
}

class PeopleDetailsUI extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      albumId: '',
      pictureId: '',
      title: '',
      fullName: '',
      jd: '',
      fav: ''
    };
    this.props.addTranslation(anonymousTranslations);
  }
  componentDidMount() {
    this.props.onCompanyProfileRequest(this.props.match.params.id, false);
    const albumId = window.location.href.split('&albumId=')[1] ? window.location.href.split('&albumId=')[1] : '';
    const pictureId = albumId && albumId !== '' ? window.location.href.split('&albumId')[0].split('?pictureId=')[1] : '';
    this.setState({ albumId, pictureId });
  }
  componentWillReceiveProps(nextProps: any) {
		if (Object.keys(nextProps.companyProfileItems).length) {
			const album = nextProps.companyProfileItems.albums.album;
			const filteredAlbum = album ? album.find((obj: any) => obj.albumId === this.state.albumId) : null;
			const filteredPictureObj = filteredAlbum ? filteredAlbum.pictures.picture.find((obj:any) => obj.pictureId === this.state.pictureId) : null;
			this.setState({
				title : filteredPictureObj ? filteredPictureObj.description : '',
				fullName : filteredPictureObj ? filteredPictureObj.title : '',
				jd : filteredPictureObj ? filteredPictureObj.altDescription : '',
				fav : filteredPictureObj ? filteredPictureObj.explanation : '',
			});
			let cropped: any = document.querySelector('.show-image');
			cropped.src = `https://s3.amazonaws.com/dev.content.skillgigs.com/NodeJS/${filteredPictureObj.filename}`;
		}
	}
  render() {
    return (
      <ContentWrapperWithHeader marginBottom={true}>
        <Container>
          <Grid stackable>
            <Grid.Column width={16}>
              <Card fluid className="rdus-none">
                <div className="ui middle aligned list mrg-btm0" style={{ padding: '15px 15px 0px 15px' }}>
                  <div className="item">
                    <div className="content  pad-equal0">
                      <h2 className="ui dividing header heading02">
                        {this.state.fullName}, {this.state.title}
                        <NavLink to={`/Administration/Company/${this.props.match.params.id}`} className="ui small button primary right floated btn-pink"><Icon name="arrow left" /><span className="mobile only"> Back</span> <span className="mobile hidden">Back To Profile </span></NavLink>
                      </h2>
                    </div>
                  </div>
                </div>
                <Segment basic className="mrg-tp-rmv">
                  <Grid stackable>
                    <Grid.Column width={16} className="row">
                      <Grid.Column width={8} className="pad-lft0">
                        <div className="ui fluid">
                          <div className="content">
                            <div className="ui list list1">
                              <div className="item"><b>The Role :</b><br />{this.state.jd}</div>
                              <div className="item"><b>Favorite part about working at IQTECHPROS? :</b> <br />{this.state.fav}</div>
                            </div>
                          </div>
                        </div>
                      </Grid.Column>
                      <Grid.Column width={8}>
                        <Image
                          src=""
                          className="show-image"
                          fluid
                          onError={
                            (image: any) => {
                              image.target.src = "https://s3.amazonaws.com/dev.content.skillgigs.com/NodeJS/no-pic.png";
                            }
                          }
                        />
                      </Grid.Column>
                    </Grid.Column>
                  </Grid>
                </Segment>
              </Card>
            </Grid.Column>
          </Grid>
        </Container>
      </ContentWrapperWithHeader>
    );
  }
}

export default (withLocalize(PeopleDetailsUI) as any);