import express from 'express';
import './database/connection';

const app = express();

// Query params = req.query;  http://localhost:3333/user?name=gabriel
// Route params = req.params; http://localhost:3333/user/1
// Body = req.body;

app.use(express.json());

app.get("/", (req, res) => {
    return res.json({message: "Olá gabriel seu lindo"});
});


app.listen(3333, () =>  {
    console.log('Servidor está sendo executado na porta 3333');
});