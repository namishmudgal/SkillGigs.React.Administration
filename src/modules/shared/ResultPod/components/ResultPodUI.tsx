import * as React from 'react';
import { Card, Label, Header } from 'semantic-ui-react';
import { setButtonColor } from '../../../../utilities/helper';
import { NavLink } from 'react-router-dom';

interface Props {
	appName: string;
	resultDetails: any;
}

export default class ResultPodUI extends React.Component<Props, any> {
  render() {
		const {
			resultDetails,
			appName,
		} =  this.props;
    return (
			<Card.Group itemsPerRow={6} className="doubling">
				{
					resultDetails.length ? resultDetails.map((result: any, index: number) =>
						<NavLink
							to={`/Administration/Search/${appName === 'TalentMarketplace' ? 'Gigs' : 'SkillListings'}/${appName === 'TalentMarketplace' ? result.gigId : result.skillListingId}`}
							key={appName === 'TalentMarketplace' ? result.gigId : result.skillListingId}
							className="card rdus-none"
						>
							<div className="image emply-list bg-white mrg-tp01 mrg-btm01">
								<img
									src={appName === 'TalentMarketplace' ?
										result.employerPictureUrl !== '' && result.employerPictureUrl !== null ?
											`https://s3.amazonaws.com/dev.content.skillgigs.com${result.employerPictureUrl}` : require('../../../../assets/images/building.svg') :
												result.talentPictureUrl !== '' && result.talentPictureUrl !== null ? `https://s3.amazonaws.com/dev.content.skillgigs.com${result.talentPictureUrl}` : require('../../../../assets/images/gravtar.svg')
									}
									alt={result.employerCompanyName}
								/>
							</div>
							<Card.Content style={{ textAlign: 'center' }}>
								<Card.Header className="hide-overflow">{appName === 'TalentMarketplace' ? result.employerCompanyName : result.talentPreferredName}</Card.Header>
								<Card.Description>{result.title}</Card.Description>
							</Card.Content>
							<Card.Content extra>
								<Label color={setButtonColor(result.experienceLevelName)}>Exp. Level: {result.experienceLevelName}</Label>
							</Card.Content>
						</NavLink>
          ) : <Header textAlign='center' as='h2' className="add-top-sm-padding add-bottom-sm-padding" style={{ width: '100%'}}>
								We're sorry. We cannot find any {appName === 'TalentMarketplace' ? 'gigs' : 'talent'} for your search criteria.
							</Header>
        }
			</Card.Group>
    );
  }
}