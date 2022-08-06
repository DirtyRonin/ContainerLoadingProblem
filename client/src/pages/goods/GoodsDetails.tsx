import React, { useMemo, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

import { Goods } from "../../models/Goods";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { SelectGoodsListState,UpdateGoods, CreateGoods, SelectGoodsState } from '../../store/slices/goods';

export const GoodsDetails = () => {
  const dispatch = useAppDispatch();
  const { loading, goods } = useAppSelector(SelectGoodsState);
  const { selectedGoodsId } = useAppSelector(SelectGoodsListState);

  const [name, setName] = useState("");
  const [width, setWidth] = useState(100);
  const [length, setLength] = useState(100);

  const memoizedSelectedGoods = useMemo(
    () =>
    goods.find((x) => x.id === selectedGoodsId) ??
      Goods.AsSuperHeavy("Create New Super Heavy Goods"),
    [selectedGoodsId, goods]
  );

  useEffect(() => {
    const newGoods = memoizedSelectedGoods;

    setName(newGoods.name);
    setWidth(newGoods.width);
    setLength(newGoods.length);
  }, [memoizedSelectedGoods]);

  const handleChangeName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  const IsUpdate = (id: number) => (id < 1 ? false : true);

  const handleClickSubmit = () => {
    const newGoods = new Goods(
      selectedGoodsId,
      name,
      width,
      length);

    if (IsUpdate(selectedGoodsId)) {
      dispatch(UpdateGoods(newGoods));
      return;
    }
    dispatch(CreateGoods(newGoods));
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
            value={name}
            onChange={handleChangeName}
            id="goods_name"
            label="Name"
            placeholder="Name"
            variant="standard"
          />
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
          <LoadingButton
            loading={loading === "pending"}
            onClick={handleClickSubmit}
          >
            {IsUpdate(selectedGoodsId) ? "update" : "add"}
          </LoadingButton>
        </div>
      </Box>
    </>
  );
};
