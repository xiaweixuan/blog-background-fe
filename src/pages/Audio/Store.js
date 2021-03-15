import React, { useEffect, createContext, useContext, useReducer, useCallback } from 'react';
import { pull } from 'lodash-es';
import { queryAudios, requestCreateAudio, requestUpdateAudio, requestRemoveAudio } from './service';

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
  const audioList = allIds.map(item => byId[item]);
  return { audioList };
};

export const useStoreActions = () => {
  const { dispatch } = useContext(StoreContext);
  if (dispatch === undefined) {
    throw new Error('useStoreActions must be used within a Store.Provider');
  }

  const onAdd = useCallback(
    async (createAudioParams) => {
      const data = await requestCreateAudio(createAudioParams);
      if (data) {
        dispatch({ type: 'addItem', payload: data });
      }
    },
    [dispatch],
  );

  const onUpdate = useCallback(
    async (updateAudioParams) => {
      const data = await requestUpdateAudio(updateAudioParams);
      if (data) {
        dispatch({ type: 'updateItem', payload: data });
      }
    },
    [dispatch],
  );

  const onRemove = useCallback(
    async (removeAudioParams) => {
      const data = await requestRemoveAudio(removeAudioParams);
      if (data) {
        dispatch({ type: 'removeItem', payload: data });
      }
    },
    [dispatch],
  );

  return { onAdd, onUpdate, onRemove };
};

const AudioStore = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { byId: {}, allIds: [] });
  useEffect(() => {
    (async () => {
      const data = await queryAudios();
      if (data) {
        dispatch({ type: 'saveState', payload: data });
      }
    })()
  }, [dispatch])
  return (
    <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
  );
};

export default AudioStore;
