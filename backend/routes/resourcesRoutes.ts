import express, { Router } from 'express';
import { getResources } from '../controllers/resourcesController';

const router: Router = express.Router();

// Обработка POST-запроса для измерения времени загрузки сайта
router.post('/', getResources);

export default router;
