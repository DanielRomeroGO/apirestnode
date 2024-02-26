import {getConnection} from './../database/database';
import fs from 'fs';
//const multer = require('multer');
//const upload = multer({ dest: './static/img' });

const getAlumnos= async(request, response)=>{
    try{
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM alumnos');
        response.json(result);
    }catch(error){
        response.status(500);
        response.send(error.message);
    }    
}

const getAlumno= async(request, response)=>{
    try{
        const { id } = request.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM alumnos WHERE id = ?", id);
        response.json(result);
    }catch(error){
        response.status(500);
        response.send(error.message);
    }    
}

function guardarImagen(imagen){
    //le ponemos un prefijo para que sea un nombre único
    const pref = Date.now();
    const nombreImg = `${pref}-${imagen.originalname}`;
    const ruta = `./static/img/${nombreImg}`;
    fs.renameSync(imagen.path, ruta);
    const blob = fs.readFileSync(ruta);
    return { nombreImg, blob };
}

/*const subirImagen = async (req, res, next) => {
    try {
        upload.single('imagen')(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json({ message: 'Error al subir la imagen' });
            } else if (err) {
                return res.status(500).json({ message: 'Error al procesar la solicitud' });
            }
            next(); // Llamar a next() solo si no hay errores
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
}*/


const postAlumno = async (req, res) => {
    try {
        const { nombre, edad, idCurso } = req.body;
        //const imagen = req.file;
        if (nombre === undefined) {
            return res.status(400).json({ message: "Error, no se ha introducido un nombre" });
        }
        if (edad === undefined) {
            return res.status(400).json({ message: "Error, no se ha introducido una edad" });
        }
        /*if (imagen === undefined) {
            return res.status(400).json({ message: "Error, no se ha introducido una imagen" });
        }*/
        const connection = await getConnection();
        const buscarCurso = await connection.query("SELECT * FROM curso WHERE id = ?", idCurso);

        if (buscarCurso.length === 0) {
            return res.status(404).json({ message: "Error, el curso con el ID proporcionado no existe. Recuerde que debe ser del 1 al 4" });
        }

        //const { nombreImg, blob } = guardarImagen(imagen);
        

        const alumno = { nombre, edad, /*imagen : nombreImg, imagenblob : blob,*/ idCurso };        
        await connection.query("INSERT INTO alumnos SET ?", alumno);

        // Enviar respuesta al cliente
        return res.json({ message: "Alumno agregado exitosamente" });
    } catch (error) {
        res.status(500).send(error.message);
    }
}


const updateAlumno= async(request, response)=>{
    try{
        const { id } = request.params;
        const { nombre, edad, idCurso } = request.body;
        //const imagen = request.file;

        if(id === undefined){
            response.status(400).json({message:"Error, no se ha introducido un id"});
        }
        if (nombre === undefined) {
            return response.status(400).json({ message: "Error, no se ha introducido un nombre" });
        }
        if (edad === undefined) {
            return response.status(400).json({ message: "Error, no se ha introducido una edad" });
        }
        /*if (imagen === undefined) {
            return response.status(400).json({ message: "Error, no se ha introducido una imagen" });
        }*/
        const connection = await getConnection();

        //const { nombreImg, blob } = guardarImagen(imagen);
        

        const alumno = { nombre, edad, /*imagen : nombreImg, imagenblob : blob,*/ idCurso }; 
        const result = await connection.query("UPDATE alumnos SET ? WHERE id = ?", [alumno, id]);
        response.json({ message: "Alumno modificado exitosamente" });
    }catch(error){
        response.status(500);
        response.send(error.message);
    }    
}

const deleteAlumno= async(request, response)=>{
    try{
        const { id } = request.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM alumnos WHERE id = ?", id);
        response.jsons({ message: "Alumno eliminado exitosamente" });
    }catch(error){
        response.status(500);
        response.send(error.message);
    }    
}

export const methods={
    //subirImagen,
    getAlumnos,
    getAlumno,
    postAlumno,
    updateAlumno,
    deleteAlumno
};
