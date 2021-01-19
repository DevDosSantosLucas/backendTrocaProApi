import multer from 'multer';
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),

    //função de callback é dar um nome para o arquivo, 
    //para que evita uma sob escriva de arquivos
    
    filename: (request, file, cb) => { 
      const fileName = `${Date.now()}-${file.originalname}`;

      cb(null, fileName);
    },
  })
}