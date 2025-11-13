import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strIngredient16?: string;
  strIngredient17?: string;
  strIngredient18?: string;
  strIngredient19?: string;
  strIngredient20?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
  strMeasure16?: string;
  strMeasure17?: string;
  strMeasure18?: string;
  strMeasure19?: string;
  strMeasure20?: string;
}

interface RecipesResponse {
  meals: Recipe[] | null;
}

interface RecipeDetailsResponse {
  meals: Recipe[] | null;
}

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1';

  constructor(private http: HttpClient) {}

  getRecipes(category?: string): Observable<Recipe[]> {
    let url: string;
    
    if (category) {
      // Se tiver uma categoria, filtra por ela
      url = `${this.apiUrl}/filter.php?c=${category}`;
    } else {
      // Se NÃO tiver categoria (View All), faz uma busca em branco
      url = `${this.apiUrl}/search.php?s=`;
    }

    return this.http.get<RecipesResponse>(url).pipe(
      map(response => response.meals || [])
    );
  }

  getRecipesByCategory(category: string): Observable<Recipe[]> {
    const url = `${this.apiUrl}/filter.php?c=${category}`;
    return this.http.get<RecipesResponse>(url).pipe(
      map(response => response.meals || [])
    );
  }

  getRecipeById(id: string): Observable<Recipe | null> {
    const url = `${this.apiUrl}/lookup.php?i=${id}`;
    return this.http.get<RecipeDetailsResponse>(url).pipe(
      map(response => response.meals && response.meals.length > 0 ? response.meals[0] : null)
    );
  }

  getCategories(): Observable<any[]> {
    const url = `${this.apiUrl}/list.php?c=list`;
    return this.http.get<{ meals: any[] }>(url).pipe(
      map(response => response.meals || [])
    );
  }
}