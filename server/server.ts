import { createServer } from "http";

import { sequelize } from "./config/db";
import { app } from "./app";



const port = process.env.PORT || 3000;

app.get("/alive/", (req, res) => {
  res.send(
    "<h2>Hello There :-)</h2></br><h1>Generall Kenobi!!! How Nice of YOU!!</h1>"
  );
  console.log("see me ran");
});

(async () => {
  
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  
  await sequelize.sync();
  
  createServer(app).listen(port, () => {
    console.log(`server running on port ${port}`);
  });
})();

// TODO: Test DB Next
