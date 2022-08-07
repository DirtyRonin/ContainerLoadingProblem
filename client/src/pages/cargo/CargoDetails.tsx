import React, { useMemo, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import { Cargo, Goods } from '../../models';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  SelectCargoListState,
  UpdateCargo,
  CreateCargo,
  SelectCargoState,
  FetchAllGoods,
  SelectGoodsState,
  SelectOrderListState,
} from '../../store/slices';
import { GetEditStatus } from '../../utils/shared';
import { IGoods } from '../../interfaces';
import CustomSelect from '../../components/ui/select/CustomSelect';
import { useEffectOnce } from '../../hooks/useEffectOnce';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

export default function CargoDetails() {
  const dispatch = useAppDispatch();

  const { loading: loadingCargoState } = useAppSelector(SelectCargoState);
  const { selectedCargo } = useAppSelector(SelectCargoListState);
  const { selectedOrderId } = useAppSelector(SelectOrderListState);
  const { goods, loading: loadingGoodsState } = useAppSelector(SelectGoodsState);
  const [id, setId] = useState(0);
  const [goodsId, setGoodsId] = useState(0);
  const [orderId, setOrderId] = useState(0);
  const [singleGoods, setSingleGoods] = useState<IGoods>(Goods.AsInitializeDefault('Empty Crate'));
  const [quantity, setQuantity] = useState(0);
  const [isStackable, setIsStackable] = useState(false);
  const [height, setHeight] = useState(0);

  const memoizedSelectedCargo = useMemo(() => (selectedCargo.id > 0 ? selectedCargo : Cargo.AsInitializeDefault()), [selectedCargo]);

  useEffectOnce(() => {
    if (loadingGoodsState !== 'idle') return;

    dispatch(FetchAllGoods());
  });

  useEffect(() => {
    const tempCargo = memoizedSelectedCargo;

    setId(tempCargo.id);
    setGoodsId(tempCargo.goodsId);
    setOrderId(tempCargo.orderId);
    setSingleGoods(tempCargo.singleGoods);
    setQuantity(tempCargo.quantity);
    setIsStackable(tempCargo.isStackable);
    setHeight(tempCargo.height);
  }, [memoizedSelectedCargo]);

  const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setQuantity(+event.target.value);
  };
  const handleChangeHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setHeight(+event.target.value);
  };
  const handleChangeStackable = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setIsStackable(checked);
  };

  const editStatus = GetEditStatus(id);

  const handleClickSubmit = () => {
    const newCargo = new Cargo(id, goodsId, orderId > 0 ? orderId : selectedOrderId, singleGoods, quantity, isStackable, height);

    console.log(newCargo);
    if (editStatus === 'Create') {
      dispatch(CreateCargo(newCargo));
      return;
    }

    dispatch(UpdateCargo(newCargo));
  };

  const getKeyValue = (singleGoods: IGoods) => ({ key: singleGoods.name, value: singleGoods.id });
  const getGoodsAsKeyValues = (values: IGoods[]) => values.map((_, index, []) => getKeyValue(_));

  const renderCustomSelect = () => {
    if (goods.length === 0) return <></>;

    return (
      <div>
        <CustomSelect inputLabel="Goods" values={getGoodsAsKeyValues(goods)} setParentId={setGoodsId} selectedId={goodsId} />
      </div>
    );
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
        {renderCustomSelect()}

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

        <FormGroup>
          <FormControlLabel control={<Checkbox checked={isStackable} onChange={handleChangeStackable} />} label="Is Stackable" />
        </FormGroup>

        <LoadingButton disabled={editStatus === 'Create' && selectedOrderId === 0} loading={loadingCargoState === 'pending'} onClick={handleClickSubmit}>
          {editStatus}
        </LoadingButton>
      </Box>
    </>
  );
}
