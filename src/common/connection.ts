/**
 * This file contains the code required to
 * create connection/channel
 */

/**
 * Module Dependencies
 */
import * as amqp from 'amqplib';
import * as moment from 'moment';
import { mqConfig, retryInterval } from '../config/config';
import { ensureOnline } from './network';
import { delay } from './utils';

class Connection {

    public conn: any;
    public logger: any;
    public isAliveFlag: boolean;
    public isCreatingFlag: boolean;

    constructor() {

        /**
         * Setup logger
         */
        this.logger = console;

        this.isAliveFlag = false;
        this.isCreatingFlag = false;

        this.create();

    }

    /**
     * This function creates connection required
     * by the application
     */
    public async create() {

        return new Promise(async (resolve, reject) => {

            this.isCreatingFlag = true;

            try {

                await ensureOnline();

                this.conn = await amqp.connect(mqConfig.connectionString);
                this.logger.log(`[*] Connection created successfully at ${moment().format('x')}`);
                this.isAliveFlag = true;

                /**
                 * Connection Error Handlers
                 */
                this.conn.on('close', async () => {
                    this.logger.error(`[*] Connection closed at ${moment().format('x')}. Reconnecting...`);
                    this.isAliveFlag = false;
                    setTimeout(() => {
                        this.create();
                    }, retryInterval);
                });

                this.conn.on('error', (err: Error) => {
                    if (err.message !== 'Connection closing') {
                        this.logger.error('[*] Connection error' + err.message);
                        this.isAliveFlag = false;
                        setTimeout(() => {
                            this.create();
                        }, retryInterval);
                    }
                });

                resolve(this.conn);
                this.isCreatingFlag = false;

            } catch (e) {
                this.logger.trace('Unable to create connection: ' + e);
                reject(e);
                this.isCreatingFlag = false;
                this.isAliveFlag = false;
            }

        });
    }

    public async getConnection() {

        // this.logger.set('function', 'getConnection');

        return new Promise(async (resolve, reject) => {

            try {

                this.logger.log('[*] isAliveFlag: ' + this.isAliveFlag);

                if (this.isAlive()) {
                    resolve(this.conn);
                    return;
                }

                while (this.isCreatingFlag) {
                    await delay(retryInterval);
                }
                resolve(await this.getConnection());

            } catch (e) {
                this.logger.trace('Unable to getConnection: ' + e);
                reject(e);
            }

        });
    }

    public isAlive() {
        return this.isAliveFlag;
    }
}

/**
 * Initialize Connection
 */
const connectionInstance = new Connection();

export async function getConnection() {
    return connectionInstance.getConnection();
}

export async function isAlive() {
    return connectionInstance.isAlive();
}
