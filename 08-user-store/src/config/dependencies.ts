import { CreateCategoryUseCase } from '../application/use-cases/categories/create-category.use-case';
import { WinstonLogger } from '../infrastructure/logging/winston-logger';
import { MongoDBCategoryRepository } from '../infrastructure/repositories/mongodb-category.repository';
import { CategoriesController } from '../presentation/controllers/categories.controller';

export const setupDependencies = () => {
  const logger = new WinstonLogger();
  const categoryRepository = new MongoDBCategoryRepository();

  const createCategoryUseCase = new CreateCategoryUseCase(
    categoryRepository,
    logger
  );

  const categoriesController = new CategoriesController(
    createCategoryUseCase,
    logger
  );

  return {
    categoriesController,
  };
};
