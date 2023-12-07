import { useSetRecoilState } from "recoil";
import { isLoadingGeneralAtom } from "../../state/atoms/generalAtom";
import { createType, getAllTypesByLevel } from "../../state/services/catalogServices/typeServices";
import SkeletonModal from "../pieces/SkeletonModal";
import SingleType from "./SingleType";
import { allTypesByLevelAtom } from "../../state/atoms/typeAtoms";


function AddType (props){
    const setAllTypes = useSetRecoilState(allTypesByLevelAtom);
    const setIsLoading = useSetRecoilState(isLoadingGeneralAtom);
    const {onClose} = props;

    const submitAction = (type) => {
        setIsLoading(true);
        createType(type).then( async(data) =>{
            if(type.parentId == null){
                setAllTypes(await getAllTypesByLevel(0))
            } else {
                setAllTypes(await getAllTypesByLevel(type.parentId))
            }
        }).finally(() =>{
            setIsLoading(false);
            onClose();
        })
    }
    return (
    

    <SkeletonModal
      title={"Nuevo Tipo"}
      closeAction={(e) => {
        onClose();
      }}
    >
        <SingleType
            submitAction={submitAction}
            buttonName="Crear"
            edit={true}
        />
    </SkeletonModal>

    );
}

export default AddType;