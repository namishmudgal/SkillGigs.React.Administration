import * as React from 'react';
import { Icon, Input } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";

interface Props {
  addTranslation: any;
  initialize: any;
	skillName: any;
	skillPercent: any;
  skillId: number;
  isError: boolean;
  callbackFromParentReset(): void;
  callbackFromParent(skillId: number): void;
  callbackFromParentPercent(skillId: number, skillPercent: number): void;
}

class SkillItem extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      modalOpen: false,
      skillPercent: 0
    };
    this.props.addTranslation(anonymousTranslations);
  }
  componentDidMount() {
    this.setState({ skillPercent: this.props.skillPercent });
  }
  componentWillReceiveProps(nextProps: any) {
    if (this.props.skillPercent !== nextProps.skillPercent) {
      this.setState({ skillPercent: nextProps.skillPercent });
    }
  }
  _onChange = (e: any) => {
    this.props.callbackFromParentReset();
    this.setState({ skillPercent: parseInt(e.target.value, 10) });
  }
  render() {
    const {
			skillId,
      skillName,
      skillPercent,
      isError,
      callbackFromParent,
      callbackFromParentPercent
    } = this.props;
    return (
			<tr className="iconrelmb" key={skillId}>
				<td><span className="mobile only fnt01 txt-grey01 fnt-wt04">SKILL NAME : </span>{skillName}</td>
				<td className="right aligned">
					<div className="ui input wfull">
						<Input type="number" name="email" placeholder="Percent" className="rdus-none wfull" value={this.state.skillPercent} onChange={this._onChange} onBlur={() => callbackFromParentPercent(skillId, this.state.skillPercent)} error={isError} max="100" maxlength="3" />
					</div>
				</td>
				<td className="center aligned delte01mb"><a onClick={() => callbackFromParent(skillId)} className="txt-pink01"><Icon name="trash alternate" /></a></td>
			</tr>
    );
  }
}

export default (withLocalize(SkillItem) as any);