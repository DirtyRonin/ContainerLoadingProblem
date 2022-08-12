import React, { useMemo, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import { Cargo } from '../../models';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  SelectCargoListState,
  UpdateCargo,
  CreateCargo,
  SelectCargoState,
  SelectOrderListState,
} from '../../store/slices';
import { GetEditStatus } from '../../utils/shared';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

export default function CargoDetails() {
  const dispatch = useAppDispatch();

  const { loading: loadingCargoState } = useAppSelector(SelectCargoState);
  const { selectedCargo } = useAppSelector(SelectCargoListState);
  const { selectedOrderId } = useAppSelector(SelectOrderListState);

  const [id, setId] = useState(0);
  const [orderId, setOrderId] = useState(0);
  const [truckId, setTruckId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [isStackable, setIsStackable] = useState(false);
  const [height, setHeight] = useState(0);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [name, setName] = useState('');
  const [weight, setWeight] = useState(0);

  const memoizedSelectedCargo = useMemo(() => (selectedCargo.id > 0 ? selectedCargo : Cargo.AsInitializeDefault()), [selectedCargo]);

  useEffect(() => {
    const tempCargo = memoizedSelectedCargo;

    setId(tempCargo.id);
    setOrderId(tempCargo.orderId);
    setTruckId(tempCargo.truckId)
    setQuantity(tempCargo.quantity);
    setIsStackable(tempCargo.isStackable);
    setHeight(tempCargo.height);
    setLength(tempCargo.length);
    setWidth(tempCargo.width);
    setName(tempCargo.name);
    setWeight(tempCargo.weight);
  }, [memoizedSelectedCargo]);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setName(event.target.value);
  };
  const handleChangeLength = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setLength(+event.target.value);
  };
  const handleChangeWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setWidth(+event.target.value);
  };
  const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setQuantity(+event.target.value);
  };
  const handleChangeHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setHeight(+event.target.value);
  };
  const handleChangeWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setWeight(+event.target.value);
  };
  const handleChangeStackable = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setIsStackable(checked);
  };

  const editStatus = GetEditStatus(id);

  const handleClickSubmit = () => {
    const newCargo = new Cargo(id, truckId, orderId, name, width, length, weight, quantity, isStackable, height);

    console.log(newCargo);
    if (editStatus === 'Create') {
      dispatch(CreateCargo(newCargo));
      return;
    }

    dispatch(UpdateCargo(newCargo));
  };

  // TODO: Template for palletes
  // const getKeyValue = (singleGoods: IGoods) => ({ key: singleGoods.name, value: singleGoods.id });
  // const getGoodsAsKeyValues = (values: IGoods[]) => values.map((_, index, []) => getKeyValue(_));

  // const renderCustomSelect = () => {
  //   if (goods.length === 0) return <></>;

  //   return (
  //     <div>
  //       <CustomSelect inputLabel="Goods" values={getGoodsAsKeyValues(goods)} setParentId={setGoodsId} selectedId={goodsId} />
  //     </div>
  //   );
  // };

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
        <TextField
          required
          value={name}
          onChange={handleChangeName}
          id="cargo_name"
          label="Name"
          defaultValue={100}
          type="text"
          variant="standard"
        />
        <TextField
          required
          value={length}
          onChange={handleChangeLength}
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
          value={width}
          onChange={handleChangeWidth}
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
          value={height}
          onChange={handleChangeHeight}
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
          value={quantity}
          onChange={handleChangeQuantity}
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
          value={weight}
          onChange={handleChangeWeight}
          id="cargo_weight"
          label="Weight"
          defaultValue={100}
          type="number"
          variant="standard"
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
        />

        <FormGroup>
          <FormControlLabel control={<Checkbox checked={isStackable} onChange={handleChangeStackable} />} label="Is Stackable" />
        </FormGroup>

        <LoadingButton
          disabled={editStatus === 'Create' && selectedOrderId === 0}
          loading={loadingCargoState === 'pending'}
          onClick={handleClickSubmit}
        >
          {editStatus}
        </LoadingButton>
      </Box>
    </>
  );
}
