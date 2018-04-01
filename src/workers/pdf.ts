/**
 * The file contains the code required
 * pertaining to pdf worker
 */

/**
 * Module Dependencies
 */
import { v4 as uuid } from 'uuid';
import { Channel } from '../common/channel';
import { File } from '../common/file';
import { ensureOnline } from '../common/network';
import { PDF } from '../common/pdf-encrypt';
import { mqConfig, shelf } from '../config/config';

export class PDFWorker {

    constructor() {
        this.connect();
    }

    private async connect() {

        /**
         * Setup Logger
         */
        const logger = console;

        /**
         * Get Channel to receive tasks
         */
        const channelInstance = new Channel();
        const channel: any = await channelInstance.create();

        /**
         * Get queue name
         */
        const qName = mqConfig.pdfQueue;

        /**
         * Set prefetch
         * Number of messages processed by each
         * worker concurrently
         */
        channel.prefetch(1);

        /**
         * Start Consuming
         */
        channel.consume(qName, async (msg: any) => {

            try {
                /**
                 * Parse msg content
                 */
                const msgContent = JSON.parse(msg.content.toString());

                const {
                    filename,
                } = msgContent;

                /**
                 * Create File
                 */
                const file = new File(msgContent);

                /**
                 * Download the file
                 */
                msgContent.filePath = await file.download();

                /**
                 * Set Encryption Params
                 */
                msgContent.password = uuid();
                msgContent.outFilePath = `${shelf.directory}/enc-${filename}`;

                /**
                 * Create PDF
                 */
                const pdf = new PDF(msgContent);

                /**
                 * Encrypt PDF
                 */
                await pdf.encrypt();

                /**
                 * Acknowledge Msg
                 */
                await ensureOnline();
                channel.ack(msg);

            } catch (e) {
                logger.trace(e);
                await ensureOnline();
                channel.nack(msg);
            }
        });

    }

}
