import { ICargo, IOrder } from '../interfaces';
import { RemoveObjectProperty } from '../utils/shared';
import api from './baseApi';

const apiName = 'orders';
const filterCargoByOrderIds = 'filterCargoByOrderIds';

const FetchOrder = async (): Promise<IOrder[]> => {
  const result = await api().get(apiName);
  return result.data;
};
const FilterOrderById = async (id: string): Promise<IOrder> => {
  const result = await api().get(`${apiName}/${id}`);
  return result.data;
};
const FilterCargosByOrderIds = async (orderIds: string[]): Promise<ICargo[]> => {
  const orders = await FilterOrdersByIds(orderIds);

  //reduce all cargos to one array
  return orders.map((x) => x.cargos).reduce((prev, current) => prev.concat(current), []);
};
const CreateOrder = async (order: IOrder): Promise<IOrder> => {
  //remove object key for creat action
  const idlessEntity = RemoveObjectProperty(order);
  const result = await api().post(`${apiName}`, idlessEntity);
  return result.data;
};
const UpdateOrder = async (order: IOrder): Promise<IOrder> => {
  const result = await api().put(`${apiName}`, order);
  return result.data;
};
const DeleteOrder = async (id: string): Promise<string> => {
  const result = await api().delete(`${apiName}/${id}`);
  return result.data;
};
const FilterOrdersByIds = async (ids: string[]): Promise<IOrder[]> => {
  const result = await api().put(`${filterCargoByOrderIds}`, { orderIds: ids });
  return result.data;
};

export const OrderApi = {
  FilterOrdersByIds,
  FetchOrder,
  FilterOrderById,
  CreateOrder,
  UpdateOrder,
  DeleteOrder,
  FilterCargosByOrderIds,
};
