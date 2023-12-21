import { useSetRecoilState } from "recoil";
import { isLoadingGeneralAtom } from "../../../../state/atoms/generalAtom";
import { createUsers } from "../../../../state/services/transportServices/userServices";
import SkeletonModal from "../../../pieces/SkeletonModal";
import Singleuser from "./SingleUser";


function AddUsers (props){
    const setIsLoading = useSetRecoilState(isLoadingGeneralAtom);
    const {onClose} = props;

    const submitAction = (user) => {
        setIsLoading(true);
        createUsers(user).then((data) =>{
            console.log(data);
        }).finally(() =>{
            setIsLoading(false);
            onClose();
        })
    }
    return (
    

    <SkeletonModal
      title={"Nuevo Usuario"}
      closeAction={(e) => {
        onClose();
      }}
    >
        <Singleuser
            submitAction={submitAction}
            buttonName="Crear"
            edit={true}
        />
    </SkeletonModal>

    );
}

export default AddUsers;