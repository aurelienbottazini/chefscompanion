import React from "react";

export function RecipesList({recipes, dialogRef, setRecipe}) {
    const setRecipeAndOpenDialog = (recipe) => {
        setRecipe(recipe);
        dialogRef.current.showModal();
    };

    const lis = recipes.map((recipe) => <li onClick={() => setRecipeAndOpenDialog(recipe)}
                                            key={`recipesList-${recipe.id}`}>{recipe.title}</li>)
    return <ul id="recipes">
        {lis}
    </ul>;
}