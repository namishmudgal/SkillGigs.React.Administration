import * as React from 'react';
import { Button, Card, Image, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

interface Props {
		expiresOn: string;
		gigRole: string;
		gigLocation: string;
		viewCount: number;
		bidCount: number;
		gigStatus: number;
		gigId: number;
}

const timer: any = '';

export default class GigCard extends React.Component<Props, any> {
	timer = setInterval(() => {
    if (this.props.expiresOn) {
      this.timeBetweenDates(new Date(this.props.expiresOn));
    }
	}, 1000);
	_isMounted = false;
  constructor(props: any) {
		super(props);
		this.state = {
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0,
    };
	}
	componentDidMount() {
    this._isMounted = true;
  }
	componentWillUnmount() {
    clearInterval(timer);
    this._isMounted = false;
	}
	timeBetweenDates = (toDate: any) => {
    const dateEntered = toDate;
    const now = new Date();
    const difference = dateEntered.getTime() - now.getTime();

    if (difference <= 0) {
      clearInterval(timer);
      if (this._isMounted) {
        this.setState({ isExpired: true });
      }
    } else {
      let seconds = Math.floor(difference / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      hours %= 24;
      minutes %= 60;
      seconds %= 60;
      if (this._isMounted) {
        this.setState({
          seconds,
          minutes,
          hours,
          days
        });
      }
    }
	}
	getCardClass = (gigStatus: number) => {
		switch (gigStatus) {
			case 1:
				return 'bg-draft';
			case 2:
				return 'bg-pending';
			case 3:
				return 'bg-cancel';
			case 4:
				return 'bg-cancel';
			case 5:
				return 'bg-accepted';
			default:
				return 'bg-pending';
		}
	}
	getCardTitle = (gigStatus: number) => {
		switch (gigStatus) {
			case 1:
				return 'DRAFT';
			case 2:
				return 'EXPIRES IN';
			case 3:
				return 'DELETED';
			case 4:
				return 'EXPIRED';
			case 5:
				return 'CLOSED';
			default:
				return 'DRAFT';
		}
	}
  render() {
		const {
			expiresOn,
			gigRole,
			gigLocation,
			viewCount,
			bidCount,
			gigStatus,
			gigId
		} = this.props;
    return (
			<Card fluid className="rdus-none right pad-equal0">
				<Card.Header className={`hdng05 content rdus-none ${this.getCardClass(gigStatus)}`}>
					{gigStatus === 2 ? `EXPIRES IN ${this.state.days} DAY${this.state.days > 1 ? 'S' : ''}` : this.getCardTitle(gigStatus)}
				</Card.Header>
					<Card.Content>
						<Image alt="SkillGigs" floated="left" className="mrg-rgt01" src={require('../../../assets/images/sg-logo2.svg')} width={60} />
						<Card.Meta>
						<NavLink
							to={`/Administration/Search/Gigs/${gigId}`}
							className="txt-balck fnt-wt06 fnt06"
						>
							{gigRole}
						</NavLink>
						</Card.Meta>
						<div>{gigLocation}</div>
					</Card.Content>
					<Card.Content extra className="pad-equal0">
					<Button.Group className="three bdr-tp">
						<Button basic icon className="txt-pink01 fnt-wt06 bdr-rg01 pad-rgt01 pad-lft0 line-ht20">
							<Icon name='eye' />
							{viewCount} View{viewCount > 1 ? 's' : ''}
						</Button>
						<Button basic icon className="txt-pink01 fnt-wt06 pad-rgt01 pad-lft0 line-ht20">
							<Icon name='send' />
							{bidCount} Bid{bidCount > 1 ? 's' : ''}
						</Button>
					</Button.Group>
					</Card.Content>
				</Card>
    );
  }
}