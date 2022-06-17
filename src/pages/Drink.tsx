import { DrinkDetails } from "../components/DrinkDetails";
import { Footer } from "../components/Footer";

export const Drink: React.FC = () => {

    return(
        <div className="flex flex-col justify-center">
            <DrinkDetails/>
            <Footer/>
        </div>
    );

}