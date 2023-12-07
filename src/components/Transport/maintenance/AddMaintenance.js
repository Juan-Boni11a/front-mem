import { useSetRecoilState } from "recoil";
import { isLoadingGeneralAtom } from "../../../state/atoms/generalAtom";
import { createMaintenance } from "../../../state/services/transportServices/maintenanceServices";
import SkeletonModal from "../../pieces/SkeletonModal";
import SingleMaintenance from "./SingleMaintenance";


function AddMaintenance (props){
    const setIsLoading = useSetRecoilState(isLoadingGeneralAtom);
    const {onClose} = props;

    const submitAction = (maintenance) => {
        setIsLoading(true);
        createMaintenance(maintenance).then((data) =>{
            console.log(data);
        }).finally(() =>{
            setIsLoading(false);
            onClose();
        })
    }
    return (
    

    <SkeletonModal
      title={"Nueva Solicitud de Mantenimiento"}
      closeAction={(e) => {
        onClose();
      }}
    >
        <SingleMaintenance
            submitAction={submitAction}
            buttonName="Crear"
            edit={true}
        />
    </SkeletonModal>

    );
}

export default AddMaintenance;