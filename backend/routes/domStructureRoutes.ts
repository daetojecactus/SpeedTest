import express, { Router } from 'express';
import {domStructure} from '../controllers/domStructureController';

const router: Router = express.Router();

// Обработка POST-запроса для измерения DOM
router.post('/', domStructure);

export default router;