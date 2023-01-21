import express from 'express';
import cors from 'cors';
import {PORT} from './config/config.js';
import userRouter from './routes/users.routes.js';
import postRouter from './routes/post.routes.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/../public/uploads')));

app.use(userRouter);
app.use(postRouter);

app.listen(PORT);
console.log(`Server on port ${PORT}`);