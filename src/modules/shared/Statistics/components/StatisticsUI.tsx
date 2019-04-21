import * as React from 'react';
import { Grid, Header, Card } from 'semantic-ui-react';

export default class StatisticsUI extends React.Component<{}, any> {
  render() {
    return (
      <Grid stackable columns='equal' celled='internally'>
        <div className="column center aligned sub-header-cntn mrg-tp02">
          <Header as='h2' className="hdng02">Your Statistics</Header>
          <Card.Group centered itemsPerRow={8}>
            <Card href='#'>
              <Card.Content>
                <Card.Header><h2 className="txt-pending">2</h2></Card.Header>
                <Card.Description className="txt-pending">
                  Account Managers
                </Card.Description>
              </Card.Content>
            </Card>
            <Card href='#'>
              <Card.Content>
                <Card.Header><h2 className="txt-pending">0</h2></Card.Header>
                <Card.Description className="txt-pending">
                  Talanet Advocates
                </Card.Description>
              </Card.Content>
            </Card>
            <Card href='#'>
              <Card.Content>
                <Card.Header><h2 className="txt-pending">138</h2></Card.Header>
                <Card.Description className="txt-pending">
                  Employers
                </Card.Description>
              </Card.Content>
            </Card>
            <Card href='#'>
              <Card.Content>
                <Card.Header><h2 className="txt-cancel">0</h2></Card.Header>
                <Card.Description className="txt-cancel">
                  Unviewed Bids Placed
                </Card.Description>
              </Card.Content>
            </Card>
            <Card href='#'>
              <Card.Content>
                <Card.Header><h2 className="txt-cancel">0</h2></Card.Header>
                <Card.Description className="txt-cancel">
                  Unviewed Bids Recieved
                </Card.Description>
              </Card.Content>
            </Card>
            <Card href='#'>
              <Card.Content>
                <Card.Header><h2 className="txt-cancel">18</h2></Card.Header>
                <Card.Description className="txt-cancel">Pending Interviews</Card.Description>
              </Card.Content>
            </Card>
            <Card href='#'>
              <Card.Content>
                <Card.Header><h2 className="txt-cancel">292</h2></Card.Header>
                <Card.Description className="txt-cancel">Unviewed Messages</Card.Description>
              </Card.Content>
            </Card>
            <Card href='#'>
              <Card.Content>
                <Card.Header><h2>32</h2></Card.Header>
                <Card.Description>Total Bids Placed</Card.Description>
              </Card.Content>
            </Card>
            <Card href='#'>
              <Card.Content>
                <Card.Header><h2>458</h2></Card.Header>
                <Card.Description>Total Gigs</Card.Description>
              </Card.Content>
            </Card>
            <Card href='#'>
              <Card.Content>
                <Card.Header><h2>87</h2></Card.Header>
                <Card.Description>Total Interviews</Card.Description>
              </Card.Content>
            </Card>
            <Card href='#'>
              <Card.Content>
                <Card.Header><h2>995</h2></Card.Header>
                <Card.Description>Total Messages</Card.Description>
              </Card.Content>
            </Card>
            <Card href='#'>
              <Card.Content>
                <Card.Header><h2>69</h2></Card.Header>
                <Card.Description>Total Bids Recieved</Card.Description>
              </Card.Content>
            </Card>
          </Card.Group>
        </div>
      </Grid>
    );
  }
}
