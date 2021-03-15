import React, { useEffect, createContext, useContext, useReducer, useCallback } from 'react';
import { pull } from 'lodash-es';
import { queryPhotos, requestCreatePhoto, requestUpdatePhoto, requestRemovePhoto } from './service';

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
  const photoList = allIds.map(item => byId[item]);
  return { photoList };
};

export const useStoreActions = () => {
  const { dispatch } = useContext(StoreContext);
  if (dispatch === undefined) {
    throw new Error('useStoreActions must be used within a Store.Provider');
  }

  const onAdd = useCallback(
    async (createPhotoParams) => {
      const data = await requestCreatePhoto(createPhotoParams);
      if (data) {
        dispatch({ type: 'addItem', payload: data });
      }
    },
    [dispatch],
  );

  const onUpdate = useCallback(
    async (updatePhotoParams) => {
      const data = await requestUpdatePhoto(updatePhotoParams);
      if (data) {
        dispatch({ type: 'updateItem', payload: data });
      }
    },
    [dispatch],
  );

  const onRemove = useCallback(
    async (removePhotoParams) => {
      const data = await requestRemovePhoto(removePhotoParams);
      if (data) {
        dispatch({ type: 'removeItem', payload: data });
      }
    },
    [dispatch],
  );

  return { onAdd, onUpdate, onRemove };
};

const PhotoStore = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { byId: {}, allIds: [] });
  useEffect(() => {
    (async () => {
      const data = await queryPhotos();
      if (data) {
        dispatch({ type: 'saveState', payload: data });
      }
    })()
  }, [dispatch])
  return (
    <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
  );
};

export default PhotoStore;
