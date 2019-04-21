import * as React from 'react';
import { Form, Button, Card, Grid, Header } from 'semantic-ui-react';
import CustomColumnLayout from '../../../wireframe/components/CustomColumnLayout';

interface Props {
	callbackFromParent(activeIndex: number, type: string, options: any): void;
}

export default class CreateSkillListingForm extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = { activeIndex: 0 };
  }
  render() {
		const {
			callbackFromParent
		} = this.props;
    return (
			<CustomColumnLayout middleAligned={true} isStackable={true} width={11} className=''>
				<Card fluid className="rdus-none mrg-tp05 add-bottom-sm-padding">
					<Grid stackable>
						<Grid.Column className="form-spc">
							<Header as='h2' className="mrg-tp07 fnt32">
							Choose a Gig type
							</Header>
							<Form size="large" className="pad-eq20mb">
								<div className="ui stacked">
									<Form.Group widths={2} className="mrg-tp03">
										<Form.Field>
											<Button
												size='large'
												fluid
												className="main-secondary rdus-none mrg-tp04"
												onClick={
													() => callbackFromParent(1, 'Permanent', {})
												}
											>
												Permanent Gig
											</Button>
										</Form.Field>
										<Form.Field>
											<Button
												size='large'
												fluid
												className="main-primary rdus-none mrg-tp04"
												onClick={
													() => callbackFromParent(1, 'Contract', {})
												}
											>
												Contract Gig
											</Button>
										</Form.Field>
									</Form.Group>
								</div>
							</Form>
						</Grid.Column>
					</Grid>
				</Card>
			</CustomColumnLayout>
		);
  }
}
