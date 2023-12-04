import { expect, describe, it, vi, afterEach } from 'vitest'
import React from "react";
import { render, cleanup } from '@testing-library/react'
import {RecipesList} from "./recipesList";

describe(RecipesList, () => {
    afterEach(cleanup)

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

    it('shows the recipe when a recipe from the list is clicked', () => {
        const recipes = [
            {id: 1, title: 'Recipe 1'},
            {id: 2, title: 'Recipe 2'},
        ]

        const dialogRef = {
            current: {
                showModal: vi.fn()
            }
        };

        const setRecipe = vi.fn()
        const {getByText} = render(<RecipesList recipes={recipes} dialogRef={dialogRef} setRecipe={setRecipe}  />)
        getByText('Recipe 1').click()
        expect(setRecipe).toHaveBeenCalledWith(recipes[0])
        expect(dialogRef.current.showModal).toHaveBeenCalled()
    })
});