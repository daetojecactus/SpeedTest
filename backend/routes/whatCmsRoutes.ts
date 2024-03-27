import express, { Router } from 'express';
import whatCmsController from '../controllers/whatCmsController';

const router: Router = express.Router();

// Обработка POST-запроса для cms
router.post('/', whatCmsController.getCMSInfo);

export default router;