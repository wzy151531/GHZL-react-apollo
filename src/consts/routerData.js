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
  },
  {
    path: '/test',
    component: Test,
    key: 'sub1',
    authority: ['admin', 'sub-admin'],
    text: 'TEST',
    icon: 'user',
    sub: [
      {
        path: '/test/sub',
        component: TestSub,
        key: '1',
        authority: ['admin'],
        text: 'TEST-SUB',
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
  },
  {
    path: '/private',
    component: Private,
    key: '3',
    authority: ['admin'],
    text: 'PRIVATE',
    icon: 'user',
  },
];
