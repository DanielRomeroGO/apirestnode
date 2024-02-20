import {getConnection} from './../database/database';

const getLanguages= async(request, response)=>{
    try{
        const connection = await getConnection();
        const result = await connection.query('SELECT id, name, programmers FROM nodeapi');
        response.json(result);
    }catch(error){
        response.status(500);
        response.send(error.message);
    }    
}

const getLanguage= async(request, response)=>{
    try{
        const { id } = request.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, name, programmers FROM nodeapi WHERE id = ?", id);
        response.json(result);
    }catch(error){
        response.status(500);
        response.send(error.message);
    }    
}

const addLanguage= async(request, response)=>{
    try{
        const { name, programmers } = request.body;
        if(name === undefined){
            response.status(400).json({message:"Error, no se ha introducido un nombre"});
        }
        if(programmers === undefined){
            response.status(400).json({message:"Error, no se ha introducido un numero de programadores"});
        }
        const language = {name, programmers};
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO nodeapi SET ?", language);
        response.json({message:"Language aniadido"});
    }catch(error){
        response.status(500);
        response.send(error.message);
    }    
}

const updateLanguage= async(request, response)=>{
    try{
        const { id } = request.params;
        const { name, programmers } = request.body;

        if(id === undefined){
            response.status(400).json({message:"Error, no se ha introducido un id"});
        }
        if(name === undefined){
            response.status(400).json({message:"Error, no se ha introducido un nombre"});
        }
        if(programmers === undefined){
            response.status(400).json({message:"Error, no se ha introducido un numero de programadores"});
        }
        const language = {name, programmers};
        const connection = await getConnection();
        const result = await connection.query("UPDATE nodeapi SET ? WHERE id = ?", [language, id]);
        response.json(result);
    }catch(error){
        response.status(500);
        response.send(error.message);
    }    
}

const deleteLanguage= async(request, response)=>{
    try{
        const { id } = request.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM nodeapi WHERE id = ?", id);
        response.json(result);
    }catch(error){
        response.status(500);
        response.send(error.message);
    }    
}

export const methods={
    getLanguages,
    getLanguage,
    addLanguage,
    updateLanguage,
    deleteLanguage
};
