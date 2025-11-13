import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  restaurantOutline,
  gridOutline,
  flameOutline
} from 'ionicons/icons';
import { RecipesService } from '../../services/recipes.service';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonSpinner,
    HighlightDirective
  ]
})
export class HomePage implements OnInit {
  categories: any[] = [];
  featuredRecipes: any[] = [];
  loading = true;

  constructor(
    private recipesService: RecipesService,
    private router: Router
  ) {
    addIcons({
      restaurantOutline,
      gridOutline,
      flameOutline
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadFeaturedRecipes();
  }

  loadCategories(): void {
    this.recipesService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories.slice(0, 6); // <-- LIMITE DE 6 CATEGORIAS
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.loading = false;
      }
    });
  }

  loadFeaturedRecipes(): void {
    this.recipesService.getRecipes().subscribe({
      next: (recipes) => {
        this.featuredRecipes = recipes.slice(0, 4); // <-- Limite de 4 destaques
      },
      error: (error) => {
        console.error('Error loading featured recipes:', error);
      }
    });
  }

  navigateToCategory(category: string): void {
    this.router.navigate(['/recipes', category]);
  }

  navigateToRecipes(): void {
    this.router.navigate(['/recipes']);
  }

  navigateToRecipeDetails(recipeId: string): void {
    this.router.navigate(['/recipe-details', recipeId]);
  }
}