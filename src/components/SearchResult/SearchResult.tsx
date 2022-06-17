import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    id: string,
    name: string,
    imgUrl: string
}

export const SearchResult:FunctionComponent<Props> = ({id, imgUrl, name}) => {

    let navigate = useNavigate();
    const routeChange = () => {
        let path = 'drink?drinkId='+id;
        navigate(path);
    }

    return(
        <div className="flex transition-all ease-in-out hover:shadow-md rounded-md" onClick={routeChange}>
            <img src={imgUrl} className="w-24 h-24 rounded-l-md" />
            <div className="bg-slate-50 flex flex-col w-72 text-left p-4 rounded-r-md">
                <div className="my-auto">
                    <h3 className="text-lg font-semibold text-slate-600">{name}</h3>
                </div>
            </div>
        </div>
    );

}