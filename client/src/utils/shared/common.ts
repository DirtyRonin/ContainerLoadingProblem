import { result } from 'lodash';
import { IEntity } from '../../interfaces';

export const IsStringEmpty = (value: string | undefined) => {
  if (!value) return true;

  return value.trim().length === 0;
};

export const AreArraysEqual = (a: IEntity[], b: IEntity[]): boolean => {
  if (a.length !== b.length) return false;

  const values = [[...a], [...b]];
  values.forEach((x) => x.some((_) => _._id));
  values[0].every((entry, index) => entry._id === values[1][index]._id);

  return true;
};

/** Element from b is missing in a */
export const GetDeltas = <T extends IEntity>(a: T[], b: T[]): T[] => {

  const results = b.reduce<T[]>((prev, current) => {
    if (a.find(_ => _._id === current._id)) return prev;

    return [...prev, current];
  }, []);

  return results;
};

export const RemoveObjectProperty = <T extends IEntity>(value: T): Omit<T, '_id'> => {
  const { _id: _, ...newImmutableObject } = value;
  return newImmutableObject;
};
