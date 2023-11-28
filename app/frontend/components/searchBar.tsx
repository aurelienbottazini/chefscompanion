import React, {useEffect, useState} from "react";
import useDebounce from "../hooks/useDebounce";

export function SearchBar({handleSearch}) {
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

    return (
        <>
            <input type='search' id="search" placeholder="search recipes" value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}/>
            <Loader loading={isLoading} />
        </>);
}

function Loader({ loading }) {
    if(!loading) return null;

    return <span className="loader"></span>;
}