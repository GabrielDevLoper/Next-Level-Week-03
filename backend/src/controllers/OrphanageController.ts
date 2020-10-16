import { Request, Response } from "express";
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';

class OrphanageController {
  async index(req: Request, res: Response) {
    const orphanageRepository = getRepository(Orphanage);

    const orphanages = await orphanageRepository.find();

    return res.json(orphanages);
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

    const requestImages = req.files as Express.Multer.File[];
    const images = requestImages.map(image => {
      return {
        path: image.filename
      }
    })

    console.log(images);
    const orphanageRepository = getRepository(Orphanage);


    const orphanage = orphanageRepository.create({
      name, 
      latitude, 
      longitude, 
      about, 
      instructions, 
      opening_hours, 
      open_on_weekends,
      images
    });

    const savedOrphanage = await orphanageRepository.save(orphanage)
        
    return res.status(201).json(savedOrphanage);
  }

  async update(req: Request, res: Response) {
    
  }

  async show(req: Request, res: Response) {
    const orphanageRepository = getRepository(Orphanage);
    const { id } = req.params;

    const orphanage = await orphanageRepository.findOneOrFail(id);

    return res.json(orphanage);
    
  }

  async delete(req: Request, res: Response) {
    
  }
}

export default new OrphanageController();