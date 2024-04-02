import express, { Router } from 'express';
import {resourceErrors} from '../controllers/resourceErrorsController';

const router: Router = express.Router();

// Обработка POST-запроса для измерения времени загрузки сайта
router.post('/', resourceErrors);

export default router;