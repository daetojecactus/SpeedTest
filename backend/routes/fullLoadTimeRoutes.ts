import express, { Router } from 'express';
import {fullLoadTime} from '../controllers/fullLoadTimeController';

const router: Router = express.Router();

// Обработка POST-запроса для измерения времени загрузки сайта
router.post('/', fullLoadTime);

export default router;