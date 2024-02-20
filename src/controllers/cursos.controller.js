import {getConnection} from './../database/database';

const getCursos= async(request, response)=>{
    try{
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM curso');
        response.json(result);
    }catch(error){
        response.status(500);
        response.send(error.message);
    }    
}

const getCurso= async(request, response)=>{
    try{
        const { id } = request.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM curso WHERE id = ?", id);
        response.json(result);
    }catch(error){
        response.status(500);
        response.send(error.message);
    }    
}

export const methods={
    getCursos,
    getCurso
};