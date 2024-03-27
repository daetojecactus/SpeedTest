import express from 'express';
import loadTimeRoutes from './loadTimeRoutes';
import whatCmsRoutes from './whatCmsRoutes'

const router = express.Router();

router.use('/load-time', loadTimeRoutes);
router.use('/cms', whatCmsRoutes);

export default router;