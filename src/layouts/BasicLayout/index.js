import React, { useEffect } from 'react';
import { setAuthority } from '../../components/utils/Authorized';
import AsideMenu from "../../components/AsideMenu";
import Footer from './Footer';
import Header from './Header';
import { useStoreState } from '../../store/globalStore'
import styles from './index.less';
import { requestVerifyLogin } from '../../services/global';

const DefaultLayout = (props) => {
    const { children, history } = props;
    useEffect(() => {
        (async () => {
            setAuthority('user');
            const { success } = await requestVerifyLogin();
            !success && history.push('/user');
        })()
    }, []);
    const { menuData } = useStoreState()
    const layout = (
        <div className={styles.DefaultLayout}>
            <AsideMenu
                {...props}
                routesList={menuData}
                history={history}
            />
            <div className={styles.main}>
                <Header />
                <div className={styles.mainContext}>
                    {children}
                </div>
                <Footer />
            </div>
        </div>
    )
    return layout;
}

export default DefaultLayout;