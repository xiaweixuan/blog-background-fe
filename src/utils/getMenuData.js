import { appRouter } from '../route/config';

export default () => {
  const menuData = appRouter[0].routes.filter(item => item.name);
  return {
    menuData,
  };
}