/**
 * Import Dependencies
 */
import * as express from 'express';

/**
 * Initialize Router
 */
const router = express.Router();

/**
 * Import Routes
 */
import clockRouter from './clock/router';
import pdfRouter from './pdf/router';

/**
 * Bind Routes
 */
router.use('/clock', clockRouter);
router.use('/pdf', pdfRouter);

/**
 * Export Module
 */
export default router;
