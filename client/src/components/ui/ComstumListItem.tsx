import React, { ReactNode } from 'react';

import { IconButton, ListItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { IEntity } from '../../interfaces';
import { HasUpdateState } from '../../utils/shared';

/**
 * @param {value=} value => generic value
 */
export interface ICostumListItemProps<T extends IEntity> {
  /** JSX.Element contet that is going to be wrapped inside */
  children: ReactNode;
  /** generic item that extends IEntity */
  value: T;
  /** Custom Action that is executed for deleting the item */
  handleOnDelete: (value: T) => void;
}

/** Wrapping the @mui/material list item */
export default function CostumListItem<T extends IEntity>({ children, value, handleOnDelete }: ICostumListItemProps<T>): JSX.Element {
    
  /** an existing entity already exists as an entry in a db therefore has a valid id.
   * an empty id is used as an item in a list to create a new entry
   */
  const isExistingEntity = (value: T) => HasUpdateState(value);
  const handleDeletion = () => handleOnDelete(value);

  if (!isExistingEntity(value)) return <ListItem dense={true}>{children}</ListItem>;
  return (
    <ListItem
      dense={true}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={handleDeletion}>
          <DeleteIcon />
        </IconButton>
      }
    >
      {children}
    </ListItem>
  );
}
