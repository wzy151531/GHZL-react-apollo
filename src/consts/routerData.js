import User from '../pages/User/User';
import Private from '../pages/Private/Private';
import TestSub from '../pages/Test/TestSub';
import UserDetail from '../pages/User/UserDetail';

export const routerData = [
  {
    path: '/',
    component: null,
    key: '2',
    authority: ['admin', 'sub-admin'],
    text: '',
    hideInMenu: true,
    breadcrumb: 'INDEX',
    alias: 'USER',
    intro: 'USER-INTRO',
  },
  {
    path: '/test',
    key: 'sub1',
    authority: ['admin', 'sub-admin'],
    text: 'TEST',
    icon: 'user',
    breadcrumb: null,
    sub: [
      {
        path: '/test/sub',
        component: TestSub,
        key: '1',
        authority: ['admin'],
        text: 'TEST-SUB',
        breadcrumb: 'TEST-SUB',
        alias: 'TEST-SUB',
        intro: 'TEST-SUB-INTRO',
      },
    ],
  },
  {
    path: '/user/:id',
    component: UserDetail,
    key: '2',
    authority: ['admin', 'sub-admin'],
    hideInMenu: true,
    breadcrumb: 'USER-DETAIL',
    alias: 'USER-DETAIL',
    intro: 'USER-DETAIL-INTRO',
  },
  {
    path: '/user',
    component: User,
    key: '2',
    authority: ['admin', 'sub-admin'],
    text: 'USER',
    icon: 'user',
    breadcrumb: 'USER',
    alias: 'USER',
    intro: 'USER-INTRO',
  },
  {
    path: '/private',
    component: Private,
    key: '3',
    authority: ['admin'],
    text: 'PRIVATE',
    icon: 'user',
    breadcrumb: 'PRIVATE',
    alias: 'PRIVATE',
    intro: 'PRIVATE-INTRO',
  },
];
