import { useSetRecoilState } from "recoil";
import { isLoadingGeneralAtom } from "../../../state/atoms/generalAtom";
import { createMovilization } from "../../../state/services/transportServices/movilizationServices";
import SkeletonModal from "../../pieces/SkeletonModal";
import SingleMovilization from "./SingleMovilization";


function AddMovilization (props){
    const setIsLoading = useSetRecoilState(isLoadingGeneralAtom);
    const {onClose} = props;

    const submitAction = (movilization) => {
        setIsLoading(true);
        createMovilization(movilization).then((data) =>{
            console.log(data);
        }).finally(() =>{
            setIsLoading(false);
            onClose();
        })
    }
    return (
    

    <SkeletonModal
      title={"Nueva Solicitud de Movilización"}
      closeAction={(e) => {
        onClose();
      }}
    >
        <SingleMovilization
            submitAction={submitAction}
            buttonName="Crear"
            edit={true}
        />
    </SkeletonModal>

    );
}

export default AddMovilization;