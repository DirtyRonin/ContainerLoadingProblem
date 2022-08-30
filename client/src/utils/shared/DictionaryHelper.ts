import { KeyValueLoadSummary } from '../../models';

export const GetValueById = (key: number, summaries: KeyValueLoadSummary[]): KeyValueLoadSummary | undefined => {
  if (summaries.length === 0) return { key, values: [] };

  return summaries.find((x) => x.key === key);
};
export const IsContainingKey = (key: number, summaries: KeyValueLoadSummary[]): boolean => (summaries.find((x) => x.key === key) === undefined ? false : true);

/** A load summary represents one set of cargo */
export const FilterAvailableLoadSummariesByUnavailableCargoIds = (unavailableCargoIds: number[], summaries: KeyValueLoadSummary[]): KeyValueLoadSummary[] =>
  summaries.reduce<KeyValueLoadSummary[]>((prev, current) => {
    const remainingLoadSummaries = current.values.filter((summary) => !unavailableCargoIds.includes(summary.cargoId));

    if (remainingLoadSummaries.length > 0) prev.push({ key: current.key, values: remainingLoadSummaries });

    return prev;
  }, []);
