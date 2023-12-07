import { useSetRecoilState } from "recoil";
import { isLoadingGeneralAtom } from "../../../state/atoms/generalAtom";
import { createTransportation } from "../../../state/services/transportServices/transportationServices";
import SkeletonModal from "../../pieces/SkeletonModal";
import SingleTransportation from "./SingleTransportation";


function AddTransportation (props){
    const setIsLoading = useSetRecoilState(isLoadingGeneralAtom);
    const {onClose} = props;

    const submitAction = (transportation) => {
        setIsLoading(true);
        createTransportation(transportation).then((data) =>{
            console.log(data);
        }).finally(() =>{
            setIsLoading(false);
            onClose();
        })
    }
    return (
    

    <SkeletonModal
      title={"Nueva Solicitud de Transporte"}
      closeAction={(e) => {
        onClose();
      }}
    >
        <SingleTransportation
            submitAction={submitAction}
            buttonName="Crear"
            edit={true}
        />
    </SkeletonModal>

    );
}

export default AddTransportation;