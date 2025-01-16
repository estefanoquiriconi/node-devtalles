import { ProductModel } from '../../data/mongo/models/product.model';
import { CreateProductDto } from '../../domain/dtos/products/create-product.dto';
import { PaginationDto } from '../../domain/dtos/shared/pagination.dto';
import { CustomError } from '../../domain/errors/custom.error';

export class ProductService {
  constructor() {}

  async createProduct(createProductDto: CreateProductDto) {
    const productExist = await ProductModel.findOne({
      name: createProductDto.name,
    });
    if (productExist) throw CustomError.badRequest('Product already exist');

    try {
      const product = new ProductModel({
        ...createProductDto,
      });

      await product.save();

      return product;
    } catch (error) {
      throw CustomError.internalServer();
    }
  }

  async getProduct(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    try {
      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate('user')
          .populate('category')
      ]);

      return {
        page,
        limit,
        total,
        next: `api/products?page=${page + 1}&limit=${limit}`,
        prev:
          page - 1 > 0 ? `api/products?page=${page - 1}&limit=${limit}` : null,
        products,
      };
    } catch (error) {
      throw CustomError.internalServer();
    }
  }
}
