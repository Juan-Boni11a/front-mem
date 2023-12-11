import axios from "axios";

const serverUrl = 'http://localhost:8080';

export const getAllSubsectors = async () => {
    const response = await axios.get(
        `${serverUrl}/subsector`
    );

    return response.data;
}

export const getSubsectorById = async (id) => {
    try {
        const response = await axios.get(`${serverUrl}/subsector/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el subsector por ID:", error);
        throw error;
    }
}

export const createSubsector = async (body) => {
    const response = await axios.post(
        `${serverUrl}/subsector`,
        body
    );

    return response.data;
}

export const updateSubsector = async (id, body) => {
    try {
        const response = await axios.put(`${serverUrl}/subsector/${id}`, body);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el subsector por ID:", error);
        throw error;
    }
};

// Nueva función para buscar por sector
export const getSubsectorsBySector = async (sector) => {
    try {
        const response = await axios.get(`${serverUrl}/subsector/by-sector/${sector}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener subsectores por sector:", error);
        throw error;
    }
};
