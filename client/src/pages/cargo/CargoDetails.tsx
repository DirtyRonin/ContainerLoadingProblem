import React, {  useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { SelectCargoListState, UpdateCargo, CreateCargo, SelectCargoState, SelectOrderListState } from '../../store/slices';
import { GetEditStatus, IsStringEmpty } from '../../utils/shared';
import { Checkbox, Typography } from '@mui/material';
import { initializeCargo } from '../../interfaces';

export default function CargoDetails() {
  const dispatch = useAppDispatch();

  const { loading: loadingCargoState, cargos } = useAppSelector(SelectCargoState);
  const { selectedCargoId } = useAppSelector(SelectCargoListState);
  const { selectedOrderId } = useAppSelector(SelectOrderListState);

  const [cargo, setCargo] = useState(initializeCargo({orderId:selectedOrderId}));

  useEffect(() => {
    if (IsStringEmpty(selectedCargoId)) {
      setCargo(initializeCargo({orderId:selectedOrderId}));
      return;
    }

    const foundCargo = cargos.find((x) => x._id === selectedCargoId);

    if (foundCargo === undefined) {
      setCargo(initializeCargo({orderId:selectedOrderId}));
      return;
    }

    setCargo(foundCargo);
  }, [selectedCargoId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setCargo((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  
  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setCargo((prev) => ({ ...prev, [event.target.name]: checked }));
  };

  const editStatus = GetEditStatus(cargo._id);

  const handleClickSubmit = () => {
    if (editStatus === 'Create') {
      dispatch(CreateCargo(cargo));
      return;
    }

    dispatch(UpdateCargo(cargo));
  };

  // TODO: Template for palletes

  return (
    <>
      <Box
        component="form"
        sx={{
          ml: 3,
          mt: 3,
          width: '25ch',
          maxHeight: 400,
          border: '1px black solid',
        }}
        noValidate
        autoComplete="off"
      >
        <TextField required 
          value={cargo.name} 
          name={'name'}
          onChange={handleChange} 
          id="cargo_name" 
          label="Name" 
          defaultValue={100} 
          type="text" 
          variant="standard" />
        <TextField
          required
          value={cargo.length}
          name={'length'}
          onChange={handleChange}
          id="cargo_length"
          label="Length"
          defaultValue={100}
          type="number"
          variant="standard"
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
          }}
        />
        <TextField
          required
          value={cargo.width}
          name={'width'}
          onChange={handleChange}
          id="cargo_width"
          label="Width"
          defaultValue={100}
          type="number"
          variant="standard"
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
          }}
        />

        <TextField
          required
          value={cargo.height}
          name={'height'}
          onChange={handleChange}
          id="cargo_height"
          label="Height"
          defaultValue={100}
          type="number"
          variant="standard"
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
          }}
        />
        <TextField
          required
          value={cargo.quantity}
          name={'quantity'}
          onChange={handleChange}
          id="cargo_quantity"
          label="Quantity"
          defaultValue={100}
          type="number"
          variant="standard"
          InputProps={{
            endAdornment: <InputAdornment position="end">X</InputAdornment>,
          }}
        />
        <TextField
          required
          value={cargo.weight}
          name={'weight'}
          onChange={handleChange}
          id="cargo_weight"
          label="Weight"
          defaultValue={100}
          type="number"
          variant="standard"
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
        />
        <Checkbox name={'isStackable'} checked={cargo.isStackable} onChange={handleChangeChecked} />
        <Typography variant="caption">Is Stackable</Typography>
        <br/>

        <LoadingButton
          disabled={editStatus === 'Create' && IsStringEmpty(selectedOrderId)}
          loading={loadingCargoState === 'pending'}
          onClick={handleClickSubmit}
        >
          {editStatus}
        </LoadingButton>
      </Box>
    </>
  );
}
