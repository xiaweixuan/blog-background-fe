import AuthComponent from '../wrappers/Authorized';
import BasicLayout from '../layouts/BasicLayout';
import UserLayout from '../layouts/UserLayout'
import Login from '../pages/User/Login';
import Account from '../pages/Account';
import ArticleLayout from '../pages/Article/_layout';
import Article from '../pages/Article';
import ArticleContent from '../pages/Article/Content';
import CreateOrEditArticle from '../pages/Article/CreateOrEditArticle';
import EditAccount from '../pages/Account/EditAccount';
import AccountLayout from '../pages/Account/_layout';
import Photo from '../pages/Photo';
import ScriptLayout from '../pages/Script/_layout';
import Script from '../pages/Script';
import ScriptContent from '../pages/Script/Content';
import Audio from '../pages/Audio';
import Exception403 from '../pages/Exception/403';
import Exception404 from '../pages/Exception/404';
import Exception500 from '../pages/Exception/500';


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
    wrapper: AuthComponent,
    routes: [
      {
        path: '/',
        redirect: '/account',
      },
      {
        path: '/account',
        name: '个人信息',
        component: AccountLayout,
        routes: [
          {
            path: '/account/',
            redirect: '/account/overview',
          },
          {
            path: '/account/overview',
            component: Account,
          },
          {
            path: '/account/edit',
            component: EditAccount,
          },
        ],
      },
      {
        path: '/article',
        name: '文章管理',
        component: ArticleLayout,
        routes: [
          {
            path: '/article/',
            redirect: '/article/overview',
          },
          {
            path: '/article/overview',
            component: Article,
          },
          {
            path: '/article/create',
            component: CreateOrEditArticle,
          },
          {
            path: '/article/content/',
            redirect: '/article/content/NaN',
          },
          {
            path: '/article/content/:article_id',
            component: ArticleContent,
          },
          {
            path: '/article/edit/',
            redirect: '/article/edit/NaN',
          },
          {
            path: '/article/edit/:article_id',
            component: CreateOrEditArticle,
          },
        ],
      },
      {
        path: '/photo',
        name: '图片管理',
        component: Photo,
      },
      {
        path: '/script',
        name: '脚本管理',
        component: ScriptLayout,
        routes: [
          {
            path: '/script/',
            redirect: '/script/overview',
          },
          {
            path: '/script/overview',
            component: Script,
          },
          {
            path: '/script/content/:script_id',
            component: ScriptContent,
          },
        ],
      },
      {
        path: '/audio',
        name: '音频管理',
        component: Audio,
      },
      {
        path: '/exception',
        name: 'exception',
        showMenu: false,
        routes: [
          {
            path: '/exception/',
            redirect: '/exception/404',
          },
          {
            path: '/exception/403',
            component: Exception403,
          },
          {
            path: '/exception/404',
            component: Exception404,
          },
          {
            path: '/exception/500',
            component: Exception500,
          },
        ]
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