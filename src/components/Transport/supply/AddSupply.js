import { useSetRecoilState } from "recoil";
import { isLoadingGeneralAtom } from "../../../state/atoms/generalAtom";
import { createSupply } from "../../../state/services/transportServices/supplyServices";
import SkeletonModal from "../../pieces/SkeletonModal";
import SingleSupply from "./SingleSupply";


function AddSupply (props){
    const setIsLoading = useSetRecoilState(isLoadingGeneralAtom);
    const {onClose} = props;

    const submitAction = (Supply) => {
        setIsLoading(true);
        createSupply(Supply).then((data) =>{
            console.log(data);
        }).finally(() =>{
            setIsLoading(false);
            onClose();
        })
    }
    return (
    

    <SkeletonModal
      title={"Nueva Solicitud de Abastecimiento"}
      closeAction={(e) => {
        onClose();
      }}
    >
        <SingleSupply
            submitAction={submitAction}
            buttonName="Crear"
            edit={true}
        />
    </SkeletonModal>

    );
}

export default AddSupply;