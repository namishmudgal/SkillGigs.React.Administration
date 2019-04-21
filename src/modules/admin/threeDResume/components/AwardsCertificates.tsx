import * as React from 'react';
import { Grid, Card, Header, List, Image, Icon } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";

interface Props {
    addTranslation: any;
		initialize: any;
		resumeItems: any;
}

class AwardsCertificates extends React.Component<Props, any> {
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
							<List.Item>
								<List.Content className="pad-equal0">
									<Header as='h2' dividing className="heading02">
										Awards &amp; Certificates
									</Header>
								</List.Content>
							</List.Item>
						</List>
						<Grid>
							<Grid.Column width={5} className="center aligned wfull-mb">
								<Image src={require('../../../../assets/images/resume-awards-badge-sm.svg')} fluid style={{width: '150px'}} />
							</Grid.Column>
							<Grid.Column width={11}>
								<div className="mrg-tp02 mrg-tp01mb">
								{
									resumeItems.certificates && resumeItems.certificates.certificate.length ?
										resumeItems.certificates.certificate.map((item: any) =>
											<h2 key={item.certificateId} className="mrg-btm-rmv fnt24">
												<Icon name="star" />
												{item.description}
											</h2>
										) :
											<h2 className="mrg-btm-rmv fnt24">
												No Awards Mentioned
											</h2>
								}
								</div>
							</Grid.Column>
						</Grid>
					</Card.Content>
				</Card>
			</Grid.Column>
    );
  }
}

export default (withLocalize(AwardsCertificates) as any);