import express from 'express';
import { getRepository } from 'typeorm';
import Orphanage from './database/models/Orphanage';
import './database/connection';

const app = express();

// Query params = req.query;  http://localhost:3333/user?name=gabriel
// Route params = req.params; http://localhost:3333/user/1
// Body = req.body;

app.use(express.json());

app.post("/orphanages", async (req, res) => {
    const {
        name, 
        latitude, 
        longitude, 
        about, 
        instructions, 
        opening_hours, 
        open_on_weekends
    } = req.body;

    const orphanageRepository = getRepository(Orphanage);


    const orphanage = orphanageRepository.create({
        name, 
        latitude, 
        longitude, 
        about, 
        instructions, 
        opening_hours, 
        open_on_weekends
    });


    if(await orphanageRepository.save(orphanage)) {
        return res.status(201).json({message: "Orfanato cadastrado com sucesso"});
    }

    return res.json({message: "Não foi possivel cadastrar o orfanato"});
    


   
});


app.listen(3333, () =>  {
    console.log('Servidor está sendo executado na porta 3333');
});