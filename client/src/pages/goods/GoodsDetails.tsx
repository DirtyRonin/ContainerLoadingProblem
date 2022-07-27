import React, { useMemo, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

import { Goods } from "../../models/Goods";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { UpdateGoods, CreateGoods, SelectGoodsState } from "./slices/GoodsSlice";
import { SelectGoodsListState } from "./slices/GoodsListSlice";

export const GoodsDetails = () => {
  const dispatch = useAppDispatch();
  const { loading, goods } = useAppSelector(SelectGoodsState);
  const { selectedGoodsId } = useAppSelector(SelectGoodsListState);

  const [name, setName] = useState("");
  const [height, setHeight] = useState(100);
  const [width, setWidth] = useState(100);
  const [length, setLength] = useState(100);
  const [weight, setWeight] = useState(100);
  const [quantity, setQuantity] = useState(100);

  const memoizedSelectedGoods = useMemo(
    () =>
    goods.find((x) => x.id === selectedGoodsId) ??
      Goods.AsDefault("Create New Goods"),
    [selectedGoodsId, goods]
  );

  useEffect(() => {
    const newGoods = memoizedSelectedGoods;

    setName(newGoods.name);
    setHeight(newGoods.height);
    setWidth(newGoods.width);
    setLength(newGoods.length);
    setWeight(newGoods.weight);
    setQuantity(newGoods.quantity ?? 25);
  }, [memoizedSelectedGoods]);

  const handleChangeName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    if (event.target.value) setName(event.target.value);
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
  const handleChangeWeight = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setWeight(+event.target.value);
  };
  const handleChangeQuantity = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setQuantity(+event.target.value);
  };


  const IsUpdate = (id: number) => (id < 1 ? false : true);

  const handleClickSubmit = () => {
    const newGoods = new Goods(
      selectedGoodsId,
      name,
      height,
      width,
      length,
      weight,
      quantity,
    );

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
            value={height}
            onChange={handleChangeHeight}
            id="goods_height"
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
          <TextField
            required
            value={weight}
            onChange={handleChangeWeight}
            id="goods_weight"
            label="Weight"
            defaultValue={100}
            type="number"
            variant="standard"
            InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            }}
          />
        </div>
        {/* TODO: dieser Wert wird derzeit noch manuell gesetzt. Er kommt erst mit der Klasse Order */}
        <div>
          <TextField
            required
            value={quantity}
            onChange={handleChangeQuantity}
            id="goods_quantity"
            label="Quantity Not By DB"
            defaultValue={100}
            type="number"
            variant="standard"
            
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
