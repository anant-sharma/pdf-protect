/**
 * This file contains the code required
 * to create mail exchange and send mails
 */

/**
 * Module dependencies
 */
import { readFileSync } from 'fs';
// tslint:disable-next-line:no-var-requires
const mailjet = require('node-mailjet');
import { mailConfig } from '../config/config';

const MailExchange = mailjet.connect(mailConfig.publicKey, mailConfig.privateKey);

// tslint:disable-next-line:max-classes-per-file
export class Mail {

    private email: any;

    constructor() {
        this.email = {
            'Attachments': [],
            'FromEmail': 'abccorp1111@gmail.com',
            'FromName': 'Chipserver Pdf Protect',
            'Recipients': [],
            'Subject': 'Encrypted Document from pdf-protect',
            'Text-part': 'This part will typically contain the file link and relevant content',
        };
    }

    public set(key: string, value: any) {
        this.email[key] = value;
    }

    public attach(file: any) {

        /**
         * Extract filename and filepath
         */
        const {
            filename,
            outFilePath: filePath,
        } = file;

        /**
         * Read file in base64
         */
        const fileBuffer = new Buffer(readFileSync(filePath)).toString('base64');

        this.email.Attachments.push({
            'Content': fileBuffer,
            'Content-Type': 'application/pdf',
            'Filename': filename,
        });
    }

    public addRecipient(emailAddress: string) {
        this.email.Recipients.push({
            Email: emailAddress,
        });
    }

    public send() {

        return new Promise((resolve, reject) => {

            try {
                const {
                    email,
                } = this;

                MailExchange.post('send')
                    .request(email)
                    .then(resolve)
                    .catch((e: Error) => {
                        console.trace(e);
                    });

            } catch (e) {
                reject(e);
            }

        });
    }
}
