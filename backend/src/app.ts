// Importação de bibliotecas
import express from 'express';
import cors from 'cors';
import path from 'path';
import 'express-async-errors'

// Importação de arquivos locais
import './database/connection';
import routes from './routes';
import errorHandler from './errors/handlers';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);


export { app } ;
