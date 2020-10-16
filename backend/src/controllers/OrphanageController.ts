import { Request, Response } from "express";
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import OrphanageViews from '../views/orphanages_view';
import * as Yup from 'yup';


class OrphanageController {
  async index(req: Request, res: Response) {
    const orphanageRepository = getRepository(Orphanage);

    const orphanages = await orphanageRepository.find({
      relations: ['images'],
      
    });

    return  res.json(OrphanageViews.renderMany(orphanages));
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

    const orphanageRepository = getRepository(Orphanage);

    const data = {
      name, 
      latitude, 
      longitude, 
      about, 
      instructions, 
      opening_hours, 
      open_on_weekends,
      images
    };

    const schema = Yup.object().shape({
      name: Yup.string().required('Nome é obrigatório'),
      latitude: Yup.string().required('Latitude é obrigatória'),
      longitude: Yup.string().required('Longitude é obrigatório'),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required('Instruções é obrigatória'),
      opening_hours: Yup.string().required('Hora de abertura é obrigatório'),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
      })),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = orphanageRepository.create(data);

    const savedOrphanage = await orphanageRepository.save(orphanage)
        
    return res.status(201).json(savedOrphanage);
  }

  async update(req: Request, res: Response) {
    
  }

  async show(req: Request, res: Response) {
    const orphanageRepository = getRepository(Orphanage);
    const { id } = req.params;

    const orphanage = await orphanageRepository.findOneOrFail(id,{
      relations: ['images'],
    });

    return res.json(OrphanageViews.render(orphanage));
    
  }

  async delete(req: Request, res: Response) {
    
  }
}

export default new OrphanageController();