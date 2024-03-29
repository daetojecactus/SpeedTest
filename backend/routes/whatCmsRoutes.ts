import express, { Router } from 'express';
import {getCMSInfo} from '../controllers/whatCmsController';

const router: Router = express.Router();

// Обработка POST-запроса для cms
router.post('/', getCMSInfo);

export default router;