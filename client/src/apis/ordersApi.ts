import { IOrder } from "../interfaces";
import api from "./baseApi";

const apiName = "orders";

const FetchOrder = async (): Promise<IOrder[]> => {
  const result = await api().get(apiName);
  return result.data;
};
const FetchOrderById = async (id: number): Promise<IOrder> => {
  const result = await api().get(`${apiName}/${id}`);
  return result.data;
};
const CreateOrder = async (order: IOrder): Promise<IOrder> => {
  const result = await api().post(`${apiName}`, order);
  return result.data;
};
const UpdateOrder = async (order: IOrder): Promise<IOrder> => {
  const result = await api().put(`${apiName}`, order);
  return result.data;
};
const DeleteOrder = async (id: number): Promise<number> => {
  const result = await api().delete(`${apiName}/${id}`);
  return result.data;
};

export const OrderApi = {
  FetchOrder,
  FetchOrderById,
  CreateOrder,
  UpdateOrder,
  DeleteOrder,
};
