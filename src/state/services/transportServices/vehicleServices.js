import axios from "axios";

const serverUrl = 'http://localhost:8080';
//process.env.REACT_APP_SERVER_URL;


export const getAllVehicles = async() => {
    console.log(serverUrl);
    const response = await axios.get(
        `${serverUrl}/vehiculo/obtenerVehiculos`
    );

    return response.data;
}

export const getAllBusy = async() => {
    console.log(serverUrl);
    const response = await axios.get(
        `${serverUrl}/vehiculo/ocupados`
    );

    return response.data;
}
export const getAllAvailable = async() => {
    console.log(serverUrl);
    const response = await axios.get(
        `${serverUrl}/vehiculo/disponibles`
    );

    return response.data;
}

export const getVehiclesById = async (id) => {
    try {
        const response = await axios.get(`${serverUrl}/vehiculo/obtenerConductor/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener Usuario por ID:", error);
        throw error;
    }
}

export const createVehicles = async(body) =>{
    const response = await axios.post(
        `${serverUrl}/vehiculo/agregar`,
        body
    );
    
    return response;
}


export const updateVehicles = async (id, body) => {
    try {
        console.log(id);
        console.log(body);
        const response = await axios.put(`${serverUrl}/vehiculo/actualizar/${id}`, body);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar Usuario por ID:", error);
        throw error;
    }
};