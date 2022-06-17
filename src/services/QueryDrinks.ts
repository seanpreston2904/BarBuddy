export const queryDrinks = async (query: String) => {

    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + query);
    return response.json();

}