import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react';
import getMenuData from '../utils/getMenuData'

const StoreContext = createContext({
  state: { menuData: [] },
  loading: false,
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'saveMenuData':
      return action.payload;
    default:
      return state;
  }
};

export const useStoreState = () => {
  const { state, loading } = useContext(StoreContext);
  const { menuData } = state;
  return { menuData, loading };
};

export const useStoreActions = () => {
  const { dispatch } = useContext(StoreContext);
  if (dispatch === undefined) {
    throw new Error('useStoreActions must be used within a Store.Provider');
  }
  return {};
};

const GlobalStore = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { menuData: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let didCancel = false;
    (async () => {
      setLoading(true);
      const data = await getMenuData();
      if (data && !didCancel) {
        dispatch({ type: 'saveMenuData', payload: data });
        setLoading(false);
      }
    })();
    return () => {
      didCancel = true;
    };
  }, []);

  return (
    <StoreContext.Provider value={{ state, loading, dispatch }}>{children}</StoreContext.Provider>
  );
};

export default GlobalStore;
