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
    connectionString: process.env.dbConnectionString || '',
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
 * MQ Config
 */
export const mqConfig = {
    connectionString: process.env.mqConnectionString || '',
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
