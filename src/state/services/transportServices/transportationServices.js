import axios from "axios";

const serverUrl = 'http://localhost:8080';
//process.env.REACT_APP_SERVER_URL;


export const getAllTransportation = async() => {
    console.log(serverUrl);
    const response = await axios.get(
        `${serverUrl}/solicitud-transporte/obtener-todas`
    );

    return response.data;
}

export const getTransportationById = async (id) => {
    try {
        const response = await axios.get(`${serverUrl}/solicitud-transporte/obtener-por-id/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la solicitud-transporte por ID:", error);
        throw error;
    }
}

export const createTransportation = async(body) =>{
    const response = await axios.post(
        `${serverUrl}/solicitud-transporte/agregar`,
        body
    );
    
    return response;
}


export const updateTransportation = async (id, body) => {
    try {
        console.log(id);
        console.log(body);
        const response = await axios.put(`${serverUrl}/solicitud-transporte/actualizar/${id}`, body);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar la solicitud-transporte por ID:", error);
        throw error;
    }
};