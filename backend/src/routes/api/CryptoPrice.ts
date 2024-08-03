import express from 'express';
import Price from '../../model/price';

const router = express.Router();
/**
 * Get the price of a particular symbol
 */
router.get('/prices/:symbol', async (req, res) => {
    const { symbol } = req.params;
    console.log('Symbol ',symbol);
    const prices = await Price.find({ symbol }).sort({ timestamp: -1 }).limit(20);
    res.status(200).json(prices);
});

export default router;
