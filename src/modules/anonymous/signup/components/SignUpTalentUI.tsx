import * as React from 'react';
import CustomColumnLayout from '../../../wireframe/components/CustomColumnLayout';
import SignUpTalentForm from './SignUpTalentForm';
import { Header, Card, Grid } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";
import ContentWrapperWithHeader from '../../../wireframe/components/ContentWrapperWithHeader';

interface SignUpTalentUIProps {
    addTranslation: any;
    errorMessage: any;
    initialize: any;
    isEmailAlreadyExist: boolean;
    emailVerificationError: any;
    requestSignUpNode(username: any, email: any, password: any): void;
    verifyEmail(email: any): void;
    onSocialLoginSuccess(result: any): void;
    resetLoginError(): void;
}

class SignUpTalentUI extends React.Component<SignUpTalentUIProps, any> {
  constructor(props: any) {
    super(props);
    this.props.addTranslation(anonymousTranslations);
  }

  render() {
    const {
      verifyEmail,
      isEmailAlreadyExist,
      errorMessage,
      requestSignUpNode,
      onSocialLoginSuccess,
      resetLoginError,
      emailVerificationError
    } = this.props;
    return (
      <ContentWrapperWithHeader marginBottom={false}>
        <CustomColumnLayout middleAligned={true} isStackable={true} width={11} className=''>
          <Card fluid className="rdus-none tm03 mrg-tp05">
            <Grid stackable>
              <Grid.Column className="form-spc">
                <Header as='h2' className="mrg-tp07 fnt32">
                  <Translate id="signupTalent.title" />
                </Header>
                <SignUpTalentForm
                  errorMessage={errorMessage}
                  requestSignUpNode={requestSignUpNode}
                  onSocialLoginSuccess={onSocialLoginSuccess}
                  resetLoginError={resetLoginError}
                  isEmailAlreadyExist={isEmailAlreadyExist}
                  verifyEmail={verifyEmail}
                  emailVerificationError={emailVerificationError}
                />
              </Grid.Column>
            </Grid>
          </Card>
        </CustomColumnLayout>
      </ContentWrapperWithHeader>
    );
  }
}

export default (withLocalize(SignUpTalentUI) as any);