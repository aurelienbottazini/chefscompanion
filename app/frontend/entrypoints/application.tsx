import React, {useEffect, useRef, useState} from 'react';
import useDebounce from '..//hooks/useDebounce';
import {createRoot} from 'react-dom/client';

import '~/application.css'

function SearchBar({handleSearch}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    useEffect(() => {
        if (!debouncedSearchTerm) return;
        if (searchTerm.length < 3) return;

        const fetchRecipes = async () => {
            setIsLoading(true);
            setError(null);

            try {

                const recipes = await fetch(`/ingredients_search/create?ingredients=${encodeURIComponent(searchTerm)}`)

                if (!recipes.ok) {
                    throw new Error('Error fetching recipes, network response is invalid.')
                }

                handleSearch(recipes);
            } catch (error) {
                setError(error.message)
            } finally {
                setIsLoading(false);
            }
        }

        fetchRecipes();
    }, [debouncedSearchTerm])

    return <input type='search' id="search" placeholder="search recipes" value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}/>;
}

function RecipeDisplay({recipe, dialogRef}) {

    const closeDialog = () => {
        dialogRef.current.close();
    };
    return (
        <dialog ref={dialogRef} >
            <section id="recipe">
                <h1>{recipe.title}</h1>
                <img src={recipe.image_url} width="100px" alt={recipe.title}/>
                <ul id="instructions">
                    <li>Prep: {recipe.prep_time}</li>
                    <li>Cook: {recipe.cook_time}</li>
                    <li>Ratings: {recipe.ratings}</li>

                </ul>
                <ul id="ingredients">
                    <li>Prep: {recipe.prep_time}</li>
                    <li>Cook: {recipe.cook_time}</li>
                    <li>Ratings: {recipe.ratings}</li>
                </ul>
                <button onClick={closeDialog}>Close X</button>
            </section>
        </dialog>);
}
function RecipesList({recipes, dialogRef, setRecipe}) {
    const setRecipeAndOpenDialog = (recipe) => {
        setRecipe(recipe);
        dialogRef.current.showModal();
    };

    const lis = recipes.map((recipe) => <li onClick={() => setRecipeAndOpenDialog(recipe)} key={`recipesList-${recipe.id}`}>{recipe.title}</li>)
    return <ul id="recipes">
        {lis}
    </ul>;
}

export default function App() {
    const [recipes, setRecipes] = useState([]);
    const [recipe, setRecipe] = useState({});
    const dialog = useRef(null);

    function updateRecipes(recipes) {
        recipes.json().then((x) => setRecipes(x.recipes));
    }

    return (
        <>
            <RecipeDisplay recipe={recipe} dialogRef={dialog}/>
            <SearchBar handleSearch={updateRecipes}/>
            <RecipesList recipes={recipes} dialogRef={dialog} setRecipe={setRecipe} />
        </>)
}

const root = createRoot(document.getElementById('react'));
root.render(<App/>);