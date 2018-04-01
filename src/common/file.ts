/**
 * This file contains the code required to
 * perform actions on file over network
 */

/**
 * Module Dependencies
 */
import { createWriteStream } from 'fs';
import * as request from 'request';
import { v4 as uuid } from 'uuid';
import { shelf } from '../config/config';
import { ensureOnline } from './network';

export class File {

    private logger: any;
    private file: any;

    constructor(file: any) {

        /**
         * Setup Logging
         */
        this.logger = console;

        this.file = file;
    }

    public download() {

        return new Promise(async (resolve, reject) => {

            try {

                /**
                 * Get file attributes
                 */
                const { file } = this;
                const { filename, url: fileUrl } = file;

                /**
                 * Create file destination path
                 */
                const filePath = `${shelf.directory}/${filename}`;

                /**
                 * Create Writeable Stream
                 */
                const writableStream = createWriteStream(filePath);
                writableStream.on('finish', () => {
                    resolve(filePath);
                });
                writableStream.on('error', (err) => {
                    reject(err);
                });

                /**
                 * Pull File
                 */
                await ensureOnline();
                request(fileUrl).pipe(writableStream);
            } catch (e) {
                reject(e);
            }

        });
    }
}
