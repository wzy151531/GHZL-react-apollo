import React from 'react';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
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

export default withBreadcrumbs(routerDataSE)(({ breadcrumbs }) => (
  <Breadcrumb style={{ paddingTop: '20px' }}>
    {breadcrumbs.map(({ breadcrumb, index, match }) => (
      <Breadcrumb.Item key={breadcrumb.key}>
        <Link to={match.url}>
          {breadcrumb}
        </Link>
        {(index < breadcrumbs.length - 1) && <i> / </i>}
      </Breadcrumb.Item>
    ))}
  </Breadcrumb>
));
