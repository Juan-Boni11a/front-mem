import { useSetRecoilState } from "recoil";
import { allUpsesAtom } from "../atoms/upseAtoms";
import { errorMessageAtom, isLoadingGeneralAtom } from "../atoms/generalAtom";
import { useEffect } from "react";
import { getAllUpses } from "../services/catalogServices/upseServices";

export function useUpses(){
    const setIsLoading = useSetRecoilState(isLoadingGeneralAtom);
    const setAllUpses = useSetRecoilState(allUpsesAtom);
    const setErrorMessage = useSetRecoilState(errorMessageAtom);
    
    
    useEffect(() => {
        setIsLoading(true);
        getAllUpses()
            .then((data) => {
                setAllUpses(data);
            })
            .catch((err) => {
                if (err?.response?.status === 400 || err?.response?.status === 401) {
                    setErrorMessage("Servicio no autorizado");
                }
            })
            .finally(() =>{
                setIsLoading(false);
            })
    });
}