import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Item from '../models/Item';
import ItemsView from '../views/ItemView';

export default {
  async show(request: Request, response: Response){
    const itemsRepository = getRepository(Item);

    const items = await itemsRepository.find({
      relations: ['images','user_id']//relacionar para mostrar usuario
    });
    console.log(items)
    return response.status(200).json(ItemsView.renderMany(items));
  },

  async index(request: Request, response: Response){
    const { item_id } = request.params;
    const itemsRepository = getRepository(Item);

    const item = await itemsRepository.findOneOrFail( item_id, {
      relations: ["images","user_id"]
    } );
    
    console.log(item)
    return response.status(200).json(ItemsView.render(item));
    // return response.status(200).json(item);

  },

  async create(request: Request, response: Response){
    const { item_id , name_item, price, description, category, user_id} = request.body;

    
  
    const itemsRepository =getRepository(Item);

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map(image => {
      return {path: image.filename}
    })
  
    const item = {
        item_id,
        name_item,
        price,
        description,
        category,
        images,   
        user_id,
        }

    const schema = Yup.object().shape({
      name_item: Yup.string().required(),
      price: Yup.number().required().integer(),
      description: Yup.string().required().max(300),
      category: Yup.string().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    });

    
    await schema.validate(item, {
      abortEarly: false, //Se encontrar um erro, por padrão retorna um erro retornando todos ao mesmo tempo;
    })

    const newItem = itemsRepository.create(item);
  
    await itemsRepository.save(item);
    
    return response.status(201).json(newItem);
  }
}