import express from 'express';
import loadTimeRoutes from './loadTimeRoutes';
import whatCmsRoutes from './whatCmsRoutes'
import resourcesRoutes from './resourcesRoutes'

const router = express.Router();

router.use('/load-time', loadTimeRoutes);
router.use('/cms', whatCmsRoutes);
router.use('/resources', resourcesRoutes);

export default router;