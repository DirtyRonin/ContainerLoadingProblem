import { createServer } from 'http';

import { sequelize, connect } from './config/db';
import seeding from './config/seeding';
import { app } from './app';

const port = process.env.PORT || 3000;

app.get('/alive/', (req, res) => {
  res.send('<h2>Hello There :-)</h2></br><h1>Generall Kenobi!!! How Nice of YOU!!</h1>');
  console.log('see me ran');
});

const forceSync = async () => {
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  await sequelize.sync({ force: true });

  await sequelize.query('SET FOREIGN_KEY_CHECKS = 1'); // setting the flag back for security
  await seeding();
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
    connect()
    console.log(`server running on port ${port}`);
  });
})();
