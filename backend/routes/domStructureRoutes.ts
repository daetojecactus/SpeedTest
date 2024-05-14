import express, { Router } from 'express';
import { domStructureInfo } from '../controllers/domStructureController';

const router: Router = express.Router();

// Обработка POST-запроса для измерения DOM
router.post('/', domStructureInfo);

export default router;
