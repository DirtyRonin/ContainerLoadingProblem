import React, { useEffect, useReducer } from 'react';
import { createActionCreators, createReducerFunction } from 'immer-reducer';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { LoadingButton } from '@mui/lab';

import { ILoadSummary, IPopulatedCargo, ITruck, ITruckLoading, ToLoadSummaryIds } from '../../../interfaces';

import LoadingCargoTreeItem from './LoadingCargoTreeItems';

import summaryTreeReducer, { INITIAL_STATE } from './summaryTreeReducer';

import { CargoApi } from '../../../apis/cargoApi';
import { TruckApi } from '../../../apis/trucksApi';
import { TruckLoadingApi } from '../../../apis/truckLoadingsApi';

import {
  AnalyzeLoadingForSummaries,
  SelectLoadAnalyzerState,
  setSelectedLoadSummaryIds,
  clearSelectedLoadSummaryIds,
  SaveCurrentTruckLoadings,
  removeRouteId,
} from '../slice/LoadAnalyzerSlice';

import { useAppDispatch, useAppSelector } from '../../../store';
import { AreArraysEqual, GetDeltas, IsStringEmpty } from '../../../utils/shared';
import { ILoadSummaryIds } from '../../../interfaces/ILoadSummaryIds';
import ButtonGroup from '../../../components/ui/ButtonGroup';

export default function OrderSummaryItem() {
  const dispatchGlobalState = useAppDispatch();
  const {
    selectedRouteId,
    selectedOrderIds,
    selectedTruckIds,
    selectedLoadSummaryIds,
    unchangedLoadSummaryIdsFromCloud,
    loadSummaries,
    SaveCurrentTruckLoadingsStatus,
  } = useAppSelector(SelectLoadAnalyzerState);

  const reducerFunction = createReducerFunction(summaryTreeReducer);
  const ActionCreators = createActionCreators(summaryTreeReducer);

  const [state, dispatchLocalState] = useReducer(reducerFunction, INITIAL_STATE);

  /** load mechanism for the existing selected load summaries ids in the db */
  useEffect(() => {
    loadRoute(selectedRouteId);
  }, [selectedRouteId]);

  const loadRoute = (routeId: string) => {
    if (IsStringEmpty(selectedRouteId)) return;
    dispatchLocalState(ActionCreators.FilterTruckLoadingByRouteId_Pending());

    TruckLoadingApi.FilterTruckLoadingByRouteId(routeId)
      .then((result) => {
        dispatchLocalState(ActionCreators.FilterTruckLoadingByRouteId_Success(result));

        const mergedLoadSummaryIds = result.reduce<ILoadSummaryIds[]>((prev, current) => {
          const summary = ToLoadSummaryIds(current);
          if (!summary) return prev;

          return [...prev, summary];
        }, []);

        dispatchGlobalState(setSelectedLoadSummaryIds(mergedLoadSummaryIds));
      })
      .catch((e) => dispatchLocalState(ActionCreators.FilterTruckLoadingByRouteId_Failed()));
  };

  /** triggered by selecting an order item
   * two ways of fetch cargo item
   * a) filter cargos by oder ids
   * b) through selected cargo in the tree
   */
  useEffect(() => {
    dispatchLocalState(ActionCreators.fetchAllCargos_Pending());

    /** problem: if an order is unselected, we still want the cargo ids from the selected load summaries to be available */

    /** filter missing cargo ids from selected load summaries
     *  create a list of all cargo ids from the selected summary ids that are missing in the
     *  filtered cargos from the order ids
     */
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

    /** reload and merge missing cargo ids from selected load summaries */
    Promise.all([CargoApi.FilterCargosByOrderIds(selectedOrderIds), Promise.all(missingCargoIds.map((cargoId) => CargoApi.FetchCargoById(cargoId)))])
      .then((results) => {
        const combined = results.reduce<IPopulatedCargo[]>((prev, current) => prev.concat(current), []);
        dispatchLocalState(ActionCreators.fetchAllCargos_Success(combined));
      })
      .catch((e) => dispatchLocalState(ActionCreators.fetchAllCargos_Failed()));
  }, [selectedOrderIds]);

  /** Get all trucks that are selected by the load summary ids */
  useEffect(() => {
    dispatchLocalState(ActionCreators.fetchAllTrucks_Pending());

    const truckIds = selectedLoadSummaryIds
      .map((ids) => ids.truckId) // get truck ids from selected summaries
      .concat(selectedTruckIds) // combine with selected trucks
      .filter((value, index, array) => array.indexOf(value) === index); // filter unique values

    TruckApi.FilterTruckByIds(truckIds)
      .then((result) => dispatchLocalState(ActionCreators.fetchAllTrucks_Success(result)))
      .catch((e) => dispatchLocalState(ActionCreators.fetchAllTrucks_Failed()));
  }, [selectedTruckIds]);

  /** trigger loading meter calculation when the amount of cargos or trucks is changing through the ofter useEffects*/
  useEffect(() => {
    if (!isReady()) return;

    dispatchGlobalState(AnalyzeLoadingForSummaries({ cargos: state.cargos.value, trucks: state.trucks.value, selectedLoadSummaryIds }));
  }, [state.cargos, state.trucks]);

  /** Every time the selectedLoadSummaryIds have changed, check if selectedLoadSummaryIds and unchangedLoadSummaryIdsFromCloud are equal
   * This will be used to for process that will validate, if a change has been made
   * @param {ILoadSummaryIds[]} changingSelection
   * @param {ILoadSummaryIds[]} selectedLoadSummaryIds
   */
  const hasSelectionChanged = (changingSelection: ILoadSummaryIds[], unchangedSelection: ILoadSummaryIds[]): boolean => {
    return !AreArraysEqual(changingSelection, unchangedSelection);
  };

  const isReady = (): boolean => {
    if (state.cargos.status !== 'succeeded') return false;
    if (state.cargos.value.length < 1) return false;

    if (state.trucks.status !== 'succeeded') return false;
    if (state.trucks.value.length < 1) return false;

    return true;
  };

  const renderOrderTreeItems = () =>
    state.cargos.value.map((cargo, index) => (
      <TreeItem key={`${cargo._id}`} nodeId={`${cargo._id}`} label={`${cargo._id}`}>
        {renderCargoTreeItems(cargo.orderId)}
      </TreeItem>
    ));

  const renderCargoTreeItems = (orderId: string) =>
    state.cargos.value
      .filter((x) => x.orderId === orderId)
      .map((cargo) => (
        <TreeItem key={`#${cargo.name}-${cargo._id}`} nodeId={`#${cargo.name}-${cargo._id}`} label={`#${cargo.name}-${cargo._id}`}>
          <TreeItem nodeId={`#${cargo.name}-sizes-${cargo._id}`} label={`${cargo.length}l * ${cargo.width}w * ${cargo.height}h`}></TreeItem>
          <TreeItem nodeId={`#${cargo.name}-quantity-${cargo._id}`} label={`${cargo.quantity} X`}></TreeItem>
          <TreeItem nodeId={`#${cargo.name}-isStackable-${cargo._id}`} label={`Stackable: ${cargo.isStackable ? 'Yes' : 'No'}`}></TreeItem>
        </TreeItem>
      ));

  const renderTruckTreeItems = () => {
    return state.trucks.value.map((truck) => (
      <TreeItem nodeId={`#${truck.vehicleIdentifier}-${truck._id}`} label={`#${truck.vehicleIdentifier}-${truck._id} ${remainingSpaceMessage(truck)}`}>
        {getUniqueOrderIdsByCargos().map((orderId) => renderCargoTreeItemsGroupedByOrderId(truck._id, orderId))}
      </TreeItem>
    ));
  };

  const getUniqueOrderIdsByCargos = (): string[] =>
    state.cargos.value.map((cargo) => cargo.orderId).filter((value, index, array) => array.indexOf(value) === index);

  const renderCargoTreeItemsGroupedByOrderId = (truckId: string, orderId: string) =>
    state.cargos.value
      .filter((x) => x.orderId === orderId)
      .map((cargo) => (
        <LoadingCargoTreeItem
          key={`LoadingCargoTreeItem-${truckId}-${orderId}-${cargo._id}`}
          loadSummaryIds={{ truckId, orderId, cargoId: cargo._id, _id: cargo.truckLoadings[0]?._id ?? '' }}
          cargo={cargo}
        />
      ));

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

  const renderTreeView = (): JSX.Element => {
    return (
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 640, flexGrow: 1, maxWidth: 400, overflow: 'auto' }}
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

  /** save the current selected summary ids */
  const SaveChanges = (): void => {
    /** validate changes  */
    if (!hasSelectionChanged(selectedLoadSummaryIds, unchangedLoadSummaryIdsFromCloud)) return;

    /** compare both arrays and create two new arrays for adding and removing */
    const removing: string[] = GetDeltas(selectedLoadSummaryIds, unchangedLoadSummaryIdsFromCloud).map((_) => _._id);
    const adding: ITruckLoading[] = GetDeltas(unchangedLoadSummaryIdsFromCloud, selectedLoadSummaryIds).map((_) => ({
      routeId: selectedRouteId,
      orderId: _.orderId,
      cargoId: _.cargoId,
      truckId: _.truckId,
      _id: _._id,
    }));

    dispatchGlobalState(SaveCurrentTruckLoadings({ adding, removing }));
  };

  const onReset = () => loadRoute(selectedRouteId);
  const onCancel = () => {
    if (!IsStringEmpty(selectedRouteId)) dispatchGlobalState(removeRouteId(selectedRouteId));
    dispatchGlobalState(clearSelectedLoadSummaryIds());
  };

  return (
    <>
      {renderTreeView()}
      <ButtonGroup
        onReset={onReset}
        onCancel={onCancel}
        onSave={SaveChanges}
        value={selectedRouteId}
        isLoading={SaveCurrentTruckLoadingsStatus.status === 'pending'}
      />
    </>
  );
}
