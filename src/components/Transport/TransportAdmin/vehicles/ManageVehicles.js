import { useState } from "react";
import SkeletonModal from "../../../pieces/SkeletonModal";
import { Button, Grid, Box } from "@mui/material";
import Singlevehicles from "./SingleVehicles";
import { useSetRecoilState } from "recoil";
import { isLoadingGeneralAtom } from "../../../../state/atoms/generalAtom";
import { updateVehicles } from "../../../../state/services/transportServices/vehicleServices"; 

function ManageVehicles(props) {
    const [isEdit, setisEdit] = useState(false);
    const { onClose, vehiclesToShow } = props;
    const setIsLoading = useSetRecoilState(isLoadingGeneralAtom);

    const submitAction = (vehicle) => {

        setIsLoading(true);
        updateVehicles(vehiclesToShow.nplaca, vehicle).then((data) => {
            console.log(data);
        }).finally(() => {
            setIsLoading(false);
            onClose();
        })
    }



    return (
        <SkeletonModal
            title={vehiclesToShow?.nplaca}
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
                    <Singlevehicles
                        submitAction={submitAction}
                        edit={true}
                        vehicle={vehiclesToShow}
                        buttonName="Actualizar"
                    >

                    </Singlevehicles>
                </Box>
            ) : (
                <Box>
                    <Singlevehicles
                        submitAction={null}
                        edit={false}
                        vehicle={vehiclesToShow}
                    >

                    </Singlevehicles>

                </Box>
            )}

        </SkeletonModal>
    );

}

export default ManageVehicles;