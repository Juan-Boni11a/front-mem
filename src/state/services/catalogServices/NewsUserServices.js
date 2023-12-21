import axios from "axios";

const serverUrl = 'http://localhost:8080';
//process.env.REACT_APP_SERVER_URL;


export const getAllUsers = async() => {
    console.log(serverUrl);
    const response = await axios.get(
        `${serverUrl}/hemeroteca/users`
    );

    return response.data;
}

export const getUsersById = async (id) => {
    try {
        const response = await axios.get(`${serverUrl}/hemeroteca/users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener Usuario por ID:", error);
        throw error;
    }
}

export const createUsers = async(body) =>{
    const response = await axios.post(
        `${serverUrl}/hemeroteca/users`,
        body
    );
    
    return response;
}


export const updateUsers = async (id, body) => {
    try {
        console.log(id);
        console.log(body);
        const response = await axios.put(`${serverUrl}/hemeroteca/users/${id}`, body);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar Usuario por ID:", error);
        throw error;
    }
};