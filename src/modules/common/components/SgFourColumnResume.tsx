import * as React from 'react';
import { Grid, Card, List, Icon } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../translations/anonymous.json";

interface Props {
    addTranslation: any;
    initialize: any;
    resumeItems: any;
}

class SgFourColumnList extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.props.addTranslation(anonymousTranslations);
  }

  render() {
    const {
      resumeItems
    } = this.props;
    return (
      <Grid.Column width={4} className="pad-lft0 pad-lft0tb">
        <Card fluid className="rdus-none right pad-equal0">
        <Card.Content>
					<List className="list1 link pad-lft01 pad-tp02 pad-btm2">
						<List.Item className="active">
              <a href="#"><Icon name='file word outline' className="fnt32 txt-pink01" />Original Resume</a>
            </List.Item>
						<List.Item className="active">
              <a href="#"><Icon name='file alternate outline' className="fnt32 txt-pink01" />View All Listings</a>
            </List.Item>
					</List>
					</Card.Content>
				</Card>
      </Grid.Column>
    );
  }
}

export default (withLocalize(SgFourColumnList) as any);