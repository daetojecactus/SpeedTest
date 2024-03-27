import express, { Router } from 'express';
import loadTimeController from '../controllers/loadTimeController';

const router: Router = express.Router();

// Обработка POST-запроса для измерения времени загрузки сайта
router.post('/', loadTimeController.loadTime);

export default router;