import { useState } from "react";
import SkeletonModal from "../../pieces/SkeletonModal";
import { Button, Grid, Box } from "@mui/material";
import SingleSupply from "./SingleSupply";
import { useSetRecoilState } from "recoil";
import { isLoadingGeneralAtom } from "../../../state/atoms/generalAtom";
import { updateSupply } from "../../../state/services/transportServices/supplyServices";

function ManageSupply(props) {
    const [isEdit, setisEdit] = useState(false);
    const { onClose, supplyToShow } = props;
    const setIsLoading = useSetRecoilState(isLoadingGeneralAtom);

    const submitAction = (Supply) => {

        setIsLoading(true);
        updateSupply(supplyToShow.id, Supply).then((data) => {
            console.log(data);
        }).finally(() => {
            setIsLoading(false);
            onClose();
        })
    }



    return (
        <SkeletonModal
            title={supplyToShow?.fechaAbastecimiento}
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
                    <SingleSupply
                        submitAction={submitAction}
                        edit={true}
                        supply={supplyToShow}
                        buttonName="Actualizar"
                    >

                    </SingleSupply>
                </Box>
            ) : (
                <Box>
                    <SingleSupply
                        submitAction={null}
                        edit={false}
                        supply={supplyToShow}
                    >

                    </SingleSupply>

                </Box>
            )}

        </SkeletonModal>
    );

}

export default ManageSupply;