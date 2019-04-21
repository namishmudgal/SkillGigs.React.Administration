import * as React from 'react';
import { Grid, Card } from 'semantic-ui-react';

interface Props {
    children: any;
}

export default class SearchLeftPanelLayout extends React.Component<Props, any> {
  render() {
    return (
      <Grid.Column width={5} className="mrg-tp02 ui form mobile hidden">
        <Card fluid className="rdus-none mrg-tp07mb">
					<div className="ui basic segment">
						{this.props.children}
					</div>
        </Card>
      </Grid.Column>
    );
  }
}