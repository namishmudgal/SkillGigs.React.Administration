import * as React from 'react';
import { List } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as globalTranslations from "../../../../translations/global.json";
import { NavLink } from 'react-router-dom';

interface FooterUIProps {
    addTranslation: any;
    initialize: any;
    loginSuccess: boolean;
    onCheckCredentials(username: any, password: any): void;
}

class FooterUI extends React.Component<FooterUIProps, any> {
  constructor(props: any) {
    super(props);
    this.props.addTranslation(globalTranslations);
  }

  render() {
    return (
      <footer className="add-bottom-xs-padding">
        <div className="ui basic center aligned segment sg-white-bg add-top-md-padding">
        <img className="sg-footer-img" src={require('../../../../assets/images/sg-logo2.svg')} />
        <div className="ui text container add-top-xs-padding add-bottom-xs-padding">
          <p className="sg-red-text remove-bottom-margin sg-line-height"><small><Translate id="footer.learnText" /></small></p>
          <List bulleted horizontal>
            <div className="item">
              <NavLink
                to={'/blog'}
                className="sg-footer-link sg-link"
                title="Blog"
              >
                <Translate id="footer.blogText" />
              </NavLink>
            </div>
            <div className="item">
              <NavLink
                to={'/employer/resources'}
                className="sg-footer-link sg-link"
                title="Resources"
              >
                <Translate id="footer.resourcesText" />
              </NavLink>
            </div>
          </List>
          <p className="remove-bottom-margin sg-font-line-height">|</p>
          <p className="sg-red-text remove-bottom-margin sg-line-height"><small><Translate id="footer.ourStoryText" /></small></p>
          <List bulleted horizontal>
            <div className="item">
              <NavLink
                to={'/Administration/Company/12114'}
                className="sg-footer-link sg-link"
                title="About Us"
              >
                <Translate id="footer.aboutUsText" />
              </NavLink>
            </div>
            <div className="item">
              <NavLink
                to={'/contact'}
                className="sg-footer-link sg-link"
                title="Contact Us"
              >
                <Translate id="footer.contactUsText" />
              </NavLink>
            </div>
          </List>
          <p className="remove-bottom-margin sg-font-line-height">|</p>
          <p className="sg-red-text remove-bottom-margin sg-line-height"><small><Translate id="footer.talentText" /></small></p>
          <List bulleted horizontal>
            <div className="item">
              <NavLink
                to={'/'}
                className="sg-footer-link sg-link"
                title="Home"
              >
                <Translate id="footer.homeText" />
              </NavLink>
            </div>
            <div className="item">
              <NavLink
                to={'/'}
                className="sg-footer-link sg-link"
                title="Tech Talent"
              >
                <Translate id="footer.techTalentText" />
              </NavLink>
            </div>
            <div className="item">
              <NavLink
                to={'/talent/healthcare'}
                className="sg-footer-link sg-link"
                title="Healthcare Talent"
              >
                <Translate id="footer.healthcareTalentText" />
              </NavLink>
            </div>
            <div className="item">
              <NavLink
                to={'/talent/engineering'}
                className="sg-footer-link sg-link"
                title="Engineering Talent"
              >
                <Translate id="footer.engineeringTalentText" />
              </NavLink>
            </div>
            <div className="item">
              <NavLink
                to={'/real-market-value'}
                className="sg-footer-link sg-link"
                title="Real Market Value"
              >
                <Translate id="footer.realMarketValueText" />
              </NavLink>
            </div>
            <div className="item">
              <NavLink
                to={'/talent/faq'}
                className="sg-footer-link sg-link"
                title="Talent FAQ"
              >
                <Translate id="footer.talentFAQText" />
              </NavLink>
            </div>
            <div className="item">
              <NavLink
                to={'/blog/category/talent-advice'}
                className="sg-footer-link sg-link"
                title="Talent Blog"
              >
                <Translate id="footer.talentBlogText" />
              </NavLink>
            </div>
          </List>
          <p className="remove-bottom-margin sg-font-line-height">|</p>
          <p className="sg-red-text remove-bottom-margin sg-line-height"><small><Translate id="footer.employersText" /></small></p>
          <List bulleted horizontal>
            <div className="item">
              <NavLink
                to={'/'}
                className="sg-footer-link sg-link"
                title="Home"
              >
                <Translate id="footer.homeText" />
              </NavLink>
            </div>
            <div className="item">
              <NavLink
                to={'/employer/tech'}
                className="sg-footer-link sg-link"
                title="Tech Hiring"
              >
                <Translate id="footer.techHiring" />
              </NavLink>
            </div>
            <div className="item">
              <NavLink
                to={'/employer/healthcare'}
                className="sg-footer-link sg-link"
                title="Healthcare Talent"
              >
                <Translate id="footer.healthcareHiringText" />
              </NavLink>
            </div>
            <div className="item">
              <NavLink
                to={'/employer/engineering'}
                className="sg-footer-link sg-link"
                title="Engineering Hiring"
              >
                <Translate id="footer.engineeringHiringText" />
              </NavLink>
            </div>
            <div className="item">
              <NavLink
                to={'/employer/contractors'}
                className="sg-footer-link sg-link"
                title="Contractors"
              >
                <Translate id="footer.contractorsText" />
              </NavLink>
            </div>
            <div className="item">
              <NavLink
                to={'/employer/resources'}
                className="sg-footer-link sg-link"
                title="Hiring Resources"
              >
                <Translate id="footer.hiringResourcesText" />
              </NavLink>
            </div>
            <div className="item">
              <NavLink
                to={'/employer/faq'}
                className="sg-footer-link sg-link"
                title="Employer FAQ"
              >
                <Translate id="footer.employerFAQText" />
              </NavLink>
            </div>
            <div className="item">
              <NavLink
                to={'/employer/faq'}
                className="sg-footer-link sg-link"
                title="Employer Blog"
              >
                <Translate id="footer.employerBlogText" />
              </NavLink>
            </div>
            <div className="item">
              <NavLink
                to={'/employer/security'}
                className="sg-footer-link sg-link"
                title="Security"
              >
                <Translate id="footer.securityText" />
              </NavLink>
            </div>
            <div className="item">
              <NavLink
                to={'/employer/platform-integrations'}
                className="sg-footer-link sg-link"
                title="Platform Integrations"
              >
                <Translate id="footer.platformIntegrationsText" />
              </NavLink>
            </div>
            <div className="item">
              <NavLink
                to={'/employer/ai-recruiter'}
                className="sg-footer-link sg-link"
                title="AI Recruiter"
              >
                <Translate id="footer.aiRecruiterText" />
              </NavLink>
            </div>
            <div className="item">
              <NavLink
                to={'/gig-podcast'}
                className="sg-footer-link sg-link"
                title="Gig Podcast"
              >
                <Translate id="footer.gigPodcastText" />
              </NavLink>
            </div>
            <div className="item">
              <NavLink
                to={'/gig-tv'}
                className="sg-footer-link sg-link"
                title="Gig TV"
              >
                <Translate id="footer.gigTVText" />
              </NavLink>
            </div>
          </List>
          <p className="remove-bottom-margin sg-font-line-height">|</p>
          <p className="sg-red-text remove-bottom-margin sg-line-height"><small><Translate id="footer.privacyText" /></small></p>
          <List bulleted horizontal>
            <div className="item">
              <NavLink
                to={'/legal/privacy'}
                className="sg-footer-link sg-link"
                title="Privacy Policy"
              >
                <Translate id="footer.privacyPolicyText" />
              </NavLink>
            </div>
            <div className="item">
              <NavLink
                to={'/legal/cookie-policy'}
                className="sg-footer-link sg-link"
                title="Cookie Policy"
              >
                <Translate id="footer.cookiePolicyText" />
              </NavLink>
            </div>
            <div className="item">
              <NavLink
                to={'/legal/tos'}
                className="sg-footer-link sg-link"
                title="Terms of Service"
              >
                <Translate id="footer.termsofServiceText" />
              </NavLink>
            </div>
          </List>
        </div>
        </div>
      </footer>
    );
  }
}

export default (withLocalize(FooterUI) as any);