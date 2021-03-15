import React, { useState, useMemo } from "react";
import Authorized from '../utils/Authorized';
import { getMenuName } from '../utils/getMenuName';
import styles from './index.less';

const MenuList = (props) => {
  const { location: { pathname }, history, routesList: routes } = props;

  const routesList = routes ? routes.filter(item => item.showMenu !== false) : [];

  const [clicked, setClicked] = useState(getMenuName(pathname.split('/')[1]));

  const showMenu = useMemo(() => {
    return clicked || (routesList.length > 0 && routesList[0].name)
  }, [routesList, clicked, window.location.pathname])

  const handleClick = (item) => {
    const { name, path } = item;
    if (name === clicked && (pathname === path || pathname === `${path}/overview`)) return;
    setClicked(name);
    history.push(path);
  }

  return <div className={styles.menuList}>
    {
      routesList.map(item =>
        Authorized.check(item.authority, <div
          className={
            item.name === showMenu ?
              `${styles.defaultItem} ${styles.clickedItem}` :
              styles.defaultItem
          }
          onClick={() => handleClick(item)}
          key={item.name}>
          {item.name}
        </div>, ''))
    }
  </div>
}

const BasicMenu = (props) => {

  return <div className={styles.menuContain}>
    <div className={styles.logo}>
      后台管理
    </div>
    <MenuList {...props} />
  </div>
}

export default BasicMenu;
