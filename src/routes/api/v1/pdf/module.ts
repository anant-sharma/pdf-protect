/**
 * This file contains the functional code
 * pertaining to clock class
 */

/**
 * Module Dependencies
 */
import * as moment from 'moment';
import { Channel } from '../../../../common/channel';
import { ensureOnline } from '../../../../common/network';
import { mqConfig } from '../../../../config/config';

/**
 * Create PDF Class
 */
export class PDFMaster {

    private channel: any;

    constructor() {
        this.createChannel();
    }

    public async enqueue(file: any) {

        /**
         * Ensure active connection
         */
        await ensureOnline();

        /**
         * Publish Message to Queue
         */
        this.channel.sendToQueue(mqConfig.pdfQueue, new Buffer(JSON.stringify(file)), {
            persistent: true,
        });

    }

    private async createChannel() {

        /**
         * Ensure active connection
         */
        await ensureOnline();

        /**
         * Create channel to enqueue files
         * for processing
         */
        const channelInstance = new Channel();
        this.channel = await channelInstance.create();

        /**
         * Declare Queue
         */
        this.channel.assertQueue(mqConfig.pdfQueue, {
            durable: true,
            exclusive: false,
        });
    }
}
