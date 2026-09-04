import { createContext, useContext, useEffect, useReducer } from 'react';
import { initialIamState, iamReducer } from './iamReducer.js';

const STORAGE_KEY = 'nube-academica:iam-state';

const IamStateContext = createContext(null);
const IamDispatchContext = createContext(null);

function loadInitialState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialIamState;
    const parsed = JSON.parse(raw);
    return { ...initialIamState, ...parsed };
  } catch {
    return initialIamState;
  }
}

export function IamProvider({ children }) {
  const [state, dispatch] = useReducer(iamReducer, undefined, loadInitialState);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <IamStateContext.Provider value={state}>
      <IamDispatchContext.Provider value={dispatch}>
        {children}
      </IamDispatchContext.Provider>
    </IamStateContext.Provider>
  );
}

export function useIamState() {
  const state = useContext(IamStateContext);
  if (state === null) throw new Error('useIamState must be used within an IamProvider');
  return state;
}

export function useIamDispatch() {
  const dispatch = useContext(IamDispatchContext);
  if (dispatch === null) throw new Error('useIamDispatch must be used within an IamProvider');
  return dispatch;
}
