import axios from "axios";

const serverUrl = 'http://localhost:8080';
//process.env.REACT_APP_SERVER_URL;


export const getAllFuncionarios = async() => {
    console.log(serverUrl);
    const response = await axios.get(
        `${serverUrl}/transportation/funcionarios`
    );

    return response.data;
}

export const getFuncionariosById = async (id) => {
    try {
        const response = await axios.get(`${serverUrl}/transportation/funcionarios/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener Usuario por ID:", error);
        throw error;
    }
}

export const createFuncionarios = async(body) =>{
    const response = await axios.post(
        `${serverUrl}/transportation/funcionarios`,
        body
    );
    
    return response;
}


export const updateFuncionarios = async (id, body) => {
    try {
        console.log(id);
        console.log(body);
        const response = await axios.put(`${serverUrl}/transportation/funcionarios/${id}`, body);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar Usuario por ID:", error);
        throw error;
    }
};