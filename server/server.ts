import { createServer } from 'http';

import { connect } from './config/db';
import seeding from './config/seeding';
import { app } from './app';

const port = process.env.PORT || 3000;

app.get('/alive/', (req, res) => {
  res.send('<h2>Hello There :-)</h2></br><h1>Generall Kenobi!!! How Nice of YOU!!</h1>');
  console.log('see me ran');
});

const forceSync = () => {
   seeding()
    .then((result) => console.log('successfully seeded'))
    .catch((e) => console.log('failed seeding ', e.message));
};

(async () => {
  
  
  createServer(app).listen(port, () => {
    connect().then((x) => {
      console.log('mongo connected')
      //  forceSync()
    })
    .catch((x) => console.log('not connected to mongo', x));
    console.log(`server running on port ${port}`);
  });
})();
