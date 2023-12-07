import axios from "axios";

const serverUrl = 'http://localhost:8080';
//process.env.REACT_APP_SERVER_URL;


export const getAllSupply = async() => {
    console.log(serverUrl);
    const response = await axios.get(
        `${serverUrl}/abastecimiento-combustible/obtener-todas`
    );

    return response.data;
}

export const getSupplyById = async (id) => {
    try {
        const response = await axios.get(`${serverUrl}/abastecimiento-combustible/obtener-por-id/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la abastecimiento-combustible por ID:", error);
        throw error;
    }
}

export const createSupply = async(body) =>{
    const response = await axios.post(
        `${serverUrl}/abastecimiento-combustible/agregar`,
        body
    );
    
    return response;
}


export const updateSupply = async (id, body) => {
    try {
        console.log(id);
        console.log(body);
        const response = await axios.put(`${serverUrl}/abastecimiento-combustible/actualizar/${id}`, body);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar la abastecimiento-combustible por ID:", error);
        throw error;
    }
};