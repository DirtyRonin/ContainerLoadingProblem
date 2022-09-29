import React, { useState, useEffect } from 'react';
import { TreeItem } from '@mui/lab';
import { Checkbox, Typography } from '@mui/material';

import { ICargo, ILoadSummary, initializeCargo, initializePopulatedCargo, IPopulatedCargo } from '../../../interfaces';

import { GetValueById } from '../../../utils/shared/DictionaryHelper';

import { addSelectedLoadSummaryIds, removeSelectedLoadSummaryIds, SelectLoadAnalyzerState } from '../slice/LoadAnalyzerSlice';
import { useAppDispatch, useAppSelector } from '../../../store';
import { ILoadSummaryIds } from '../../../interfaces/ILoadSummaryIds';
interface IProps {
  loadSummaryIds: ILoadSummaryIds;
  cargo: IPopulatedCargo;
}

interface IState {
  /** current domain */
  cargo: IPopulatedCargo;
  /** loading meter calculation
   * @return Is false when no load summary is not valid
   */
  summary: ILoadSummary | false;
  /** is assigned in db */
  isCargoAssignedInCloud: boolean;
  /** is assigned in local instance
   * If isCargoAssignedInCloud is true, this can never be false */
  isCargoAssigned: boolean;
}

export default function LoadingCargoTreeItems(props: IProps) {
  const { loadSummaryIds, cargo } = props;

  const dispatchGlobal = useAppDispatch();
  const { selectedLoadSummaryIds, loadSummaries, selectedRouteId } = useAppSelector(SelectLoadAnalyzerState);

  // const {  addSelectedLoadSummaryIds, removeSelectedLoadSummaryIds } = loadAnalyzerContext();

  // const [thisCargo, setCargo] = useState<IPopulatedCargo>(initializePopulatedCargo());
  // const [thisSummary, setSummary] = useState<ILoadSummary | false>(false);
  // const [isDisabled, setDisabled] = useState<boolean>(true);

  const [state, dispatchLocal] = useState<IState>({
    cargo: initializePopulatedCargo(),
    summary: false,
    isCargoAssignedInCloud: false,
    isCargoAssigned: false,
  });

  /** on init */
  useEffect(() => {
    
   

    const isAssigned = IsCargoAssigned(cargo, loadSummaryIds);

    dispatchLocal((prev) => ({
      ...prev,
      cargo,
      isCargoAssignedInCloud: isAssigned,
      isCargoAssigned: isAssigned,
    }));
  }, []);

  useEffect(() => {
    const loadSummariesByTruckId = GetValueById(loadSummaryIds.truckId, loadSummaries.value);

    if (loadSummariesByTruckId === undefined) {
      dispatchLocal((prev) => ({ ...prev, summary: false }));
      return;
    }

    const summary = loadSummariesByTruckId.values.find((x) => x.cargoId === loadSummaryIds.cargoId);
    if (summary === undefined) {
      dispatchLocal((prev) => ({ ...prev, summary: false }));
      return;
    }

    dispatchLocal((prev) => ({ ...prev, summary }));
  }, [loadSummaries]);

  /**
   * Check whenever a tree node is selected the if this cargo is assigned to a truck
   * update the status of the other opened nodes*/
  useEffect(() => {
    /** if true, the cargo is assigned (in the db) */
    if (IsCargoAssigned(cargo,loadSummaryIds)) return;

    const isThisCargoSelected = selectedLoadSummaryIds.find((x) => x.cargoId === loadSummaryIds.cargoId);
    if (isThisCargoSelected === undefined) {
      dispatchLocal((prev) => ({ ...prev, isCargoAssigned: false }));
      return;
    }
    if (isThisCargoSelected.truckId === loadSummaryIds.truckId) {
      dispatchLocal((prev) => ({ ...prev, isCargoAssigned: false }));
      return;
    }

    dispatchLocal((prev) => ({ ...prev, isCargoAssigned: true }));
  }, [selectedLoadSummaryIds]);

  const onCargoCheckedChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked) dispatchGlobal(addSelectedLoadSummaryIds(loadSummaryIds));
    else dispatchGlobal(removeSelectedLoadSummaryIds(loadSummaryIds));
  };

   /** Is true when cargo is assigned to a truck and a route */
   const IsCargoAssigned = (cargo: IPopulatedCargo, summaryIds: ILoadSummaryIds) => {
    if (cargo.truckLoadings.length !== 1) return false;

    if (cargo.truckLoadings[0]._id === summaryIds._id) return false;

    return true;
  };

  const isChecked = () => (selectedLoadSummaryIds.find((x) => x.cargoId === loadSummaryIds.cargoId && x.truckId === loadSummaryIds.truckId) ? true : false);

  const treeLabel = () => {
    return (
      <>
        <Checkbox onChange={onCargoCheckedChange} checked={isChecked()} disabled={state.isCargoAssigned} />
        <Typography variant="caption">{`#${state.cargo.name}-${state.cargo._id}`}</Typography>
        <br />
        {!state.summary ? <></> : <Typography variant="caption">{`Required Loading Meter: ${Math.round(state.summary.loadingMeter)} cm`}</Typography>}
      </>
    );
  };

  return (
    <>
      <TreeItem nodeId={`#${state.cargo.name}-${state.cargo._id}`} label={treeLabel()} />
    </>
  );
}
