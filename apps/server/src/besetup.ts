import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const backend: express.Application = express();

async function StartBackend(): Promise<void> {
    backend.use(cors());
    backend.use(cookieParser());
    backend.use((req: Request, res: Response, next: NextFunction) => {
        console.log('Request received');
        next();
    });
    backend.get('/', (req: Request, res: Response) => {
        res.send('Hello, World!');
    });
    backend.listen(3000);
}

export { backend, StartBackend };