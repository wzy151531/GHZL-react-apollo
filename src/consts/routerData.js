import { Test } from '../pages/Test';
import { User } from '../pages/User';
import { Private } from '../pages/Private';
import { TestSub } from '../pages/TestSub';

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
    component: Test,
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
