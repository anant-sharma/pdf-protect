/**
 * Module Dependencies
 */
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as typeis from 'type-is';
import { appConfig } from './config/config';
import router from './routes/router';
import { PDFWorker } from './workers/pdf';

const app = express();

/**
 * App Middlewares
 */
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!typeis.hasBody(req)) {
        return next();
    }

    switch (typeis(req, ['urlencoded', 'json', 'multipart'])) {
        case 'urlencoded':
            return bodyParser.urlencoded({extended: true, limit: 524288000});
        case 'json':
            return bodyParser.json({limit: 524288000});
        default:
            return next();
    }
});

app.use(router);

app.listen(appConfig.port, () => {
    console.log (`Server Started on Port ${appConfig.port}`);
});

/**
 * Create PDF Worker
 */
const pdfWorker = new PDFWorker();
