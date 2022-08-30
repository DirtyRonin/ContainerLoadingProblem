import { AsyncStatus } from '../models';

export interface IAsyncRequest<T> {
  status: AsyncStatus;
  value: T;
  error: string;
}

export const initialAsyncRequest = <T>(initial: T): IAsyncRequest<T> => ({
  status: 'idle',
  value: initial,
  error: '',
});
