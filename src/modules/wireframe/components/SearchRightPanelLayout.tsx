import * as React from 'react';
import { Grid } from 'semantic-ui-react';

interface Props {
    children: any;
}

export default class SearchRightPanelLayout extends React.Component<Props, any> {
  render() {
    return (
      <Grid.Column width={11} className="mrg-tp04mb">
        <div className="ui fluid rdus-none">
          <div className="ui center aligned basic segment">
            {this.props.children}
          </div>
        </div>
      </Grid.Column>
    );
  }
}