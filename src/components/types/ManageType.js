import { useState } from "react";
import SkeletonModal from "../pieces/SkeletonModal";
import { Button, Grid, Box } from "@mui/material";
import SingleType from "./SingleType";
import { useSetRecoilState } from "recoil";
import { isLoadingGeneralAtom } from "../../state/atoms/generalAtom";
import { getAllTypesByLevel, updateType} from "../../state/services/catalogServices/typeServices";
import { allTypesByLevelAtom } from "../../state/atoms/typeAtoms";

function ManageType(props) {
    const [isEdit, setisEdit] = useState(false);
    const { onClose, typeToShow } = props;

    const setIsLoading = useSetRecoilState(isLoadingGeneralAtom);
    const setAllTypes = useSetRecoilState(allTypesByLevelAtom);

    const submitAction = (type) => {
        setIsLoading(true);
        updateType(type).then( async (data) => {
            if(type.parentId == null){
                setAllTypes(await getAllTypesByLevel(0));
            } else {
                setAllTypes(await getAllTypesByLevel(type.parentId))
            }
        }).finally(() => {
            setIsLoading(false);
            onClose();
        })
    }


    return (
        <SkeletonModal
            title={typeToShow?.name}
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
                    <SingleType
                        submitAction={submitAction}
                        edit={true}
                        type={typeToShow}
                        buttonName="Actualizar"
                    >

                    </SingleType>
                </Box>
            ) : (
                <Box>
                    <SingleType
                        submitAction={null}
                        edit={false}
                        type={typeToShow}
                    >

                    </SingleType>

                </Box>
            )}

        </SkeletonModal>
    );

}

export default ManageType;