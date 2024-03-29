import express, { Router } from 'express';
import {loadTime} from '../controllers/loadTimeController';

const router: Router = express.Router();

// Обработка POST-запроса для измерения времени загрузки сайта
router.post('/', loadTime);

export default router;