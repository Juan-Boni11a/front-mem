import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const getAllTypes = async() => {
    const response = await axios.get(
        `${serverUrl}/type`
    );

    return response.data;
}

export const getAllTypesByLevel = async(level) => {
    const response = await axios.get(
        `${serverUrl}/type/parent/${level}`
    );

    return response.data;
}

export const getAllTypesTreeById = async(id) => {
    const response = await axios.get(
        `${serverUrl}/type/child/${id}`
    );

    const treeData = response.data.sort(
        (a,b) => a.id - b.id
    );
    return treeData;
}

export const createType = async(body) =>{
    const response = await axios.post(
        `${serverUrl}/type`,
        body
    );
    
    return response;
}


export const updateType = async(body) =>{
    
    const response = await axios.put(
        `${serverUrl}/type`,
        body
    );
       
    return response;
}