import { useState } from "react";
import SkeletonModal from "../../../pieces/SkeletonModal";
import { Button, Grid, Box } from "@mui/material";
import SingleDrivers from "./SingleDrivers";
import { useSetRecoilState } from "recoil";
import { isLoadingGeneralAtom } from "../../../../state/atoms/generalAtom";
import { updateDrivers } from "../../../../state/services/transportServices/driverServices";

function ManageDrivers(props) {
    const [isEdit, setisEdit] = useState(false);
    const { onClose, driversToShow } = props;
    const setIsLoading = useSetRecoilState(isLoadingGeneralAtom);

    const submitAction = (driver) => {

        setIsLoading(true);
        updateDrivers(driversToShow.id, driver).then((data) => {
            console.log(data);
        }).finally(() => {
            setIsLoading(false);
            onClose();
        })
    }



    return (
        <SkeletonModal
            title={driversToShow?.nombre}
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
                    <SingleDrivers
                        submitAction={submitAction}
                        edit={true}
                        driver={driversToShow}
                        buttonName="Actualizar"
                    >

                    </SingleDrivers>
                </Box>
            ) : (
                <Box>
                    <SingleDrivers
                        submitAction={null}
                        edit={false}
                        driver={driversToShow}
                    >

                    </SingleDrivers>

                </Box>
            )}

        </SkeletonModal>
    );

}

export default ManageDrivers;