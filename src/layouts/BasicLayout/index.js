import React from 'react';
import AsideMenu from "../../components/AsideMenu";
import Footer from './Footer';
import Header from './Header';
import { useStoreState } from '../../store/globalStore'
import styles from './index.less';



const DefaultLayout = (props) => {
    const { children, history } = props;

    const { menuData } = useStoreState()

    const layout = (
        <div className={styles.DefaultLayout}>
            <AsideMenu 
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