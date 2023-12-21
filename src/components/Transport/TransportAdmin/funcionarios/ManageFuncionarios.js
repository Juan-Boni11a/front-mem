import { useState } from "react";
import SkeletonModal from "../../../pieces/SkeletonModal";
import { Button, Grid, Box } from "@mui/material";
import SingleFuncionario from "./SingleFuncionario";
import { useSetRecoilState } from "recoil";
import { isLoadingGeneralAtom } from "../../../../state/atoms/generalAtom";
import { updateFuncionarios } from "../../../../state/services/transportServices/funcionarioServices";

function ManageFuncionarios(props) {
    const [isEdit, setisEdit] = useState(false);
    const { onClose, funcionarioToShow } = props;
    const setIsLoading = useSetRecoilState(isLoadingGeneralAtom);

    const submitAction = (funcionario) => {

        setIsLoading(true);
        updateFuncionarios(funcionarioToShow.id, funcionario).then((data) => {
            console.log(data);
        }).finally(() => {
            setIsLoading(false);
            onClose();
        })
    }



    return (
        <SkeletonModal
            title={funcionarioToShow?.name}
            closeAction={(e) => {
                onClose();
            }}
        >
            <Grid container>
                <Grid item xs={6}>

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
                </Grid>

                <Grid item xs={6}>
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
                </Grid>


            </Grid>

            {isEdit ? (
                <Box>
                    <SingleFuncionario
                        submitAction={submitAction}
                        edit={true}
                        funcionario={funcionarioToShow}
                        buttonName="Actualizar"
                    >

                    </SingleFuncionario>
                </Box>
            ) : (
                <Box>
                    <SingleFuncionario
                        submitAction={null}
                        edit={false}
                        funcionario={funcionarioToShow}
                    >

                    </SingleFuncionario>

                </Box>
            )}

        </SkeletonModal>
    );

}

export default ManageFuncionarios;