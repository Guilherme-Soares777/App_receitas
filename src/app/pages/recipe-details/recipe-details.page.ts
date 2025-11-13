import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonIcon, IonBackButton, IonButtons,
  IonLabel, IonItem, IonList, IonChip, IonBadge, IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  locationOutline,
  playCircleOutline,
  listOutline,
  bookOutline,
  pricetagsOutline,
  restaurantOutline
} from 'ionicons/icons';
import { RecipesService, Recipe } from '../../services/recipes.service';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-recipe-details',
  templateUrl: 'recipe-details.page.html',
  styleUrls: ['recipe-details.page.scss'],
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
    IonIcon,
    IonBackButton,
    IonButtons,
    IonLabel,
    IonItem,
    IonList,
    IonChip,
    IonBadge,
    IonSpinner,
    HighlightDirective
  ]
})
export class RecipeDetailsPage implements OnInit {
  recipe: Recipe | null = null;
  loading = true;
  ingredients: Array<{ ingredient: string; measure: string }> = [];
  recipeId: string | null = null;
  currentDate = new Date();

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    addIcons({
      arrowBackOutline,
      locationOutline,
      playCircleOutline,
      listOutline,
      bookOutline,
      pricetagsOutline,
      restaurantOutline
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const newId = params['id'];
      if (newId && newId !== this.recipeId) {
        this.recipeId = newId;
        this.resetPage();
        this.loadRecipeDetails(newId);
      }
    });
  }

  resetPage(): void {
    this.recipe = null;
    this.ingredients = [];
    this.loading = true;
    this.currentDate = new Date();
    setTimeout(() => {
      const content = document.querySelector('ion-content');
      content?.scrollToTop(0);
    }, 50);
  }

  loadRecipeDetails(id: string): void {
    this.loading = true;
    this.recipesService.getRecipeById(id).subscribe({
      next: (recipe) => {
        if (recipe) {
          this.recipe = recipe;
          this.extractIngredients(recipe);
          setTimeout(() => {
            const content = document.querySelector('ion-content');
            content?.scrollToTop(0);
          }, 50);
        } else {
          console.error('Recipe not found');
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading recipe details:', error);
        this.loading = false;
      }
    });
  }

  extractIngredients(recipe: Recipe): void {
    this.ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}` as keyof Recipe] as string;
      const measure = recipe[`strMeasure${i}` as keyof Recipe] as string;
      if (ingredient && ingredient.trim()) {
        this.ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : ''
        });
      }
    }
  }

  openYouTubeVideo(): void {
    if (this.recipe?.strYoutube) {
      window.open(this.recipe.strYoutube, '_blank');
    }
  }

  goBack(): void {
    this.router.navigate(['/recipes']);
  }
}