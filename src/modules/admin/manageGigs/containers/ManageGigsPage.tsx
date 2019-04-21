import { connect } from 'react-redux';
import {
  onGigPagingRequest,
  onGetDropDownData,
} from 'src/redux/actions/ItemsAction';
import ManageGigsPageUI from '../components/ManageGigsPageUI';
import config from '../../../../config';

const mapStateToProps = (state: any, ownProps: any) => ({
  isLoggedIn: state.admin.auth.loginSuccess,
  ownProps: ownProps.match,
  companyProfileError: state.admin.companyProfile.companyProfileError,
  companyGigItems: state.admin.companyProfile.companyGigItems,
  isProfileLoading: state.admin.companyProfile.isProfileLoading,
  dropDownData: state.admin.dropDownFiller.dropDownFillerItems,
  totalPages: Math.ceil(state.admin.companyProfile.companyGigItems.totalCount / config.pageSize),
  isDesktopLayout: state.browser.screenLayout === "desktop"
});

const mapDispatchToProps = (dispatch: any) => ({
  onGigPagingRequest: (pageSize: number, pageNumber: number, profileId: number, activeState: any) =>
    dispatch(onGigPagingRequest(pageSize, pageNumber, profileId, activeState)),
  getDropDownData: (type: any) =>
    dispatch(onGetDropDownData(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageGigsPageUI);
