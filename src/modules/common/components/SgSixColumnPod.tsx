import * as React from 'react';
import { Grid, Card, Image, Icon, Button } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../translations/anonymous.json";

interface Props {
    addTranslation: any;
		initialize: any;
		podItems: any;
		gigItems: any;
}

class SgSixColumnPod extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.props.addTranslation(anonymousTranslations);
  }

  render() {
		const {
			podItems,
			gigItems
		} = this.props;
    return (
      <Grid.Column width={6}>
        <Card fluid className="rdus-none right pad-equal0 wfull-tb">
					<Card.Content>
							<Grid>
								<Grid.Column width={6} className="left rmv-pad mrg-tp04 mrg-lft03 mrg-btm03">
									<Image src={podItems && podItems.pictureUrl && podItems.pictureUrl !== '' ? `https://s3.amazonaws.com/dev.content.skillgigs.com${podItems.pictureUrl}` : require('../../../assets/images/gravtar.svg')} alt={podItems && podItems.preferredName} circular className="avtr avtr-ht t-mtb1" />
								</Grid.Column>
								<Grid.Column width={5} className="left aligned mrg-tp05 mrg-tp04tb pad-equal0">
										<h2 className="txt-pink01 mrg-btm-rmv">{podItems && podItems.preferredName ? podItems.preferredName : ''}</h2>
										<p>{podItems && podItems.location ? podItems.location : ''}</p>
								</Grid.Column>
							</Grid>
					</Card.Content>
					<Card.Content extra className="pad-equal0">
						<Button.Group widths='3' className="bg-grey06">
							<Button basic className="fnt-wt06 bdr-rg01 line-ht20 txt-balck line-ht25 line-ht15-mb fnt07-mb"><Icon name="suitcase" className="wfull" />{gigItems && gigItems.items ? gigItems.items.length : 0} Gig{gigItems && gigItems.items && gigItems.items.length > 1 ? 's' : ''}</Button>
							<Button basic className="fnt-wt06 bdr-rg01 line-ht20 txt-balck line-ht25 line-ht15-mb fnt07-mb"><Icon name="users" className="wfull" />{podItems && podItems.followerCount ? podItems.followerCount : 0} Follower{podItems && podItems.followerCount > 1 ? 's' : ''}</Button>
							<Button basic className="fnt-wt06 pad-rgt01 line-ht20 txt-balck line-ht25 line-ht15-mb fnt07-mb"><Icon name="eye" className="wfull" />{podItems && podItems.profileViewCount ? podItems.profileViewCount : 0} View{podItems && podItems.profileViewCount > 1 ? 's' : ''}</Button>
						</Button.Group>
					</Card.Content>
				</Card>
      </Grid.Column>
    );
  }
}

export default (withLocalize(SgSixColumnPod) as any);