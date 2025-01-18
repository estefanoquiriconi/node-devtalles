import { Request, Response } from 'express';
import { CreateCategoryUseCase } from '../../application/use-cases/categories/create-category.use-case';
import { Logger } from '../../infrastructure/logging/logger.interface';
import { CreateCategoryDto } from '../../domain/dtos/categories/create-category.dto';
import { CustomError } from '../../domain/errors/custom.error';

export class CategoriesController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly logger: Logger
  ) {}

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  }

  createCategory = async (req: Request, res: Response) => {
    try {
      const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
      if (error) {
        this.logger.warn('Invalid category data received', { error });
        return res.status(400).json({ error });
      }

      const category = await this.createCategoryUseCase.execute(
        createCategoryDto!,
        req.body.user.id
      );

      return res.status(201).json(category);
    } catch (error) {
      return this.handleError(error, res);
    }
  };
}
