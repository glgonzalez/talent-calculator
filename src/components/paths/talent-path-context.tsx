import React, { 
  createContext, 
  useContext, 
  useMemo, 
  Dispatch, 
  FC, 
  useReducer 
} from 'react';
import { TalentItem } from './talent';

export enum ActionTypes {
  ADD = 'ADD',
  REMOVE = 'REMOVE'
}

export interface TalentType extends TalentItem {
  selected?: boolean;
}

interface PathContext {
  state: TalentType[];
  dispatch: Dispatch<{type: ActionTypes, payload: { index: number }}>;
}

const TalentPathReducer = (state: TalentType[], action: {type: ActionTypes, payload: { index: number }}) => {
  const { type, payload } = action;
  let points = 0;

  switch(type) {
    case ActionTypes.ADD:
      return state.map((s, idx) => {
        if(!s.selected && idx <= payload.index) {
          s.selected = true;
          points += s.value;
        }
        return s;
      });
    case ActionTypes.REMOVE:
      return state.map((s, idx) => {
        if(s.selected && idx >= payload.index) {
          s.selected = false;
          points += s.value;
        }
        return s;
      });
    default:
      return state;
  }
};

const Context = createContext<PathContext>(null as any);

export const TalentPathProvider: FC<{ data: TalentType[]}> = ({ children, data }) => {
  const [ state, dispatch ] = useReducer(TalentPathReducer, data); 
  const talentPathContext = useMemo(() => {
    return {
      state, 
      dispatch
    }
  }, [state, dispatch]);
  return <Context.Provider value={talentPathContext} children={children} />;
};

export const useTalentPathContext = () => useContext(Context);