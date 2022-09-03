import React, { useEffect, useReducer } from 'react';
import { createActionCreators, createReducerFunction } from 'immer-reducer';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

import { ICargo, ILoadAnalyzer, ILoadSummary, ITruck } from '../../../interfaces';

import LoadingCargoTreeItem from './LoadingCargoTreeItems';

import summaryTreeReducer, { INITIAL_STATE } from './summaryTreeReducer';

import { CargoApi } from '../../../apis/cargoApi';
import { TruckApi } from '../../../apis/trucksApi';

import loadAnalyzerContext from '../contexts/LoadAnalyzerContext';

import { myContainer } from '../../../inversify.config';
import { TYPES } from '../../../utils/shared/registerSymbols';
import { LoadingButton } from '@mui/lab';
import { cargoListSlice } from '../../../store';
import { ILoadSummaryIds } from '../../../interfaces/ILoadSummaryIds';

export default function OrderSummaryItem() {
  const {
    selectedOrderIds,
    selectedTruckIds,
    selectedLoadSummaryIds,
    loadSummaries,
    fetchAllLoadSummaries_Failed,
    fetchAllLoadSummaries_Pending,
    fetchAllLoadSummaries_Success,
    AddSelectedLoadSummaries_Success,
  } = loadAnalyzerContext();

  const reducerFunction = createReducerFunction(summaryTreeReducer);
  const ActionCreators = createActionCreators(summaryTreeReducer);

  const [state, dispatch] = useReducer(reducerFunction, INITIAL_STATE);

  const loadAnalyzer = myContainer.get<ILoadAnalyzer>(TYPES.LoadAnalyzer);

  useEffect(() => {
    dispatch(ActionCreators.fetchAllCargos_Pending());

    const missingCargoIds = selectedLoadSummaryIds
      .map((ids) => ids.orderId)
      .filter((value, index, array) => array.indexOf(value) === index)
      .reduce<string[]>((prev, current) => {
        if (selectedOrderIds.includes(current)) return prev;

        return prev.concat(
          selectedLoadSummaryIds
            .filter((x) => x.orderId === current)
            .map((x) => x.cargoId)
            .filter((value, index, array) => array.indexOf(value) === index)
        );
      }, []);

    Promise.all([CargoApi.FilterCargoByOrderIds(selectedOrderIds), Promise.all(missingCargoIds.map((cargoId) => CargoApi.FetchCargoById(cargoId)))])
      .then((results) => {
        const combined = results.reduce<ICargo[]>((prev, current) => prev.concat(current), []);
        dispatch(ActionCreators.fetchAllCargos_Success(combined));
      })
      .catch((e) => dispatch(ActionCreators.fetchAllCargos_Failed()));
  }, [selectedOrderIds]);

  useEffect(() => {
    dispatch(ActionCreators.fetchAllTrucks_Pending());

    const truckIds = selectedLoadSummaryIds
      .map((ids) => ids.truckId) // get truck ids from selected summaries
      .concat(selectedTruckIds) // combine with selected trucks
      .filter((value, index, array) => array.indexOf(value) === index); // filter unique values

    TruckApi.FilterTruckByIds(truckIds)
      .then((result) => dispatch(ActionCreators.fetchAllTrucks_Success(result)))
      .catch((e) => dispatch(ActionCreators.fetchAllTrucks_Failed()));
  }, [selectedTruckIds]);

  useEffect(() => {
    if (!isReady()) return;

    loadAnalyzer
      .AnalyzeLoadingForSummaries(state.cargos, state.trucks, selectedLoadSummaryIds)
      .then((result) => {
        console.log(result);
        fetchAllLoadSummaries_Success(result);
      })
      .catch((e) => fetchAllLoadSummaries_Failed(e));
  }, [state.cargos, state.trucks]);

  const isReady = (): boolean => {
    if (state.fetchCargoLoading !== 'succeeded') return false;
    if (state.cargos.length < 1) return false;

    if (state.fetchTruckLoading !== 'succeeded') return false;
    if (state.trucks.length < 1) return false;

    return true;
  };

  const renderOrderTreeItems = () =>
    state.cargos.map((cargo, index) => (
      <TreeItem key={`${cargo._id}`} nodeId={`${cargo._id}`} label={`${cargo._id}`}>
        {renderCargoTreeItems(cargo.orderId)}
      </TreeItem>
    ));

  const renderCargoTreeItems = (orderId: string) =>
    state.cargos
      .filter((x) => x.orderId === orderId)
      .map((cargo) => (
        <TreeItem key={`#${cargo.name}-${cargo._id}`} nodeId={`#${cargo.name}-${cargo._id}`} label={`#${cargo.name}-${cargo._id}`}>
          <TreeItem nodeId={`#${cargo.name}-sizes-${cargo._id}`} label={`${cargo.length}l * ${cargo.width}w * ${cargo.height}h`}></TreeItem>
          <TreeItem nodeId={`#${cargo.name}-quantity-${cargo._id}`} label={`${cargo.quantity} X`}></TreeItem>
          <TreeItem nodeId={`#${cargo.name}-isStackable-${cargo._id}`} label={`Stackable: ${cargo.isStackable ? 'Yes' : 'No'}`}></TreeItem>
        </TreeItem>
      ));

  const renderTruckTreeItems = () => {
    return state.trucks.map((truck) => (
      <TreeItem nodeId={`#${truck.vehicleIdentifier}-${truck._id}`} label={`#${truck.vehicleIdentifier}-${truck._id} ${remainingSpaceMessage(truck)}`}>
        {getUniqueOrderIdsByCargos().map((orderId) => renderCargoTreeItemsGroupedByOrderId(truck._id, orderId))}
      </TreeItem>
    ));
  };

  const getUniqueOrderIdsByCargos = (): string[] => state.cargos.map((cargo) => cargo.orderId).filter((value, index, array) => array.indexOf(value) === index);

  const renderCargoTreeItemsGroupedByOrderId = (truckId: string, orderId: string) =>
    state.cargos.filter((x) => x.orderId === orderId).map((cargo) => <LoadingCargoTreeItem key={`LoadingCargoTreeItem-${truckId}-${orderId}-${cargo._id}`} truckId={truckId} cargoId={cargo._id} orderId={orderId} cargo={cargo} />);

  const remainingSpaceMessage = (truck: ITruck) => {
    const message = (loadingMeter: number) => `|| Available Loading Meter: ${loadingMeter} cm`;

    const relatedCargoIds = selectedLoadSummaryIds.filter((x) => x.truckId === truck._id).map((x) => x.cargoId);

    if (relatedCargoIds.length === 0) return message(truck.length);

    const relatedSelectedSummaries: ILoadSummary[] | undefined = loadSummaries.value.find((x) => x.key === truck._id)?.values.filter((x) => x.cargoId);

    if (relatedSelectedSummaries === undefined || relatedSelectedSummaries.length === 0) return message(truck.length);

    const remainingLoadingMeter = relatedCargoIds.reduce((prev, current) => {
      const relatedSummary = loadSummaries.value.find((x) => x.key === truck._id)?.values.find((x) => x.cargoId === current)?.loadingMeter;
      if (!relatedSummary) return -1;

      prev -= relatedSummary;
      return prev;
    }, truck.length);

    if (remainingLoadingMeter === -1) return message(-1);

    return `${message(Math.round(remainingLoadingMeter))} of ${truck.length} cm`;
  };

  const handleOnClick = () => {
    fetchAllLoadSummaries_Pending();
  };

  const renderButton = () => (
    <LoadingButton loading={loadSummaries.status === 'pending'} onClick={handleOnClick}>
      Loading
    </LoadingButton>
  );

  const renderTreeView = (): JSX.Element => {
    return (
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 640, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      >
        <TreeItem nodeId="1" label="Trucks">
          {renderTruckTreeItems()}
        </TreeItem>
        <TreeItem nodeId="2" label="Orders">
          {renderOrderTreeItems()}
        </TreeItem>
      </TreeView>
    );
  };

  return (
    <>
      {renderButton()}
      {renderTreeView()}
    </>
  );
}
