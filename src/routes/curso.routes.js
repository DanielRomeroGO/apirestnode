import {Router} from "express";
import { methods as cursoController } from "../controllers/cursos.controller";

const router = Router();
router.get('/', cursoController.getCursos);
router.get('/:id', cursoController.getCurso);

export default router;