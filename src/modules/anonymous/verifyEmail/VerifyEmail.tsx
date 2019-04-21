import * as React from 'react';
import CustomColumnLayout from '../../wireframe/components/CustomColumnLayout';
import { Header, Card, Icon, Grid } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../translations/anonymous.json";
import ContentWrapperWithHeader from '../../wireframe/components/ContentWrapperWithHeader';

interface VerifyEmailProps {
    addTranslation: any;
    initialize: any;
    loginSuccess: boolean;
    onCheckCredentials(username: any, password: any): void;
}
class VerifyEmail extends React.Component<VerifyEmailProps, any> {
  constructor(props: any) {
    super(props);
    this.props.addTranslation(anonymousTranslations);
  }
  render() {
    return (
      <ContentWrapperWithHeader marginBottom={true}>
        <CustomColumnLayout middleAligned={true} isStackable={true} width={16} className=''>
          <Card fluid className="rdus-none tm03 mrg-tp05 pad-equa20">
            <div className="ui center aligned">
              <div className="mrg-tp05">
                <div className="bg-pink txt-wht icon-radius i-stack-lrg">
                  <Icon name="check" />
                </div>
              </div>
            </div>
            <Grid stackable>
					    <div className="column form-spc">
                <h2 className="mrg-tp05 fnt32">CONFIRM YOUR EMAIL TO ACTIVATE YOUR ACCOUNT</h2>
							  <h4 className="fnt18 mrg-tp02">Thank you for signing up for SkillGigs</h4>
							  <p className="mrg-tp04">
                  You are one step closer to landing your dream job! Just follow the 3 simple steps below to activate your account and start your SkillGigs journey for FREE.
                </p>
              </div>
            </Grid>
            <div className="ui stacked mrg-tp010">
              <div className="ui three column grid">
                <div className="column wfull-mb mrg-btm02">
                  <Card fluid>
                    <Card.Content className="ht10 set-positon">
                      <span className="bg-pink i-stack txt-wht icon-radius fnt22 i-stack-set">
                        <Icon className="envelope" />
                      </span>
                      <Card.Header className="mrg-tp03">Step 1</Card.Header>
                      <Card.Meta><b>Go to Your Inbox</b></Card.Meta>
                    </Card.Content>
                  </Card>
                  <p className="mrg-tp02 left aligned fnt02">Check the email inbox of the address you signed up with.</p>
                </div>
                <div className="column wfull-mb mrg-btm02">
                  <Card fluid>
                    <Card.Content className="ht10 set-positon">
                      <span className="bg-pink i-stack txt-wht icon-radius fnt22 i-stack-set">
                        <Icon name="eye" />
                      </span>
                      <Card.Header className="mrg-tp03">Step 2</Card.Header>
                      <Card.Meta>
                        <b>Open the Confirmation Email</b>
                      </Card.Meta>
                    </Card.Content>
                  </Card>
                <p className="mrg-tp02 left aligned fnt02">
                  Find the email from&nbsp;
                  <a href="mailto:hello@skillgigs.com" className="txt-pink01">hello@skillgigs.com</a>
                </p>
                <p className="mrg-tp01 left aligned fnt02">
                  <em>If you cannot find the email be sure to check your Spam folder and add it to your address book to ensure future emails do not go to your Spam folder.</em>
                </p>
              </div>
              <div className="column wfull-mb mrg-btm02">
                <Card fluid>
                  <Card.Content className="ht10 set-positon">
                    <span className="bg-pink i-stack txt-wht icon-radius fnt22 i-stack-set">
                      <i className="linkify icon" />
                    </span>
                    <Card.Header className="mrg-tp03">Step 3</Card.Header>
                    <Card.Meta className="meta"><b>Click on the link in the email</b></Card.Meta>
                  </Card.Content>
                </Card>
                <p className="mrg-tp02 left aligned fnt02">Click the activate your account button to gain access and start your journey!</p>
              </div>
              </div>
            </div>
          </Card>
        </CustomColumnLayout>
      </ContentWrapperWithHeader>
    );
  }
}

export default (withLocalize(VerifyEmail) as any);
