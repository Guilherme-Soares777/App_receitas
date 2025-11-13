import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  IonSpinner,
  IonIcon,
  IonBackButton,
  IonButtons
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, searchOutline } from 'ionicons/icons';
import { RecipesService, Recipe } from '../../services/recipes.service';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-recipes',
  templateUrl: 'recipes.page.html',
  styleUrls: ['recipes.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
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
    IonSpinner,
    IonIcon,
    IonBackButton,
    IonButtons,
    TruncatePipe,
    HighlightDirective
  ]
})
export class RecipesPage implements OnInit {
  recipes: Recipe[] = [];
  loading = true;
  category: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    addIcons({ arrowBackOutline, searchOutline });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'] || null;
      this.loadRecipes();
    });
  }

  loadRecipes(): void {
    this.loading = true;
    this.errorMessage = null;

    const request = this.category
      ? this.recipesService.getRecipesByCategory(this.category)
      : this.recipesService.getRecipes();

    request.subscribe({
      next: (recipes) => {
        this.recipes = recipes;
        this.loading = false;
        
        if (recipes.length === 0) {
          this.errorMessage = this.category
            ? `No recipes found for category "${this.category}"`
            : 'No recipes found';
        }
      },
      error: (error) => {
        console.error('Error loading recipes:', error);
        this.errorMessage = 'Error loading recipes. Please try again later.';
        this.loading = false;
      }
    });
  }

  navigateToRecipeDetails(recipeId: string): void {
    this.router.navigate(['/recipe-details', recipeId]);
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}