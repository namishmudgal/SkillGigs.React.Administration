import * as React from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

export default function Loading({isLoading, pastDelay, error}: {[key: string]: any}) {
  return (
      <div style={{ height: '100vh' }}>
        <Segment style={{ height: '100vh' }}>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        </Segment>
      </div>
    );
}