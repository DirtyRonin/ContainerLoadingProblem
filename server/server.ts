import { createServer } from 'http';

import { sequelize } from './config/db';
import { app } from './app';
import { Goods, Truck } from './models';

const port = process.env.PORT || 3000;

app.get('/alive/', (req, res) => {
  res.send('<h2>Hello There :-)</h2></br><h1>Generall Kenobi!!! How Nice of YOU!!</h1>');
  console.log('see me ran');
});

const forceSync = async () => {
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  await sequelize.sync({ force: true });
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 1'); // setting the flag back for security
  await migrate();
};

const migrate = async () => {
  const goodsRepo = sequelize.getRepository(Goods);
  await goodsRepo.bulkCreate([
    { name: '1/2 Europalette', width: 600, length: 400, weight: 30, static: true },
    { name: '1/4 Europalette', width: 800, length: 600, weight: 30, static: true },
    { name: 'Europalette', width: 1200, length: 800, weight: 25, static: true },
    { name: 'Industriepalette', width: 1200, length: 1000, weight: 30, static: true },
  ]);

  const trucksRepo = sequelize.getRepository(Truck);
  await trucksRepo.bulkCreate([
    {
      vehicleIdentifier: 'Transporter 5 EP',
      loadingTime: 1000,
      dischargeTime: 500,
      height: 170,
      width: 180,
      length: 420,
      maxWeight: 1500,
      static: true,
    },
    {
      vehicleIdentifier: 'Transporter 1,5T',
      loadingTime: 1000,
      dischargeTime: 500,
      height: 230,
      width: 220,
      length: 490,
      maxWeight: 1500,
      static: true,
    },
    {
      vehicleIdentifier: 'Solo LKW 5T',
      loadingTime: 1000,
      dischargeTime: 500,
      height: 240,
      width: 245,
      length: 620,
      maxWeight: 5000,
      static: true,
    },
    {
      vehicleIdentifier: 'Solo LKW 6T',
      loadingTime: 1000,
      dischargeTime: 500,
      height: 240,
      width: 245,
      length: 720,
      maxWeight: 6000,
      static: true,
    },
    {
      vehicleIdentifier: 'Standard Sattelauflieger',
      loadingTime: 1000,
      dischargeTime: 500,
      height: 270,
      width: 245,
      length: 1360,
      maxWeight: 25000,
      static: true,
    },
  ]);
};

(async () => {
  // try {
  //   await sequelize.authenticate();
  //   console.log("Connection has been established successfully.");
  // } catch (error) {
  //   console.error("Unable to connect to the database:", error);
  // }

  // await sequelize.sync();
  // await forceSync();

  createServer(app).listen(port, () => {
    console.log(`server running on port ${port}`);
  });
})();
