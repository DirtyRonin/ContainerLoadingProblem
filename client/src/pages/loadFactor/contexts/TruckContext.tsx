import { createActionCreators, createReducerFunction } from 'immer-reducer';
import React, { ReactNode, createContext, useReducer, useContext } from 'react';
import truckReducer, { INITIAL_STATE, stateProps } from './truckReducer';

type state = stateProps & {
  addSelectedTruckId(truckId: number): void;
  removeSelectedTruckId(truckId: number): void;
}

const initialState:state = {
  ...INITIAL_STATE,
  addSelectedTruckId: ()=>{},
  removeSelectedTruckId: ()=>{},
}

const TruckContext = createContext<state>(initialState);

const ActionCreators = createActionCreators(truckReducer);
const reducerFunction = createReducerFunction(truckReducer);

interface props {
  children: ReactNode;
}

export const TruckProvider = ({ children }: props) => {
  const [state, dispatch] = useReducer(reducerFunction, INITIAL_STATE);

  const addSelectedTruckId = (truckId: number) => {
    dispatch(ActionCreators.addSelectedTruckId(truckId));
  };
  const removeSelectedTruckId = (truckId: number) => {
    dispatch(ActionCreators.removeSelectedTruckId(truckId));
  };

  const value: state = {
    selectedTruckIds: state.selectedTruckIds,
    addSelectedTruckId,
    removeSelectedTruckId,
  };

  return <TruckContext.Provider value={value}>{children}</TruckContext.Provider>;
};

const useTruck = () => {
  const context = useContext(TruckContext);

  if (context === undefined) throw new Error('useTruck must be uised within TruckContext');

  return context;
};

export default useTruck;
