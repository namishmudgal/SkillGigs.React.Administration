import * as React from 'react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";
interface Props {
    addTranslation: any;
		initialize: any;
		resumeItems: any;
}

class BubbleChart extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.props.addTranslation(anonymousTranslations);
  }

  render() {
		const {
      resumeItems
    } = this.props;
    return (
			<div className="skillChart">
			{
				resumeItems.skillDensities && resumeItems.skillDensities.skills.length ?
					resumeItems.skillDensities.skills.map((item: any, index: any) =>
					<div key={index} className={`skill-${index + 1} skill-resize text-center skillChartmb ${index > 2 ? 'mobile hidden' : ''}`} data-toggle="tooltip" data-placement="top" title="" data-original-title="No Data">
						<span className="name">
							<span className="thick-lettering" style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>{item.name}</span><br />
							<span className="thick-lettering" style={{fontSize: '2.5vh'}}>{item.density.value}</span>
						</span>
					</div>
					 ) : null
			}
			</div>
    );
  }
}

export default (withLocalize(BubbleChart) as any);