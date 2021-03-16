import React, { useState } from 'react';
import character1 from '../../assets/h1.png'
import character2 from '../../assets/h2.png'
import { requestSignIn } from './service';
import styles from './index.less';
import { message } from 'antd';

const Login = ({ history }) => {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');

  const onSubmit = async (e) => {
    e.persist()
    if (e.keyCode === 13) {
      if (!user || !pwd) {
        message.warn('请填写用户名或密码')
        return;
      }
      const requestSignInPrams = {
        user: user,
        password: pwd,
      }
      const { success } = await requestSignIn(requestSignInPrams);
      if (success) {
        history.push('/account')
      }
    }
  }

  return (<div>
    <div className={styles.background}></div>
    <div className={styles.backgroundShadow}></div>
    <div className={styles.main}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>登录</h1>
        <img className={styles.character1} src={character1} />
        <img className={styles.character2} src={character2} />
        <input
          className={styles.input}
          type="text"
          placeholder="用户名"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="密码"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          onKeyDown={onSubmit}
        />
      </div>
    </div>
  </div>)
}
export default Login;