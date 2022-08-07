import React, { useEffect, useState } from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InventoryIcon from '@mui/icons-material/Inventory';

import { SelectOrderState } from '../../../store/slices/order/OrderSlice';
import { SelectTruckState } from '../../../store/slices/truck/TruckSlice';
import { FetchAllCargo, SelectCargoState } from '../../../store/slices/cargo/CargoSlice';
import { SelectTruckMultiSelectState } from '../../../store/slices/truck/TruckMultiSelectSlice';
import { SelectOrderMultiSelectState } from '../../../store/slices/order/OrderMultiSelectSlice';

import { ICargo, IEntity, IOrder, ITruck } from '../../../interfaces';
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
  const { selectedTruckIds } = useAppSelector(SelectTruckMultiSelectState);
  const { selectedOrderIds } = useAppSelector(SelectOrderMultiSelectState);

  const containerHelper = new ContainerHelper();
  const loadAnalyzer = new LoadAnalyzer(containerHelper);

  const [loadingMeter, setLoadingMeter] = useState(0);

  useEffectOnce(() => {
    if (loading !== 'idle') return;

    dispatch(FetchAllCargo());
  });

  useEffect(() => {
    const myCargos = getCargosByOrderIds();
    const myTrucks = getTrucksByTruckIds();

    if (myTrucks.length > 0 && myCargos.length > 0)
      loadAnalyzer.AnalyzeLoading(myCargos, myTrucks).then((result) => {
        console.log(result);
        setLoadingMeter(result);
      });
  }, [selectedTruckIds, selectedOrderIds]);

  const getTrucksByTruckIds = () =>
    selectedTruckIds.reduce((prev, current) => {
      const truck = trucks.find((x) => x.id === current);
      if (truck) prev.push(truck);

      return prev;
    }, [] as ITruck[]);

  const getCargosByOrderIds = () =>
    selectedOrderIds.reduce((prev, current) => {
      const cargo = cargos.find((x) => x.orderId === current);
      if (cargo) prev.push(cargo);

      return prev;
    }, [] as ICargo[]);

  return (
    <ListItem dense={true}>
      <ListItemIcon>
        <InventoryIcon />
      </ListItemIcon>

      {/* <ListItemText primary={`Total Volume from Cargo are ${getVolumeFromOrder()} m³`} /> */}
      <ListItemText primary={`Loading Meter ${Math.round(loadingMeter)} cm`} />
    </ListItem>
  );
}
