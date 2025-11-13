import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Recipe {
  idMeal: string; // ID da receita
  strMeal: string; // Nome da receita 
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
  meals: Recipe[] | null; // A propriedade 'meals' pode ser um array de receitas ou null.
}

//Retorna os detalhes de UMA receita específica.
interface RecipeDetailsResponse {
  meals: Recipe[] | null; // Apenas uma, a API a retorna dentro de um array.
}

@Injectable({
  providedIn: 'root' 
})
export class RecipesService {
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1';

  // Dependência do HttpClient para fazer requisições HTTP.
  constructor(private http: HttpClient) {}

  /**
   * Busca receitas, podendo filtrar por categoria ou fazer uma busca geral.
   */
  getRecipes(category?: string): Observable<Recipe[]> {
    let url: string;
    
    if (category) {
      //  Se tiver uma categoria, filtra por ela
      url = `${this.apiUrl}/filter.php?c=${category}`;
    } else {
      // Se NÃO tiver categoria (View All), faz uma busca em branco.
      // Ex: /search.php?s=
      url = `${this.apiUrl}/search.php?s=`;
    }

    return this.http.get<RecipesResponse>(url).pipe(
      map(response => response.meals || [])
    );
  }

  /**
   * Busca receitas EXCLUSIVAMENTE por categoria.
   * (É funcionalmente semelhante ao 'getRecipes' com categoria, mas mantém a separação de responsabilidades).
   */
  getRecipesByCategory(category: string): Observable<Recipe[]> {
    const url = `${this.apiUrl}/filter.php?c=${category}`;
    return this.http.get<RecipesResponse>(url).pipe(
      map(response => response.meals || [])
    );
  }

  /**
   * Busca os detalhes completos de uma receita usando seu ID.
   */
  getRecipeById(id: string): Observable<Recipe | null> {
    const url = `${this.apiUrl}/lookup.php?i=${id}`; // Endpoint de busca por ID.

    return this.http.get<RecipeDetailsResponse>(url).pipe(
      map(response => 
        // Verifica se 'meals' existe e se tem pelo menos 1 item.
        // Se sim, retorna o PRIMEIRO item. Caso contrário, retorna null.
        response.meals && response.meals.length > 0 ? response.meals[0] : null
      )
    );
  }

  /**
   * Busca a lista de todas as categorias de receitas disponíveis na API.
   * @returns Observable<any[]> Uma lista observável de objetos de categoria.
   */
  getCategories(): Observable<any[]> {
    const url = `${this.apiUrl}/list.php?c=list`; // Endpoint para listar todas as categorias.
    
    // O tipo de resposta é um objeto com 'meals', onde 'meals' é um array de objetos de categoria.
    return this.http.get<{ meals: any[] }>(url).pipe(
      map(response => response.meals || []) // Extrai a lista de categorias ou retorna array vazio.
    );
  }
}
