// import { envs } from './config/envs';
// import { MongoDatabase } from './data/mongo/mongo-database';
// import { AppRoutes } from './presentation/routes';
// import { Server } from './presentation/server';

// (async () => {
//   main();
// })();

// async function main() {
//   await MongoDatabase.connect({
//     mongoUrl: envs.MONGO_URL,
//     dbName: envs.MONGO_DB_NAME,
//   });

//   const server = new Server({
//     port: envs.PORT,
//     routes: AppRoutes.routes,
//   });

//   server.start();
// }

import express from 'express';
import { setupDependencies } from './config/dependencies';
import { WinstonLogger } from './infrastructure/logging/winston-logger';
import { categoriesRoutes } from './presentation/routes/categories.routes';

export class App {
  public app: express.Application;
  private logger = new WinstonLogger();

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    // this.errorHandling();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes(): void {
    const { categoriesController } = setupDependencies();

    this.app.use('/api/categories', categoriesRoutes(categoriesController));
  }

  // private errorHandling(): void {
  //   const errorHandler = new ErrorHandler(this.logger);
  //   this.app.use(errorHandler.handle.bind(errorHandler));
  // }

  public start(port: number): void {
    this.app.listen(port, () => {
      this.logger.info(`Server running on port ${port}`);
    });
  }
}
