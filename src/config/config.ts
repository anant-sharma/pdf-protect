/**
 * This file contins the config
 * required to run the app
 */
import { mkdirSync, statSync } from 'fs';
import * as path from 'path';

 /**
  * App Config
  */
export const appConfig =  {
    port: 21014,
};

/**
 * Auth Enabled
 */
export const authEnabled = false;

/**
 * DB Connection
 */
export const dbConfig = {
    connectionString: process.env.dbConnectionString || 'mongodb://localhost:27017/pdf-protect?authSource=admin',
    // connectionString: `mongodb://<username>:<password>@chipserver.ml:27017/fleet-management?authSource=admin`,
};

/**
 * Shelf Folder
 */
export const shelf = {
    directory: path.resolve('shelf'),
};
// tslint:disable-next-line:no-empty
try { mkdirSync(shelf.directory); } catch (e) {}

/**
 * JWT Config
 */
export const jwtConfig = {
    options: {
        algorithm: 'HS256',
        expiresIn: 3600,
        issuer: 'Chipserver',
    },
    secret: 'appsecret',
};

/**
 * Mail Settings
 */
export const mailConfig = {
    privateKey: process.env.MJ_APIKEY_PRIVATE || '4518abdab189c8b4108dcf996ab10a2a',
    publicKey: process.env.MJ_APIKEY_PUBLIC || '8b5a1352ab5eaa8fda16b721b054e8f7',
};

/**
 * MQ Config
 */
export const mqConfig = {
    connectionString: process.env.mqConnectionString || 'amqp://admin:admin@localhost:5672?heartbeat=30',
    pdfQueue: 'pdf-protect-queue',
    // connectionString: 'amqp://<username>:<password>@chipserver.ml:5672?heartbeat=30',
};

/**
 * Paths
 */
export const paths = {
    whitelisted: [
        '/auth',
    ],
};

/**
 * Retry Interval
 */
export const retryInterval = 2000;
