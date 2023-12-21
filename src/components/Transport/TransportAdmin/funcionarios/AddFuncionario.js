import { useSetRecoilState } from "recoil";
import { isLoadingGeneralAtom } from "../../../../state/atoms/generalAtom";
import { createFuncionarios } from "../../../../state/services/transportServices/funcionarioServices";
import SkeletonModal from "../../../pieces/SkeletonModal";
import SingleFuncionario from "./SingleFuncionario";


function AddFuncionario (props){
    const setIsLoading = useSetRecoilState(isLoadingGeneralAtom);
    const {onClose} = props;

    const submitAction = (funcionario) => {
        setIsLoading(true);
        createFuncionarios(funcionario).then((data) =>{
            console.log(data);
        }).finally(() =>{
            setIsLoading(false);
            onClose();
        })
    }
    return (
    

    <SkeletonModal
      title={"Nuevo Funcionario"}
      closeAction={(e) => {
        onClose();
      }}
    >
        <SingleFuncionario
            submitAction={submitAction}
            buttonName="Crear"
            edit={true}
        />
    </SkeletonModal>

    );
}

export default AddFuncionario;