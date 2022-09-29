import React, { ReactNode } from 'react';

import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';

import CostumListItem from '../../components/ui/ComstumListItem';
import { IPopulatedTruckLoading, ITruckLoading } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../store';
import { SelectRouteState,SelectTruckLoadingId } from './slices/RouteSlice';

interface props {
  populatedTruckLoading: IPopulatedTruckLoading;
}

export default function TruckLoadingListItem({ populatedTruckLoading }: props) {
  const dispatch = useAppDispatch();
  const { selectedTruckLoadingId } = useAppSelector(SelectRouteState);

  const handleOnSelect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(SelectTruckLoadingId(populatedTruckLoading._id));
  };

  const handleOnDelete = (truckLoading: ITruckLoading) => {
    // dispatch(DeleteCargo(cargo._id));
  };

  /** used for setting a visual highlight on the selecet item */
  const isSelected = () => populatedTruckLoading._id === selectedTruckLoadingId;



  const content = ():JSX.Element => (
    <ListItemButton selected={isSelected()} onClick={handleOnSelect}>
      <ListItemIcon>
        <InventoryIcon />
      </ListItemIcon>
      <ListItemText primary={populatedTruckLoading.trucks[0]?.vehicleIdentifier} secondary={`${populatedTruckLoading.cargos[0]?.name}`} />
    </ListItemButton>
  );

  return CostumListItem({
    value: populatedTruckLoading,
    handleOnDelete,
    children: content(),
  });
}
