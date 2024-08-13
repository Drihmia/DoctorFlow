import router from './PatientRoutes';
import SessionController from '../controllers/SessionController';

router.get('/sessions', SessionController.getAllSessions);
router.get('/sessions/:id', SessionController.getSession);
router.post('/sessions', SessionController.addSession);

router.put('/sessions/:id', SessionController.updateSession);

router.delete('/sessions/:id', SessionController.deleteSession);
export default router;
