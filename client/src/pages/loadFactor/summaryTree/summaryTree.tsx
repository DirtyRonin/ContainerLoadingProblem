import React, { useEffect, useState } from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { Checkbox, Typography } from '@mui/material';

import { SelectOrderState } from '../../../store/slices/order/OrderSlice';
import { SelectTruckState } from '../../../store/slices/truck/TruckSlice';
import { FetchAllCargo, SelectCargoState } from '../../../store/slices/cargo/CargoSlice';
import { SelectTruckMultiSelectState } from '../../../store/slices/truck/TruckMultiSelectSlice';
import { SelectOrderMultiSelectState } from '../../../store/slices/order/OrderMultiSelectSlice';

import { ICargo, IEntity, ILoadSummary, IOrder, ITruck } from '../../../interfaces';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import ListItem from '@mui/material/ListItem';
import { useEffectOnce } from '../../../hooks/useEffectOnce';
import { Order } from '../../../models';
import { ContainerHelper } from '../../../utils/mathHelper';
import { LoadAnalyzer } from '../LoadAnalyzer';

export default function OrderSummaryItem() {
  const dispatch = useAppDispatch();
  const { cargos, loading } = useAppSelector(SelectCargoState);
  const { trucks } = useAppSelector(SelectTruckState);
  const { orders } = useAppSelector(SelectOrderState);
  const { selectedTruckIds } = useAppSelector(SelectTruckMultiSelectState);
  const { selectedOrderIds } = useAppSelector(SelectOrderMultiSelectState);

  const containerHelper = new ContainerHelper();
  const loadAnalyzer = new LoadAnalyzer(containerHelper);

  const [summaries, setSummaries] = useState<{ [key: number]: ILoadSummary[] }>({});
  const [selectedCargos, setSelectedCargos] = useState<ICargo[]>([]);
  const [selectedTrucks, setSelectedTrucks] = useState<ITruck[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<IOrder[]>([]);
  // const [expanded, setExpanded] = React.useState<string[]>([]);

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
        console.log(result);
        setSummaries(result);
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
      const cargo = cargos.filter((x) => x.orderId === current );
      if (cargo) return prev.concat(cargo);

      return prev;
    }, [] as ICargo[]);

  const getTruckTreeItems = () =>
    selectedTrucks.map((truck) => (
      <TreeItem nodeId={`#${truck.vehicleIdentifier}-${truck.id}`} label={`#${truck.vehicleIdentifier}-${truck.id}`}>
        {selectedOrderIds.map((orderId) => getCargoTreeItemsCheckable(truck.id,orderId))}
      </TreeItem>
    ));

  const getOrderTreeItems = () =>
    selectedOrders.map((order) => (
      <TreeItem nodeId={`#${order.name}-${order.id}`} label={`#${order.name}-${order.id}`}>
        {getCargoTreeItems(order.id)}
      </TreeItem>
    ));

  const getCargoTreeItems = (orderId: number) =>
    cargos
      .filter((x) => x.orderId === orderId)
      .map((cargo) => (
        <TreeItem nodeId={`#${cargo.singleGoods.name}-${cargo.id}`} label={`#${cargo.singleGoods.name}-${cargo.id}`}>
          <TreeItem
            nodeId={`#${cargo.singleGoods.name}-sizes-${cargo.id}`}
            label={`${cargo.singleGoods.length}l * ${cargo.singleGoods.width}w * ${cargo.height}h`}
          ></TreeItem>
          <TreeItem nodeId={`#${cargo.singleGoods.name}-quantity-${cargo.id}`} label={`${cargo.quantity} X`}></TreeItem>
          <TreeItem
            nodeId={`#${cargo.singleGoods.name}-isStackable-${cargo.id}`}
            label={`Stackable: ${cargo.isStackable ? 'Yes' : 'No'}`}
          ></TreeItem>
        </TreeItem>
      ));
  const getCargoTreeItemsCheckable = (truckId:number, orderId: number) =>
    cargos
      .filter((x) => x.orderId === orderId)
      .map((cargo) => <TreeItem nodeId={`#${cargo.singleGoods.name}-${cargo.id}`} label={treeLabel(cargo,truckId)}></TreeItem>);

  // https://github.com/mui/material-ui/issues/17407

  const treeLabel = (cargo: ICargo,truckId:number) => {
    return (
      <>
        <Checkbox />
        <Typography variant="caption">{`#${cargo.singleGoods.name}-${cargo.id}`}</Typography>
        <Typography variant="caption">{`Required Loading Meter: ${getRoundedLoadingMeter(summaries, truckId, cargo)} cm`}</Typography>
      </>
    );
  };

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

function getRoundedLoadingMeter(summaries: { [key: number]: ILoadSummary[]; }, truckId: number, cargo: ICargo) {
  return Math.round( summaries[truckId]?.find(summary => summary.cargo.id === cargo.id)?.loadingMeter ?? 0);
}

