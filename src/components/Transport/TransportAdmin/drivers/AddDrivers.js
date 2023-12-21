import { useSetRecoilState } from "recoil";
import { isLoadingGeneralAtom } from "../../../../state/atoms/generalAtom";
import { createDrivers } from "../../../../state/services/transportServices/driverServices";
import SkeletonModal from "../../../pieces/SkeletonModal";
import SingleDrivers from "./SingleDrivers";


function AddDrivers (props){
    const setIsLoading = useSetRecoilState(isLoadingGeneralAtom);
    const {onClose} = props;

    const submitAction = (driver) => {
        setIsLoading(true);
        createDrivers(driver).then((data) =>{
            console.log(data);
        }).finally(() =>{
            setIsLoading(false);
            onClose();
        })
    }
    return (
    

    <SkeletonModal
      title={"Nuevo Conductor"}
      closeAction={(e) => {
        onClose();
      }}
    >
        <SingleDrivers
            submitAction={submitAction}
            buttonName="Crear"
            edit={true}
        />
    </SkeletonModal>

    );
}

export default AddDrivers;