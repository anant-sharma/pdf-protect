/**
 * Import Dependencies
 */
import * as express from 'express';
import { PDFMaster } from './module';

// tslint:disable-next-line:no-var-requires
const proxy = require('express-http-proxy');

/**
 * Initialize Router
 */
const router = express.Router();

/**
 * Create PDF Master
 */
const pdfMaster = new PDFMaster();

/**
 * Declare proxy settings to shelf service
 */
const proxyOpts = {
    proxyReqPathResolver: () => {
        return '/api/v1/shelf';
    },
    userResDecorator: (proxyRes: any, proxyResData: Buffer) => {

        /**
         * Parse response from shelf API
         */
        const data = JSON.parse(proxyResData.toString('utf8'));

        /**
         * Extract file information from response data
         */
        const { file } = data;

        /**
         * Enqueue PDF for processing
         */
        pdfMaster.enqueue(file);

        /**
         * Send response to client
         */
        return JSON.stringify(data);
    },
};

/**
 * Bind Routes
 */
router.put('/', proxy('chipserver.ml:22000', proxyOpts));

/**
 * Export Module
 */
export default router;
