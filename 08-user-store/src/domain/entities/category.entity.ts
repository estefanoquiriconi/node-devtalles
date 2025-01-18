export class Category {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly available: boolean,
    public readonly userId: string,
    public readonly createAt: Date,
    public readonly updatedAt: Date
  ) {}

  static create(props: {
    name: string;
    available: boolean;
    userId: string;
  }): Category {
    return new Category(
      crypto.randomUUID(),
      props.name,
      props.available,
      props.userId,
      new Date(),
      new Date()
    );
  }
}
