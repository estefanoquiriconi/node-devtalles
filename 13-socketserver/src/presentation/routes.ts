import { Router } from 'express';
import { TicketRoutes } from './tickets/ticket.routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/ticket', TicketRoutes.routes);

    return router;
  }
}
