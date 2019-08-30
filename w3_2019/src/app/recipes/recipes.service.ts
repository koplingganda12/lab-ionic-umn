import { Injectable } from '@angular/core';
import{ Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Recipe[] = [
    {
      id: 'r1',
      title: 'Gado-Gado',
      imageUrl: 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2016/05/gado-gado-salad.jpg?itok=MTTSriC8',
      ingredients: ['Lontong', 'Sawi', 'Bumbu Kecap', 'Tauge']
    },
    {
      id: 'r2',
      title: 'Ketupat',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Ketupat2.jpg/800px-Ketupat2.jpg',
      ingredients: ['Beras', 'Santan', 'Daun Pisang', 'Garam']
    },
    {
      id: 'r3',
      title: 'Pizza Margerita',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Eataly_Las_Vegas_-_Feb_2019_-_Stierch_12.jpg/800px-Eataly_Las_Vegas_-_Feb_2019_-_Stierch_12.jpg',
      ingredients: ['Tomato', 'Mozzarella', 'Basil', 'Salami']
    },
  ];

  constructor() { }

  getAllRecipes(){
    return [...this.recipes];
  }

  getRecipe(recipeId: string){
    // return this.recipes.find(r => r.id == recipeId)
    return {
      ...this.recipes.find(recipe => {
        return recipe.id === recipeId;
      })
    };
  }

  deleteRecipe(recipeId: string){
    this.recipes = this.recipes.filter(recipe => {
      return recipe.id !== recipeId;
    });
  }
}
