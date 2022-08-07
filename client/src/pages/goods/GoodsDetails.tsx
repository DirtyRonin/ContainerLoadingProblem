import React, { useMemo, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import { Goods } from '../../models/Goods';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { SelectGoodsListState, UpdateGoods, CreateGoods, SelectGoodsState } from '../../store/slices/goods';
import { GetEditStatus } from '../../utils/shared';

export const GoodsDetails = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(SelectGoodsState);
  const { selectedSingleGoods } = useAppSelector(SelectGoodsListState);

  const [id, setId] = useState(-1);
  const [name, setName] = useState('');
  const [width, setWidth] = useState(100);
  const [length, setLength] = useState(100);
  const [isReadonly, setIsReadonly] = useState(true);

  const memoizedSelectedGoods = useMemo(
    () => (selectedSingleGoods.id > 0 ? selectedSingleGoods : Goods.AsSuperHeavy('Create New Super Heavy Goods')),
    [selectedSingleGoods]
  );

  useEffect(() => {
    const newGoods = memoizedSelectedGoods;

    setId(newGoods.id)
    setName(newGoods.name);
    setWidth(newGoods.width);
    setLength(newGoods.length);
    setIsReadonly(newGoods.isReadonly)
  }, [memoizedSelectedGoods]);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (event.target.value) setName(event.target.value);
  };
  const handleChangeWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setWidth(+event.target.value);
  };
  const handleChangeLength = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setLength(+event.target.value);
  };

  const editStatus = GetEditStatus(id,isReadonly);

  const handleClickSubmit = () => {
    
    if(editStatus === 'Readonly') return;
    
    const newGoods = new Goods(id, name, width, length, isReadonly);

    if (editStatus === 'Create') {
      dispatch(CreateGoods(newGoods));
      return;
    }

    dispatch(UpdateGoods(newGoods));
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
          <TextField required value={name} onChange={handleChangeName} id="goods_name" label="Name" placeholder="Name" variant="standard" />
        </div>
        <div>
          <TextField
            required
            value={width}
            onChange={handleChangeWidth}
            id="goods_width"
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
            id="goods_length"
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
          <LoadingButton loading={loading === 'pending'} onClick={handleClickSubmit} disabled={editStatus === 'Readonly'}>
            {editStatus}
          </LoadingButton>
        </div>
      </Box>
    </>
  );
};
