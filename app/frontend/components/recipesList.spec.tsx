import { expect, describe, it } from 'vitest'
import React from "react";
import {render } from '@testing-library/react'
import {RecipesList} from "./recipesList";

describe(RecipesList, () => {
    it('renders', () => {
        render(<RecipesList recipes={[]} dialogRef={null} setRecipe={() => {}}  />)
    })

    it('renders a list of recipes', () => {
        const recipes = [
            {id: 1, title: 'Recipe 1'},
            {id: 2, title: 'Recipe 2'},
        ]
        const {getByText} = render(<RecipesList recipes={recipes} dialogRef={null} setRecipe={() => {}}  />)
        expect(getByText('Recipe 1')).toBeTruthy()
        expect(getByText('Recipe 2')).toBeTruthy()
    })
});