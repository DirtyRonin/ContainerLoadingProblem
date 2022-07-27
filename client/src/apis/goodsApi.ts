import { IGoods } from "../models/Goods";
import api from "./baseApi";

const apiName = "goods";

const FetchGoods = async (): Promise<IGoods[]> => {
  const result = await api().get(apiName);
  return result.data;
};
const FetchGoodById = async (id: number): Promise<IGoods> => {
  const result = await api().get(`${apiName}/${id}`);
  return result.data;
};
const CreateGood = async (good: IGoods): Promise<IGoods> => {
  const result = await api().post(`${apiName}`, good);
  return result.data;
};
const UpdateGood = async (good: IGoods): Promise<IGoods> => {
  const result = await api().put(`${apiName}`, good);
  return result.data;
};
const DeleteGood = async (id: number): Promise<number> => {
  const result = await api().delete(`${apiName}/${id}`);
  return result.data;
};

export const GoodsApi = {
  FetchGoods,
  FetchGoodById,
  CreateGood,
  UpdateGood,
  DeleteGood,
};
