import React, { useState, useEffect } from 'react';
import { TreeItem } from '@mui/lab';
import { Checkbox, Typography } from '@mui/material';

import { ICargo, ILoadSummary, initializeCargo } from '../../../interfaces';

import loadAnalyzerContext from '../contexts/LoadAnalyzerContext';
import { GetValueById } from '../../../utils/shared/DictionaryHelper';
interface IProps {
  truckId: number;
  cargoId: number;
  orderId: number;
  cargo: ICargo;
}

export default function LoadingCargoTreeItems(props: IProps) {
  const { truckId, cargoId, orderId, cargo } = props;

  const { selectedLoadSummaryIds, loadSummaries, addSelectedLoadSummaryIds, removeSelectedLoadSummaryIds } = loadAnalyzerContext();

  const [thisCargo, setCargo] = useState<ICargo>(initializeCargo());
  const [thisSummary, setSummary] = useState<ILoadSummary | null>(null);
  const [isDisabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    setCargo(cargo);
  }, []);

  useEffect(() => {
    // const cargo = cargos.find((x) => x.id === cargoId);
    // if (cargo) setCargo(cargo);

    const loadSummariesByTruckId = GetValueById(truckId, loadSummaries.value);

    if (loadSummariesByTruckId === undefined) {
      setSummary(null);
      return;
    }

    const summary = loadSummariesByTruckId.values.find((x) => x.cargoId === cargoId);
    if (summary === undefined) {
      setSummary(null);
      return;
    }
    setSummary(summary);
  }, [loadSummaries]);

  useEffect(() => {
    const isThisCargoSelected = selectedLoadSummaryIds.find((x) => x.cargoId === cargoId);

    if (isThisCargoSelected === undefined) {
      setDisabled(false);
      return;
    }
    if (isThisCargoSelected.truckId === truckId) {
      setDisabled(false);
      return;
    }
    setDisabled(true);
  }, [selectedLoadSummaryIds]);

  const onCargoCheckedChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked) addSelectedLoadSummaryIds({ truckId, cargoId, orderId });
    else removeSelectedLoadSummaryIds({ truckId, cargoId, orderId });
  };

  const hasSummary = () => thisSummary === null;

  const isChecked = () => {
    return selectedLoadSummaryIds.find((x) => x.cargoId === cargoId && x.truckId === truckId) ? true : false;
  };

  const treeLabel = () => {
    return (
      <>
        <Checkbox onChange={onCargoCheckedChange} checked={isChecked()} disabled={isDisabled} />
        <Typography variant="caption">{`#${thisCargo.name}-${thisCargo.id}`}</Typography>
        <br />
        {hasSummary() ? <></> : <Typography variant="caption">{`Required Loading Meter: ${Math.round(thisSummary!.loadingMeter)} cm`}</Typography>}
      </>
    );
  };

  return (
    <>
      <TreeItem nodeId={`#${thisCargo.name}-${thisCargo.id}`} label={treeLabel()} />
    </>
  );
}
