import { CreateCategoryDto } from '../../../domain/dtos/categories/create-category.dto';
import { Category } from '../../../domain/entities/category.entity';
import { CategoryAlreadyExistsError } from '../../../domain/errors/category-errors';
import { Logger } from '../../../infrastructure/logging/logger.interface';
import { CategoryRepository } from '../../../domain/repositories/category.repository';

export class CreateCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly logger: Logger
  ) {}

  async execute(dto: CreateCategoryDto, userId: string): Promise<Category> {
    this.logger.info('Creating new category', { categoryName: dto.name });

    const existingCategory = await this.categoryRepository.findByName(dto.name);
    if (existingCategory) {
      throw new CategoryAlreadyExistsError(dto.name);
    }

    const category = Category.create({
      name: dto.name,
      available: dto.available,
      userId: userId,
    });

    const savedCategory = await this.categoryRepository.save(category);

    this.logger.info('Category created successfully', {
      categoryId: savedCategory.id,
    });

    return savedCategory;
  }
}
