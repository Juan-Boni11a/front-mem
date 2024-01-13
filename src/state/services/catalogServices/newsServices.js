import axios from "axios";

const serverUrl = 'http://localhost:8081';
//process.env.REACT_APP_SERVER_URL;





export const createNews = async (body) => {
    const formData = new FormData();
    formData.append("imagen", body.imagen); // Agrega la imagen al FormData

    // Agrega otros campos del formulario al FormData
    formData.append("fechaNoticia", body.fechaNoticia);
    formData.append("fechaRegistro", body.fechaRegistro);
    formData.append("nombreUsuario", body.nombreUsuario);
    formData.append("seccion", body.seccion);
    formData.append("noPagina", body.noPagina);
    formData.append("sector", body.sector);
    formData.append("subsector", body.subsector);
    formData.append("informacion", body.informacion);
    formData.append("medio", body.medio);
    formData.append("fuente", body.fuente);
    formData.append("tendencia", body.tendencia);
    formData.append("resumen", body.resumen);
    formData.append("opinion", body.opinion);
    formData.append("comentario", body.comentario);
  

    const response = await axios.post(
        `${serverUrl}/noticia/agregar`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data", // Importante indicar que es un formulario multipart
            },
        }
    );

    return response;
};

export const getAllNews = async() => {
    console.log(serverUrl);
    const response = await axios.get(
        `${serverUrl}/noticia/obtenerNoticias`
    );

    return response.data;
}

export const getNewsById = async (id) => {
    try {
        const response = await axios.get(`${serverUrl}/noticia/obtenerNoticia/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la noticia por ID:", error);
        throw error;
    }
}




export const updateNews = async (id, body) => {
    try {

        console.log(id);
        console.log(body);


        const formData = new FormData();
        formData.append("imagen", body.imagen); // Agrega la imagen al FormData
    
        // Agrega otros campos del formulario al FormData
        formData.append("fechaNoticia", body.fechaNoticia);
        formData.append("fechaRegistro", body.fechaRegistro);
        formData.append("nombreUsuario", body.nombreUsuario);
        formData.append("seccion", body.seccion);
        formData.append("noPagina", body.noPagina);
        formData.append("sector", body.sector);
        formData.append("subsector", body.subsector);
        formData.append("informacion", body.informacion);
        formData.append("medio", body.medio);
        formData.append("fuente", body.fuente);
        formData.append("tendencia", body.tendencia);
        formData.append("resumen", body.resumen);
        formData.append("opinion", body.opinion);
        formData.append("comentario", body.comentario);

        //const response = await axios.put(`${serverUrl}/noticia/actualizar/${id}`, body);

        const response = await axios.put(`${serverUrl}/noticia/actualizar/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data", // Importante indicar que es un formulario multipart
                },
            }
        );


        return response.data;
    } catch (error) {
        console.error("Error al actualizar la noticia por ID:", error);
        throw error;
    }
};