import React, { useState, useMemo } from "react";
import styles from './index.less'

const MenuList = (props) => {
  const { history, routesList } = props;


  const [clicked, setClicked] = useState();

  const showMenu = useMemo(() => {
    return clicked || (routesList.length > 0 && routesList[0].name)
  }, [routesList, clicked])

  const handleClick = (item) => {
    const { name, path } = item;
    if (name === clicked) return;
    setClicked(name);
    history.push(path);
  }

  return <div className={styles.menuList}>
    {
      routesList.map(item =>
        <div
          className={
            item.name === showMenu ?
              `${styles.defaultItem} ${styles.clickedItem}` :
              styles.defaultItem
          }
          onClick={() => handleClick(item)}
          key={item.name}>
          {item.name}
        </div>)
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