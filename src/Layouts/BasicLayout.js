import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, NavLink } from 'react-router-dom';
import { Exception404 } from '../Exception/Exception404';
import { message, Row, Col, Layout, Menu, Icon, Divider, Avatar, Dropdown } from 'antd';
import AuthRouter from '../Authorization/AuthRouter';
import { routerData } from '../consts/routerData';
import './BasicLayout.css';
import { getAuthority } from '../utils/authority';
import Breadcrumb from './Breadcrumbs';
import GHZLAvatar from '../assets/GHZL.png';
import { inject, observer } from 'mobx-react';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

@inject('store')
@observer
class BasicLayout extends React.Component {
  state = {
    collapsed: false,
  };

  componentDidMount() {
    const { history } = this.props;
    this.setActiveMenu();
    history.listen(() => {
      this.setActiveMenu();
    });
  }

  setActiveMenu = () => {
    const routerDataSE = [];
    routerData.forEach(n => {
      if (n.sub) {
        n.sub.forEach(m => {
          m.selectedKey = m.key;
          m.openKey = n.key;
          routerDataSE.push(m);
        });
      } else {
        n.selectedKey = n.key;
        routerDataSE.push(n);
      }
    });
    routerDataSE.forEach(n => {
      if (this.props.location.pathname.indexOf(n.path) !== -1) {
        this.props.store.changeActiveMenu([n.selectedKey], [n.openKey]);
      }
    });
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  logout = () => {
    localStorage.setItem('GHZL-username', 'unknown');
    localStorage.setItem('GHZL-authority', JSON.stringify(['guest']));
    this.props.history.push('/login');
    message.success('logout successfully!');
  };

  changeSelect = (selectedKey, openKey) => {
    const newSelectedKeys = selectedKey ? [selectedKey] : this.props.store.selectedKeys;
    const newOpenKeys = openKey ? this.props.store.openKeys.toString() === [openKey].toString() && !selectedKey ? [''] : [openKey] : [''];
    this.props.store.changeActiveMenu(newSelectedKeys, newOpenKeys);
  };

  render() {
    const menu = [];
    const auth = getAuthority();
    routerData.forEach(n => {
      // 允许在菜单中显示
      if (!n.hideInMenu) {
        let menuItem;
        // 判断有无子菜单
        if (n.sub) {
          const subItems = [];
          n.sub.forEach(k => {
            let shouldSubRender = false;
            auth.forEach(m => {
              if (k.authority.indexOf(m) !== -1) {
                shouldSubRender = true;
              }
            });
            // 用户权限能否访问该菜单
            if (shouldSubRender) {
              subItems.push(
                <Menu.Item key={k.key}><NavLink to={k.path} onClick={() => this.changeSelect(k.key, n.key)}><span>{n.text}</span></NavLink></Menu.Item>);
            }
          });
          // 若子菜单用户均无法访问，则不显示父菜单，否则显示为下拉菜单
          if (subItems.length !== 0) {
            menuItem =
              <SubMenu onTitleClick={() => this.changeSelect(false, n.key)} key={n.key} title={
                <span><Icon type={n.icon}/><span>{n.text}</span></span>}>
                {subItems}
              </SubMenu>;
          }
        } else {
          menuItem =
            <Menu.Item key={n.key}><NavLink to={n.path} onClick={() => this.changeSelect(n.key, false)}><Icon type={n.icon}/><span>{n.text}</span></NavLink></Menu.Item>;
        }
        let shouldRender = false;
        auth.forEach(m => {
          if (n.authority.indexOf(m) !== -1) {
            shouldRender = true;
          }
        });
        if (shouldRender) {
          menu.push(menuItem);
        }
      }
    });

    const routerDataSE = [];
    routerData.forEach(n => {
      if (n.path !== '/') {
        if (n.sub) {
          n.sub.forEach(m => {
            routerDataSE.push(m);
          });
        } else {
          routerDataSE.push(n);
        }
      }
    });
    const authRoutes = routerDataSE.map((n, i) => (
      <AuthRouter key={i} path={n.path} authority={n.authority} component={n.component}/>
    ));

    const dropdownMenu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" onClick={this.logout}>
            退出登录
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo"/>
            <Menu theme="dark" mode="inline" selectedKeys={this.props.store.selectedKeys} openKeys={this.props.store.openKeys}>
              {menu}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0, height: 'auto' }}>
              <Row type="flex" justify="space-between">
                <Col>
                  <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                  />
                </Col>
                <Col style={{ marginRight: '16px' }}>
                  <Avatar src={GHZLAvatar}/>
                  <Dropdown overlay={dropdownMenu}>
                    <a className="ant-dropdown-link" style={{ color: 'black' }} href="#">
                      {localStorage.getItem('GHZL-username') ? localStorage.getItem('GHZL-username') : 'unknown'}
                      <Icon
                        type="down"/>
                    </a>
                  </Dropdown>
                </Col>
              </Row>
              <Divider style={{ margin: '0' }}/>
              <Row style={{ padding: '0 32px' }}>
                <Breadcrumb/>
              </Row>
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: '24px',
                background: '#fff',
                minHeight: 280,
              }}
            >
              <Switch>
                <Route path={'/'} exact render={() => (
                  <Redirect to={'/user'}/>
                )}/>
                {authRoutes}
                <Route path="*" component={Exception404}/>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default BasicLayout;
