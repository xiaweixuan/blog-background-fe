import React from 'react';
import { Card, Descriptions } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useStoreState } from './Store';
import styles from './index.less';

const Account = ({ history }) => {
  const { accountMsg: currentUser, loading } = useStoreState();

  return <div className={styles.cardContain}>
    <Card
      loading={loading}
      actions={[<EditOutlined key="edit" onClick={() => history.push('/account/edit')} />]}
    >
      <div className={styles.avatarHolder}>
        <img alt="" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />
        <div className={styles.name}>{currentUser.name}</div>
        <div>{currentUser.autograph}</div>
      </div>
      <div className={styles.detail}>
        <p>
          <i className={styles.title} />
          {currentUser.email}
        </p>
        <p>
          <i className={styles.group} />
          {currentUser.qq}
        </p>
        <p>
          <i className={styles.address} />
          {currentUser.weixin}
        </p>
      </div>
    </Card>
    <Card loading={loading}>
      {
        currentUser.customFields ?
          <Descriptions title="资料卡">
            {
              currentUser.customFields.length &&
              currentUser.customFields.map(item =>
                <Descriptions.Item key={item.key} label={item.key}>{item.value}</Descriptions.Item>
              )
            }
          </Descriptions> :
          <div style={{ margin: '50px auto', textAlign: 'center' }}>
            <h3>暂无其他资料</h3>
          </div>
      }
    </Card>
  </div>
}

export default Account;
