import { Validators } from '../../../config/validators';

export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string,
    public readonly category: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, available, price, description, user, category } = object;

    if (!name) return ['Missing name'];
    if (!user) return ['Missing user'];
    if (!category) return ['Missing category'];
    if (!Validators.isMongoId(category)) return ['Invalid Category ID'];
    if (!Validators.isMongoId(user)) return ['Invalid User ID'];

    return [
      undefined,
      new CreateProductDto(
        name,
        !!available,
        price,
        description,
        user,
        category
      ),
    ];
  }
}
