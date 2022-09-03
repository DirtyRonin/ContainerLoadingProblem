import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { SelectTruckListState, SelectTruckState, UpdateTruck, CreateTruck } from '../../store/slices/truck';
import { IsStringEmpty } from '../../utils/shared';
import { defaultTruck } from '../../interfaces';

export default function TruckDetails() {
  const dispatch = useAppDispatch();
  const { loading, trucks } = useAppSelector(SelectTruckState);
  const { selectedTruckId } = useAppSelector(SelectTruckListState);

  const [truck, setTruck] = useState(defaultTruck());

  useEffect(() => {
    if (IsStringEmpty(selectedTruckId)) {
      setTruck(defaultTruck())
      return;
    }

    const foundTruck = trucks.find((x) => x._id === selectedTruckId);

    if (foundTruck === undefined) {
      setTruck(defaultTruck())
      return;
    }

    setTruck(foundTruck);
  }, [selectedTruckId, trucks]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

     setTruck((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  

  const IsUpdate = (id: string) => !IsStringEmpty(id);

  const handleClickSubmit = () => {

    if (IsUpdate(selectedTruckId)) {
      dispatch(UpdateTruck(truck));
      return;
    }
    dispatch(CreateTruck(truck));
  };

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
        <div>
          <TextField
            required
            value={truck.vehicleIdentifier}
            name={'vehicleIdentifier'}
            onChange={handleChange}
            id="truck_vehicleIdentifier"
            label="Vehicle Identifier"
            placeholder="Vehicle Identifier"
            variant="standard"
          />
        </div>

        <div>
          <TextField
            required
            value={truck.height}
            name={'height'}
            onChange={handleChange}
            id="truck_height"
            label="Height"
            defaultValue={100}
            type="number"
            variant="standard"
            InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            }}
          />
        </div>
        <div>
          <TextField
            required
            value={truck.width}
            name={'width'}
            onChange={handleChange}
            id="truck_width"
            label="Width"
            defaultValue={100}
            type="number"
            variant="standard"
            InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            }}
          />
        </div>
        <div>
          <TextField
            required
            value={truck.length}
            name={'length'}
            onChange={handleChange}
            id="truck_length"
            label="Length"
            defaultValue={100}
            type="number"
            variant="standard"
            InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            }}
          />
        </div>
        <div>
          <TextField
            required
            value={truck.maxWeight}
            name={'maxWeight'}
            onChange={handleChange}
            id="truck_maxWeight"
            label="Max Weight"
            defaultValue={100}
            type="number"
            variant="standard"
            InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            }}
          />
        </div>
        <div>
          <TextField
            required
            value={truck.loadingTime}
            name={'loadingTime'}
            onChange={handleChange}
            id="truck_loadingTime"
            label="Loading Time"
            defaultValue={100}
            type="number"
            variant="standard"
            InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            }}
          />
        </div>
        <div>
          <TextField
            required
            value={truck.dischargeTime}
            name={'dischargeTime'}
            onChange={handleChange}
            id="truck_dischargeTime"
            label="Discharge Time"
            defaultValue={100}
            type="number"
            variant="standard"
            InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            }}
          />
        </div>
        <div>
          <LoadingButton loading={loading === 'pending'} onClick={handleClickSubmit}>
            {IsUpdate(selectedTruckId) ? 'update' : 'add'}
          </LoadingButton>
        </div>
      </Box>
    </>
  );
}
