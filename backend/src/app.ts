// Importação de bibliotecas
import express from 'express';
import cors from 'cors';

// Importação de arquivos locais
import './database/connection';
import routes from './routes';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(routes);


export { app } ;
