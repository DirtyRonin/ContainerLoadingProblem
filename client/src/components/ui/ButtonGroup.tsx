import { LoadingButton, loadingButtonClasses } from '@mui/lab';
import { Button, ButtonGroup } from '@mui/material';
import React, { useState } from 'react';
import { IAsyncRequest, initialAsyncRequest } from '../../interfaces/IAsyncRequest';

interface IProps<T> {
  onReset: () => void;
  onCancel: () => void;
  onSave: (value: T) => void;
  value: T;
  isLoading: boolean;
}

const buttonGroup = <T extends {}>(props: IProps<T>) => {
  const { onReset, onCancel, onSave, value, isLoading } = props;

  const onSaveClick = () => {
    onSave(value);
  };

  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <LoadingButton variant="contained" loading={isLoading} onClick={onSaveClick}>
        Save
      </LoadingButton>
      <Button onClick={onReset}>Reset</Button>
      <Button onClick={onCancel}>Cancel</Button>
    </ButtonGroup>
  );
};

export default buttonGroup;
