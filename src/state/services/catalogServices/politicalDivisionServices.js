import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const getAllProvinces = async() => {
    const response = await axios.get(
        `${serverUrl}/politicaldivision/province`
    );

    return response.data;
}

export const getAllFindByParents = async() => {
    const response = await axios.get(
        `${serverUrl}/politicaldivision/findbyparent`
    );

    return response.data;
}