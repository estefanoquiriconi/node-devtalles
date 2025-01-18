import mongoose from 'mongoose';

interface ConnectionOptions {
  mongoUrl: string;
  mongoDbName: string;
}

export async function connectDB({ mongoUrl, mongoDbName }: ConnectionOptions) {
  try {
    await mongoose.connect(mongoUrl, {
      dbName: mongoDbName,
    });
  } catch (error) {
    throw new Error('Error al conectar con la base de datos');
  }
}
