import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  loadedRecipe: Recipe;

  constructor(private activatedRoute: ActivatedRoute,
    private recipesSvc: RecipesService,
    private router: Router, 
    private alertController: AlertController,
    private toastController: ToastController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if (!paramMap.has('recipeId')) { return; }
        this.loadedRecipe = this.recipesSvc.getRecipe(paramMap.get('recipeId'));
      });
  }

  deleteRecipe(){
    this.recipesSvc.deleteRecipe(this.loadedRecipe.id);
    this.router.navigate(['/recipes']);
  }

  async deleteAlert(){
    const alert = await this.alertController.create({
      header: 'Delete Recipe',
      message: 'Are you sure you want to delete this recipe?',
      buttons:[
        {
          text: 'YES',
          handler: () => {this.deleteRecipe(), this.deleteToast()}
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  async deleteToast() {
    const toast = await this.toastController.create({
      message: 'Recipe has been deleted.',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
