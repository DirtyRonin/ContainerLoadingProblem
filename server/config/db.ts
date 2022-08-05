import { Sequelize } from 'sequelize-typescript';
import { Goods, GoodsOrder, Order, Truck } from '../models';
import { config } from './config';

const { DB_DATABASE, DB_ROOT_PASSWORD, DB_USER, DB_PORT, DB_HOST } = config;
console.log(config);
export const sequelize = new Sequelize({
  database: DB_DATABASE,
  username: DB_USER,
  password: DB_ROOT_PASSWORD,
  host: DB_HOST,
  port: +DB_PORT,
  dialect: 'mariadb',
  repositoryMode: true,
  models: [Truck, Goods, Order, GoodsOrder],
});
