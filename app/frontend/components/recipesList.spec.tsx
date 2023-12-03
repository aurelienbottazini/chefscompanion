import { expect, describe, it } from 'vitest'
import React from "react";
import {render } from '@testing-library/react'
import {RecipesList} from "./recipesList";

describe(RecipesList, () => {
    it('renders', () => {
        render(<RecipesList recipes={[]} dialogRef={null} setRecipe={() => {}}  />)
    })
});