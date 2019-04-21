import * as React from 'react';
import { Grid, Card, List, Icon } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../translations/anonymous.json";
import { NavLink } from 'react-router-dom';

interface Props {
    addTranslation: any;
    initialize: any;
    listItems: any;
    profileId: number;
}

class SgFourColumnList extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.props.addTranslation(anonymousTranslations);
  }

  render() {
    const {
      listItems,
      profileId
    } = this.props;
    return (
      <Grid.Column width={4} className="pad-lft0">
        <Card fluid className="rdus-none right pad-equal0 mrg-bt15mb">
					<Card.Content>
            <List className="list1">
              <List.Item className="sg-ellipsis" title={listItems.companyType}><b>Company Type :</b> {listItems.companyType}</List.Item>
              <List.Item><b>Company Size :</b> {listItems.companySize}</List.Item>
              <List.Item><b>Industry :</b> {listItems.industryName}</List.Item>
              <List.Item><b>Location :</b> {listItems.location}</List.Item>
              <List.Item>
                <b>Year Founded :</b> {listItems.yearFounded}
                  <span className="right floated mrg-rgt7">
                    <NavLink to={`/Administration/Employer/Account/Edit/${profileId}?view=companyInfo`}><Icon name="edit" className="txt-pink01 fnt04" /></NavLink>
                  </span>
              </List.Item>
            </List>
					</Card.Content>
				</Card>
      </Grid.Column>
    );
  }
}

export default (withLocalize(SgFourColumnList) as any);