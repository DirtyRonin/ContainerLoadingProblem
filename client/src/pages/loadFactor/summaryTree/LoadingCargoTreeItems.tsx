import React, { useState, useEffect } from 'react';
import { TreeItem } from '@mui/lab';
import { Checkbox, Typography } from '@mui/material';

// import { useAppDispatch, useAppSelector } from '../../../store/hooks';

// import { SelectCargoState } from '../../../store/slices/cargo/CargoSlice';
// import { SelectSummaryState, AddSelectedSummary, RemoveSelectedSummary } from '../../../store/slices/summaryTree/summaryTreeSlice';

import { ICargo, ILoadSummary } from '../../../interfaces';
import { Cargo } from '../../../models';

import loadAnalyzerContext from '../contexts/LoadAnalyzerContext';
interface IProps {
  truckId: number;
  cargoId: number;
  orderId: number;
}

export default function LoadingCargoTreeItems(props: IProps) {
  const { truckId, cargoId, orderId } = props;

  const { selectedLoadSummaryIds, loadSummaries, addSelectedLoadSummaryIds, removeSelectedLoadSummaryIds } = loadAnalyzerContext();

  // const dispatch = useAppDispatch();
  // const { cargos } = useAppSelector(SelectCargoState);
  // const { selectedloadSummaries, loadSummaries } = useAppSelector(SelectSummaryState);

  const [thisCargo, setCargo] = useState<ICargo>(Cargo.AsInitializeDefault());
  const [thisSummary, setSummary] = useState<ILoadSummary>({} as ILoadSummary);

  useEffect(() => {
    // const cargo = cargos.find((x) => x.id === cargoId);
    // if (cargo) setCargo(cargo);

    const selectedSummary = loadSummaries.find((x) => x.key === truckId)?.values.find((x) => x.cargo.id === cargoId);
    if (selectedSummary) setSummary(selectedSummary);
  }, [loadSummaries]);

  const onCargoCheckedChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked) {
      addSelectedLoadSummaryIds({ truckId, cargoId, orderId });
      return;
    }

    removeSelectedLoadSummaryIds({ truckId, cargoId, orderId });
  };

  const isChecked = () => {
    return selectedLoadSummaryIds.find((x) => x.cargoId === cargoId && x.truckId === truckId) ? true : false;
  };

  const treeLabel = () => {
    return (
      <>
        <Checkbox onChange={onCargoCheckedChange} checked={isChecked()} />
        <Typography variant="caption">{`#${thisCargo.name}-${thisCargo.id}`}</Typography>
        <br />
        <Typography variant="caption">{`Required Loading Meter: ${Math.round(thisSummary.loadingMeter)} cm`}</Typography>
      </>
    );
  };

  return (
    <>
      <TreeItem nodeId={`#${thisCargo.name}-${thisCargo.id}`} label={treeLabel()} />
    </>
  );
}
