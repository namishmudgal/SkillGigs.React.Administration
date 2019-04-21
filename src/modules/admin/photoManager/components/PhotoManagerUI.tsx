import * as React from 'react';
import ContentWrapperWithHeader from '../../../wireframe/components/ContentWrapperWithHeader';
import { Grid, Container, Loader, Card, Image, Header, Button, Icon } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";
import browserHistory from 'src/router/browserHistory';
import CultureAlbum from './CultureAlbum';
import PeopleAlbum from './PeopleAlbum';
import MarqueeAlbum from  './MarqueeAlbum';
import { extract_marquee, extract_images, extract_people } from '../../../../utilities/helper';

interface Props {
  addTranslation: any;
  initialize: any;
  match: any;
  companyProfileError: string;
  companyProfileItems: any;
  isProfileLoading: boolean;
  isDesktopLayout: boolean;
  addedImageItemId: any;
  onCompanyProfileRequest(params: any, gigAPI: boolean): void;
  onCultureImageUploadRequest(data: any): void;
  onDeleteImageDetailsRequest(data: any): void;
}

const CULTURECODE = 'CULTR';
const MARQUEECODE = 'MARQE';
const PEOPLECODE = 'PEOPL';

class PhotoManagerUI extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeState: 0,
    };
    this.props.addTranslation(anonymousTranslations);
  }
  componentDidMount() {
    const viewType = window.location.href.split('?albumCode=')[1] ? window.location.href.split('?albumCode=')[1] : '';
    this.setState({ activeState: viewType !== '' ? parseInt(viewType, 10) : 0 }, () => {
      window.history.pushState(null, '', window.location.href.split('?albumCode=')[0]);
    });
    this.props.onCompanyProfileRequest(this.props.match.params.id, false);
  }
  myCallback = (activeState: number) => {
    this.setState({
      activeState,
    });
  }
  render() {
    const {
      companyProfileItems,
      onCultureImageUploadRequest,
      onDeleteImageDetailsRequest,
      addedImageItemId
    } = this.props;
    return (
      <ContentWrapperWithHeader marginBottom={true}>
        <Container>
          <Grid stackable>
            <Grid.Column width={16}>
              {
                this.state.activeState === 0 ?
                  <MarqueeAlbum
                    images={companyProfileItems.albums ? extract_marquee(MARQUEECODE, companyProfileItems.albums.album) : []}
                    callbackFromParent={this.myCallback}
                    profileId={this.props.match.params.id}
                    onCultureImageUploadRequest={onCultureImageUploadRequest}
                    onDeleteImageDetailsRequest={onDeleteImageDetailsRequest}
                    addedImageItemId={addedImageItemId}
                  /> : null
              }
              {
                this.state.activeState === 1 ?
                  <CultureAlbum
                    images={companyProfileItems.albums ? extract_images(CULTURECODE, companyProfileItems.albums.album) : []}
                    callbackFromParent={this.myCallback}
                    profileId={this.props.match.params.id}
                    onCultureImageUploadRequest={onCultureImageUploadRequest}
                    onDeleteImageDetailsRequest={onDeleteImageDetailsRequest}
                    addedImageItemId={addedImageItemId}
                  /> : null
              }
              {
                this.state.activeState === 2 ?
                  <PeopleAlbum
                    people={companyProfileItems.albums ? extract_people(PEOPLECODE, companyProfileItems.albums.album) : []}
                    callbackFromParent={this.myCallback}
                    profileId={this.props.match.params.id}
                    onDeleteImageDetailsRequest={onDeleteImageDetailsRequest}
                  /> : null
              }
            </Grid.Column>
          </Grid>
        </Container>
      </ContentWrapperWithHeader>
    );
  }
}

export default (withLocalize(PhotoManagerUI) as any);