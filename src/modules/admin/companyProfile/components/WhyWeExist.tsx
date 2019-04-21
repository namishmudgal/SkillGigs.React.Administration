import * as React from 'react';
import { Grid, Card, Header, List, Icon, Modal, Form } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../../translations/anonymous.json";
import TextEditor from '../../../common/components/TextEditor';

interface Props {
    addTranslation: any;
		initialize: any;
		companyProfileItems: any;
		profileId: number;
		onEmployerAccountUpdateRequest(data: any): void;
}

class WhyWeExist extends React.Component<Props, any> {
  constructor(props: any) {
		super(props);
		this.state = {
			description: '',
			descriptionError: false,
			modalOpen: false
		};
    this.props.addTranslation(anonymousTranslations);
	}
	componentWillReceiveProps(nextProps: any) {
		if (Object.keys(nextProps.companyProfileItems).length && this.props.companyProfileItems.objective !== nextProps.companyProfileItems.objective) {
			this.setState({ description: nextProps.companyProfileItems.objective });
		}
	}
	componentDidMount() {
		this.setState({ description: this.props.companyProfileItems.objective });
	}
	handleOpen = () => this.setState({ modalOpen: true });

	handleClose = () => this.setState({ modalOpen: false });
	
	_onSave = () => {
		this.props.onEmployerAccountUpdateRequest({
			profileId: this.props.profileId,
			objective: this.state.description
		});
		this.setState({ modalOpen: false });
	}

  render() {
		const {
			companyProfileItems
		} = this.props;
		const createMarkup = (html: any) => {
			return {__html: html};
		};
    return (
			<Grid.Column width={16}>
				<Card fluid className="rdus-none right pad-equal0">
					<Card.Content>
						<List className="middle aligned">
							<List.Item>
								<List.Content floated='right'>
								<Modal
									trigger={<a onClick={this.handleOpen}><Icon name="edit" className="txt-pink01 fnt04" /></a>}
									open={this.state.modalOpen}
									onClose={this.handleClose}
									closeIcon
								>
									<Modal.Header>
										About Your Company
										<p className="fnt04 fnt-wt04">Describe your company for others to understand your work culture.</p>
									</Modal.Header>
									<Modal.Content>
										<Form>
											<Form.Field>
												<label>Description</label>
												<TextEditor
													onSetEditorHTML={(html: any) => {
														this.setState({
															description: html
														});
													}}
													makeFormDirty={() => { console.log('makeFormDirty'); }}
													isError={this.state.descriptionError}
													content={this.state.description}
												/>
											</Form.Field>
										</Form>
									</Modal.Content>
									<div className="actions  right aligned">
										<div className="ui buttons">
											<button className="ui button" onClick={this.handleClose}>Cancel</button>
											<div className="or"></div>
											<button className="ui positive btn-pink txt-wht button bdr-rdus-rmv" onClick={this._onSave}>Save</button>
										</div>
									</div>
								</Modal>
								</List.Content>
								<List.Content className="pad-equal0">
									<Header as='h2' dividing className="heading02">
										Why We Exist
									</Header>
								</List.Content>
							</List.Item>
						</List>
						<p
							className="fnt06"
							dangerouslySetInnerHTML={createMarkup(companyProfileItems.objective)}						
						/>
					</Card.Content>
				</Card>
			</Grid.Column>
    );
  }
}

export default (withLocalize(WhyWeExist) as any);