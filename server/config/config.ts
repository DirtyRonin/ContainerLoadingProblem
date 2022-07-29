import 'dotenv/config'

export const config = {
  DB_PORT: process.env.DB_PORT || 3306,
  DB_ROOT_PASSWORD: process.env.DB_ROOT_PASSWORD ||"root",
  DB_HOST: process.env.DB_HOST || 'localhost', //"database",
  DB_USER: process.env.DB_USERNAME || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || 'root',
  DB_DATABASE: process.env.DB_DATABASE || "truckloading",
};
