import * as React from 'react';
import CustomColumnLayout from '../../../wireframe/components/CustomColumnLayout';
import ContentWrapperWithHeader from '../../../wireframe/components/ContentWrapperWithHeader';
import LoginForm from './LoginForm';
import { Header, Card, Grid } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";

interface LoginPageUIProps {
    addTranslation: any;
    initialize: any;
    errorMessage: any;
    onCheckCredentialsNode(username: any, password: any): void;
    onSocialLoginSuccess(result: any): void;
    resetLoginError(): void;
}

class LoginPageUI extends React.Component<LoginPageUIProps, any> {
  constructor(props: any) {
    super(props);
    this.props.addTranslation(anonymousTranslations);
  }

  render() {
    const {
      onCheckCredentialsNode,
      errorMessage,
      onSocialLoginSuccess,
      resetLoginError
		} = this.props;
    return (
      <ContentWrapperWithHeader marginBottom={false}>
        <CustomColumnLayout middleAligned={true} isStackable={true} width={11} className=''>
          <Card fluid className="rdus-none tm03 mrg-tp05">
            <Grid stackable>
              <Grid.Column className="form-spc">
                <Header as='h2' className="mrg-tp07 fnt32">
                  <Translate id="login.title" />
                </Header>
                <LoginForm
                  onCheckCredentialsNode={onCheckCredentialsNode}
                  errorMessage={errorMessage}
                  onSocialLoginSuccess={onSocialLoginSuccess}
                  resetLoginError={resetLoginError}
                />
              </Grid.Column>
            </Grid>
          </Card>
        </CustomColumnLayout>
      </ContentWrapperWithHeader>
    );
  }
}

export default (withLocalize(LoginPageUI) as any);