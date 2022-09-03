import config from './config';

import mongoose from 'mongoose';
const { DB_DATABASE, DB_ROOT_PASSWORD, DB_USER, DB_PORT, DB_HOST } = config;

export const connect = () => {
  const connectionString = `mongodb://${DB_USER}:${DB_ROOT_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?authSource=admin`;

  console.log('connectionString', connectionString);

  return mongoose
    .connect(connectionString)
    
};
