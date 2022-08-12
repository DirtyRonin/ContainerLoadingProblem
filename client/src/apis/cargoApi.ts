import { ICargo } from "../interfaces";
import api from "./baseApi";

const apiName = "cargos";
const filteredByOrderId = "filterCargoByOrderId"
const filterCargoByOrderIds = 'filterCargoByOrderIds'

const FetchCargo = async (): Promise<ICargo[]> => {
  const result = await api().get(apiName);
  return result.data;
};
const FetchCargoById = async (id: number): Promise<ICargo> => {
  const result = await api().get(`${apiName}/${id}`);
  return result.data;
};
const CreateCargo = async (cargo: ICargo): Promise<ICargo> => {
  const result = await api().post(`${apiName}`, cargo);
  return result.data;
};
const UpdateCargo = async (cargo: ICargo): Promise<ICargo> => {
  const result = await api().put(`${apiName}`, cargo);
  return result.data;
};
const DeleteCargo = async (id: number): Promise<number> => {
  const result = await api().delete(`${apiName}/${id}`);
  return result.data;
};
const FilterCargoByOrderId = async (id: number): Promise<ICargo[]> => {
  const result = await api().get(`${filteredByOrderId}/${id}`);
  return result.data;
};
const FilterCargoByOrderIds = async (orderIds: number[]): Promise<ICargo[]> => {
  const result = await api().put(`${filterCargoByOrderIds}`,{orderIds});
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
