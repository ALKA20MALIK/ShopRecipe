import { Injectable } from "@angular/core";
import { Http ,Response} from "@angular/http";

import { RecipeService } from "../recipes/recipe.service";
import 'rxjs/Rx';
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService{
    constructor(private http:Http, 
        private recipeService:RecipeService,
        private authService:AuthService){}

    storeRecipes(){
        return this.http.put('https://ngrecipebook-ecc8e.firebaseio.com/recipes.json',
            this.recipeService.getRecipes());
            
    }
    getStoredRecipes(){
         const Token= this.authService.getToken();
          
          this.http.get('https://ngrecipebook-ecc8e.firebaseio.com/recipes.json?auth'+Token)           
          .map(
            (response:Response)=>{
            const  recipes:Recipe[]=response.json();
            
            for(let recipe of recipes){
                if(!recipe['ingredients'])
                {
                    console.log(recipe);

                    recipe['ingredients']=[];
                }
            }
            return recipes;
            })
            .subscribe(
                (recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            }
        );
    }
}