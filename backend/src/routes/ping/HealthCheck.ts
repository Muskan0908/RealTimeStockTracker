import express from 'express';
import { healthCheck } from '../../service/HealthService';

const router = express.Router();
/**
 * Health Check, to see if we can call the api and api is working fine
 */
router.get('/', async (req, res) => {
    try {
        const healthData = await healthCheck();
        res.json(healthData);
      } catch (error) {
        console.error('Error in health check:', error);
        res.status(500).json({ error: 'Health check failed' });
      }
});

export default router;
