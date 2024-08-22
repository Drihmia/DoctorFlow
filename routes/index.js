import router from './SessionRoutes';
import AuthenticationController from '../controllers/AuthenticationController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

router.get('/connect', AuthenticationController.connectDev);
router.get('/disconnect', AuthMiddleware({ role: 'dev' }), AuthenticationController.disconnect);

export default router;
