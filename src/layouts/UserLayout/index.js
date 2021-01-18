import React from 'react';
import styles from './index.less';
const UserLayout = (props) => {
  const { children } = props;

  return <div>
    { children }
  </div>
}

export default UserLayout;