import { useSetRecoilState } from "recoil";
import { allCategoriesAtom } from "../atoms/categoryAtoms";
import { errorMessageAtom, isLoadingGeneralAtom } from "../atoms/generalAtom";
import { useEffect } from "react";
import { getAllCategories } from "../services/catalogServices/categoryServices";

export function useCategories(){
    const setIsLoading = useSetRecoilState(isLoadingGeneralAtom);
    const setAllCategories = useSetRecoilState(allCategoriesAtom);
    const setErrorMessage = useSetRecoilState(errorMessageAtom);
    
    
    useEffect(() => {
        setIsLoading(true);
        getAllCategories()
            .then((data) => {
                setAllCategories(data);
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