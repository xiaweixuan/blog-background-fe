import React from 'react'
import styles from './index.less'

const GlobalHeader = () =>
  <div className={styles.globalHeaderContain}>
    <div className={styles.globalHeader}>
      <div className={styles.headerOccupier}></div>
      <div className={styles.headerList}>
        <div className={styles.clickedBtn}>
          <a href='http://xiawx.top'>博客主页</a>
        </div>
      </div>
    </div>
  </div>

export default GlobalHeader;