import React, { createContext, Dispatch, FC, useContext, useMemo, useReducer } from 'react';
import { TalentItem } from '../../data';

export enum ActionTypes {
  ADD = 'ADD',
  REMOVE = 'REMOVE'
}

export interface PathData {
  selected: TalentItem[];
  remaining: TalentItem[];
}

interface PathContext {
  state: PathData;
  dispatch: Dispatch<{type: ActionTypes, payload: { index: number }}>;
}

const pathReducer = (state: PathData, action: {type: ActionTypes, payload: {index: number}}) => {
  const {index} = action.payload;
  const {remaining, selected} = state;

  switch(action.type) {
    case ActionTypes.ADD:
      const newAddState: PathData = {
        selected: [...selected, ...remaining.slice(0, index + 1)],
        remaining: [...remaining].slice(index + 1, remaining.length),
      }

      return newAddState;
    case ActionTypes.REMOVE:
      const newSelected = [...selected].slice(0, index);
      const newRemaining = [...selected.slice(index, selected.length), ...remaining];

      const newRemoveState = {
        selected: newSelected,
        remaining: newRemaining,
      }

      return newRemoveState;
    default:
      return state;
  }
}

const Context = createContext<PathContext>(null as any);

export const PathProvider: FC<{data: PathData}> = ({children, data}) => {
  const [state, dispatch] = useReducer(pathReducer, data);
  const pathContext = useMemo(() => {
    return {
      state,
      dispatch
    };
  }, [state, dispatch]);
  return <Context.Provider value={pathContext} children={children} />
}

export const usePathContext = () => {
  return useContext(Context);
}