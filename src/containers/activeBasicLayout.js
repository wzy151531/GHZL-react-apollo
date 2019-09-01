import { connect } from 'react-redux';
import { setActiveMenu } from '../actions';
import BasicLayout from '../Layouts/BasicLayout';

const mapStateToProps = state => ({
  activeMenu: state.activeMenu,
});

const mapDispatchTOProps = dispatch => ({
  setActiveMenu: (selectedKeys, openKeys) => dispatch(setActiveMenu(selectedKeys, openKeys)),
});

export default connect(
  mapStateToProps,
  mapDispatchTOProps,
)(BasicLayout);