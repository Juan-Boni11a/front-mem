import { useState } from "react";
import SkeletonModal from "../../../pieces/SkeletonModal";
import { Box } from "@mui/material";
import Approval from "./Approval";
import { useSetRecoilState } from "recoil";
import { isLoadingGeneralAtom } from "../../../../state/atoms/generalAtom";
import { updateMovilization } from "../../../../state/services/transportServices/movilizationServices";

function Decide(props) {
    const [isEdit] = useState(true);
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
            title={movilizationToShow?.funcionario}
            closeAction={(e) => {
                onClose();
            }}
        >
            
                
                

            {isEdit ? (
                <Box>
                    <Approval
                        submitAction={submitAction}
                        edit={true}
                        movilization={movilizationToShow}
                        buttonName="Actualizar"
                    >

                    </Approval>
                </Box>
            ) : (
                <Box>
                    <Approval
                        submitAction={null}
                        edit={false}
                        movilization={movilizationToShow}
                    >

                    </Approval>

                </Box>
            )}

        </SkeletonModal>
    );

}

export default Decide;