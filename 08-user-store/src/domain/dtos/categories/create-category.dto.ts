import { IsBoolean, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  public readonly name: string;

  @IsBoolean()
  public readonly available: boolean;

  private constructor(name: string, available: boolean) {
    this.name = name;
    this.available = available;
  }

  static create(props: { [key: string]: any }): [string?, CreateCategoryDto?] {
    const { name, available = false } = props;

    if (!name) return ['El nombre es requerido'];
    if (typeof name !== 'string') return ['El nombre debe ser texto'];
    if (name.length < 3) return ['El nombre debe tener al menos 3 caracteres'];

    const availableBoolean =
      typeof available === 'boolean' ? available : available === 'true';    

    return [undefined, new CreateCategoryDto(name, availableBoolean)];
  }
}
