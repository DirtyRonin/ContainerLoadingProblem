import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import DeleteIcon from "@mui/icons-material/Delete";
import { IGoods } from "../../interfaces";

import { SelectGoodsId, SelectGoodsListState } from "./slices/GoodsListSlice";
import { DeleteGoods } from "./slices/GoodsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";

interface Props {
  goods: IGoods;
}

export const GoodsListItem = (props: Props) => {
  const { goods } = props;

  const dispatch = useAppDispatch();
  const { selectedGoodsId } = useAppSelector(SelectGoodsListState);

  const handleOnSelect = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => dispatch(SelectGoodsId(goods.id));

  const handleOnDelete = () => {
    dispatch(DeleteGoods(goods.id));
  };

  const isSelected = () => selectedGoodsId === goods.id;

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
          <ViewInArIcon />
        </ListItemIcon>
        <ListItemText primary={goods.name} secondary={goods.name} />
      </ListItemButton>
    </ListItem>
  );
};
