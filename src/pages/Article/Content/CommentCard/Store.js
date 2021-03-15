import React, { useEffect, createContext, useContext, useReducer, useCallback, useState } from 'react';
import { pull } from 'lodash-es';
import { queryComments, requestRemoveComment } from './service';

const StoreContext = createContext({
  state: {
    byId: {},
    allIds: [],
  },
  loading: false,
});

const reducer = (state, action) => {
  const { allIds } = state;
  switch (action.type) {
    case 'saveState':
      return action.payload;
    case 'removeItem':
      return { ...state, allIds: pull(allIds, action.payload.id) };
    default:
      return state;
  }
};

export const useStoreState = () => {
  const { state: { byId, allIds }, loading } = useContext(StoreContext);
  const commentList = allIds.map(item => byId[item]);
  return { commentList, loading };
};

export const useStoreActions = () => {
  const { dispatch } = useContext(StoreContext);
  if (dispatch === undefined) {
    throw new Error('useStoreActions must be used within a Store.Provider');
  }

  const onRemove = useCallback(
    async (removeCommentParams) => {
      const data = await requestRemoveComment(removeCommentParams);
      if (data) {
        dispatch({ type: 'removeItem', payload: data });
      }
    },
    [dispatch],
  );

  return { onRemove };
};

const CommentStore = ({ children }) => {
  const pathname = window.location.pathname;
  const articleId = pathname.split('/')[3];
  const [state, dispatch] = useReducer(reducer, { byId: {}, allIds: [] });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await queryComments({ articleId });
      setLoading(false);
      if (data) {
        dispatch({ type: 'saveState', payload: data });
      }
    })()
  }, [dispatch])
  return (
    <StoreContext.Provider value={{ state, dispatch, loading }}>{children}</StoreContext.Provider>
  );
};

export default CommentStore;
