import { getConnection } from './../database/database';

const getAlumnos = async (request, response) => {
    try {
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM alumnos');
        response.json(result);
    } catch (error) {
        response.status(500).send(error.message);
    }
};

const getAlumno = async (request, response) => {
    try {
        const { id } = request.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM alumnos WHERE id = ?", id);
        response.json(result);
    } catch (error) {
        response.status(500).send(error.message);
    }
};

const postAlumno = async (req, res) => {
    try {
        const { nombre, edad, idCurso, imagen } = req.body;
        console.log(nombre);
        if (!nombre || !edad || !idCurso || !imagen) {
            return res.status(400).json({ message: "Faltan datos obligatorios" });
        }

        const connection = await getConnection();
        const buscarCurso = await connection.query("SELECT * FROM curso WHERE id = ?", idCurso);

        if (buscarCurso.length === 0) {
            return res.status(404).json({ message: "El curso con el ID proporcionado no existe. Recuerde que debe ser del 1 al 4" });
        }

        await connection.query("INSERT INTO alumnos (nombre, edad, imagen, idCurso) VALUES (?, ?, ?, ?)", [nombre, edad, imagen, idCurso]);

        return res.json({ message: "Alumno agregado exitosamente" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateAlumno = async (request, response) => {
    try {
        const { id } = request.params;
        const { nombre, edad, idCurso, imagen } = request.body;

        if (!nombre || !edad || !idCurso || !imagen) {
            return response.status(400).json({ message: "Faltan datos obligatorios" });
        }

        const connection = await getConnection();
        const buscarCurso = await connection.query("SELECT * FROM curso WHERE id = ?", idCurso);

        if (buscarCurso.length === 0) {
            return response.status(404).json({ message: "El curso con el ID proporcionado no existe. Recuerde que debe ser del 1 al 4" });
        }

        await connection.query("UPDATE alumnos SET nombre = ?, edad = ?, imagen = ?, idCurso = ? WHERE id = ?", [nombre, edad, imagen, idCurso, id]);

        response.json({ message: "Alumno modificado exitosamente" });
    } catch (error) {
        response.status(500).send(error.message);
    }
};

const deleteAlumno = async (request, response) => {
    try {
        const { id } = request.params;
        const connection = await getConnection();
        await connection.query("DELETE FROM alumnos WHERE id = ?", id);
        response.json({ message: "Alumno eliminado exitosamente" });
    } catch (error) {
        response.status(500).send(error.message);
    }
};

export const methods = {
    getAlumnos,
    getAlumno,
    postAlumno,
    updateAlumno,
    deleteAlumno
};
