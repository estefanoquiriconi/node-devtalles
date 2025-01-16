import { envs } from '../../config/envs';
import { UserModel, CategoryModel, ProductModel } from '../mongo/models';
import { MongoDatabase } from '../mongo/mongo-database';
import { seedData } from './data';

(async () => {
  MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });
  await main();

  await MongoDatabase.disconnect();
})();

const randomBetween0AndX = (x: number) => {
  return Math.floor(Math.random() * 5);
};

async function main() {
  //0. Borrar todo!
  await Promise.all([
    UserModel.deleteMany(),
    CategoryModel.deleteMany(),
    ProductModel.deleteMany(),
  ]);

  //1. Crear usuarios
  const users = await UserModel.insertMany(seedData.users);

  //2. Crear categorías
  const categories = await CategoryModel.insertMany(
    seedData.categories.map(category => {
      return {
        ...category,
        user: users[randomBetween0AndX(seedData.users.length - 1)]._id,
      };
    })
  );

  //3. Crear productos
  const products = await ProductModel.insertMany(
    seedData.products.map(product => {
      return {
        ...product,
        user: users[randomBetween0AndX(seedData.users.length - 1)]._id,
        category:
          categories[randomBetween0AndX(seedData.categories.length - 1)]._id,
      };
    })
  );

  console.log('SEEDED');
}
