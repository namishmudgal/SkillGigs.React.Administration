import * as React from 'react';
import { Grid, Container, Header, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { Translate, withLocalize } from "react-localize-redux";
import ContentWrapperWithHeader from '../../wireframe/components/ContentWrapperWithHeader';
import * as anonymousTranslations from "../../../translations/anonymous.json";

interface Props {
  addTranslation: any;
  initialize: any;
}

class NotFound extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.props.addTranslation(anonymousTranslations);
  }
  render() {
    return (
      <ContentWrapperWithHeader>
        <Container>
          <Grid stackable textAlign='center' className="add-bottom-sm-padding add-top-md-padding">
            <Grid.Column width={16}>
              <p style={{ color: '#ff004f', position: 'relative' }}>
                <Icon name='heart' size='massive' />
                <Icon name='lightning' size='massive' style={{ position: 'absolute', left: '44%', right: '50%', color: '#fff' }} />
              </p>
              <Header as={'h1'}><Translate id="notFound.header" /></Header>
              <p><Translate id="notFound.para" /></p>
              <p>
              <NavLink
                to={'/Talent'}
                className="ui large txt-wht button"
              >
                <Translate id="notFound.buttonText" />
              </NavLink>
              </p>
            </Grid.Column>
          </Grid>
        </Container>
      </ContentWrapperWithHeader>
    );
  }
}

export default (withLocalize(NotFound) as any);