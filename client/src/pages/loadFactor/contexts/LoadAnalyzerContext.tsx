import { createActionCreators, createReducerFunction } from 'immer-reducer';
import React, { ReactNode, createContext, useReducer, useContext } from 'react';
import { ILoadSummaryIds } from '../../../interfaces/ILoadSummaryIds';
import { KeyValueLoadSummary } from '../../../models';
import loadAnalyzerReducer, { INITIAL_STATE, stateProps } from './loadAnalyzerReducer';

type state = stateProps;

const LoadAnalyzerContext = createContext<state>(INITIAL_STATE);

const ActionCreators = createActionCreators(loadAnalyzerReducer);
const reducerFunction = createReducerFunction(loadAnalyzerReducer);

interface props {
  children: ReactNode;
}

export const LoadAnalyzerProvider = ({ children }: props) => {
  const [state, dispatch] = useReducer(reducerFunction, INITIAL_STATE);

  const value: state = {
    loadSummaries: state.loadSummaries,
    selectedTruckIds: state.selectedTruckIds,
    selectedOrderIds: state.selectedOrderIds,
    selectedLoadSummaryIds: state.selectedLoadSummaryIds,
    fetchLoadSummariesLoading: state.fetchLoadSummariesLoading,

    fetchAllLoadSummaries_Pending:() =>dispatch(ActionCreators.fetchAllLoadSummaries_Pending()),
    fetchAllLoadSummaries_Failed:() =>dispatch(ActionCreators.fetchAllLoadSummaries_Failed()),
    fetchAllLoadSummaries_Success:(loadSummaries: KeyValueLoadSummary[]) =>dispatch(ActionCreators.fetchAllLoadSummaries_Success(loadSummaries)),
    addSelectedLoadSummaryIds: (summary: ILoadSummaryIds) => dispatch(ActionCreators.addSelectedLoadSummaryIds(summary)),
    removeSelectedLoadSummaryIds: (summary: ILoadSummaryIds) => dispatch(ActionCreators.removeSelectedLoadSummaryIds(summary)),
    addOrderId: (orderId: number) => dispatch(ActionCreators.addOrderId(orderId)),
    removeOrderId: (orderId: number) => dispatch(ActionCreators.removeOrderId(orderId)),
    addTruckId: (truckId: number) => dispatch(ActionCreators.addTruckId(truckId)),
    removeTruckId: (truckId: number) => dispatch(ActionCreators.removeTruckId(truckId)),
  };

  return <LoadAnalyzerContext.Provider value={value}>{children}</LoadAnalyzerContext.Provider>;
};

const useLoadAnalyzer = () => {
  const context = useContext(LoadAnalyzerContext);

  if (context === undefined) throw new Error('useLoadAnalyzer must be uised within LoadAnalyzerContext');

  return context;
};

export default useLoadAnalyzer;
