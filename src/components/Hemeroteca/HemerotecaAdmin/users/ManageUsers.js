import { useState } from "react";
import SkeletonModal from "../../../pieces/SkeletonModal";
import { Button, Grid, Box } from "@mui/material";
import SingleUser from "./SingleUser";
import { useSetRecoilState } from "recoil";
import { isLoadingGeneralAtom } from "../../../../state/atoms/generalAtom";
import { updateUsers } from "../../../../state/services/catalogServices/NewsUserServices";

function ManageUsers(props) {
    const [isEdit, setisEdit] = useState(false);
    const { onClose, userToShow } = props;
    const setIsLoading = useSetRecoilState(isLoadingGeneralAtom);

    const submitAction = (user) => {

        setIsLoading(true);
        updateUsers(userToShow.id, user).then((data) => {
            console.log(data);
        }).finally(() => {
            setIsLoading(false);
            onClose();
        })
    }



    return (
        <SkeletonModal
            title={userToShow?.username}
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
                    <SingleUser
                        submitAction={submitAction}
                        edit={true}
                        user={userToShow}
                        buttonName="Actualizar"
                    >

                    </SingleUser>
                </Box>
            ) : (
                <Box>
                    <SingleUser
                        submitAction={null}
                        edit={false}
                        user={userToShow}
                    >

                    </SingleUser>

                </Box>
            )}

        </SkeletonModal>
    );

}

export default ManageUsers;