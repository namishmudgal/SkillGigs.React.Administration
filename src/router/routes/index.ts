import Loadable from 'react-loadable';
import path from 'path';
import Loading from '../../modules/loader/components/Loader';
import { fakeDelay } from '../../utilities';

export const CompanyProfilePage = Loadable({
  loader: () => fakeDelay(100).then(() => import(/* webpackChunkName: "CompanyProfile" */ '../../modules/admin/companyProfile/containers/CompanyProfile')),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, '../../modules/admin/companyProfile/containers/CompanyProfile')
});

export const GigSearchPage = Loadable({
  loader: () => fakeDelay(100).then(() => import(/* webpackChunkName: "GigSearchPage" */ '../../modules/anonymous/gigSearchPage')),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, '../../modules/anonymous/gigSearchPage')
});

export const EmployerSearchPage = Loadable({
  loader: () => fakeDelay(100).then(() => import(/* webpackChunkName: "EmployerSearchPage" */ '../../modules/anonymous/employerSearchPage')),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, '../../modules/anonymous/employerSearchPage')
});

export const ThreeDResumePage = Loadable({
  loader: () => fakeDelay(100).then(() => import(/* webpackChunkName: "ThreeDResume" */ '../../modules/admin/threeDResume/containers/ThreeDResume')),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, '../../modules/admin/threeDResume/containers/ThreeDResume')
});

export const SkillListingPage = Loadable({
  loader: () => fakeDelay(100).then(() => import(/* webpackChunkName: "SkillListing" */ '../../modules/admin/skillListing')),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, '../../modules/admin/skillListing')
});

export const ManageGigsPage = Loadable({
  loader: () => fakeDelay(100).then(() => import(/* webpackChunkName: "ManageGigs" */ '../../modules/admin/manageGigs')),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, '../../modules/admin/manageGigs')
});

export const GigListingPage = Loadable({
  loader: () => fakeDelay(100).then(() => import(/* webpackChunkName: "GigListing" */ '../../modules/admin/gigListing')),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, '../../modules/admin/gigListing')
});

export const AdminDashboardPage = Loadable({
  loader: () => fakeDelay(100).then(() => import(/* webpackChunkName: "AdminDashboard" */ '../../modules/admin/adminDashboard')),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, '../../modules/admin/adminDashboard')
});

export const TalentAdminDashboard = Loadable({
  loader: () => fakeDelay(100).then(() => import(/* webpackChunkName: "TalentAdminDashboard" */ '../../modules/admin/talentDashboard')),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, '../../modules/admin/talentDashboard')
});

export const EmployerAdminDashboard = Loadable({
  loader: () => fakeDelay(100).then(() => import(/* webpackChunkName: "EmployerAdminDashboard" */ '../../modules/admin/employerDashboard')),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, '../../modules/admin/employerDashboard')
});

export const CreateSkillListingPage = Loadable({
  loader: () => fakeDelay(100).then(() => import(/* webpackChunkName: "CreateSkillListing" */ '../../modules/admin/createSkillListing')),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, '../../modules/admin/createSkillListing')
});

export const CreateGigListingPage = Loadable({
  loader: () => fakeDelay(100).then(() => import(/* webpackChunkName: "CreateGigListing" */ '../../modules/admin/createGigListing')),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, '../../modules/admin/createGigListing')
});

export const EmployerAccountEditPage = Loadable({
  loader: () => fakeDelay(100).then(() => import(/* webpackChunkName: "EmployerAccountEdit" */ '../../modules/admin/editEmployerAccount')),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, '../../modules/admin/editEmployerAccount')
});

export const PhotoManagerPage = Loadable({
  loader: () => fakeDelay(100).then(() => import(/* webpackChunkName: "PhotoManager" */ '../../modules/admin/photoManager')),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, '../../modules/admin/photoManager')
});

export const PeopleWizardPage = Loadable({
  loader: () => fakeDelay(100).then(() => import(/* webpackChunkName: "PeopleWizard" */ '../../modules/admin/peopleWizard')),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, '../../modules/admin/peopleWizard')
});

export const SkillDensityPage = Loadable({
  loader: () => fakeDelay(100).then(() => import(/* webpackChunkName: "SkillDensity" */ '../../modules/admin/skillDensity')),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, '../../modules/admin/skillDensity')
});

export const EmployerTeamPage = Loadable({
  loader: () => fakeDelay(100).then(() => import(/* webpackChunkName: "EmployerTeam" */ '../../modules/admin/employerTeam')),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, '../../modules/admin/employerTeam')
});

export const PeopleDetailsPage = Loadable({
  loader: () => fakeDelay(100).then(() => import(/* webpackChunkName: "PeopleDetails" */ '../../modules/admin/peopleDetails')),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, '../../modules/admin/peopleDetails')
});

export const EmployerBidPage = Loadable({
  loader: () => fakeDelay(100).then(() => import(/* webpackChunkName: "EmployerBid" */ '../../modules/admin/employerBid')),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, '../../modules/admin/employerBid')
});

export const TalentBidPage = Loadable({
  loader: () => fakeDelay(100).then(() => import(/* webpackChunkName: "TalentBid" */ '../../modules/admin/talentBid')),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, '../../modules/admin/talentBid')
});

export const ScheduleInterviewPage = Loadable({
  loader: () => fakeDelay(100).then(() => import(/* webpackChunkName: "InterviewSchedule" */ '../../modules/admin/interviewSchedule')),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, '../../modules/admin/interviewSchedule')
});