import { useSetRecoilState } from "recoil";
import { allProvincesAtom } from "../atoms/politicalDivisionAtoms";
import { errorMessageAtom, isLoadingGeneralAtom } from "../atoms/generalAtom";
import { useEffect } from "react";
import { getAllProvinces } from "../services/catalogServices/politicalDivisionServices";

export function usePoliticalDivision(){
    const setIsLoading = useSetRecoilState(isLoadingGeneralAtom);
    const setAllProvinces = useSetRecoilState(allProvincesAtom);
    const setErrorMessage = useSetRecoilState(errorMessageAtom);
    
    
    useEffect(() => {
        setIsLoading(true);
        getAllProvinces()
            .then((data) => {
                setAllProvinces(data);
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