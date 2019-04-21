import * as React from 'react';
import SignUpEmployerForm from './SignUpEmployerForm';
import { Container, Header, Card, Grid, List } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";
import ContentWrapperWithHeader from '../../../wireframe/components/ContentWrapperWithHeader';

interface SignUpEmployerUIProps {
    addTranslation: any;
    initialize: any;
    loginSuccess: boolean;
    onCheckCredentials(username: any, password: any): void;
}

class SignUpEmployerUI extends React.Component<SignUpEmployerUIProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      code: 'CANDP'
    };
    this.props.addTranslation(anonymousTranslations);
  }
  componentDidMount() {
    const URL = window.location.href;
    const query = '?productcode=';
    if (URL.toLowerCase().split(query)[1]) {
      this.setState({ code: URL.toLowerCase().split(query)[1].toUpperCase() });
    } else {
      this.setState({ code: 'CANDP' });
    }
  }
  render() {
    return (
      <ContentWrapperWithHeader marginBottom={false}>
        <Container>
          <Grid stackable>
            <Grid.Column width={7}>
              <Header as='h2' className="mrg-tp05 fnt-wt06 tm03">
                <Translate id={`signupEmployer.leftSectionTitle${this.state.code}`} />
              </Header>
              <Header as='h2' className="mrg-tp05">
                <Translate id={`signupEmployer.leftSectionListHeader${this.state.code}`} />
              </Header>
              <List className="middle aligned mrg-lft02">
                <List.Item className="pad-tp02">
                  <List.Icon name='check' className="mrg-rgt01" />
                  <Translate id={`signupEmployer.leftSectionList1${this.state.code}`} />
                </List.Item>
                <List.Item className="pad-tp02">
                  <List.Icon name='check' className="mrg-rgt01" />
                  <Translate id={`signupEmployer.leftSectionList2${this.state.code}`} />
                </List.Item>
                <List.Item className="pad-tp02">
                  <List.Icon name='check' className="mrg-rgt01" />
                  <Translate id={`signupEmployer.leftSectionList3${this.state.code}`} />
                </List.Item>
                {
                  this.state.code === 'ENT' ?
                    <List.Item className="pad-tp02">
                      <List.Icon name='check' className="mrg-rgt01" />
                      <Translate id={`signupEmployer.leftSectionList4${this.state.code}`} />
                    </List.Item> : null
                }
              </List>
              <Header as='h3' className="mrg-tp05">
                <Translate id={`signupEmployer.leftSectionBottomText${this.state.code}`} />
              </Header>
            </Grid.Column>
            <Grid.Column width={9}>
              <Card fluid className="rdus-none mrg-tp05">
                <Grid stackable>
                  <Grid.Column className="form-spc">
                    <Header as='h2' className="mrg-tp07 fnt32" textAlign='center'>
                      <Translate id="signupEmployer.title" />
                    </Header>
                    <SignUpEmployerForm />
                  </Grid.Column>
                </Grid>
              </Card>
            </Grid.Column>
          </Grid>
        </Container>
      </ContentWrapperWithHeader>
    );
  }
}

export default (withLocalize(SignUpEmployerUI) as any);