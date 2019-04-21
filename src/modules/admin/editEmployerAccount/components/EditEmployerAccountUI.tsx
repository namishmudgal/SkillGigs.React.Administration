import * as React from 'react';
import ContentWrapperEmployerEdit from '../../../wireframe/components/ContentWrapperEmployerEdit';
import { Grid, Container, Loader, Card, Image } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";
import browserHistory from 'src/router/browserHistory';
import PersonalInfoForm from './PersonalInfoForm';
import CompanyInfoForm from './CompanyInfoForm';
import ChangePswdForm from './ChangePswdForm';

interface Props {
  addTranslation: any;
  initialize: any;
  isLoggedIn: boolean;
  match: any;
  companyProfileError: string;
  companyProfileItems: any;
  isProfileLoading: boolean;
  isDesktopLayout: boolean;
  totalPages: number;
  dropDownData: any;
  location: any;
  locationItems: any;
  isLocationLoading: boolean;
  onCompanyProfileRequest(params: any, gigAPI: boolean): void;
  onGigPagingRequest(profileId: number, pageNumber: number, pageSize: number, activeState: any): void;
  getDropDownData(type: any): void;
  getLocationsData(str: any): void;
  onEmployerAccountUpdateRequest(data: any): void;
}

class EditEmployerAccountUI extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeState: 0,
    };
    this.props.addTranslation(anonymousTranslations);
  }
  componentDidMount() {
    this.props.onCompanyProfileRequest(this.props.match.params.id, false);
    this.props.getDropDownData('gigStatus,industry,companyType,companySize');
    if (this.props.companyProfileError !== '') {
      browserHistory.push('/error');
    }
    const filterType = window.location.href.split('?view=')[1] ? window.location.href.split('?view=')[1] : '';
    switch (filterType) {
      case 'persnalInfo':
        this.setState({ activeState: 0 });
        window.history.pushState(null, '', window.location.href.split('?view=')[0]);
        return;
      case 'companyInfo':
        this.setState({ activeState: 1 });
        window.history.pushState(null, '', window.location.href.split('?view=')[0]);
        return;
      case 'changePwd':
        this.setState({ activeState: 2 });
        window.history.pushState(null, '', window.location.href.split('?view=')[0]);
        return;
      default:
        this.setState({ activeState: 0 });
        window.history.pushState(null, '', window.location.href.split('?view=')[0]);
        return;
    }
  }
  myCallback = (activeState: number) => {
    this.setState({
      activeState,
    });
  }
  render() {
    const {
      companyProfileItems,
      getLocationsData,
      location,
		  locationItems,
      isLocationLoading,
      dropDownData,
      onEmployerAccountUpdateRequest
    } = this.props;
    return (
      <ContentWrapperEmployerEdit
        activeState={this.state.activeState}
        companyProfileItems={companyProfileItems}
        callbackFromParent={this.myCallback}
      >
        <Container className="mrg-tp02 mrg-tp227mb mrg-tp04tb">
          <Grid stackable>
          <Grid.Column width={4}>
              <Card fluid className="rdus-none mobile hidden">
                <div className="ui center aligned basic segment ">
                  <Image className="centered small circular avtr avtr-ht t-mtb1" src={companyProfileItems && companyProfileItems.pictureUrl && companyProfileItems.pictureUrl !== '' ? `https://s3.amazonaws.com/dev.content.skillgigs.com${companyProfileItems.pictureUrl}` : require('../../../../assets/images/building.svg')} alt={companyProfileItems.preferredName} />
                  <h2 className="ui header mrg-rmv pad-tp02 t-ptb1">{companyProfileItems.preferredName}</h2>
                  <span className="txt-pink01 fnt01 mrg-rgt01" />
                </div>
              </Card>
              <Card fluid className="rdus-none mobile hidden">
                <div className="ui secondary fluid vertical pointing menu mrg-tp02 mrg-btm02 fnt12-tb tab-mb">
                  <a onClick={() => this.setState({ activeState: 0 })} className={`${this.state.activeState === 0 ? 'active' : 'txt-grey02'} item`} id="lnkbidhistory">
                  Personal Info
                  </a>
                  <a onClick={() => this.setState({ activeState: 1 })} className={`${this.state.activeState === 1 ? 'active' : 'txt-grey02'} item`} id="lnkSkillListing">
                  Company Info
                  </a>
                  <a onClick={() => this.setState({ activeState: 2 })} className={`${this.state.activeState === 2 ? 'active' : 'txt-grey02'} item`} id="lnkWorkHistory">
                  Change Password
                  </a>
                </div>
              </Card>
            </Grid.Column>
            <Grid.Column width={12}>
              <Card fluid className="rdus-none tm01">
                {
                  this.state.activeState === 0 ?
                    <PersonalInfoForm
                      companyProfileItems={companyProfileItems}
                      getLocationsData={getLocationsData}
                      location={location}
                      locationItems={locationItems}
                      isLocationLoading={isLocationLoading}
                      onEmployerAccountUpdateRequest={onEmployerAccountUpdateRequest}
                      profileId={this.props.match.params.id}
                    /> : null
                }
                {
                  this.state.activeState === 1 ?
                    <CompanyInfoForm
                      companyProfileItems={companyProfileItems}
                      dropDownData={dropDownData}
                      onEmployerAccountUpdateRequest={onEmployerAccountUpdateRequest}
                      profileId={this.props.match.params.id}
                    /> : null
                }
                {
                  this.state.activeState === 2 ?
                    <ChangePswdForm /> : null
                }
              </Card>
            </Grid.Column>
          </Grid>
        </Container>
      </ContentWrapperEmployerEdit>
    );
  }
}

export default (withLocalize(EditEmployerAccountUI) as any);