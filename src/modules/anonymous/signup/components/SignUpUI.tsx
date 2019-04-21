import * as React from 'react';
import CustomColumnLayout from '../../../wireframe/components/CustomColumnLayout';
import { SignUpForm } from './SignUpForm';
import { Header, Card, Grid } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";
import ContentWrapperWithHeader from '../../../wireframe/components/ContentWrapperWithHeader';

interface SignUpTalentUIProps {
    addTranslation: any;
    initialize: any;
    loginSuccess: boolean;
    onCheckCredentials(username: any, password: any): void;
}

class SignUpTalentUI extends React.Component<SignUpTalentUIProps, any> {
  constructor(props: any) {
    super(props);
    this.props.addTranslation(anonymousTranslations);
  }

  render() {
    return (
      <ContentWrapperWithHeader marginBottom={false}>
        <CustomColumnLayout middleAligned={true} isStackable={true} width={11} className=''>
          <Card fluid className="rdus-none tm03 mrg-tp05">
            <Grid stackable>
              <Grid.Column className="form-spc">
                <Header as='h2' className="mrg-tp07 fnt32">
                  <Translate id="signup.title" />
                </Header>
                <SignUpForm />
              </Grid.Column>
            </Grid>
          </Card>
        </CustomColumnLayout>
      </ContentWrapperWithHeader>
    );
  }
}

export default (withLocalize(SignUpTalentUI) as any);