import * as React from 'react';
import { Grid, Card } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../translations/anonymous.json";

interface Props {
    addTranslation: any;
    initialize: any;
    resumeItems: any;
}

class SgSixColumnTalentName extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.props.addTranslation(anonymousTranslations);
  }

  render() {
    const {
			resumeItems
		} = this.props;
    return (
      <Grid.Column width={6} className="rmv-rgt-pad w60-tb">
        <Card fluid className="rdus-none right pad-equal0">
          <div className="welcome">
            <div className="header">
              <p className="pad-tp03 pad-lft03 fnt-wt03">Hello, I'm {resumeItems.preferredName}</p>
            </div>
          </div>
          <Card.Content>
            <p className="pad-lft02 pad-btm3">{resumeItems.careerSummary ? resumeItems.careerSummary.objective : ''}</p>
          </Card.Content>
        </Card>
			</Grid.Column>
    );
  }
}

export default (withLocalize(SgSixColumnTalentName) as any);