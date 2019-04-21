import * as React from 'react';
import ContentWrapperWithHeader from '../../../wireframe/components/ContentWrapperWithHeader';
import { Grid, Container, Loader } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";
import SgSixColumnPod from '../../../common/components/SgSixColumnPod';
import SgSixColumnTalentName from '../../../common/components/SgSixColumnTalentName';
import SgFourColumnResume from '../../../common/components/SgFourColumnResume';
import SkillIndex from './SkillIndex';
import IndustryDensity from './IndustryDensity';
import CareerHistory from './CareerHistory';
import EducationHistory from './EducationHistory';
import AwardsCertificates from './AwardsCertificates';
import browserHistory from 'src/router/browserHistory';

interface Props {
  addTranslation: any;
  initialize: any;
  isLoggedIn: boolean;
  match: any;
  skillListingError: string;
  resumeItems: any;
  isListingLoading: boolean;
  onResume3DRequest(params: any): void;
}

class ThreeDResumeUI extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.props.addTranslation(anonymousTranslations);
  }
  componentDidMount() {
    this.props.onResume3DRequest(this.props.match.params.id);
    if (this.props.skillListingError !== '') {
      browserHistory.push('/error');
    }
  }
  componentWillReceiveProps(nextProps: any) {
    if (this.props.skillListingError !== nextProps.skillListingError && nextProps.skillListingError !== '') {
      browserHistory.push('/error');
    }
  }
  render() {
    const {
      resumeItems,
      isListingLoading
    } = this.props;
    return (
      <ContentWrapperWithHeader marginBottom={false}>
      {
        isListingLoading ?
          <Loader active inline='centered' size='large' /> :
            <Container className="fix-searchBox-anonymous">
              <Grid stackable>
                <Grid.Column width={16} className="row tm03 mrg-tp03">
                  <SgSixColumnPod
                    podItems={resumeItems}
                    gigItems={resumeItems.careerRecords}
                  />
                  <SgSixColumnTalentName
                    resumeItems={resumeItems}
                  />
                  <SgFourColumnResume
                    resumeItems={resumeItems}
                  />
                </Grid.Column>
              </Grid>
              <Grid stackable>
                <SkillIndex
                  resumeItems={resumeItems}
                />
                <IndustryDensity
                  resumeItems={resumeItems}
                />
                <CareerHistory
                  resumeItems={resumeItems}
                />
                <EducationHistory
                  resumeItems={resumeItems}
                />
                <AwardsCertificates
                  resumeItems={resumeItems}
                />
              </Grid>
            </Container>
      }
      </ContentWrapperWithHeader>
    );
  }
}

export default (withLocalize(ThreeDResumeUI) as any);