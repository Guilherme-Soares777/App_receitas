import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    loadComponent: () => import('./pages/recipes/recipes.page').then(m => m.RecipesPage)
  },
  {
    path: 'recipes/:category',
    loadComponent: () => import('./pages/recipes/recipes.page').then(m => m.RecipesPage)
  },
  {
    path: 'recipe-details/:id',
    loadComponent: () => import('./pages/recipe-details/recipe-details.page').then(m => m.RecipeDetailsPage)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];