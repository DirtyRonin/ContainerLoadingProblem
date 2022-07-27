import { ITruck } from "../models/Truck";
import api from "./baseApi";

const apiName = "trucks";

const FetchTrucks = async (): Promise<ITruck[]> => {
  const result = await api().get(apiName);
  return result.data;
};
const FetchTruckById = async (id: number): Promise<ITruck> => {
  const result = await api().get(`${apiName}/${id}`);
  return result.data;
};
const CreateTruck = async (truck: ITruck): Promise<ITruck> => {
  const result = await api().post(`${apiName}`, truck);
  return result.data;
};
const UpdateTruck = async (truck: ITruck): Promise<ITruck> => {
  const result = await api().put(`${apiName}`, truck);
  return result.data;
};
const DeleteTruck = async (id: number): Promise<number> => {
  const result = await api().delete(`${apiName}/${id}`);
  return result.data;
};

export const TruckApi = {
  FetchTrucks,
  FetchTruckById,
  CreateTruck,
  UpdateTruck,
  DeleteTruck,
};
