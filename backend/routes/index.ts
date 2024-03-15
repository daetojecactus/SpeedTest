import express from 'express';
import webSiteUrlRoutes from './webSiteUrlRoutes';

const router = express.Router();

router.use('/load-time', webSiteUrlRoutes);

export default router;