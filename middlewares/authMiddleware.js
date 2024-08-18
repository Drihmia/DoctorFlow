import redisUtils from '../utils/redisUtils';

const AuthMiddleware = ({ role }) => {
  return async (req, res, next) => {
    // check token passed in header
    const token = req.headers['x-token'];
    if (!token) {
      return res.status(400).json({ error: 'Bad Request: Missing token' });
    }

    // check token exists in redis
    const redisToken = await redisUtils.get(`auth_${token}`);
    if (!redisToken) {
      return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
    }
    const [redisRole, redisId] = redisToken.split('_');

    if (redisRole !== role) {
      // const oppositeRole = role === 'doctor' ? 'patient' : 'doctor';
      return res.status(403).json({ error: `Forbidden: Only ${role} can access this route. Please login as ${role}.` });
    }

    // Doctor or Patient ID
    req.id = redisId;

    // For Disconnect methods
    req.token = token;
    next();
  };
};

export default AuthMiddleware;
