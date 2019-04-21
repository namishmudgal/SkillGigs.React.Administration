import { connect } from 'react-redux';
import {
  onGigListingRequest,
  onGigCreateRequest
} from 'src/shared/SkillGigs.React.Redux/administration/redux/actions/ItemsAction';
import GigListingPageUI from '../components/GigListingPageUI';

const mapStateToProps = (state: any, ownProps: any) => ({
  isLoggedIn: state.admin.auth.loginSuccess,
  ownProps: ownProps.match,
  gigListingItems: state.admin.gigListing.gigListingItems,
  gigListingError: state.admin.gigListing.gigListingError,
  isListingLoading: state.admin.gigListing.isListingLoading
});

const mapDispatchToProps = (dispatch: any) => ({
  onGigListingRequest: (id: number) =>
    dispatch(onGigListingRequest(id)),
  onGigCreateRequest: (obj: any, step: string) =>
    dispatch(onGigCreateRequest(obj, step))
});

const GigListingPage = connect(mapStateToProps, mapDispatchToProps)(GigListingPageUI);
export default GigListingPage;
