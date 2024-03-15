import express, { Router } from 'express';
import webSiteUrlController from '../controllers/webSiteUrlController';

const router: Router = express.Router();

// Обработка POST-запроса для измерения времени загрузки сайта
router.post('/', webSiteUrlController.loadTime);

export default router;