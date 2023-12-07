import { useSetRecoilState } from "recoil";
import { isLoadingGeneralAtom } from "../../state/atoms/generalAtom";
import { createNews } from "../../state/services/catalogServices/newsServices";
import SkeletonModal from "../pieces/SkeletonModal";
import SingleNews from "./SingleNews";


function AddNews (props){
    const setIsLoading = useSetRecoilState(isLoadingGeneralAtom);
    const {onClose} = props;

    const submitAction = (news) => {
        setIsLoading(true);
        createNews(news).then((data) =>{
            console.log(data);
        }).finally(() =>{
            setIsLoading(false);
            onClose();
        })
    }
    return (
    

    <SkeletonModal
      title={"Nueva Noticia"}
      closeAction={(e) => {
        onClose();
      }}
    >
        <SingleNews
            submitAction={submitAction}
            buttonName="Crear"
            edit={true}
        />
    </SkeletonModal>

    );
}

export default AddNews;