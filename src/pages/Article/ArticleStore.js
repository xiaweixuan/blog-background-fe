import React, { useEffect, createContext, useContext, useReducer, useCallback } from 'react';
import { pull } from 'lodash-es';
import { queryArticles, reqeustCreateArticle, reqeustUpdateArticle, requestRemoveArticle } from './service';

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
      byId[action.payload.id] = action.payload;
      return { ...state, byId };
    case 'removeItem':
      return { ...state, allIds: pull(allIds, action.payload.id) };
    default:
      return state;
  }
};

export const useStoreState = () => {
  const { state: { byId, allIds } } = useContext(StoreContext);
  const articleList = allIds.map(item => byId[item]);
  return { articleList, articlebyId: byId };
};

export const useStoreActions = () => {
  const { dispatch } = useContext(StoreContext);
  if (dispatch === undefined) {
    throw new Error('useStoreActions must be used within a Store.Provider');
  }
  const onFetch = useCallback(
    async (params) => {
      const data = await queryArticles(params);
      if (data) {
        dispatch({ type: 'saveState', payload: data });
      }
    },
    [dispatch],
  );

  const onAdd = useCallback(
    async (createArticleParams) => {
      const data = await reqeustCreateArticle(createArticleParams);
      if (data) {
        dispatch({ type: 'addItem', payload: data });
      }
    },
    [dispatch],
  );

  const onUpdate = useCallback(
    async (updateArticleParams) => {
      const data = await reqeustUpdateArticle(updateArticleParams);
      if (data) {
        dispatch({ type: 'updateItem', payload: data });
      }
    },
    [dispatch],
  );

  const onRemove = useCallback(
    async (removeArticleParams) => {
      const data = await requestRemoveArticle(removeArticleParams);
      if (data) {
        dispatch({ type: 'removeItem', payload: data });
      }
    },
    [dispatch],
  );

  return { onFetch, onAdd, onUpdate, onRemove };
};

const ArticleStore = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { byId: {}, allIds: [] });
  useEffect(() => {
    (async () => {
      const data = await queryArticles();
      if (data) {
        dispatch({ type: 'saveState', payload: data });
      }
    })()
  }, [dispatch])
  return (
    <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
  );
};

export default ArticleStore;
