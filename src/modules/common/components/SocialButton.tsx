import * as React from 'react';
import SocialLogin from 'react-social-login';

interface Props {
	children: any;
	type: 'string';
	triggerLogin(): void;
}

class Button extends React.Component<Props, any> {
	render() {
		const {
			triggerLogin,
			...rest
		} = this.props;
		return (
			<button
				onClick={(e) => {
					e.preventDefault();
					triggerLogin();
				}}
				{...rest}
				className={`ui large button rdus-none ${this.props.type}`}
			>
				{ this.props.children }
			</button>
		);
	}
}
export default SocialLogin(Button);