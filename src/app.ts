import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import routes from './routes/routes';
import customerRoutes from './routes/Customer.routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', routes);
app.use('/customers', customerRoutes);

export default app;
