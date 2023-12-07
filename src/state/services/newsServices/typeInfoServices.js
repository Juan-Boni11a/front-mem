import axios from "axios";

const serverUrl = 'http://localhost:8080';
//process.env.REACT_APP_SERVER_URL;


export const getAllTypeInfo = async () => {
    const response = await axios.get(
        `${serverUrl}/typeInfo`
    );

    return response.data;
}

export const getTypeInfoById = async (id) => {
    try {
        const response = await axios.get(`${serverUrl}/typeInfo/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el medio por ID:", error);
        throw error;
    }
}

export const createTypeInfo = async (body) => {
    const response = await axios.post(
        `${serverUrl}/typeInfo`,
        body
    );

    return response.data;
}

export const updateTypeInfo = async (id, body) => {
    try {
        const response = await axios.put(`${serverUrl}/typeInfo/${id}`, body);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el medio por ID:", error);
        throw error;
    }
};