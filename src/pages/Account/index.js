import React from 'react';
import AccountStore, { useStoreState, useStoreActions } from './Store';
import connect from '../../utils/connect';
import styles from './index.less';

const Account = (props) => {
  const { accountMsg } = useStoreState();
  const { updateAccountMsg } = useStoreActions();

  return <div>
    <div>account</div>
    <div>
      更新：
      <button onClick={() => updateAccountMsg({ accountMsg })}>更新</button>
    </div>
  </div>
}

export default connect(AccountStore)(Account);
