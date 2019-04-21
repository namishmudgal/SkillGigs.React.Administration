import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import browserHistory from './browserHistory';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { renderToStaticMarkup } from "react-dom/server";
import initStore from '../store';
import ErrorPage from '../modules/error/components/ErrorPage';
import NotFound from '../modules/notfound/components/NotFound';
import EnsureLoggedInContainer from './EnsureLoggedInContainer';
import RedirectBackContainer from './RedirectBackContainer';
import { LocalizeProvider } from "react-localize-redux";
import {
  CompanyProfilePage,
  GigSearchPage,
  EmployerSearchPage,
  ThreeDResumePage,
  SkillListingPage,
  ManageGigsPage,
  GigListingPage,
  AdminDashboardPage,
  TalentAdminDashboard,
  EmployerAdminDashboard,
  CreateSkillListingPage,
  CreateGigListingPage,
  EmployerAccountEditPage,
  PhotoManagerPage,
  PeopleWizardPage,
  SkillDensityPage,
  EmployerTeamPage,
  PeopleDetailsPage,
  EmployerBidPage,
  TalentBidPage,
  ScheduleInterviewPage
} from './routes';

const store = initStore();

export const AppRouter: React.StatelessComponent<{}> = () => {

  return (
    <Provider store={store}>
      <LocalizeProvider initialize={{
        languages: [
          { name: "English", code: "en" },
          { name: "French", code: "fr" },
          { name: "German", code: "de" }
        ],
        options: {
          defaultLanguage: "en",
          renderToStaticMarkup
        }
      }}>
        <ConnectedRouter history={browserHistory} >
          <Switch>
            <Route exact path="/Administration/dashboard" component={AdminDashboardPage} />
            <Route exact path="/Administration/Company/:id" component={CompanyProfilePage} />
            <Route exact path="/Administration/Search/Gigs" component={GigSearchPage} />
            <Route exact path="/Administration/Search/SkillListings" component={EmployerSearchPage} />
            <Route exact path="/Administration/Talent/SkillListing/Wizard" component={CreateSkillListingPage} />
            <Route exact path="/Administration/Employer/Gig/Wizard/:id" component={CreateGigListingPage} />
            <Route exact path="/Administration/Talent/Resume/:id" component={ThreeDResumePage} />
            <Route exact path="/Administration/Talent/dashboard/:id" component={TalentAdminDashboard} />
            <Route exact path="/Administration/Employer/dashboard/:id" component={EmployerAdminDashboard} />
            <Route exact path="/Administration/Employer/Manage/Gigs/:id" component={ManageGigsPage} />
            <Route exact path="/Administration/Search/SkillListings/:id" component={SkillListingPage} />
            <Route exact path="/Administration/Search/Gigs/:id" component={GigListingPage} />
            <Route exact path="/Administration/Employer/Account/Edit/:id" component={EmployerAccountEditPage} />
            <Route exact path="/Administration/Employer/PhotoManager/:id" component={PhotoManagerPage} />
            <Route exact path="/Administration/Employer/PeopleWizard/:id" component={PeopleWizardPage} />
            <Route exact path="/Administration/Gig/SkillDensity/:id" component={SkillDensityPage} />
            <Route exact path="/Administration/Employer/Manage/Team/:id" component={EmployerTeamPage} />
            <Route exact path="/Administration/Employer/Profile/Users/:id" component={PeopleDetailsPage} />
            <Route exact path="/Administration/Employer/Bid/:id" component={EmployerBidPage} />
            <Route exact path="/Administration/Talent/Bid/:id" component={TalentBidPage} />
            <Route exact path="/Administration/Employer/Interview/RequestInterview/:id" component={ScheduleInterviewPage} />
            <Route path="/notfound" component={NotFound} />
            <Route path="/error" component={ErrorPage} />
            <Route path="/Administration" render={() => <Redirect to="/Administration/dashboard" />} />
            <Route path="/" render={() => <Redirect to="/Administration/dashboard" />} />
            <Route path="*" render={() => <Redirect to="/notfound" />} />
          </Switch>
        </ConnectedRouter>
      </LocalizeProvider>
    </Provider>
  );
};