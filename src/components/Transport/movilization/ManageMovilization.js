import { useState } from "react";
import SkeletonModal from "../../pieces/SkeletonModal";
import { Button, Grid, Box } from "@mui/material";
import SingleMovilization from "./SingleMovilization";
import { useSetRecoilState } from "recoil";
import { isLoadingGeneralAtom } from "../../../state/atoms/generalAtom";
import { updateMovilization } from "../../../state/services/transportServices/movilizationServices";

function ManageMovilization(props) {
    const [isEdit, setisEdit] = useState(false);
    const { onClose, movilizationToShow } = props;
    const setIsLoading = useSetRecoilState(isLoadingGeneralAtom);

    const submitAction = (movilization) => {

        setIsLoading(true);
        updateMovilization(movilizationToShow.id, movilization).then((data) => {
            console.log(data);
        }).finally(() => {
            setIsLoading(false);
            onClose();
        })
    }



    return (
        <SkeletonModal
            title={movilizationToShow?.vehiculo}
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
                    <SingleMovilization
                        submitAction={submitAction}
                        edit={true}
                        Movilization={movilizationToShow}
                        buttonName="Actualizar"
                    >

                    </SingleMovilization>
                </Box>
            ) : (
                <Box>
                    <SingleMovilization
                        submitAction={null}
                        edit={false}
                        movilization={movilizationToShow}
                    >

                    </SingleMovilization>

                </Box>
            )}

        </SkeletonModal>
    );

}

export default ManageMovilization;