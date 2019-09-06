import { observable, action } from 'mobx';

class Store {
  @observable selectedKeys = [];
  @observable openKeys = [];

  @action.bound changeActiveMenu(selectedKeys, openKeys) {
    this.selectedKeys = selectedKeys ? selectedKeys : this.selectedKeys;
    this.openKeys = openKeys ? openKeys.toString() === this.openKeys.toString() && !selectedKeys ? [''] : openKeys : [''];
  }
}

const store = new Store();

export default store;