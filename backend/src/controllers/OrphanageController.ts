import { Request, Response } from "express";
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';

class OrphanageController {
  async index(req: Request, res: Response) {

  }

  async store(req: Request, res: Response) {
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


    await orphanageRepository.save(orphanage)
        
    return res.status(201).json({message: "Orfanato cadastrado com sucesso"});
  }

  async update(req: Request, res: Response) {
    
  }

  async show(req: Request, res: Response) {
    
  }

  async delete(req: Request, res: Response) {
    
  }
}

export default new OrphanageController();