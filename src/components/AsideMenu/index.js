import React, { Fragment } from "react";
import BasicMenu from "../BasicMenu";
import styles from "./index.less";

const AsideMenu = (props) => {

  return <Fragment>
    <div className={styles.menuOccupier}></div>
    <div className={styles.menuMain}>
      <BasicMenu {...props} />
    </div>
  </Fragment>
}

export default AsideMenu