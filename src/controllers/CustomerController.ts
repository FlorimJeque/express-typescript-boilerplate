import { Request, Response } from 'express';
import prisma from '../services/prisma';
import http from '../utils/http';
import QUEUES from '../config/constants';
import RabbitMQ from '../services/rabbitmq';

class CustomerController {
  async listCustomers(req: Request, res: Response) {
    try {
      const customers = await prisma.customer.findMany({});
      http.sendResponse(res, 201, { message: 'Customers retrieved', customers });
    } catch (error) {
      http.sendResponse(res, 500, { error });
      console.log(error);
    }
  }
  async updateCustomer(req: Request, res: Response) {
    try {
      const customer = req.body;
      const newCustomer = await prisma.customer.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: customer,
      });
      new RabbitMQ().publish(
        QUEUES.CUSTOMER_UPDATED,
        JSON.stringify({ customer: { name: newCustomer.name, id: newCustomer.id } })
      );
      http.sendResponse(res, 200, { message: 'Created' });
    } catch (error) {
      http.sendResponse(res, 500, { error });
      console.log(error);
    }
  }

  async createCustomer(req: Request, res: Response) {
    try {
      const customer = req.body;
      const newCustomer = await prisma.customer.create({ data: customer });
      new RabbitMQ().publish(
        QUEUES.CUSTOMER_CREATED,
        JSON.stringify({ customer: { name: newCustomer.name, id: newCustomer.id } })
      );
      http.sendResponse(res, 201, { message: 'Created' });
    } catch (error) {
      http.sendResponse(res, 500, { error });
      console.log(error);
    }
  }
}

export default new CustomerController();
