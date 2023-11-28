import React, {useEffect, useState} from "react";

export function RecipeDisplay({recipe, dialogRef}) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        if (!recipe.id) return;

        const fetchRecipeIngredients = async () => {
            setIsLoading(true);
            setError(null);

            try {

                const ingredients_response = await fetch(`/recipe_ingredients/show?id=${recipe.id}`)

                if (!ingredients_response.ok) {
                    throw new Error('Error fetching recipes, network response is invalid.')
                }

                ingredients_response.json().then((x) => setIngredients(x));

            } catch (error) {
                setError(error.message)
            } finally {
                setIsLoading(false);
            }
        }

        fetchRecipeIngredients();
    }, [recipe.id])

    const closeDialog = () => {
        dialogRef.current.close();
    };
    return (
        <dialog ref={dialogRef}>
            <section id="recipe">
                <h1>{recipe.title}</h1>
                <img src={recipe.image_url} width="100px" alt={recipe.title}/>
                <ul id="instructions">
                    <li>Prep: {recipe.prep_time}</li>
                    <li>Cook: {recipe.cook_time}</li>
                    <li>Ratings: {recipe.ratings}</li>

                </ul>
                <ul id="ingredients">
                    {ingredients.map(x => <li key={x.id}>{x.full_text}</li>)}
                </ul>
                <button onClick={closeDialog}>Close X</button>
            </section>
        </dialog>);
}