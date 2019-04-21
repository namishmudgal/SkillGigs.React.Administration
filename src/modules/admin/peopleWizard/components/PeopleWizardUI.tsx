import * as React from 'react';
import ContentWrapperWithHeader from '../../../wireframe/components/ContentWrapperWithHeader';
import { Grid, Container, Icon, Card } from 'semantic-ui-react';
import StepForm1 from './StepForm1';
import StepForm2 from './StepForm2';
import StepForm3 from './StepForm3';

interface Props {
  companyProfileError: string;
  companyProfileItems: any;
  isProfileLoading: boolean;
  isDesktopLayout: boolean;
  profileId: any;
  match: any;
  albumPictureId: number;
  onCompanyProfileRequest(params: any, gigAPI: boolean): void;
  onUpdateImageDetailsRequest(data: any): void;
  onCultureImageUploadRequest(data: any): void;
}

export default class PeopleWizardUI extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeState: 0,
      image1: '',
      image2: '',
      albumId : '',
      pictureId: '',
      file: '',
      newData: true,
    };
  }
  componentDidMount() {
    const albumId = window.location.href.split('&albumId=')[1] ? window.location.href.split('&albumId=')[1] : '';
    const pictureId = albumId && albumId !== '' ? window.location.href.split('&albumId')[0].split('?pictureId=')[1] : '';
    this.setState({ albumId, pictureId });
    if (albumId !== '' && pictureId != '' && pictureId && albumId) {
      this.setState({ activeState: 2, newData: false });
      this.props.onCompanyProfileRequest(this.props.match.params.id, false);
    }
  }
  myCallback1 = (activeState: number, image1: any, file: any) => {
    this.setState({
      activeState,
      image1,
      file,
      newData: true
    });
  }
  myCallback2 = (activeState: number, image2: any) => {
    this.setState({
      activeState,
      image2
    });
  }
  myCallback3 = (activeState: number, image1: any) => {
    this.setState({
      activeState,
      image1
    });
  }
  render() {
    const {
      isDesktopLayout,
      companyProfileItems,
      onUpdateImageDetailsRequest,
      onCultureImageUploadRequest,
      albumPictureId
    } = this.props;
    return (
      <ContentWrapperWithHeader>
        <Container className="tm03 mrg-tp03">
          <Grid stackable>
            <Grid.Column width={16}>
              <div className="ui fluid rdus-none right pad-equal0">
                  <div className="content">
                    <Grid stackable>
                        <div className="column row mrg-tp03 rmv-mrgn-mb">
                          <Grid.Column width={3} className="sticky-pwizard">
                              <div className="ui fluid center aligned bdr-rg01 bdr-rg01mb">
                                <div className="content rmv-pad-mb txt-center">
                                    <div className="step-wizard">
                                      <div className="step-progressmb"></div>
                                      <ul>
                                          <li className={this.state.activeState === 1 || this.state.activeState === 2 ? 'active' : ''}>
                                            <div className="center aligned"><span style={{ display: this.state.activeState === 1 || this.state.activeState === 2 ? 'none' : 'inline' }}>1</span><Icon name="check" style={{ display: this.state.activeState === 1 || this.state.activeState === 2 ? 'block' : 'none' }} /></div>
                                            <p className="center aligned">Upload</p>
                                          </li>
                                          <li className={this.state.activeState === 2 ? 'active' : ''}>
                                            <div className="center aligned"><span style={{ display: this.state.activeState === 2 ? 'none' : 'inline' }}>2</span><Icon name="check" style={{ display: this.state.activeState === 2 ? 'block' : 'none' }} /></div>
                                            <p className="center aligned">Crop</p>
                                          </li>
                                          <li>
                                            <div className="center aligned"><span>3</span><Icon name="check" style={{ display: this.state.activeState === 3 ? 'block' : 'none' }} /></div>
                                            <p className="center aligned">Details</p>
                                          </li>
                                      </ul>
                                    </div>
                                </div>
                              </div>
                          </Grid.Column>
                          <StepForm1
                            activeState={this.state.activeState}
                            callbackFromParent={this.myCallback1}
                            profileId={this.props.match.params.id}
                            onCultureImageUploadRequest={onCultureImageUploadRequest}
                            albumId={this.state.albumId !== '' ? this.state.albumId : ''}
                            albumPictureId={albumPictureId}
                            image={this.state.image1}
                            newData={this.state.newData}
                          />
                          <StepForm2
                            activeState={this.state.activeState}
                            callbackFromParent={this.myCallback2}
                            image={this.state.image1}
                            profileId={this.props.match.params.id}
                            onCultureImageUploadRequest={onCultureImageUploadRequest}
                            albumId={this.state.albumId !== '' ? this.state.albumId : ''}
                            file={this.state.file}
                            albumPictureId={albumPictureId}
                            newData={this.state.newData}
                          />
                          <StepForm3
                            activeState={this.state.activeState}
                            callbackFromParent={this.myCallback3}
                            image={this.state.image2}
                            profileId={this.props.match.params.id}
                            albumId={this.state.albumId !== '' ? this.state.albumId : ''}
                            pictureId={this.state.pictureId !== '' ? this.state.pictureId : ''}
                            companyProfileItems={companyProfileItems}
                            onUpdateImageDetailsRequest={onUpdateImageDetailsRequest}
                            onCultureImageUploadRequest={onCultureImageUploadRequest}
                            albumPictureId={albumPictureId}
                            newData={this.state.newData}
                          />
                          <Grid.Column width={4} className="mobile hidden mrg-tp04">
                              <Card fluid className="center aligned mrg-tp07mb">
                                <Card.Content>
                                    <button className="bg-pink i-stack txt-wht icon-radius fnt22 i-stack-set bdr-none"> <Icon name="envelope" /></button>
                                    <Card.Header className="mrg-tp03">Follow These Instructions</Card.Header>
                                    <Card.Meta className="mrg-tp02">Upload a landscape picture (minimum size requirement is 980 x 480 pixels)</Card.Meta>
                                    <Card.Meta className="mrg-tp01">Use cropping tool to further minimize photo</Card.Meta>
                                </Card.Content>
                              </Card>
                          </Grid.Column>
                        </div>
                    </Grid>
                  </div>
              </div>
            </Grid.Column>
          </Grid>
        </Container>
      </ContentWrapperWithHeader>
    );
  }
}
