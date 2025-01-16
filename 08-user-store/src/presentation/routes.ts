import { Router } from 'express';
import { AuthRoutes } from './auth/auth.routes';
import { CategoryRoutes } from './categories/categories.routes';
import { ProductRoutes } from './products/products.routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/categories', CategoryRoutes.routes);
    router.use('/api/products', ProductRoutes.routes);

    return router;
  }
}
