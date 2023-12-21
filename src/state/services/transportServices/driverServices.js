import axios from "axios";

const serverUrl = 'http://localhost:8080';
//process.env.REACT_APP_SERVER_URL;


export const getAllDrivers = async() => {
    console.log(serverUrl);
    const response = await axios.get(
        `${serverUrl}/transportation/drivers/obtenerconductors`
    );

    return response.data;
}

export const getDriversById = async (id) => {
    try {
        const response = await axios.get(`${serverUrl}/transportation/drivers/obtenerConductor/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener Usuario por ID:", error);
        throw error;
    }
}

export const createDrivers = async(body) =>{
    const response = await axios.post(
        `${serverUrl}/transportation/drivers/agregar`,
        body
    );
    
    return response;
}


export const updateDrivers = async (id, body) => {
    try {
        console.log(id);
        console.log(body);
        const response = await axios.put(`${serverUrl}/transportation/drivers/actualizar/${id}`, body);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar Usuario por ID:", error);
        throw error;
    }
};