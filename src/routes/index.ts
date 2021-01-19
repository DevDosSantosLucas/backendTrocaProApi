import express from "express";
import path from 'path';
import multer from "multer";
import uploadConfig from "../config/upload";


import UserController from"../controllers/UserController"

import UserControllerJwt from"./users.routes"
import ItemController from"./items.routes"

    const routes = express.Router();/////
    const upload = multer(uploadConfig);

    routes.use("/auth", UserControllerJwt);
    routes.use("/items",ItemController)
    routes.use('/uploads', express.static(path.join(__dirname, '..','..', 'uploads')));

    routes
        .post('/signup',upload.single('avatar'), UserController.create)
        .post("/session", UserController.auth)
export default routes;
