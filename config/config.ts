export const config = {
  MYSQL_IP: process.env.DB_IP || "mariadb",
  MYSQL_PORT: process.env.DB_PORT || 3306,
  MYSQL_ROOT_PASSWORD: process.env.DB_ROOT_PASSWORD || "",
  MYSQL_ROOT_HOST: process.env.DB_HOST || "superHost",
  MYSQL_USER: process.env.DB_USERNAME || "username",
  MYSQL_PASSWORD: process.env.DB_PASSWORD || "pw",
  MYSQL_DATABASE: process.env.DB_DATABASE || "dbName",
};
