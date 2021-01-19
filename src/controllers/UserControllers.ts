import { Request, Response } from 'express';
import { getRepository ,getManager, ObjectID  } from 'typeorm';
import * as Yup from 'yup';

// import AppError from "../errors/AppErrors"
import { sign } from "jsonwebtoken";
import authConfig from "../config/authConfig"
import { compare, hash } from "bcryptjs";

import User from '../models/User';

import userView from '../views/UserView';
import errorHandler from '../errors/Handler';
import upload from '../config/upload';

export default {

async show(request: Request, response: Response){
    const { user_id } = request.params;
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOneOrFail( user_id);
    console.log(user)
    return response.status(200).json(userView.render(user));
  },

 
async create(request: Request, response: Response){
    const {user_id, name, password, city, uf, whatsapp ,passwordConfirmation} = request.body;

    const UsersRepository =getRepository(User);

    const requestImages = request.file.filename ;
    console.log(requestImages)

    const user = {
      user_id,
      avatar: requestImages, 
      name,
      city,
      uf,
      whatsapp,
      passwordConfirmation,
      password
    };
    
    const schema = Yup.object().shape({
      avatar: Yup.string(),
      name: Yup.string().required(),
      city: Yup.string().required(),
      uf: Yup.string().required().max(2),
      whatsapp:  Yup.number().lessThan(99999999999999),
      password: Yup.string().required().min(6),
      passwordConfirmation: Yup.string()
       .oneOf([Yup.ref('password'), null], 'Passwords must match')
    });
    console.log(user)
    
    await schema.validate(user, {
      abortEarly: false, //Se encontrar um erro, por padrão retorna um erro retornando todos ao mesmo tempo;
    })
    const userExists = await UsersRepository.findOne({where:{whatsapp}})
      if(userExists){ 
        console.log(userExists)
        return response.status(409).json('WhatsApp has already signed up') }

    UsersRepository.create(user);
 
    await UsersRepository.save(user);
    
    return response.status(201).json({user});
    },
  
async auth(request: Request, response: Response){
    const {user_id, whatsapp, password } = request.body;
    

    const user = {
      user_id,
      whatsapp,
      password,
      
    };
  
    
    const usersRepository = getRepository(User);
    const users = await usersRepository.findOne({where:{whatsapp} });
    console.log(users)

        if(!users){
          return response.status(201).json("Senha ou whatsapp não é valida!");
        }


    const isValidPassword = await compare(password,user.password);
      if (!isValidPassword)  {
          return response.status(401).json('password don\'t authenticated') 
      }  
    const token = sign({}, 'secret', {
      // subject: String(user.user_id),
      expiresIn: authConfig.jwt.expiresIn
    });

    const schema = Yup.object().shape({
      whatsapp:  Yup.number().lessThan(99999999999999),
       password: Yup.string().required().min(6),
   });
   console.log(whatsapp)
   
   await schema.validate(user, {
     abortEarly: false, //Se encontrar um erro, por padrão retorna um erro retornando todos ao mesmo tempo;
   })

    return response.status(201).json([userView.render(users),{token}]);
    },
    //UPDATE AND DELETE DON'T FFUNCTION
// async updates(request: Request, response: Response){
//       const { user_id } = request.params;
//       const { name, city, uf, whatsapp ,} = request.body;

//       const usersRepository = getManager().getRepository(User);
//       // const hashedPassword = await hash(password, 8);

//       // const requestImages = request.file.filename ;
 
//     // console.log(requestImages)
//       const data = {
//       // avatar: requestImages, 
//         name,
//         city,
//         uf,
//       };
    
//       // const userFinded = await usersRepository.createQueryBuilder().update( User)
//       // .set({
//       //   // avatar: requestImages, 
//       //   name
//       //   // city,
//       //   // uf,
//       // }).where("user_id = :user_id",{user_id})
//       // .execute();
//       const updateUser  = await usersRepository .update( user_id, {name})
//       const user = await usersRepository.findOneOrFail( user_id);


//       console.log(updateUser)
//       console.log(data) 
//       return response.status(200).json(userView.render(user));
//     },
// //-------------------TESTE-----------------
//     async update(request: Request, response: Response){
//       const userRepository =  getRepository(User);
  
//       const id  = request.params.user_id;
  
//       const {
  
//         name, whatsapp, newPassword, oldPassword, password
  
//       } = request.body;
  
  
      
//       const data = { 
        
//         name, 
//         whatsapp, 
//         newPassword, 
//         oldPassword, 
//         password 
        
//       }
      
      
//       // const schema = Yup.object().shape({
        
//       //   name: Yup.string(), 
//       //   whatsapp: Yup.string(), 
//       //   oldPassword: Yup.string(),
//       //   newPassword: Yup.string(),
//       //   password: Yup.string().required()
        
//       // });
  
  
//       const emailExists = await userRepository.findOne({where: { whatsapp}});
      
//       // if(emailExists){
//       //   return response.status(409).json({message: 'Email already exists'});
        
//       // }
      
//       // const user = await userRepository.findOne(id);
  
        
  
//       // const verifyPassword = await compare(password, user.password);
  
//       // if(!verifyPassword){
//       //   return response.json({message: 'Incorrect Password'});
//       // };
  
  
  
//       // if(oldPassword && oldPassword !== newPassword || newPassword && oldPassword !== newPassword ){
  
//       //   return response.status(400).json({message: 'Passwords not match' });
//       // }
  
  
//       // await schema.validate(data, { abortEarly: false}).catch(err => {
  
  
//       //   const { errors } = err;
//       //   return response.status(400).json({message: errors });
        
//       // });
  
  
//       // const dataUpdate = {
//       //   name: name ||  user.name,
//       //   whatsapp: whatsapp ||  user.whatsapp,
//       //   password:   user.password,
//       // }
//       const dataUpdate = {
//         name
      
//       }
  
  
  
//       await userRepository.update(String(id) , dataUpdate );
  
//       const updateUser = await userRepository.findOneOrFail(id);
  
  
//       return response.json(userView.render(updateUser));
  
      
    
  
  
//     },

// async delete (request: Request, response: Response) {
//         const  {user_id}  = request.params;
        
//         // try {
          
//           const usersRepository = getRepository(User);
          
//           const user = await usersRepository.delete({userId: user_id});
          
//           // if(user.affected === 1){
//           const userUpdated = await usersRepository.findOne( user_id);
          
//           console.log(user)
//           console.log(userUpdated)
//           return response.sendStatus(200).json({message: "delete operation success."});
//           }
//           return response.sendStatus(400).json({message: "ERROR"});
         
//         // } catch (error) {
//         //   return response.status(400).json({
//         //     message: "Update operation failed, try again.",
//         //     info: error,
//         //   });
//       //  }
//       }

    
}