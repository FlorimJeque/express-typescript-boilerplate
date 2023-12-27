import { Router } from 'express';
import CustomerController from '../controllers/CustomerController';

const routes = Router();

routes.post('/create', CustomerController.createCustomer);
routes.get('/list', CustomerController.listCustomers);
routes.put('/update/:id', CustomerController.updateCustomer);

export default routes;
