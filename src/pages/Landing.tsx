import { AnimateSharedLayout, motion, MotionConfig } from "framer-motion";
import { FunctionComponent, useState } from "react";
import { CupStraw } from "react-bootstrap-icons";
import { SearchResult } from "../components/SearchResult";
import { queryDrinks } from "../services/QueryDrinks";

export const Landing:FunctionComponent = () => {

    const [searched, setSearched] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [lastSearch, setLastSearch] = useState("");
    const [drinks, setDrinks] = useState([]);
    const [loading, setLoading] = useState(false);

    return(
        <div className="flex h-screen justify-center">
            <div className="flex flex-col w-screen justify-center space-y-4">
                <div className="flex flex-col justify-center items-center text-center space-y-4">
                    <h1 className="text-3xl font-bold text-slate-700 flex">BarBuddy<CupStraw className="text-slate-700"/></h1>
                    
                    <input 
                        type={"text"} 
                        className="bg-slate-100 p-2 rounded-md w-4/5 md:w-96 text-center focus:drop-shadow-lg outline-none text-slate-700" 
                        placeholder="Look for a drink..."
                        onChange={e => setSearchQuery(e.target.value)}
                        onKeyUp={
                            (e) => {
                                if(e.key === "Enter" && searchQuery !== ""){
                                    setLoading(true);
                                    queryDrinks(searchQuery)
                                        .then(response => setDrinks(response.drinks))
                                        .then(() => {setSearched(true); setLoading(false); setLastSearch(searchQuery)});
                                
                                }
                            }
                        }
                        ></input>
                </div>

                {
                    drinks === null &&
                    <div className="text-center">

                        <p className="mx-auto font-semibold text-slate-500">Sorry, We couldn't find anything for "{lastSearch}"</p>

                    </div>
                }

                {
                    searched && drinks !== null &&
                    <div className="max-h-[34rem] mx-auto p-2 space-y-2 overflow-auto" id="search_results">

                        {
                            drinks.map(
                                drink => <SearchResult id={drink["idDrink"]} imgUrl={drink["strDrinkThumb"]} name={drink["strDrink"]} />
                            )
                        }

                    </div>
                }
                
                <div className="flex justify-center">
                    <p className="my-auto text-slate-400">Sean Preston 2022 • <a href="https://github.com/seanpreston2904">GitHub</a> • <a href="https://www.linkedin.com/in/sean-preston-2904/">LinkedIn</a></p>
                </div>

            </div>
        </div>
    );

}