import { KeyValueLoadSummary } from '../../models';

export const GetValueById = (key: number, summaries: KeyValueLoadSummary[]): KeyValueLoadSummary | undefined => summaries.find((x) => x.key === key);

export const RemoveLoadSummariesByCargoId = (cargoIds: number[], summaries: KeyValueLoadSummary[]): KeyValueLoadSummary[] =>
  summaries.reduce<KeyValueLoadSummary[]>((prev, current) => {
    const remainingLoadSummaries = current.values.filter((summary) => !cargoIds.includes(summary.cargo.id));

    if (remainingLoadSummaries.length > 0) prev.push({ key: current.key, values: remainingLoadSummaries });

    return prev;
  }, []);
