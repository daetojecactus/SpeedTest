import express, { Router } from 'express';
import { firstLoadTime } from '../controllers/firstLoadTimeController';

const router: Router = express.Router();

// Обработка POST-запроса для измерения времени первого ответа
router.post('/', firstLoadTime);

export default router;
