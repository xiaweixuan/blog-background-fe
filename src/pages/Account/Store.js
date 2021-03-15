import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { queryAccountMsg, requestUpdateAccountMsg } from './service';

const StoreContext = createContext({
  state: { accountMsg: {} },
  loading: false,
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'saveAccountMsg':
      return action.payload;
    default:
      return state;
  }
};

export const useStoreState = () => {
  const { state, loading } = useContext(StoreContext);
  const { accountMsg } = state;
  return { accountMsg, loading };
};

export const useStoreActions = () => {
  const { dispatch } = useContext(StoreContext);
  if (dispatch === undefined) {
    throw new Error('useStoreActions must be used within a Store.Provider');
  }
  const onUpdate = useCallback(
    async (updateAccountDto) => {
      const data = await requestUpdateAccountMsg({ updateAccountDto });
      if (data) {
        dispatch({ type: 'saveAccountMsg', payload: data });
      }
    },
    [dispatch],
  );
  return { onUpdate };
};

const AccountStore = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { accountMsg: {} });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let didCancel = false;
    (async () => {
      setLoading(true);
      const data = await queryAccountMsg();
      setLoading(false);
      if (data && !didCancel) {
        dispatch({ type: 'saveAccountMsg', payload: data });
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

export default AccountStore;
