import { Request, Response } from 'express';
import http from '../utils/http';

class IndexController {
  async index(req: Request, res: Response) {
    http.sendResponse(res, 200, {});
  }
}

export default new IndexController();
