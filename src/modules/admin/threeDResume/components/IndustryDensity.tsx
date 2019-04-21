import * as React from 'react';
import { Grid, Card, Header, List } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";

interface Props {
	addTranslation: any;
	initialize: any;
	resumeItems: any;
}

class IndustryDensity extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.props.addTranslation(anonymousTranslations);
  }
	setColor = (index: number) => {
		switch (index) {
			case 0:
				return 'yellow';
			case 1:
				return 'violet';
			case 2:
				return 'orange';
			case 3:
				return 'olive';
			case 4:
				return 'red';
			default:
				return 'yellow';
		}
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
								{resumeItems.preferredName}'s Top 5 Industry Experience, Expressed in Percentages
							</div>
							<List.Content className="pad-equal0">
								<Header as='h2' dividing className="heading02">
									Industry Density
								</Header>
							</List.Content>
						</List>
						{
							resumeItems.densitiesIndustry && resumeItems.densitiesIndustry.items.length ?
							resumeItems.densitiesIndustry.items.map((item: any, index: number) =>
							<div className={`ui ${this.setColor(index)} large progress rdus-none`} key={index}>
								<div className="bar pad-tp01 pad-tp01 pad-lft01 txt-wht rdus-none" style={{transitionDuration: '300ms', width: `${item.value}%`}}>{item.name}
								<div className="progress">{item.value}%</div>
								</div>
							</div>
							) :
							<div className="ui large progress rdus-none" style={{ position: 'relative' }}>
								<div className="bar pad-tp01 pad-tp01 pad-lft01 txt-wht rdus-none" style={{transitionDuration: '300ms', width: '0%', position: 'static' }}>
								<div className="progress" style={{ left: '5px' }}>0%</div>
								<span
									style={{
										width: '100%',
										position: 'absolute',
										right: '-34px'
									}}
								>
									No Data Available
								</span>
								</div>
							</div>
						}
					</Card.Content>
				</Card>
			</Grid.Column>
    );
  }
}

export default (withLocalize(IndustryDensity) as any);