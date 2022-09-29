import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type KeyValue = {
  key: string;
  value: number;
};

interface IProps {
  values: KeyValue[];
  selectedId: number;
  inputLabel: string;
  setParentId(id: number): void;
}

export default function CustomSelect(props: IProps) {
  const { values, inputLabel, selectedId, setParentId } = props;

  const handleChange = (event: SelectChangeEvent) => {
    setParentId(+event.target.value);
  };

  const getMenuItems = () =>
    values.reduce(
      (prev, current) => {
        prev.push(<MenuItem value={current.value}>{current.key}</MenuItem>);
        return prev;
      },
      [
        <MenuItem value="">
          <em>None</em>
        </MenuItem>,
      ]
    );

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={`${inputLabel}-select-label`}>{inputLabel}</InputLabel>
        <Select
          labelId={`${inputLabel}-select`}
          id={`${inputLabel}-custom-select`}
          value={selectedId.toString()}
          label={inputLabel}
          onChange={handleChange}
        >
          {getMenuItems()}
        </Select>
      </FormControl>
    </Box>
  );
}
