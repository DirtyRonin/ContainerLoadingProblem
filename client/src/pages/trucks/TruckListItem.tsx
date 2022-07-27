import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TruckIcon from "@mui/icons-material/LocalShipping";
import DeleteIcon from "@mui/icons-material/Delete";
import { ITruck } from "../../models/Truck";

import { SelectTruckListState, SelectTruckId } from "./TruckListSlice";
import { DeleteTruck } from "./TruckSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";

interface Props {
  truck: ITruck;
}

export const TruckListItem = (props: Props) => {
  const { truck } = props;

  const dispatch = useAppDispatch();
  const { selectedTruckId } = useAppSelector(SelectTruckListState);

  const handleOnSelect = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => dispatch(SelectTruckId(truck.id));

  const handleOnDelete = () => {
    dispatch(DeleteTruck(truck.id));
  }

  const isSelected =()=> selectedTruckId === truck.id;

  return (
    <ListItem
      dense={true}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={handleOnDelete}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemButton selected={isSelected()} onClick={handleOnSelect}>
        <ListItemIcon>
          <TruckIcon />
        </ListItemIcon>
        <ListItemText
          primary={truck.vehicleIdentifier}
          secondary={truck.vehicleIdentifier}
        />
      </ListItemButton>
    </ListItem>
  );
};
