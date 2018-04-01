/**
 * This file contains the code required to
 * create channel with messaging queue
 */

/**
 * Module dependencies
 */
import * as moment from 'moment';
import * as connection from './connection';

export class Channel {

    public logger: any;

    constructor() {

        /**
         * Setup logger
         */
        this.logger = console;

    }

    /**
     * This function creates channel required
     * by the application
     */
    public async create() {

        return new Promise(async (resolve, reject) => {

            try {

                /**
                 * Get Connection
                 */
                const conn: any = await connection.getConnection();

                /**
                 * Channel Creation
                 */
                const channel = await conn.createChannel();
                this.logger.log(`[*] Channel created successfully at ${moment().format('x')}`);

                resolve(channel);

            } catch (e) {
                this.logger.trace('Unable to create channel: ' + e);
                reject(e);
            }

        });
    }
}
