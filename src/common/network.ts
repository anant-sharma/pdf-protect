/**
 * This file contains the code required to
 * check the internet connectivity if the system.
 */

/**
 * Module dependencies
 */
import * as moment from 'moment';
import { delay } from './utils';
// tslint:disable-next-line:no-var-requires
const networkPing = require('network-ping');

class Network {

    public network: any;

    constructor() {
        this.network = networkPing(0.5, '8.8.8.8');
    }

    public isOnline() {
        return this.network.online;
    }
}

/**
 * Initialize module
 */
export const network = new Network();

/**
 * Notify Network Activity
 */
network.network.on('online', () => {
    console.log('[*] System came online at ' + moment().format('x'));
});
network.network.on('offline', () => {
    console.log('[*] System went offline ' + moment().format('x'));
});

export function isOnline() {
    return network.isOnline();
}

export function ensureOnline() {
    return new Promise((resolve) => {

        /**
         * If system is online
         */
        if (isOnline()) {
            resolve();
            return;
        }

        /**
         * If system is offline
         */
        network.network.on('online', async () => {
            await delay(2000);
            resolve();
        });

    });
}
