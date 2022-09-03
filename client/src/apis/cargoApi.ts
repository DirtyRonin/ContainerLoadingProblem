import { ICargo } from '../interfaces';
import { RemoveObjectProperty } from '../utils/shared';
import api from './baseApi';

const apiName = 'cargos';
const filteredByOrderId = 'filterCargoByOrderId';
const filterCargoByOrderIds = 'filterCargoByOrderIds';

const FetchCargo = async (): Promise<ICargo[]> => {
  const result = await api().get(apiName);
  return result.data;
};
const FetchCargoById = async (id: string): Promise<ICargo> => {
  const result = await api().get(`${apiName}/${id}`);
  return result.data;
};
const CreateCargo = async (cargo: ICargo): Promise<ICargo> => {
  //remove object key for creat action
  const idlessEntity = RemoveObjectProperty(cargo);
  const result = await api().post(`${apiName}`, idlessEntity);
  return result.data;
};
const UpdateCargo = async (cargo: ICargo): Promise<ICargo> => {
  const result = await api().put(`${apiName}`, cargo);
  return result.data;
};
const DeleteCargo = async (id: string): Promise<string> => {
  const result = await api().delete(`${apiName}/${id}`);
  return result.data;
};
const FilterCargoByOrderId = async (id: string): Promise<ICargo[]> => {
  const result = await api().get(`${apiName}/${filteredByOrderId}/${id}`);
  return result.data;
};
const FilterCargoByOrderIds = async (orderIds: string[]): Promise<ICargo[]> => {
  const result = await api().put(`${apiName}/${filterCargoByOrderIds}`, { orderIds });
  return result.data;
};

export const CargoApi = {
  FetchCargo,
  FilterCargoByOrderId,
  FilterCargoByOrderIds,
  FetchCargoById,
  CreateCargo,
  UpdateCargo,
  DeleteCargo,
};
