import { useSetRecoilState } from "recoil";
import { isLoadingGeneralAtom } from "../../../../state/atoms/generalAtom";
import { createVehicles } from "../../../../state/services/transportServices/vehicleServices"; 
import SkeletonModal from "../../../pieces/SkeletonModal";
import SingleVehicles from "./SingleVehicles";


function AddVehicles (props){
    const setIsLoading = useSetRecoilState(isLoadingGeneralAtom);
    const {onClose} = props;

    const submitAction = (vehicle) => {
        setIsLoading(true);
        createVehicles(vehicle).then((data) =>{
            console.log(data);
        }).finally(() =>{
            setIsLoading(false);
            onClose();
        })
    }
    return (
    

    <SkeletonModal
      title={"Nuevo Vehiculo"}
      closeAction={(e) => {
        onClose();
      }}
    >
        <SingleVehicles
            submitAction={submitAction}
            buttonName="Crear"
            edit={true}
        />
    </SkeletonModal>

    );
}

export default AddVehicles;