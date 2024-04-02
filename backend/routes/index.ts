import express from 'express';
import firstLoadTimeRoutes from './firstLoadTimeRoutes';
import whatCmsRoutes from './whatCmsRoutes'
import resourcesRoutes from './resourcesRoutes'
import fullLoadTimeRoutes from './fullLoadTimeRoutes'
import resourceErrorsRoutes from './resourceErrorsRoutes'

const router = express.Router();

router.use('/first-load-time', firstLoadTimeRoutes);
router.use('/cms', whatCmsRoutes);
router.use('/resources', resourcesRoutes);
router.use('/full-load-time', fullLoadTimeRoutes);
router.use('/resource-errors', resourceErrorsRoutes);

export default router;