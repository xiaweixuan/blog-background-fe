import React, { useEffect, createContext, useContext, useReducer, useCallback } from 'react';
import { pull } from 'lodash-es';
import { queryScripts, requestCreateScript, requestUpdateScript, requestRemoveScript } from './service';

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
  const scriptList = allIds.map(item => byId[item]);
  return { scriptList, scriptById: byId };
};

export const useStoreActions = () => {
  const { dispatch } = useContext(StoreContext);
  if (dispatch === undefined) {
    throw new Error('useStoreActions must be used within a Store.Provider');
  }

  const onAdd = useCallback(
    async (createScriptParams) => {
      const data = await requestCreateScript(createScriptParams);
      if (data) {
        dispatch({ type: 'addItem', payload: data });
      }
    },
    [dispatch],
  );

  const onUpdate = useCallback(
    async (updateScriptParams) => {
      const data = await requestUpdateScript(updateScriptParams);
      if (data) {
        dispatch({ type: 'updateItem', payload: data });
      }
    },
    [dispatch],
  );

  const onRemove = useCallback(
    async (removeScriptParams) => {
      const data = await requestRemoveScript(removeScriptParams);
      if (data) {
        dispatch({ type: 'removeItem', payload: data });
      }
    },
    [dispatch],
  );

  return { onAdd, onUpdate, onRemove };
};

const ScriptStore = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { byId: {}, allIds: [] });
  useEffect(() => {
    (async () => {
      const data = await queryScripts();
      if (data) {
        dispatch({ type: 'saveState', payload: data });
      }
    })()
  }, [dispatch])
  return (
    <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
  );
};

export default ScriptStore;
