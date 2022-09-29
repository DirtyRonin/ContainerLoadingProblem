import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import RouteIcon from '@mui/icons-material/LocalShipping';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { IRoute } from '../../interfaces/';
import { SelectRouteState, SelectRouteId, DeleteRoute } from './slices/RouteSlice';

interface Props {
  route: IRoute;
}

export default function RouteListItem(props: Props) {
  const { route } = props;

  const dispatch = useAppDispatch();
  const { selectedRouteId } = useAppSelector(SelectRouteState);

  const handleOnSelect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => dispatch(SelectRouteId(route._id));

  const handleOnDelete = () => dispatch(DeleteRoute(route._id));

  const isSelected = () => selectedRouteId === route._id;

  return (
    <ListItem
      key={`listItem-${route._id}`}
      dense={true}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={handleOnDelete}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemButton selected={isSelected()} onClick={handleOnSelect}>
        <ListItemIcon>
          <RouteIcon />
        </ListItemIcon>
        <ListItemText primary={`from ${route.from}`} secondary={`to ${route.to}`} />
      </ListItemButton>
    </ListItem>
  );
}
