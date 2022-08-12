import React, { useEffect, useState } from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

import { SelectOrderState } from '../../../store/slices/order/OrderSlice';
import { SelectTruckState } from '../../../store/slices/truck/TruckSlice';
import { FetchAllCargo, SelectCargoState } from '../../../store/slices/cargo/CargoSlice';
import { SelectTruckMultiSelectState } from '../../../store/slices/truck/TruckMultiSelectSlice';
import { SelectOrderMultiSelectState } from '../../../store/slices/order/OrderMultiSelectSlice';
import { SelectSummaryState, SetSummaries } from '../../../store/slices/summaryTree/summaryTreeSlice';

import { ICargo, ILoadSummary, IOrder, ITruck } from '../../../interfaces';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { useEffectOnce } from '../../../hooks/useEffectOnce';
import { ContainerHelper } from '../../../utils/mathHelper';
import { LoadAnalyzer } from '../LoadAnalyzer';

import LoadingCargoTreeItem from './LoadingCargoTreeItems';

export default function OrderSummaryItem() {
  const dispatch = useAppDispatch();
  const { cargos, loading } = useAppSelector(SelectCargoState);
  const { trucks } = useAppSelector(SelectTruckState);
  const { orders } = useAppSelector(SelectOrderState);
  const { selectedTruckIds } = useAppSelector(SelectTruckMultiSelectState);
  const { selectedOrderIds } = useAppSelector(SelectOrderMultiSelectState);
  const { loadSummaries, selectedloadSummaries } = useAppSelector(SelectSummaryState);

  const containerHelper = new ContainerHelper();
  const loadAnalyzer = new LoadAnalyzer(containerHelper);

  const [selectedCargos, setSelectedCargos] = useState<ICargo[]>([]);
  const [selectedTrucks, setSelectedTrucks] = useState<ITruck[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<IOrder[]>([]);

  /** Set for Checked Cargo */

  useEffectOnce(() => {
    if (loading !== 'idle') return;

    dispatch(FetchAllCargo());
  });

  useEffect(() => {
    const myCargos = getCargosByOrderIds();
    const myTrucks = getTrucksByTruckIds();
    const myOrders = getOrdersByOrderIds();

    setSelectedCargos(myCargos);
    setSelectedTrucks(myTrucks);
    setSelectedOrders(myOrders);

    if (myTrucks.length > 0 && myCargos.length > 0)
      loadAnalyzer.AnalyzeLoadingForSummaries(myCargos, myTrucks).then((result) => {
        dispatch(SetSummaries(result));
      });
  }, [selectedTruckIds, selectedOrderIds]);

  const getTrucksByTruckIds = () =>
    selectedTruckIds.reduce((prev, current) => {
      const truck = trucks.find((x) => x.id === current);
      if (truck) prev.push(truck);

      return prev;
    }, [] as ITruck[]);

  const getOrdersByOrderIds = () =>
    selectedOrderIds.reduce((prev, current) => {
      const order = orders.find((x) => x.id === current);
      if (order) prev.push(order);

      return prev;
    }, [] as IOrder[]);

  const getCargosByOrderIds = () =>
    selectedOrderIds.reduce((prev, current) => {
      const cargo = cargos.filter((x) => x.orderId === current);
      if (cargo) return prev.concat(cargo);

      return prev;
    }, [] as ICargo[]);

  const getOrderTreeItems = () =>
    selectedOrders.map((order) => (
      <TreeItem nodeId={`#${order.orderName}-${order.id}`} label={`#${order.orderName}-${order.id}`}>
        {getCargoTreeItems(order.id)}
      </TreeItem>
    ));

  const getCargoTreeItems = (orderId: number) =>
    cargos
      .filter((x) => x.orderId === orderId)
      .map((cargo) => (
        <TreeItem nodeId={`#${cargo.name}-${cargo.id}`} label={`#${cargo.name}-${cargo.id}`}>
          <TreeItem
            nodeId={`#${cargo.name}-sizes-${cargo.id}`}
            label={`${cargo.length}l * ${cargo.width}w * ${cargo.height}h`}
          ></TreeItem>
          <TreeItem nodeId={`#${cargo.name}-quantity-${cargo.id}`} label={`${cargo.quantity} X`}></TreeItem>
          <TreeItem
            nodeId={`#${cargo.name}-isStackable-${cargo.id}`}
            label={`Stackable: ${cargo.isStackable ? 'Yes' : 'No'}`}
          ></TreeItem>
        </TreeItem>
      ));

  const getTruckTreeItems = () =>
    selectedTrucks.map((truck) => (
      <TreeItem
        nodeId={`#${truck.vehicleIdentifier}-${truck.id}`}
        label={`#${truck.vehicleIdentifier}-${truck.id} ${remainingSpaceMessage(truck)}`}
      >
        {selectedOrderIds.map((orderId) => getCargoTreeItemsCheckable(truck.id, orderId))}
      </TreeItem>
    ));

  const remainingSpaceMessage = (truck: ITruck) => {
    const message = (loadingMeter: number) => `|| Available Loading Meter: ${loadingMeter} cm`;

    const relatedCargoIds = selectedloadSummaries.filter((x) => x.truckId === truck.id).map((x) => x.cargoId);

    if (relatedCargoIds.length === 0) return message(truck.length);

    const relatedSelectedSummaries = loadSummaries[truck.id]?.filter((x) => x.cargo.id);

    if (relatedSelectedSummaries.length === 0) return message(truck.length);

    const remainingLoadingMeter = relatedCargoIds.reduce((prev, current) => {
      const relatedSummary = loadSummaries[truck.id]?.find((x) => x.cargo.id === current)?.loadingMeter;
      if (!relatedSummary) return -1;

      prev -= relatedSummary;
      return prev;
    }, truck.length);

    if (remainingLoadingMeter === -1) return message(-1);

    return `${message(Math.round(remainingLoadingMeter))} of ${truck.length} cm`;
  };

  const getCargoTreeItemsCheckable = (truckId: number, orderId: number) =>
    cargos.filter((x) => x.orderId === orderId).map((cargo) => <LoadingCargoTreeItem truckId={truckId} cargoId={cargo.id} orderId={orderId}/>);

  // LoadingCargoTreeItem

  // https://github.com/mui/material-ui/issues/17407

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
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

function getSummary(summaries: { [key: number]: ILoadSummary[] }, truckId: number, cargoId: number) {
  return summaries[truckId]?.find((summary) => summary.cargo.id === cargoId);
}
