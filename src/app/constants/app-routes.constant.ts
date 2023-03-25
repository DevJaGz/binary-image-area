import { Routes } from "@angular/router";
import { HomeComponent } from "@app/pages/home/home.component";

export enum AppRouteName {
  Blank = "",
  Results = "results",
  NotFound = "**",
}

export const AppRoutes: Routes = [
  {
    path: AppRouteName.Blank,
    component: HomeComponent,
  },
  {
    path: AppRouteName.Results,
    loadComponent: () => import("@app/pages/results/results.component").then((c) => c.ResultsComponent),
  },
  {
    path: AppRouteName.NotFound,
    redirectTo: AppRouteName.Blank,
  },
];
