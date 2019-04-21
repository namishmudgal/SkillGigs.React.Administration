import * as React from 'react';
import ContentWrapperWithHeader from '../../../wireframe/components/ContentWrapperWithHeader';
import { Grid, Container, Loader, Image, Icon } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";
import SgSixColumnPod from '../../../common/components/SgSixColumnPod';
import SgSixColumnBanner from '../../../common/components/SgSixColumnBanner';
import SgFourColumnList from '../../../common/components/SgFourColumnList';
import OurPeople from './OurPeople';
import OurCulture from './OurCulture';
import WhyWeExist from './WhyWeExist';
import OurGigs from './OurGigs';
import browserHistory from 'src/router/browserHistory';
import { extract_marquee, extract_images, extract_people } from '../../../../utilities/helper';
import { NavLink } from 'react-router-dom';
import CustomLoader from '../../../loader/components/Loader';

interface Props {
    addTranslation: any;
    initialize: any;
    isLoggedIn: boolean;
    match: any;
    companyProfileItems: any;
    companyProfileError: string;
    companyGigItems: any;
    isProfileLoading: boolean;
    isDesktopLayout: boolean;
    onCompanyProfileRequest(params: any, gigAPI: boolean): void;
    onEmployerAccountUpdateRequest(data: any): void;
}

const CULTURECODE = 'CULTR';
const MARQUEECODE = 'MARQE';
const PEOPLECODE = 'PEOPL';

class CompanyProfilePageUI extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.props.addTranslation(anonymousTranslations);
  }
  componentDidMount() {
    this.props.onCompanyProfileRequest(this.props.match.params.id, true);
    if (this.props.companyProfileError !== '') {
      browserHistory.push('/error');
    }
  }
  componentWillReceiveProps(nextProps: any) {
    if (this.props.companyProfileError !== nextProps.companyProfileError && nextProps.companyProfileError !== '') {
      browserHistory.push('/error');
    }
  }
  render() {
    const {
      companyProfileItems,
      companyGigItems,
      isProfileLoading,
      match,
      isDesktopLayout,
      onEmployerAccountUpdateRequest
    } = this.props;
    return (
      <ContentWrapperWithHeader marginBottom={false}>
      {
        isProfileLoading ?
          <CustomLoader /> :
            <Container className="sg-company-profile">
              <Grid stackable>
                <Grid.Column width={16} className="row tm03 mrg-tp03">
                <SgSixColumnPod
                  podItems={companyProfileItems}
                  gigItems={companyGigItems}
                />
                <SgSixColumnBanner
                  profileId={this.props.match.params.id}
                  images={companyProfileItems.albums ? extract_marquee(MARQUEECODE, companyProfileItems.albums.album) : []}
                />
                <Grid.Column width={6} className="six wide column rmv-rgt-pad mobile hidden tablet hidden" style={{ position: 'relative' }}>
                  {/*<Image
                    src={companyProfileItems && companyProfileItems.albums && companyProfileItems.albums.album ? extract_marquee(MARQUEECODE, companyProfileItems.albums.album).length ? extract_marquee(MARQUEECODE, companyProfileItems.albums.album)[0].url : require('../../../../assets/images/no-tag-company.jpg') : require('../../../../assets/images/no-tag-company.jpg')}
                    fluid
                    style={{ height: '234px' }}
                    onError={
                      (image: any) => {
                        image.target.src = require('../../../../assets/images/no-tag-company.jpg');
                      }
                    }
                  />*/}
                  <div
                    className="six wide column rmv-rgt-pad cmpny-proimg mobile hidden tablet hidden"
                    style={{ backgroundImage: `url(${companyProfileItems && companyProfileItems.albums && companyProfileItems.albums.album ? extract_marquee(MARQUEECODE, companyProfileItems.albums.album).length ? extract_marquee(MARQUEECODE, companyProfileItems.albums.album)[0].url : require('../../../../assets/images/no-tag-company.jpg') : require('../../../../assets/images/no-tag-company.jpg')})` }}
                  />
                  <span
                    className="right floated fnt06 txt-grey01"
                    style={{ position: 'absolute', top: '0', right: '0' }}
                  >
                    <NavLink to={`/Administration/Employer/PhotoManager/${this.props.match.params.id}?albumCode=0`} className="mrg-lft02"><Icon name="edit" className="txt-pink01 fnt04" /></NavLink>
                  </span>
                </Grid.Column>
                <SgFourColumnList
                  listItems={companyProfileItems}
                  profileId={this.props.match.params.id}
                />
                </Grid.Column>
              </Grid>
              <Grid stackable>
                <OurCulture
                  isDesktopLayout={isDesktopLayout}
                  images={companyProfileItems.albums ? extract_images(CULTURECODE, companyProfileItems.albums.album) : []}
                  profileId={this.props.match.params.id}
                />
                <WhyWeExist
                  companyProfileItems={companyProfileItems}
                  onEmployerAccountUpdateRequest={onEmployerAccountUpdateRequest}
                  profileId={this.props.match.params.id}
                />
                <OurPeople
                  isDesktopLayout={isDesktopLayout}
                  people={companyProfileItems.albums ? extract_people(PEOPLECODE, companyProfileItems.albums.album) : []}
                  profileId={this.props.match.params.id}
                />
                <OurGigs
                  gigItems={companyGigItems}
                  match={match}
                />
              </Grid>
            </Container>
      }
      </ContentWrapperWithHeader>
    );
  }
}

export default (withLocalize(CompanyProfilePageUI) as any);