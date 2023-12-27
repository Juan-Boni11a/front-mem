import { useState } from "react";
import SkeletonModal from "../../pieces/SkeletonModal";
import { Button, Grid, Box } from "@mui/material";
import Approval from "./Approval";
import { useSetRecoilState } from "recoil";
import { isLoadingGeneralAtom } from "../../../state/atoms/generalAtom";
import { updateMaintenance } from "../../../state/services/transportServices/maintenanceServices";

function Decide(props) {
    const [isEdit, setisEdit] = useState(true);
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
            
            {isEdit ? (
                <Box>
                    <Approval
                        submitAction={submitAction}
                        edit={true}
                        maintenance={maintenanceToShow}
                        buttonName="Actualizar"
                    >

                    </Approval>
                </Box>
            ) : (
                <Box>
                    <Approval
                        submitAction={null}
                        edit={false}
                        maintenance={maintenanceToShow}
                    >

                    </Approval>

                </Box>
            )}

        </SkeletonModal>
    );

}

export default Decide;