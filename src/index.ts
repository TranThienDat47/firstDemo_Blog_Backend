import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { connectDatabase } from '~configs/db/index';
import route from './route';

const app = express();
const PORT = 5000;

connectDatabase()
   .then(() => {
      app.use(express.json());
      app.use(cors());

      route(app);

      app.listen(PORT, () => console.log(`Server started on ${PORT}`));
   })
   .catch((error) => console.log(error));
