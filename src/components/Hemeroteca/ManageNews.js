import React, { useState } from "react";
import SkeletonModal from "../pieces/SkeletonModal";
import { Button, Grid, Box } from "@mui/material";
import SingleNews from "./SingleNews";
import { useSetRecoilState } from "recoil";
import { isLoadingGeneralAtom } from "../../state/atoms/generalAtom";
import { updateNews } from "../../state/services/catalogServices/newsServices";

function ManageNews(props) {
    const [isEdit, setisEdit] = useState(false);
    const { onClose, newsToShow } = props;
    const setIsLoading = useSetRecoilState(isLoadingGeneralAtom);

    // Obtener roles del usuario desde sessionStorage
    const userRoles = JSON.parse(sessionStorage.getItem("userRoles"));

    // Función para verificar si el usuario tiene el rol específico
    const hasRole = (roleToCheck) => userRoles.includes(roleToCheck);

    const submitAction = (news) => {
        setIsLoading(true);
        updateNews(newsToShow.id, news)
            .then((data) => {
                console.log(data);
            })
            .finally(() => {
                setIsLoading(false);
                onClose();
            });
    };

    return (
        <SkeletonModal
            title={newsToShow?.resumen}
            closeAction={(e) => {
                onClose();
            }}
        >
            <Grid container>
                <Grid item xs={6}>
                    {hasRole("Hemeroteca User") ? null : (
                        <Button
                            sx={{
                                backgroundColor: (theme) =>
                                    !isEdit ? theme.palette.secondary.main : "none",
                            }}
                            onClick={() => {
                                setisEdit(false);
                            }}
                        >
                            Ver
                        </Button>
                    )}
                </Grid>

                <Grid item xs={6}>
                    {hasRole("Hemeroteca User") ? null : (
                        <Button
                            sx={{
                                backgroundColor: (theme) =>
                                    !isEdit ? theme.palette.secondary.main : "none",
                            }}
                            onClick={() => {
                                setisEdit(true);
                            }}
                        >
                            Editar
                        </Button>
                    )}
                </Grid>
            </Grid>

            {isEdit ? (
                <Box>
                    <SingleNews
                        submitAction={submitAction}
                        edit={true}
                        news={newsToShow}
                        buttonName="Actualizar"
                    />
                </Box>
            ) : (
                <Box>
                    <SingleNews submitAction={null} edit={false} news={newsToShow} />
                </Box>
            )}
        </SkeletonModal>
    );
}

export default ManageNews;
