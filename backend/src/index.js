import 'dotenv/config';
import express from 'express';
import cors from "cors";
import router from './routes/index.js';
import bodyParser from 'body-parser';
import dbClient from './config/dbClient.js';

const PORT = process.env.PORT || 3000;

const main = async () => {
  try {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(cors())
    app.use(express.json());

    app.use("/api/v1", router);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  } catch (error) {
    console.log(error);
  }
}

main();