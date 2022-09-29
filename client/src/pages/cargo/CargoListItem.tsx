import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InventoryIcon from '@mui/icons-material/Inventory';
import { ICargo } from '../../interfaces';

import { useAppDispatch, useAppSelector, SelectCargoId, SelectCargoListState, DeleteCargo } from '../../store';
import CostumListItem from '../../components/ui/ComstumListItem';

interface Props {
  cargo: ICargo;
}

export default function CargoListItem(props: Props) {
  const { cargo } = props;

  const dispatch = useAppDispatch();
  const { selectedCargoId } = useAppSelector(SelectCargoListState);

  const handleOnSelect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(SelectCargoId(cargo._id));
  };

  const handleOnDelete = (cargo: ICargo) => {
    dispatch(DeleteCargo(cargo._id));
  };

  const isSelected = () => cargo._id === selectedCargoId;

  const content = (): JSX.Element => (
    <ListItemButton selected={isSelected()} onClick={handleOnSelect}>
      <ListItemIcon>
        <InventoryIcon />
      </ListItemIcon>
      <ListItemText primary={cargo.name} secondary={`${cargo.length} * ${cargo.width}`} />
    </ListItemButton>
  );

  return CostumListItem({
    value: cargo,
    handleOnDelete,
    children: content(),
  });
}
