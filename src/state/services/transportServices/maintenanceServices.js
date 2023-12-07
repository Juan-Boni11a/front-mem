import axios from "axios";

const serverUrl = 'http://localhost:8080';
//process.env.REACT_APP_SERVER_URL;


export const getAllMaintenance = async() => {
    console.log(serverUrl);
    const response = await axios.get(
        `${serverUrl}/solicitud-mantenimiento/obtener-todas`
    );

    return response.data;
}

export const getMaintenanceById = async (id) => {
    try {
        const response = await axios.get(`${serverUrl}/solicitud-mantenimiento/obtener-por-id/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la solicitud-mantenimiento por ID:", error);
        throw error;
    }
}

export const createMaintenance = async(body) =>{
    const response = await axios.post(
        `${serverUrl}/solicitud-mantenimiento/agregar`,
        body
    );
    
    return response;
}


export const updateMaintenance = async (id, body) => {
    try {
        console.log(id);
        console.log(body);
        const response = await axios.put(`${serverUrl}/solicitud-mantenimiento/actualizar/${id}`, body);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar la solicitud-mantenimiento por ID:", error);
        throw error;
    }
};