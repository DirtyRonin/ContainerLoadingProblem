import React, { useMemo, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

import { Truck } from "../../models/Truck";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { UpdateTruck, CreateTruck, SelectTruckState } from "./TruckSlice";
import { SelectTruckListState } from "./TruckListSlice";

export const TruckDetails = () => {
  const dispatch = useAppDispatch();
  const { loading, trucks } = useAppSelector(SelectTruckState);
  const { selectedTruckId } = useAppSelector(SelectTruckListState);

  const [vehicleIdentifier, setVehicleIdentifier] = useState("");
  const [height, setHeight] = useState(100);
  const [width, setWidth] = useState(100);
  const [length, setLength] = useState(100);
  const [maxWeight, setMaxWeight] = useState(100);
  const [loadingTime, setLoadingTime] = useState(100);
  const [dischargeTime, setDischargeTime] = useState(100);

  const memoizedSelectedTruck = useMemo(
    () =>
      trucks.find((truck) => truck.id === selectedTruckId) ??
      Truck.As15er("Create New As15er"),
    [selectedTruckId, trucks]
  );

  useEffect(() => {
    const truck = memoizedSelectedTruck;

    setVehicleIdentifier(truck.vehicleIdentifier);
    setHeight(truck.height);
    setWidth(truck.width);
    setLength(truck.length);
    setMaxWeight(truck.maxWeight);
    setLoadingTime(truck.loadingTime);
    setDischargeTime(truck.dischargeTime);
  }, [memoizedSelectedTruck]);

  const handleChangeIdentifier = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    if (event.target.value) setVehicleIdentifier(event.target.value);
  };
  const handleChangeHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setHeight(+event.target.value);
  };
  const handleChangeWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setWidth(+event.target.value);
  };
  const handleChangeLength = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setLength(+event.target.value);
  };
  const handleChangeMaxWeight = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setMaxWeight(+event.target.value);
  };
  const handleChangeLoadingTime = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setLoadingTime(+event.target.value);
  };
  const handleChangeDischargeTime = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setDischargeTime(+event.target.value);
  };

  const IsUpdate = (id: number) => (id < 1 ? false : true);

  const handleClickSubmit = () => {
    const newTruck = new Truck(
      selectedTruckId,
      vehicleIdentifier,
      height,
      width,
      length,
      maxWeight,
      loadingTime,
      dischargeTime
    );

    if (IsUpdate(selectedTruckId)) {
      dispatch(UpdateTruck(newTruck));
      return;
    }
    dispatch(CreateTruck(newTruck));
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          ml: 3,
          mt: 3,
          width: "25ch",
          maxHeight: 400,
          border: "1px black solid",
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            value={vehicleIdentifier}
            onChange={handleChangeIdentifier}
            id="truck_vehicleIdentifier"
            label="Vehicle Identifier"
            placeholder="Vehicle Identifier"
            variant="standard"
          />
        </div>

        <div>
          <TextField
            required
            value={height}
            onChange={handleChangeHeight}
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
            value={width}
            onChange={handleChangeWidth}
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
            value={length}
            onChange={handleChangeLength}
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
            value={maxWeight}
            onChange={handleChangeMaxWeight}
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
            value={loadingTime}
            onChange={handleChangeLoadingTime}
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
            value={dischargeTime}
            onChange={handleChangeDischargeTime}
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
          <LoadingButton
            loading={loading === "pending"}
            onClick={handleClickSubmit}
          >
            {IsUpdate(selectedTruckId) ? "update" : "add"}
          </LoadingButton>
        </div>
      </Box>
    </>
  );
};
