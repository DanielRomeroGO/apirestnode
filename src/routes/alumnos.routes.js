import { Router } from "express";
import { methods as alumnoController } from "../controllers/alumnos.controller";

const router = Router();

router.get('/', alumnoController.getAlumnos);
router.get('/:id', alumnoController.getAlumno);
router.post('/', alumnoController.postAlumno);
router.put('/:id', alumnoController.updateAlumno);
router.delete('/:id', alumnoController.deleteAlumno);

export default router;
