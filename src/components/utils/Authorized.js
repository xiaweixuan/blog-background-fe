import defaultSettings from '../../defaultSettings';
import AuthorizeRenderer from '../Authorized';

export const authorityKey = `${defaultSettings.appName}-authority`;

export function getAuthority(str) {
  const authorityString = typeof str === 'undefined' ? localStorage.getItem(authorityKey) : str;
  if (!authorityString) {
    return [];
  }
  let authority;
  try {
    authority = JSON.parse(authorityString); // 当 authorityString 为 JSON 字符串时, 解析后赋值给 authority
  } catch (e) {
    authority = authorityString; // 否则说明 authorityString 为字符串或字符串列表, 直接赋值给 authority
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority;
}

export function setAuthority(authority) {
  const authorityArray = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem(authorityKey, JSON.stringify(authorityArray));
  reloadAuthorized();
}

let Authorized = AuthorizeRenderer(getAuthority());

export const reloadAuthorized = () => {
  Authorized = AuthorizeRenderer(getAuthority());
};

export default Authorized;