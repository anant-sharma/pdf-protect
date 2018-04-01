/**
 * This file contains the functional code
 * pertaining to pdf-encrypt class
 */

/**
 * Module Dependencies
 */
import { spawn } from 'child_process';
import { shelf } from '../config/config';

export class PDF {

    private pdf: any;

    constructor(file: any) {
        this.pdf = file;
    }

    public encrypt() {

        return new Promise((resolve, reject) => {

            try {

                /**
                 * Get encryption parameters
                 */
                const {
                    password,
                    filePath,
                    outFilePath,
                } = this.pdf;
                const companyPassword = 'chipserver';

                const args = [
                    'qpdf',
                    '--encrypt',
                    password,
                    companyPassword,
                    '128',
                    '--',
                    filePath,
                    outFilePath,
                ];

                const child = spawn('/bin/sh', ['-c', args.join(' ') + ' | cat'], {
                    cwd: shelf.directory,
                    env: {
                        LD_LIBRARY_PATH: '/usr/local/lib',
                    },
                });

                child.stderr.on('error', (err) => {
                    console.error('Encryption Error : ' + err);
                    reject(err);
                });

                child.on('exit', (code) => {
                    resolve();
                });

            } catch (e) {
                reject(e);
            }

        });
    }
}
