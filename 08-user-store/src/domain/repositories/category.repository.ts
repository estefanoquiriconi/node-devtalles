import { Category } from '../entities/category.entity';

export interface CategoryRepository {
  findByName(name: string): Promise<Category | null>;
  save(category: Category): Promise<Category>;
}
