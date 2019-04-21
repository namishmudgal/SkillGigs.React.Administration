import * as React from 'react';
import { List, Segment, Header, Icon, Item, Button } from 'semantic-ui-react';

interface Props {
  items: any;
	isLoggedIn: boolean;
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default class DetailsView extends React.Component<Props, any> {
  render() {
    const {
      items,
			isLoggedIn
    } = this.props;
    return (
			<List verticalAlign='middle'>
				<List.Item>
					<List.Content>
						<Header as="h2" dividing className="heading01">
							Details
						</Header>
						<Item.Group unstackable relaxed divided style={{ margin: '0' }}>
							<Item className="item-spc">
								<div className="wfull">
									<p><b>Job Posted:</b> {`${dayNames[new Date(items.created).getDay()]}, ${monthNames[new Date(items.created).getMonth()]} ${new Date(items.created).getDate()}, ${new Date(items.created).getFullYear()}`}</p>
									<p><b>Expires On: </b> {items.jobOrderStatusCode !== 'D' ? `${dayNames[new Date(items.expiryDate).getDay()]}, ${monthNames[new Date(items.expiryDate).getMonth()]} ${new Date(items.expiryDate).getDate()}, ${new Date(items.expiryDate).getFullYear()}` : '-'}</p>
									<p><b>Job Type: </b> {items.jobOrderTypeName}</p>
									<p><b>Duration: </b> {items.idealContractLengthName}</p>
									<p><b>Desired Experience: </b> {items.experienceLevelName}</p>
									<p><b>Work Authorization:</b> {items.visaStatus ? items.visaStatus.visaStatusName : ''}</p>
								</div>
							</Item>
						</Item.Group>
					</List.Content>
				</List.Item>
			</List>
    );
  }
}
