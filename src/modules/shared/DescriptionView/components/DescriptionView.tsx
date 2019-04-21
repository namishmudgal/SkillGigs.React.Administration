import * as React from 'react';
import { List, Segment, Header, Button } from 'semantic-ui-react';

interface Props {
  items: any;
	isLoggedIn: boolean;
}

export default class DescriptionView extends React.Component<Props, any> {
  render() {
    const {
      items,
			isLoggedIn
		} = this.props;
		const createMarkup = (html: any) => {
			return {__html: html};
		};
    return (
			<List verticalAlign='middle'>
				<List.Item>
					<List.Content>
						<Header as="h2" dividing className="heading01">
							Description
						</Header>
						<p
							dangerouslySetInnerHTML={createMarkup(items.description)}
						/>
					</List.Content>
				</List.Item>
			</List>
    );
  }
}
