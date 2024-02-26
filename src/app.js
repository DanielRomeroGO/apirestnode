import express from "express";
import morgan from "morgan";

//Rutas
import alumnosRoutes from "./routes/alumnos.routes";
import cursosRoutes from "./routes/curso.routes";
const app = express();

// Settings
app.set('port', 4000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Rutas
app.use('/api/alumnos/', alumnosRoutes);
app.use('/api/cursos/', cursosRoutes);

export default app;