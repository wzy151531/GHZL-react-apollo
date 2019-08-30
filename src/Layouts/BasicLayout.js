import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import { Exception404 } from '../Exception/Exception404';
import { Button, message, Row, Col, Layout, Menu, Icon } from 'antd';
import AuthRouter from '../Authorization/AuthRouter';
import { routerData } from '../consts/routerData';
import './BasicLayout.css';
import { getAuthority } from '../utils/authority';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

export default class BasicLayout extends React.Component {
  state = {
    collapsed: false,
    selectedKeys: [''],
    openKeys: [''],
  };

  componentDidMount() {
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
      if (n.path === this.props.location.pathname) {
        this.setState({
          selectedKeys: [n.selectedKey],
          openKeys: [n.openKey],
        });
      }
    });
  }

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
    this.setState({
      selectedKeys: selectedKey ? [selectedKey] : this.state.selectedKeys,
      openKeys: openKey ? [openKey] : [''],
    });
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
                <Menu.Item key={k.key}><Link to={k.path} onClick={() => this.changeSelect(k.key, n.key)}><span>{n.text}</span></Link></Menu.Item>);
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
            <Menu.Item key={n.key}><Link to={n.path} onClick={() => this.changeSelect(n.key)}><Icon type={n.icon}/><span>{n.text}</span></Link></Menu.Item>;
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

    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo"/>
            <Menu theme="dark" mode="inline"
                  selectedKeys={this.state.selectedKeys} openKeys={this.state.openKeys}>
              {menu}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Row type="flex" justify="space-between">
                <Col>
                  <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                  />
                </Col>
                <Col style={{ marginRight: '16px' }}>
                  <Button type="danger" onClick={this.logout}>Logout</Button>
                </Col>
              </Row>
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
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
};
