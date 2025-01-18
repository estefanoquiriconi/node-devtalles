import { Router } from 'express';
import { CategoriesController } from '../controllers/categories.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export const categoriesRoutes = (
  categoriesController: CategoriesController
): Router => {
  const router = Router();

  router.post(
    '/',
    [AuthMiddleware.validateJWT],
    categoriesController.createCategory
  );

  return router;
};
