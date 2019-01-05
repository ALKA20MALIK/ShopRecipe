import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService} from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService{
    recipesChanged=new Subject<Recipe[]>();

    constructor(private shoppingListService:ShoppingListService){

    }
    private recipes: Recipe[]  = [
        new Recipe('A Test Recipe', 
        'This is simply a test', 'https://i.ytimg.com/vi/hsteljy6H54/maxresdefault.jpg',
        [
            new Ingredient('Meat',1),
            new Ingredient('French Fries',1)
        ]),

        new Recipe('A Another Recipe', 
        'This is Another a test', 'http://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4128.png',
        [
            new Ingredient('Buns',2),
            new Ingredient('Meat',1)
        ])];

    setRecipes(recipes:Recipe[]){
        this.recipes=recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index:number){
        return this.recipes[index];

    }
    addIngedientsToShoppingList(ingredients:Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
    }
    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    updateRecipe(index:number,newRecipe:Recipe){
        this.recipes[index]=newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
}