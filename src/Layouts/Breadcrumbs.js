import React from 'react';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import { Breadcrumb, Row, Col } from 'antd';
import { NavLink } from 'react-router-dom';
import { routerData } from '../consts/routerData';

const routerDataSE = [];
routerData.forEach(n => {
  if (n.sub) {
    routerDataSE.push(n);
    n.sub.forEach(m => {
      routerDataSE.push(m);
    });
  } else {
    routerDataSE.push(n);
  }
});

class Breadcrumbs extends React.Component {
  render() {
    const { breadcrumbs } = this.props;
    return (
      <div>
        <Breadcrumb style={{ paddingTop: '20px' }}>
          {breadcrumbs.map(({ breadcrumb, index, match }) => {
            return (
              <Breadcrumb.Item key={breadcrumb.key}>
                <NavLink to={match.url} onClick={() => this.props.setActiveMenu(breadcrumb.sub ? false : [breadcrumb.key], breadcrumb.sub ? [breadcrumb.key] : false)}>
                  {breadcrumb}
                </NavLink>
                {(index < breadcrumbs.length - 1) && <i> / </i>}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
        <Row type="flex" justify="space-between" style={{
          fontSize: '20px',
          fontWeight: '700',
          color: 'black',
        }}>
          <Col>{breadcrumbs[breadcrumbs.length - 1].alias}</Col>
        </Row>
        <Row
          style={{ lineHeight: '28px', marginBottom: '15px' }}>
          <Col>{breadcrumbs[breadcrumbs.length - 1].intro}</Col>
        </Row>
      </div>
    );
  }
}

export default withBreadcrumbs(routerDataSE)(Breadcrumbs);
