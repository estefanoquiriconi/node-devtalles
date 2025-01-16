import { Router } from 'express';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from '../services/file-upload.service';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';
import { TypeMiddleware } from '../middlewares/type.middleware';

export class FileUploadRoutes {
  constructor() {}

  static get routes(): Router {
    const router = Router();
    const fileUploadService = new FileUploadService();
    const fileUploadController = new FileUploadController(fileUploadService);

    router.use(FileUploadMiddleware.containFiles);
    const types = ['users', 'categories', 'products'];

    router.post(
      '/single/:type',
      [TypeMiddleware.validTypes(types)],
      fileUploadController.uploadFile
    );
    router.post(
      '/multiple/:type',
      [TypeMiddleware.validTypes(types)],
      fileUploadController.uploadMultipleFiles
    );

    return router;
  }
}
