import React, {useEffect, useState} from 'react';
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

                const recipes = await fetch(`http://localhost:5100/ingredients_search/create?ingredients=${encodeURIComponent(searchTerm)}`)

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

function RecipesList({recipes}) {
    const lis = recipes.map((recipe) => <li key={recipe.id}>{recipe.title}</li>)
    return <ul id="recipes">
        {lis}
    </ul>;

}

export default function App() {
    const [recipes, setRecipes] = useState([]);

    function updateRecipes(recipes) {
        recipes.json().then((x) => setRecipes(x.recipes));
    }

    return (
        <>
            <SearchBar handleSearch={updateRecipes}/>
            <RecipesList recipes={recipes}/>
        </>)
}

const root = createRoot(document.getElementById('react'));
root.render(<App/>);