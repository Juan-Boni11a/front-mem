import { useState } from "react";
import SkeletonModal from "../../pieces/SkeletonModal";
import { Button, Grid, Box } from "@mui/material";
import SingleMaintenance from "./SingleMaintenance";
import { useSetRecoilState } from "recoil";
import { isLoadingGeneralAtom } from "../../../state/atoms/generalAtom";
import { updateMaintenance } from "../../../state/services/transportServices/maintenanceServices";

function ManageMaintenance(props) {
    const [isEdit, setisEdit] = useState(false);
    const { onClose, maintenanceToShow } = props;
    const setIsLoading = useSetRecoilState(isLoadingGeneralAtom);

    const submitAction = (maintenance) => {
        
        setIsLoading(true);
        updateMaintenance(maintenanceToShow.id,maintenance).then((data) => {
            console.log(data);
        }).finally(() => {
            setIsLoading(false);
            onClose();
        })
    }

       

    return (
        <SkeletonModal
            title={maintenanceToShow?.vehiculo}
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
                    <SingleMaintenance
                        submitAction={submitAction}
                        edit={true}
                        maintenance={maintenanceToShow}
                        buttonName="Actualizar"
                    >

                    </SingleMaintenance>
                </Box>
            ) : (
                <Box>
                    <SingleMaintenance
                        submitAction={null}
                        edit={false}
                        maintenance={maintenanceToShow}
                    >

                    </SingleMaintenance>

                </Box>
            )}

        </SkeletonModal>
    );

}

export default ManageMaintenance;