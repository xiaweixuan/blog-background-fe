import { appRouter } from '../../route/config';

export const getMenuName = (path) => {
  let name = '';
  appRouter[0].routes.forEach((item) => {
    (path === item.path.replace(/\//, '')) && (name = item.name)
  })
  return name;
}