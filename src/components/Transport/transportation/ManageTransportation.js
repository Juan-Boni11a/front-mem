import { useState } from "react";
import SkeletonModal from "../../pieces/SkeletonModal";
import { Button, Grid, Box } from "@mui/material";
import SingleTransportation from "./SingleTransportation";
import { useSetRecoilState } from "recoil";
import { isLoadingGeneralAtom } from "../../../state/atoms/generalAtom";
import { updateTransportation } from "../../../state/services/transportServices/transportationServices";

function ManageTransportation(props) {
    const [isEdit, setisEdit] = useState(false);
    const { onClose, transportationToShow } = props;
    const setIsLoading = useSetRecoilState(isLoadingGeneralAtom);

    const submitAction = (transportation) => {

        setIsLoading(true);
        updateTransportation(transportationToShow.id, transportation).then((data) => {
            console.log(data);
        }).finally(() => {
            setIsLoading(false);
            onClose();
        })
    }



    return (
        <SkeletonModal
            title={transportationToShow?.funcionario}
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
                    <SingleTransportation
                        submitAction={submitAction}
                        edit={true}
                        transportation={transportationToShow}
                        buttonName="Actualizar"
                    >

                    </SingleTransportation>
                </Box>
            ) : (
                <Box>
                    <SingleTransportation
                        submitAction={null}
                        edit={false}
                        transportation={transportationToShow}
                    >

                    </SingleTransportation>

                </Box>
            )}

        </SkeletonModal>
    );

}

export default ManageTransportation;