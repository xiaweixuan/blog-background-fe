import BasicLayout from '../layouts/BasicLayout';
import UserLayout from '../layouts/UserLayout'
import Login from '../pages/User/Login';
import Account from '../pages/Account';
import Article from '../pages/Article';

const userRouter = [
  {
    path: '/user',
    component: UserLayout,
    routes: [
      {
        path: '/user/',
        component: Login,
      },
    ]
  },
];

const appRouter = [
  {
    path: '/',
    component: BasicLayout,
    routes: [
      {
        path: '/',
        redirect: '/account',
      },
      {
        path: '/account',
        name: '个人信息',
        component: Account,
      },
      {
        path: '/article',
        name: '文章管理',
        component: Article,
      },
    ],
  },
];

const routerConfig = [
  ...userRouter,
  ...appRouter,
];

export { userRouter, appRouter };

export default routerConfig;