import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { UpdateRoute, CreateRoute, SelectRouteState } from './slices/RouteSlice';
import { IsStringEmpty } from '../../utils/shared';
import { initializeRoute, IRoute } from '../../interfaces';
import { nameof } from 'ts-simple-nameof';

const FROM = nameof<IRoute>((x) => x.from);
const TO = nameof<IRoute>((x) => x.to);

const RouteDetails = () => {
  const dispatch = useAppDispatch();
  const { routes, selectedRouteId } = useAppSelector(SelectRouteState);
  const [route, setRoute] = useState(initializeRoute());

  useEffect(() => {
    if (IsStringEmpty(selectedRouteId)) {
      setRoute(initializeRoute());
      return;
    }

    const foundRoute = routes.value.find((x) => x._id === selectedRouteId);
    if (foundRoute === undefined) {
      setRoute(initializeRoute());
      return;
    }

    setRoute(foundRoute);
  }, [selectedRouteId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setRoute((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const IsUpdate = (id: string) => !IsStringEmpty(id);

  const handleClickSubmit = () => {
    if (IsUpdate(selectedRouteId)) {
      dispatch(UpdateRoute(route));
      return;
    }
    dispatch(CreateRoute(route));
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
          broute: '1px black solid',
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            name={FROM}
            value={route.from}
            onChange={handleChange}
            id={`route.${FROM}`}
            label={FROM.toUpperCase()}
            placeholder={FROM.toUpperCase()}
            variant="standard"
          />
        </div>
        <div>
          <TextField
            required
            name={TO}
            value={route.to}
            onChange={handleChange}
            id={`route.${TO}`}
            label={TO.toUpperCase()}
            placeholder={TO.toUpperCase()}
            variant="standard"
          />
        </div>
        <div>
          <LoadingButton loading={routes.status === 'pending'} onClick={handleClickSubmit}>
            {IsUpdate(selectedRouteId) ? 'update' : 'add'}
          </LoadingButton>
        </div>
      </Box>
    </>
  );
};

export default RouteDetails;
