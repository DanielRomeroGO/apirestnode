import express from "express";
import morgan from "morgan";
//import multer from "multer";
//Rutas
//import languageRoutes from "./routes/language.routes";
import alumnosRoutes from "./routes/alumnos.routes";
import cursosRoutes from "./routes/curso.routes";
const app = express();
//const upload = multer({ dest: './static/img' });
// Settings
app.set('port', 4000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
//app.use(upload.single('imagen'));

//Rutas
app.use('/api/alumnos/', alumnosRoutes);
app.use('/api/cursos/', cursosRoutes);

export default app;