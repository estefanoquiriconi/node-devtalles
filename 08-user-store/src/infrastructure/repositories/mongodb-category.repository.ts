import { Category } from '../../domain/entities/category.entity';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { CategoryModel } from '../database/category.model';

export class MongoDBCategoryRepository implements CategoryRepository {
  async findByName(name: string): Promise<Category | null> {
    const categoryModel = await CategoryModel.findOne({ name });
    if (!categoryModel) return null;

    return new Category(
      categoryModel.id,
      categoryModel.name,
      categoryModel.available,
      categoryModel.userId,
      categoryModel.createdAt,
      categoryModel.updatedAt
    );
  }

  async save(category: Category): Promise<Category> {
    const newCategory = new CategoryModel({
      name: category.name,
      available: category.available,
      userId: category.userId,
    });

    await newCategory.save();
    return category;
  }
}
