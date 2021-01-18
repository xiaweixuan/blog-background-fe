import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStore from './store/globalStore';
import RouterView from './route/createRoute';
import routerConfig from './route/config';


const App = () => {
    const app = <RouterView routes={routerConfig} />
    return (
        <div className='App'>
            <GlobalStore>
                <BrowserRouter>{app}</BrowserRouter>
            </GlobalStore>
        </div>
    )
}
export default App;