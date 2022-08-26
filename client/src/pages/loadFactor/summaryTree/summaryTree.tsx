import React, { useEffect, useReducer } from 'react';
import { createActionCreators, createReducerFunction } from 'immer-reducer';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

import { ILoadSummary, ITruck } from '../../../interfaces';
import { ContainerHelper } from '../../../utils/mathHelper';
import { LoadAnalyzer } from '../LoadAnalyzer';

import LoadingCargoTreeItem from './LoadingCargoTreeItems';

import summaryTreeReducer, { INITIAL_STATE } from './summaryTreeReducer';

import { CargoApi } from '../../../apis/cargoApi';
import { TruckApi } from '../../../apis/trucksApi';

import loadAnalyzerContext from '../contexts/LoadAnalyzerContext';

export default function OrderSummaryItem() {
  const {
    selectedOrderIds,
    selectedTruckIds,
    selectedLoadSummaryIds,
    loadSummaries,
    fetchAllLoadSummaries_Failed,
    fetchAllLoadSummaries_Pending,
    fetchAllLoadSummaries_Success,
  } = loadAnalyzerContext();

  const reducerFunction = createReducerFunction(summaryTreeReducer);
  const ActionCreators = createActionCreators(summaryTreeReducer);

  const [state, dispatch] = useReducer(reducerFunction, INITIAL_STATE);

  const containerHelper = new ContainerHelper();
  const loadAnalyzer = new LoadAnalyzer(containerHelper);

  useEffect(() => {
    dispatch(ActionCreators.fetchAllCargos_Pending());

    CargoApi.FilterCargoByOrderIds(selectedOrderIds)
      .then((result) => dispatch(ActionCreators.fetchAllCargos_Success(result)))
      .catch((e) => dispatch(ActionCreators.fetchAllCargos_Failed()));
  }, [selectedOrderIds]);

  useEffect(() => {
    dispatch(ActionCreators.fetchAllTrucks_Pending());

    TruckApi.FilterTruckByIds(selectedTruckIds)
      .then((result) => dispatch(ActionCreators.fetchAllTrucks_Success(result)))
      .catch((e) => dispatch(ActionCreators.fetchAllTrucks_Failed()));
  }, [selectedTruckIds]);

  useEffect(() => {
    if (state.fetchCargoLoading !== 'succeeded') return;
    if (state.cargos.length < 1) return;

    if (state.fetchTruckLoading !== 'succeeded') return;
    if (state.trucks.length < 1) return;

    fetchAllLoadSummaries_Pending();

    loadAnalyzer
      .AnalyzeLoadingForSummaries(state.cargos, state.trucks)
      .then((result) => {
        console.log(result)
        fetchAllLoadSummaries_Success(result)
      })
      .catch((e) => fetchAllLoadSummaries_Failed());
  }, [state.fetchCargoLoading, state.fetchTruckLoading]);

  const getOrderTreeItems = () =>
    selectedOrderIds.map((orderId, index) => (
      <TreeItem nodeId={`#index-${index}.orderId-${orderId}`} label={`#index-${index}.orderId-${orderId}`}>
        {getCargoTreeItems(orderId)}
      </TreeItem>
    ));

  const getCargoTreeItems = (orderId: number) =>
    state.cargos
      .filter((x) => x.orderId === orderId)
      .map((cargo) => (
        <TreeItem nodeId={`#${cargo.name}-${cargo.id}`} label={`#${cargo.name}-${cargo.id}`}>
          <TreeItem nodeId={`#${cargo.name}-sizes-${cargo.id}`} label={`${cargo.length}l * ${cargo.width}w * ${cargo.height}h`}></TreeItem>
          <TreeItem nodeId={`#${cargo.name}-quantity-${cargo.id}`} label={`${cargo.quantity} X`}></TreeItem>
          <TreeItem nodeId={`#${cargo.name}-isStackable-${cargo.id}`} label={`Stackable: ${cargo.isStackable ? 'Yes' : 'No'}`}></TreeItem>
        </TreeItem>
      ));

  const getTruckTreeItems = () =>
    state.trucks.map((truck) => (
      <TreeItem nodeId={`#${truck.vehicleIdentifier}-${truck.id}`} label={`#${truck.vehicleIdentifier}-${truck.id} ${remainingSpaceMessage(truck)}`}>
        {selectedOrderIds.map((orderId) => getCargoTreeItemsCheckable(truck.id, orderId))}
      </TreeItem>
    ));

  const remainingSpaceMessage = (truck: ITruck) => {
    const message = (loadingMeter: number) => `|| Available Loading Meter: ${loadingMeter} cm`;

    const relatedCargoIds = selectedLoadSummaryIds.filter((x) => x.truckId === truck.id).map((x) => x.cargoId);

    if (relatedCargoIds.length === 0) return message(truck.length);

    const relatedSelectedSummaries: ILoadSummary[] | undefined = loadSummaries.find((x) => x.key === truck.id)?.values.filter((x) => x.cargo.id);

    if (relatedSelectedSummaries === undefined || relatedSelectedSummaries.length === 0) return message(truck.length);

    const remainingLoadingMeter = relatedCargoIds.reduce((prev, current) => {
      const relatedSummary = loadSummaries.find((x) => x.key === truck.id)?.values.find((x) => x.cargo.id === current)?.loadingMeter;
      if (!relatedSummary) return -1;

      prev -= relatedSummary;
      return prev;
    }, truck.length);

    if (remainingLoadingMeter === -1) return message(-1);

    return `${message(Math.round(remainingLoadingMeter))} of ${truck.length} cm`;
  };

  const getCargoTreeItemsCheckable = (truckId: number, orderId: number) =>
    state.cargos.filter((x) => x.orderId === orderId).map((cargo) => <LoadingCargoTreeItem truckId={truckId} cargoId={cargo.id} orderId={orderId} />);

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 640, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <TreeItem nodeId="1" label="Trucks">
        {getTruckTreeItems()}
      </TreeItem>
      <TreeItem nodeId="2" label="Orders">
        {getOrderTreeItems()}
      </TreeItem>
    </TreeView>
  );
}
