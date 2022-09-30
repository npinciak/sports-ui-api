import express from 'express';
import sequelize from './config/connection';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import { router } from './api/routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 443;

app
  .use(cors({ credentials: true, origin: true }))
  .use(bodyParser.json())
  .disable('X-Powered-By')
  .use(helmet());

app.listen(PORT, async () => {
  console.log(`⚡️ App is running at http://localhost:${PORT} in ${app.get('env')} mode`);

  try {
    await sequelize.authenticate();
    console.log('✨ Established connection to DB ✨');
  } catch (error) {
    console.error('⚰️ Unable to connect to DB ⚰️', error);
  }
});

app.use('/api/v1/', router);
