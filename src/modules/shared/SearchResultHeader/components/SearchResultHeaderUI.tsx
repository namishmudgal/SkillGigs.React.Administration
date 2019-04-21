import * as React from 'react';
import { Grid, Form, Container } from 'semantic-ui-react';

interface Props {
		resultCount: number;
		totalCount: number;
}

export default class SearchResultHeaderUI extends React.Component<Props, any> {
  render() {
		const {
			resultCount,
			totalCount
		} =  this.props;
    return (
			<div>
				<Grid className="mobile only mrg-tp04 mrg-btm02">
					<Grid.Column width={9} className="line-ht40 pad-equal0 left aligned fnt02 fnt-wt06">
						{resultCount} results found out of {totalCount}
					</Grid.Column>
					<Grid.Column width={7} className="pad-equal0">
						<Form>
							<Form.Field>
								<select>
									<option value="">Most Relevant</option>
									<option value="1">Most Recent</option>
									<option value="0">Ending Soonest</option>
								</select>
							</Form.Field>
						</Form>
					</Grid.Column>
				</Grid>
				<Container className="pad-btm3 mobile hidden">
					<Grid container columns={2} stackable>
						<Grid.Row>
							<Grid.Column width={11} textAlign='left' className="rmv-pad">
								<h2 className="ui icon mrg-tp5 mrg-tp03mb">{resultCount} results found out of {totalCount}</h2>
							</Grid.Column>
							<Grid.Column width={5} className="rmv-pad" textAlign='right'>
								<Form>
									<Form.Field>
										<select>
											<option value="">Most Relevant</option>
											<option value="1">Most Recent</option>
											<option value="0">Ending Soonest</option>
										</select>
									</Form.Field>
								</Form>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Container>
			</div>
    );
  }
}