import { Sequelize } from 'sequelize-typescript';
import { CargoSeq, OrderSeq, Truck, TruckLoading } from '../models';
import { Route } from '../models/route';
import config from './config';

import mongoose from 'mongoose';
const { DB_DATABASE, DB_ROOT_PASSWORD, DB_USER, DB_PORT, DB_HOST } = config;

export const connect = () => {

const connectionString=`mongodb://${DB_USER}:${DB_ROOT_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?authSource=admin`

console.log('connectionString',connectionString)

  mongoose.connect(connectionString).then(
    x => console.log("mongo connected")
  ).catch(x => console.log("not connected to mongo",x));
};

export const sequelize = new Sequelize({
  database: DB_DATABASE,
  username: DB_USER,
  password: DB_ROOT_PASSWORD,
  host: DB_HOST,
  port: +DB_PORT,
  dialect: 'mariadb',
  repositoryMode: true,
  models: [Truck, OrderSeq, CargoSeq, TruckLoading, Route],
});
