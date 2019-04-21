import * as React from 'react';
import CustomColumnLayout from '../../../wireframe/components/CustomColumnLayout';
import ForgotPasswordForm from './ForgotPasswordForm';
import { Header, Card, Grid } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";
import ContentWrapperWithHeader from '../../../wireframe/components/ContentWrapperWithHeader';

interface ForgotPasswordUIProps {
    addTranslation: any;
    initialize: any;
    forgetPasswordError: string;
    loginSuccess: boolean;
    isPasswordSent: boolean;
    onRequestEmailCode(email: any): void;
    resetForgetPasswordError(): void;
}

class ForgotPasswordUI extends React.Component<ForgotPasswordUIProps, any> {
  constructor(props: any) {
    super(props);
    this.props.addTranslation(anonymousTranslations);
  }
  render() {
    const {
      forgetPasswordError,
      onRequestEmailCode,
      isPasswordSent,
      resetForgetPasswordError
    } = this.props;
    return (
      <ContentWrapperWithHeader marginBottom={false}>
        <CustomColumnLayout middleAligned={true} isStackable={true} width={11} className=''>
          <Card fluid className="rdus-none tm03 mrg-tp05">
            <Grid stackable>
              <Grid.Column className="form-spc">
                <Header as='h2' className="mrg-tp07 fnt32">
                  <Translate id="forgotpassword.title" />
                </Header>
                <p className="left aligned pad-lftmb20 pad-rgtmb20">
									<Translate id="forgotpassword.para1" />
                </p>
                <p className="left aligned pad-lftmb20 pad-rgtmb20">
									<Translate id="forgotpassword.para2" />
                </p>
                <ForgotPasswordForm
                  onRequestEmailCode={onRequestEmailCode}
                  forgetPasswordError={forgetPasswordError}
                  isPasswordSent={isPasswordSent}
                  resetForgetPasswordError={resetForgetPasswordError}
                />
              </Grid.Column>
            </Grid>
          </Card>
        </CustomColumnLayout>
      </ContentWrapperWithHeader>
    );
  }
}

export default (withLocalize(ForgotPasswordUI) as any);