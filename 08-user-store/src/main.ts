import { config } from 'dotenv';
import { App } from './app';
import { connectDB } from './infrastructure/database/config';
import { WinstonLogger } from './infrastructure/logging/winston-logger';
import { JwtAdapter } from './config/jwt.adapter';

const logger = new WinstonLogger();

async function main() {
  try {
    // Cargar variables de entorno
    config();

    // Conectar a la base de datos
    await connectDB({
      mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/local',
      mongoDbName: process.env.MONGO_DB_NAME || 'local',
    });
    logger.info('Database connected');

    // Iniciar la aplicación
    const app = new App();
    const port = +(process.env.PORT || 3000);

    app.start(port);
    console.log(
      await JwtAdapter.generateToken({ id: '678903afd45f57d47084802b' })
    );
  } catch (error) {
    logger.error(`${error}`);
    process.exit(1);
  }
}

main();
