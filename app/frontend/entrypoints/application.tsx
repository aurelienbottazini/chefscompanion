import React, {useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';

import '~/application.css'
import {RecipesList} from "../components/recipesList";
import {RecipeDisplay} from "../components/recipeDisplay";
import {SearchBar} from "../components/searchBar";

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