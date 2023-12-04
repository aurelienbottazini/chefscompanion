import {describe, it, expect, afterEach} from "vitest";
import React from "react";
import {RecipeDisplay} from "./recipeDisplay";
import {cleanup, render} from "@testing-library/react";

describe(RecipeDisplay, () => {
    afterEach(cleanup)

    it('renders', () => {
        const {getByText} = render(<RecipeDisplay recipe={{
            id: 1, title: 'Recipe 1', cook_time: '30',
            prep_time: '15',
            ratings: '4.68'
        }} dialogRef={null}/>)
        expect(getByText('Recipe 1')).toBeTruthy()
        expect(getByText('Cook: 30')).toBeTruthy()
        expect(getByText('Prep: 15')).toBeTruthy()
        expect(getByText('Ratings: 4.68')).toBeTruthy()
    })
});