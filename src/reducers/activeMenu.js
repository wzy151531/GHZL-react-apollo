const activeMenu = (state = { selectedKeys: [''], openKeys: [''] }, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_MENU':
      return {
        selectedKeys: action.selectedKeys ? action.selectedKeys : state.selectedKeys,
        openKeys: action.openKeys ? action.openKeys.toString() === state.openKeys.toString() && !action.selectedKeys ? [''] : action.openKeys : [''],
      };
    default:
      return state;
  }
};

export default activeMenu;