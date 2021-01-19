
import { Router } from "express";

import UserController from"../controllers/UserController"


import JWT from "../middleware/JWT";


    const routes = Router();




    routes.use(JWT);

    routes
        .get('/show/:user_id', UserController.show,JWT)
        // .put('/update/:userId', UserController.update,JWT)
        // .delete('/delete/:userId', UserController.delete,JWT)

        // .get('/show/:user_id', UserController.show)
        // .put('/update/:userId', UserController.update)
        // .delete('/delete/:userId', UserController.delete)





export default routes;