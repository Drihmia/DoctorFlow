// From sessionService:

async function updateSession (session, query) {
  Object.assign(session, query);

  const savedSession = await session.save();
  return savedSession;
}

// From SessionController:

async function updateSession (req, res) {
  const { id } = req.params;

  try {
    const session = await SessionService.getSessionById(id);
    if (session) {
      const updatedSession = await SessionService.updateSession(session, req.body);
      return res.status(200).json(updatedSession);
    }

    return res.status(404).json({ error: 'Session not found' });
  } catch (error) {
    // If user provides an invalid id, ObjectId will throw an error
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Session not found' });
    }
    const prettifiedError = prettifyError(error);
    if (prettifiedError instanceof Error) {
      return res.status(500).json({ error: prettifiedError });
    } else {
      // If the error related to mongoose validation, prettifyError will return an object
      return res.status(400).json({ error: prettifiedError });
    }
  }
}

// From SessionRoutes:

// role is to be assigned to dev
router.put('/sessions/:id', AuthMiddleware({ role: 'doctor' }), SessionController.updateSession);
router.get('/sessions/:id', AuthMiddleware({ role: 'dev' }), SessionController.getSession);

