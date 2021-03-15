let CURRENT_USER_AUTHORITY = 'NULL';

const renderAuthorize = function (Authorized) {
  return (currentUserAuthority) => {
    if (currentUserAuthority) {
      CURRENT_USER_AUTHORITY = currentUserAuthority;
    }
    return Authorized;
  };
};

export { CURRENT_USER_AUTHORITY };
export default renderAuthorize;