import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { IndexRouter } from './controllers/v0/index.router';
import { V0_USER_MODELS } from './controllers/v0/model.index';
import { sequelize } from './sequelize';

(async () => {
  await sequelize.addModels(V0_USER_MODELS);
  await sequelize.sync();

  const app = express();
  const port = process.env.PORT || 8080;

  app.use(bodyParser.json());

  app.use(cors({
    allowedHeaders: [
      'Origin', 'X-Requested-With',
      'Content-Type', 'Accept',
      'X-Access-Token', 'Authorization',
    ],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  }));

  app.use('/api/v0/', IndexRouter);

  // Root URI call
  app.get( '/', async ( req, res ) => {
    res.send( '/api/v0/' );
  } );


  // Start the Server
  app.listen( port, () => {
    console.log( `server running in port: ${port}` );
    console.log( `press CTRL+C to stop server` );
  } );
})();