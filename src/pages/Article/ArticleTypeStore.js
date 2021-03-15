import React, { useEffect ,createContext, useContext, useReducer, useCallback } from 'react';
import { pull } from 'lodash-es';
import { queryTypes, requestCreateType, requestRemoveType } from './service';

const StoreContext = createContext({
  state: {
    byId: {},
    allIds: [],
  },
});

const reducer = (state, action) => {
  const { byId, allIds } = state;
  switch (action.type) {
    case 'saveState':
      return action.payload;
    case 'addItem':
      byId[action.payload.id] = action.payload;
      allIds.unshift(action.payload.id);
      return { byId, allIds };
    case 'updateItem':
      byId[action.payload.key] = action.payload;
      return { ...state, byId };
    case 'removeItem':
      return { ...state, allKeys: pull(allIds, action.payload.id) };
    default:
      return state;
  }
};

export const useStoreState = () => {
  const { state: { byId, allIds } } = useContext(StoreContext);
  const typeList = allIds.map(item => byId[item]);
  const typeOptions = allIds.map(item => ({ value: byId[item].id, label: byId[item].name }))
  return { typeList, typeOptions };
};

export const useStoreActions = () => {
  const { dispatch } = useContext(StoreContext);
  if (dispatch === undefined) {
    throw new Error('useStoreActions must be used within a Store.Provider');
  }
  
  const onAdd = useCallback(
    async (createTypeParams) => {
      const data = await requestCreateType(createTypeParams);
      if (data) {
        dispatch({ type: 'addItem', payload: data });
      }
    },
    [dispatch],
  );

  const onRemove = useCallback(
    async (removeTypeParams) => {
      const data = await requestRemoveType(removeTypeParams);
      if (data) {
        dispatch({ type: 'removeItem', payload: data });
      }
    },
    [dispatch],
  );

  return { onAdd, onRemove };
};

const ArticleTypeStore = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { byId: {}, allIds: [] });
  useEffect(() => {
    (async () => {
      const data = await queryTypes();
      if (data) {
        dispatch({ type: 'saveState', payload: data });
      }
    })()
  }, [dispatch])
  return (
    <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
  );
};

export default ArticleTypeStore;
