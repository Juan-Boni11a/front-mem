import { useEffect, useState } from "react";
import { ModalTextField, ModalFormControl, InputLabelGreyStyled, ButtonStyled } from "../../utils/StyledComponents";
import { MenuItem, Select, Box } from "@mui/material";
import { getAllMedios } from "../../state/services/newsServices/mediaServices";

function SingleNews(props) {

  const [fechaRegistro, setFechaRegistro] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [fechaNoticia, setFechaNoticia] = useState("");
  const [seccion, setSeccion] = useState("");
  const [noPagina, setNoPagina] = useState("");
  const [sector, setSector] = useState("");
  const [subsector, setSubsector] = useState("");
  const [informacion, setInformacion] = useState("");
  const [medio, setMedio] = useState("");
  const [fuente, setFuente] = useState("");
  const [tendencia, setTendencia] = useState("");
  const [resumen, setResumen] = useState("");
  const [opinion, setOpinion] = useState("");
  const [comentario, setComentario] = useState("");

  const [imagen, setImagen] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);


  const { submitAction, buttonName, news, edit } = props;

  useEffect(() => {
    if (news) {
      setFechaRegistro(news.fechaRegistro);
      setNombreUsuario(news.nombreUsuario);
      setFechaNoticia(news.fechaNoticia);
      setSeccion(news.seccion);
      setNoPagina(news.noPagina);
      setSector(news.sector);
      setSubsector(news.subsector);
      setInformacion(news.informacion);
      setMedio(news.medio);
      setFuente(news.fuente);
      setTendencia(news.tendencia);
      setResumen(news.resumen);
      setOpinion(news.opinion);
      setComentario(news.comentario);
      setImagen(news.imagen);

    }
  }, [news]);

  const buildNews = () => {
    return { imagen, fechaRegistro, nombreUsuario, fechaNoticia, seccion, noPagina, sector, subsector, informacion, medio, fuente, tendencia, resumen, opinion, comentario };

  }

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImagen(selectedImage);

    // Vista previa de la imagen seleccionada
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setPreviewImage(null);
    }
  };


const [mediosOptions, setMediosOptions] = useState([]);

  useEffect(() => {
    // Cargar los medios al montar el componente
    async function fetchMedios() {
      try {
        const mediosData = await getAllMedios();
        // Extraer los nombres de los medios
        const mediosNombres = mediosData.map((medio) => medio.nombre);
        setMediosOptions(mediosNombres);
      } catch (error) {
        console.error('Error al cargar los medios:', error);
        // Manejar el error según tus necesidades
      }
    }

    fetchMedios();
  }, []);

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const news = buildNews();
      submitAction(news);
    }}>

{imagen && (
  <img
    src={`data:image/jpeg;base64,${imagen}`}
    alt="Imagen de la noticia"
    style={{ width: '300px', height: '300px', objectFit: 'cover' }}
  />
)}



      <ModalTextField
        size="small"
        label={"Fecha de Registro"}
        type="date"
        value={fechaRegistro}
        required
        disabled={!edit}
        onChange={(e) => setFechaRegistro(e.target.value)}
        InputLabelProps={{
          shrink: true,
          style: {
            color: "#1b365d",
            fontWeight: 900,
          },
        }}
      />

<ModalTextField
        size="small"
        label={"Nombre de Usuario"}
        value={nombreUsuario}
        required
        disabled={!edit}
        onChange={(e) => setNombreUsuario(e.target.value)}
        InputLabelProps={{
          style: {
            color: "#1b365d",
            fontWeight: 900,
          },
        }}
      />

      <ModalTextField
        size="small"
        label={"Fecha de Noticia"}
        type="date"
        value={fechaNoticia}
        required
        disabled={!edit}
        onChange={(e) => setFechaNoticia(e.target.value)}
        InputLabelProps={{
          shrink: true,
          style: {
            color: "#1b365d",
            fontWeight: 900,
          },
        }}
      />

      <ModalTextField
        size="small"
        label={"Sección"}
        value={seccion}
        required
        disabled={!edit}
        onChange={(e) => setSeccion(e.target.value)}
        InputLabelProps={{
          style: {
            color: "#1b365d",
            fontWeight: 900,
          },
        }}
      />

<ModalTextField
        size="small"
        label={"No. Página"}
        type="number"
        value={noPagina}
        required
        disabled={!edit}
        onChange={(e) => setNoPagina(e.target.value)}
        InputLabelProps={{
          style: {
            color: "#1b365d",
            fontWeight: 900,
          },
        }}
      />

<ModalFormControl>
        <InputLabelGreyStyled id="sector">Sector Referente a la Noticia</InputLabelGreyStyled>
        <Select
          size="small"
          labelId="sector"
          value={sector}
          disabled={!edit}
          label="Sector"
          onChange={(e) => {
            setSector(e.target.value);
          }}
        >
          <MenuItem value={"Hidrocarburos"}>Hidrocarburos</MenuItem>
          <MenuItem value={"Minas"}>Minas</MenuItem>
          {/* Otros valores para sector */}
        </Select>
      </ModalFormControl>

      <ModalFormControl>
        <InputLabelGreyStyled id="subsector">Subsector</InputLabelGreyStyled>
        <Select
          size="small"
          labelId="subsector"
          value={subsector}
          disabled={!edit}
          label="Subsector"
          onChange={(e) => {
            setSubsector(e.target.value);
          }}
        >
          <MenuItem value={"Subsector1"}>Subsector 1</MenuItem>
          <MenuItem value={"Subsector2"}>Subsector 2</MenuItem>
          {/* Otros valores para subsector */}
        </Select>
      </ModalFormControl>

<ModalFormControl>
        <InputLabelGreyStyled id="informacion">Tipo de Información</InputLabelGreyStyled>
        <Select
          size="small"
          labelId="informacion"
          value={informacion}
          disabled={!edit}
          label="Informacion"
          onChange={(e) => {
            setInformacion(e.target.value);
          }}
        >
          <MenuItem value={"Tipo 1"}>Tipo 1</MenuItem>
          <MenuItem value={"Tipo 2"}>Tipo 2</MenuItem>
       
        </Select>
      </ModalFormControl>


      <ModalFormControl>
      <InputLabelGreyStyled id="medio">Medio de Comunicación</InputLabelGreyStyled>
      <Select
        size="small"
        labelId="medio"
        value={medio}
        disabled={!edit}
        label="Medio"
        onChange={(e) => {
          setMedio(e.target.value);
        }}
      >
        {mediosOptions.map((medioOption) => (
          <MenuItem key={medioOption} value={medioOption}>
            {medioOption}
          </MenuItem>
        ))}
      </Select>
    </ModalFormControl>

      <ModalTextField
        size="small"
        label={"Fuente"}
        value={fuente}
        required
        disabled={!edit}
        onChange={(e) => setFuente(e.target.value)}
        InputLabelProps={{
          style: {
            color: "#1b365d",
            fontWeight: 900,
          },
        }}
      />

    

      

      <ModalFormControl>
        <InputLabelGreyStyled id="tendencia">Tendencia</InputLabelGreyStyled>
        <Select
          size="small"
          labelId="tendencia"
          value={tendencia}
          disabled={!edit}
          label="Tendencia"
          onChange={(e) => {
            setTendencia(e.target.value);
          }}
        >
          <MenuItem value={"Positiva"}>Positiva</MenuItem>
          <MenuItem value={"Negativa"}>Negativa</MenuItem>
          <MenuItem value={"Neutra"}>Neutra</MenuItem>
          {/* Otros valores para tendencia */}
        </Select>
      </ModalFormControl>

      <ModalTextField
        size="small"
        label={"Resumen"}
        multiline
        rows={4}
        value={resumen}
        required
        disabled={!edit}
        onChange={(e) => setResumen(e.target.value)}
        InputLabelProps={{
          style: {
            color: "#1b365d",
            fontWeight: 900,
          },
        }}
      />
<div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {previewImage && (
        <img
          src={previewImage}
          alt="Preview"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
      )}

      <input
        type="file"
        onChange={handleImageChange}
        disabled={!edit}
      />
    </div>

      <ModalTextField
        size="small"
        label={"Opiniones"}
        multiline
        rows={4}
        value={opinion}
        required
        disabled={!edit}
        onChange={(e) => setOpinion(e.target.value)}
        InputLabelProps={{
          style: {
            color: "#1b365d",
            fontWeight: 900,
          },
        }}
      />

      <ModalTextField
        size="small"
        label={"Comentario"}
        multiline
        rows={4}
        value={comentario}
        required
        disabled={!edit}
        onChange={(e) => setComentario(e.target.value)}
        InputLabelProps={{
          style: {
            color: "#1b365d",
            fontWeight: 900,
          },
        }}
      />


      {edit &&
        <Box
          sx={{
            height: "10%",
            maxHeight: "10%",
            textAlign: "center",
            paddingTop: "2%",
          }}
        >
          <ButtonStyled
            sx={{
              backgroundColor: (theme) => theme.palette.primary.light,
              paddingX: "1rem",
              width: "30%",
            }}
            type="submit"
            disabled={!edit}
          >
            {buttonName}
          </ButtonStyled>
        </Box>
      }
    </form>
  );

}

export default SingleNews;