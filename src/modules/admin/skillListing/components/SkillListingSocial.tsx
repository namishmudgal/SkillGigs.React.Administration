import * as React from 'react';
import { Grid, Container, Card, Segment, Header, Icon, Image} from 'semantic-ui-react';

interface Props {
  skillListingItems: any;
}

export default class SkillListingPageUI extends React.Component<Props, any> {
  render() {
    const {
      skillListingItems
    } = this.props;
    return (
        <div id="SocialMedia">
            <div className="ui basic t-mtb1 mrg-btm01 mrg-tp01">
                <div className="ui fluid manage-social">
                    Manage Social &nbsp;
                    <a className="ui circular positive icon basic button" id="add-socialmedia">
                    <Icon name="add" />
                    </a>
                </div>
            </div>
            <div className="ui small modal socialmedia add-socialmedia bdr-rdus-rmv long leaf">
                <i className="close cross icon" />
                <div className="header">
                    Add Social Media Account
                </div>
                <div className="content">
                    <div className="ui form socialmedia">
                        <div className="two fields">
                        <div className="field">
                            <div className=" field required">
                                <label>Social Media Types:</label>
                                <div className="ui large input">
                                    <div className="ui fluid selection dropdown socialmedia">
                                    <input id="ddlSocialMediaTypes" name="SocialMediaTypes" type="hidden" />
                                    <Icon name="dropdown" />
                                    <div className="default text"> Select</div>
                                    <div className="menu">
                                        <div className="item" data-value="5">
                                            <img className="ui avatar image" src="/Assets/svg/linkedin.svg" />
                                            LinkedIn
                                        </div>
                                        <div className="item" data-value="4">
                                            <img className="ui avatar image" src="/Assets/svg/facebook.svg" />
                                            Facebook
                                        </div>
                                        <div className="item" data-value="2">
                                            <img className="ui avatar image" src="/Assets/svg/stackoverflow.svg" />
                                            StackOverflow
                                        </div>
                                        <div className="item" data-value="3">
                                            <img className="ui avatar image" src="/Assets/svg/stackexchange.svg" />
                                            Stack Exchange
                                        </div>
                                        <div className="item" data-value="1">
                                            <img className="ui avatar image" src="/Assets/svg/github.svg" />
                                            GitHub
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <div className=" large field required">
                                <label className="mobile-hide">Username or Slug:</label>
                                <label className="largescreen-hide">Username or Slug:</label>
                                <div className="ui large input">
                                    <input type="text" id="txtURL" name="URL" placeholder="your profile name e.g. username" className="" />
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="ui error message" />
                    </div>
                </div>
                <div className="actions right aligned">
                    <div className="ui buttons">
                        <button className="ui deny button">Cancel</button>
                        <div className="or" />
                        <button className="ui positive btn-pink txt-wht button bdr-rdus-rmv" id="btnSaveSocialMedia">Save</button>
                    </div>
                </div>
            </div>
            <div className="ui small modal socialmedia delete-socialmedia bdr-rdus-rmv long leaf">
                <Icon name="close" className="cross" />
                <div className="header">
                    Delete Social Media Account
                </div>
                <div className="content">
                    <table className="ui unstackable table">
                        <tbody />
                    </table>
                </div>
                <div className="actions right aligned">
                    <div className="ui buttons">
                        <button className="ui deny button">Cancel</button>
                    </div>
                </div>
            </div>
          </div>
    );
  }
}
