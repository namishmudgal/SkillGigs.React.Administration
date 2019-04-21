import * as React from 'react';
import {Grid, Container } from 'semantic-ui-react';

interface Props extends React.Props<CustomColumnLayout> {
    isStackable: boolean;
    className: string;
    children: any;
    middleAligned: boolean;
    width: any;
}

export default class CustomColumnLayout extends React.Component<Props, {}> {
  render() {
    const {
      isStackable,
      children,
      width,
      middleAligned,
      className,
    } = this.props;
    return (
      <Container>
        <Grid className={`${middleAligned ? 'middle aligned center aligned' : null} ${isStackable ? 'stackable' :  null}`}>
          <Grid.Column width={width} className={className}>
            {children}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}