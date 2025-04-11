import {Router} from "express";
import {ProjectsController} from "../controllers/ProjectsController.js";

export const routesProjects = Router();

routesProjects.get('/',ProjectsController.indexProjects)
routesProjects.get('/api/showProjects',ProjectsController.showProjects)
routesProjects.get('/api/:date_string',ProjectsController.timestampFunction)
routesProjects.get('/api/',ProjectsController.timestampEmpty)