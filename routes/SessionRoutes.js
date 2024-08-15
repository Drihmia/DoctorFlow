import router from './PatientRoutes';
import SessionController from '../controllers/SessionController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

router.get('/sessions', AuthMiddleware({ role: 'dev' }), SessionController.getAllSessions);
router.get('/sessions/:id', AuthMiddleware({ role: 'dev' }), SessionController.getSession);
router.post('/sessions', AuthMiddleware({ role: 'doctor' }), SessionController.addSession);

router.put('/sessions/:id', AuthMiddleware({ role: 'doctor' }), SessionController.updateSession);

// This route should never be exposed to the client
router.delete('/sessions/:id', AuthMiddleware({ role: 'doctor' }), SessionController.deleteSession);
export default router;
