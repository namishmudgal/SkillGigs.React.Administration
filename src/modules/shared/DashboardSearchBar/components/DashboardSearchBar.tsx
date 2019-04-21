import * as React from 'react';
import { Grid, Container } from 'semantic-ui-react';

interface Props {
    title: string;
    placeholder: string;
}

export default class DashboardSearchBar extends React.Component<Props, any> {
  render() {
    const {
      title,
      placeholder
    } = this.props;
    return (
      <Grid stackable columns='equal' celled='internally' className="sub-header02">
        <div className="column center aligned sub-header-cntn">
          <Container className="mrg-tp05">
            <h2 className="txt-wht hdng02  mobile hidden">{title}</h2>
            <div className="ui fluid action input">
              <input type="text" placeholder={placeholder} className="rdus-none" />
              <div className="ui large main-primary submit button rdus-none">Search</div>
            </div>
          </Container>
        </div>
      </Grid>
    );
  }
}
