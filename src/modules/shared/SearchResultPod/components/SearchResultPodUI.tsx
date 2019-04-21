import * as React from 'react';
import { Card, Label } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

interface Props {
	resultDetails: any;
	resultView: string;
}

export default class SearchResultPodUI extends React.Component<Props, any> {
  render() {
		const {
			resultDetails,
			resultView
		} =  this.props;
    return (
			<Card.Group itemsPerRow={3} className="doubling">
				{
					resultDetails.data.map((result: any, index: number) =>
						<Card className="rdus-none" key={index}>
							<NavLink to={`/Administration/${result.type}/dashboard/${result.type === 'Employer' ? 22 : 14268}`}>
							<div className="image emply-list bg-white">
								<img
									src={result.imageUrl !== '' && result.imageUrl !== null ?
										result.imageUrl : resultView === 'talent' ?
											require('../../../../assets/images/building.svg') : require('../../../../assets/images/gravtar.svg')
									}
									alt={result.name}
								/>
							</div>
							<Card.Content>
      					<Card.Header className="hide-overflow">{result.name}</Card.Header>
								<Card.Description>{result.designation}</Card.Description>
							</Card.Content>
							<Card.Content extra>
								<Label className="fnt01">
									<Label className="olive">Exp. Level: {result.experience} years</Label>
								</Label>
							</Card.Content>
							</NavLink>
						</Card>
          )
        }
			</Card.Group>
    );
  }
}