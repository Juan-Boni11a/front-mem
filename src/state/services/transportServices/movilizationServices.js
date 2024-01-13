import axios from "axios";

const serverUrl = 'http://localhost:8080';
//process.env.REACT_APP_SERVER_URL;


export const getAllMovilization = async() => {
    console.log(serverUrl);
    const response = await axios.get(
        `${serverUrl}/orden-movilizacion/obtener-todas`
    );

    return response.data;
}

export const getMovilizationById = async (id) => {
    try {
        const response = await axios.get(`${serverUrl}/orden-movilizacion/obtener-por-id/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la solicitud-mantenimiento por ID:", error);
        throw error;
    }
}

export const getMovilizationByMail = async (mail) => {
    try {
        const response = await axios.get(`${serverUrl}/orden-movilizacion/por-mail/${mail}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la solicitud-mantenimiento por Mail:", error);
        throw error;
    }
}

export const createMovilization = async(body) =>{
    const response = await axios.post(
        `${serverUrl}/orden-movilizacion/agregar`,
        body
    );
    
    return response;
}


export const updateMovilization = async (id, body) => {
    try {
        console.log(id);
        console.log(body);
        const response = await axios.put(`${serverUrl}/orden-movilizacion/${id}`, body);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar la solicitud-mantenimiento por ID:", error);
        throw error;
    }
};