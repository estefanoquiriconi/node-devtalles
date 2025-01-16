import { Router } from 'express';
import { ImageController } from './images.controller';

export class ImageRoutes {
  static get routes(): Router {
    const router = Router();
    const imageController = new ImageController();

    router.get('/:type/:img', imageController.getImage);

    return router;
  }
}
