import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  allTypesAtom,
  allTypesByLevelAtom,
  typeSelectedAtom,
  typesTreeAtom,
} from "../atoms/typeAtoms";
import { errorMessageAtom, isLoadingGeneralAtom } from "../atoms/generalAtom";
import { useEffect } from "react";
import {
  getAllTypesByLevel,
  getAllTypesTreeById,
} from "../services/catalogServices/typeServices";

export function useType() {
  const setTypesByLevel = useSetRecoilState(allTypesByLevelAtom);
  const setTypesTree = useSetRecoilState(typesTreeAtom);
  const setIsLoading = useSetRecoilState(isLoadingGeneralAtom);
  const setAllTypes = useSetRecoilState(allTypesAtom);
  const setErrorMessage = useSetRecoilState(errorMessageAtom);

  const typeSelected = useRecoilValue(typeSelectedAtom);

  useEffect(() => {
    setIsLoading(true);
    getAllTypesByLevel(0)
      .then((data) => {
        setTypesByLevel(data);
      })
      .finally((_) => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (typeSelected?.id) {
      getAllTypesByLevel(typeSelected.id)
        .then((data) => {
          setTypesByLevel(data);
          getAllTypesTreeById(typeSelected.id)
            .then((data) => {
              setTypesTree(data);
            })
            .catch((err) => {
              if (
                err?.response?.status === 400 ||
                err?.response?.status === 401
              ) {
                setErrorMessage("Servicio no autorizado");
              }
            });
        })
        .catch((err) => {
          if (err?.response?.status === 400 || err?.response?.status === 401) {
            setErrorMessage("Servicio no autorizado");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      getAllTypesByLevel(0)
        .then((data) => {
          setTypesByLevel(data);
          setTypesTree([]);
        })
        .catch((err) => {
          if (err?.response?.status === 400 || err?.response?.status === 401) {
            setErrorMessage("Servicio no autorizado");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [typeSelected]);

  return;
}
