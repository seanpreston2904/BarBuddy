import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

const getIngredients = (data: any) => {

    let ingredients: Map<string, string | null> = new Map();

    for(let i = 1; i <= 15; i++){
        if(!data["drinks"][0]["strIngredient"+i]) continue;
        if(!data["drinks"][0]["strMeasure"+i]) ingredients.set(data["drinks"][0]["strIngredient"+i], null)
        ingredients.set(data["drinks"][0]["strIngredient"+i], data["drinks"][0]["strMeasure"+i]);
    }
    
    return ingredients;

}

export const DrinkDetails: React.FC = () => {

    //Extract drink ID from url params.
    const [searchParams] = useSearchParams();
    let drinkId: string = searchParams.get("drinkId") || "";

    const navigate = useNavigate();

    //Query for drink data.
    const { data, status, remove } = useQuery("drinkData", 
        async () => {

            //Fetch drink data.
            const res = await fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+drinkId);
            return res.json();

        }
    );
    
    if(status === 'loading'){ 
        return (
            <div className="flex h-screen">
                <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" className=" my-auto">
                    {/*By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL*/}
                    <defs>
                        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
                            <stop stop-color="#334155" stop-opacity="0" offset="0%"/>
                            <stop stop-color="#334155" stop-opacity=".631" offset="63.146%"/>
                            <stop stop-color="#334155" offset="100%"/>
                        </linearGradient>
                    </defs>
                    <g fill="none" fill-rule="evenodd">
                        <g transform="translate(1 1)">
                            <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2">
                                <animateTransform
                                    attributeName="transform"
                                    type="rotate"
                                    from="0 18 18"
                                    to="360 18 18"
                                    dur="0.9s"
                                    repeatCount="indefinite" />
                            </path>
                            <circle fill="#334155" cx="36" cy="18" r="1">
                                <animateTransform
                                    attributeName="transform"
                                    type="rotate"
                                    from="0 18 18"
                                    to="360 18 18"
                                    dur="0.9s"
                                    repeatCount="indefinite" />
                            </circle>
                        </g>
                    </g>
                </svg>
            </div>
            
        )
    }

    //Format Ingredients
    const ingredients = getIngredients(data);

    return(
        <AnimatePresence>
            
            <div className="flex flex-col space-y-3 md:mt-[20vh] p-4">
                <button className="w-full bg-slate-100 rounded-lg p-4 text-slate-700 font-semibold flex align-middle" onClick={() => {navigate("/"); remove();}}>← Return to Drinks</button>
                {
                    status === 'success' &&
                    <motion.div 
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ 
                        duration: 0.75,
                        type: "spring",
                        bounce: 0.175
                        }}
                    className="flex flex-col justify-center ease-in-out mx-auto md:w-[50rem] rounded-2xl shadow-md"
                >
                    
                    <div className="container relative">
                        <img src={data["drinks"][0]["strDrinkThumb"]} className="w-full h-[24rem] object-center object-cover rounded-t-lg" alt="thumb"/>
                        <div className="w-full h-[4rem] backdrop-blur-md absolute bottom-0 flex bg-slate-600/50">
                            <h3 className="text-slate-100 my-auto ml-4 text-2xl font-semibold">{data["drinks"][0]["strDrink"]}</h3>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-b-lg flex flex-col space-y-4">
                        <div>
                            <h3 className="text-slate-700 font-semibold text-xl">Ingredients</h3>
                            <ul className="list-disc ml-6 text-slate-500">
                                {
                                    [...ingredients.keys()].map(
                                        ingredient => {

                                        //if(!ingredients.get(ingredient)) return <li>{ingredients.get(ingredient)}</li>
                                        return <li>{ingredients.get(ingredient)} - {ingredient}</li>

                                    }
                                    )
                                }
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-slate-700 font-semibold text-xl">Instructions</h3>
                            <p className="text-slate-500"> {data["drinks"][0]["strInstructions"]} </p>
                        </div>
                        
                    </div>
                    
                </motion.div>
                }
                
            </div>
        </AnimatePresence>
    );

}