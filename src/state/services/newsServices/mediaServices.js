import axios from "axios";

const serverUrl = 'http://localhost:8080';
//process.env.REACT_APP_SERVER_URL;


export const getAllMedios = async () => {
    const response = await axios.get(
        `${serverUrl}/medios`
    );

    return response.data;
}

export const getMediosById = async (id) => {
    try {
        const response = await axios.get(`${serverUrl}/medios/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el medio por ID:", error);
        throw error;
    }
}

export const createMedios = async (body) => {
    const response = await axios.post(
        `${serverUrl}/medios`,
        body
    );

    return response.data;
}

export const updateMedios = async (id, body) => {
    try {
        const response = await axios.put(`${serverUrl}/medios/${id}`, body);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el medio por ID:", error);
        throw error;
    }
};