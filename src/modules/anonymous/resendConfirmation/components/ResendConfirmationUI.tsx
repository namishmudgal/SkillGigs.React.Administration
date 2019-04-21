import * as React from 'react';
import CustomColumnLayout from '../../../wireframe/components/CustomColumnLayout';
import ResendConfirmationForm from './ResendConfirmationForm';
import { Header, Card, Grid } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";
import ContentWrapperWithHeader from '../../../wireframe/components/ContentWrapperWithHeader';

interface ResendConfirmationUIProps {
    addTranslation: any;
    initialize: any;
    resendConfirmationError: string;
    isConfirmationSent: boolean;
    resetResendEmailError(): void;
    onRequestEmailResend(email: any): void;
}

class ResendConfirmationUI extends React.Component<ResendConfirmationUIProps, any> {
  constructor(props: any) {
    super(props);
    this.props.addTranslation(anonymousTranslations);
  }

  render() {
    const {
      resendConfirmationError,
      isConfirmationSent,
      resetResendEmailError,
      onRequestEmailResend,
    } = this.props;
    return (
      <ContentWrapperWithHeader marginBottom={false}>
        <CustomColumnLayout middleAligned={true} isStackable={true} width={11} className=''>
          <Card fluid className="rdus-none tm03 mrg-tp05">
            <Grid stackable>
              <Grid.Column className="form-spc">
                <Header as='h2' className="mrg-tp07 fnt32">
                  <Translate id="resendconfirmation.title" />
                </Header>
                <p className="left aligned pad-lftmb20 pad-rgtmb20">
                  <Translate id="resendconfirmation.para1" />
                </p>
                <p className="left aligned pad-lftmb20 pad-rgtmb20">
                  <Translate id="resendconfirmation.para2" />
                </p>
                <ResendConfirmationForm
                  	resendConfirmationError={resendConfirmationError}
                    isConfirmationSent={isConfirmationSent}
                    resetResendEmailError={resetResendEmailError}
                    onRequestEmailResend={onRequestEmailResend}
                />
              </Grid.Column>
            </Grid>
          </Card>
        </CustomColumnLayout>
      </ContentWrapperWithHeader>
    );
  }
}

export default (withLocalize(ResendConfirmationUI) as any);