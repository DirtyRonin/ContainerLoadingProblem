import React, { useState, useEffect } from 'react';
import { TreeItem } from '@mui/lab';
import { Checkbox, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useEffectOnce } from '../../../hooks/useEffectOnce';

import { SelectCargoState } from '../../../store/slices/cargo/CargoSlice';
import { SelectSummaryState, AddSelectedSummary, RemoveSelectedSummary } from '../../../store/slices/summaryTree/summaryTreeSlice';

import { ICargo, ILoadSummary, ITruck } from '../../../interfaces';
import { Cargo } from '../../../models';

interface IProps {
  truckId: number;
  cargoId: number;
}

export default function LoadingCargoTreeItems(props: IProps) {
  const { truckId, cargoId } = props;
  const dispatch = useAppDispatch();
  const { cargos } = useAppSelector(SelectCargoState);
  const { selectedloadSummaries, loadSummaries } = useAppSelector(SelectSummaryState);

  const [thisCargo, setCargo] = useState<ICargo>(Cargo.AsInitializeDefault());
  const [thisSummary, setSummary] = useState<ILoadSummary>({} as ILoadSummary);

  useEffect(() => {
    const cargo = cargos.find((x) => x.id === cargoId);
    if(cargo )setCargo(cargo)

    const selectedSummary = loadSummaries[truckId]?.find((x) => x.cargo.id === cargoId )
    if(selectedSummary) setSummary(selectedSummary)

  }, [cargos,loadSummaries]);

  const onCargoCheckedChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if(checked) {
      dispatch(AddSelectedSummary({truckId,cargoId}))
      return 
    }
    
    dispatch(RemoveSelectedSummary({truckId,cargoId}))
  };

  const isChecked = () => {
    return selectedloadSummaries.find((x) => x.cargoId === cargoId && x.truckId === truckId) ? true : false;
  };

  const treeLabel = () => {
    return (
      <>
        <Checkbox onChange={onCargoCheckedChange} checked={isChecked()} />
        <Typography variant="caption">{`#${thisCargo.singleGoods.name}-${thisCargo.id}`}</Typography>
        <br />
        <Typography variant="caption">{`Required Loading Meter: ${Math.round(thisSummary.loadingMeter)} cm`}</Typography>
      </>
    );
  };

  return (
    <>
      <TreeItem nodeId={`#${thisCargo.singleGoods.name}-${thisCargo.id}`} label={treeLabel()} />
    </>
  );
}
