import { IEntity } from '../../interfaces';

export const IsStringEmpty = (value: string | undefined) => {
  if (!value) return true;

  return value.trim().length === 0;
};

export const RemoveObjectProperty = <T extends IEntity>(value: T): Omit<T, '_id'> => {
  const { _id: _, ...newImmutableObject } = value;
  return newImmutableObject;
};
