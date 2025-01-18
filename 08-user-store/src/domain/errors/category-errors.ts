export class CategoryAlreadyExistsError extends Error {
  constructor(categoryName: string) {
    super(`La categoría "${categoryName}" ya existe`);
    this.name = 'CategoryAlreadyExistError';
  }
}
