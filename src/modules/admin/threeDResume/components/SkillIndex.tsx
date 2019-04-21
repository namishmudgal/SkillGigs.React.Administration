import * as React from 'react';
import { Grid, Card, Header, List } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";
import BubbleChart from './BubbleChart';

interface Props {
    addTranslation: any;
		initialize: any;
		resumeItems: any;
}

class SkillIndex extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.props.addTranslation(anonymousTranslations);
  }

  render() {
		const {
      resumeItems
    } = this.props;
    return (
			<Grid.Column width={16}>
				<Card fluid className="rdus-none right pad-equal0">
					<Card.Content>
						<List className="middle aligned">
							<div className="right floated fnt08 fnt-wt04 pad-tp01 mrgn-mblft0 fnt14-mb">
								I am skilled in...
							</div>
							<List.Content className="pad-equal0">
								<Header as='h2' dividing className="heading02">
									Skill Index
								</Header>
							</List.Content>
						</List>
						<BubbleChart
							resumeItems={resumeItems}
						/>
					</Card.Content>
				</Card>
			</Grid.Column>
    );
  }
}

export default (withLocalize(SkillIndex) as any);