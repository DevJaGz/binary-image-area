import { Routes } from "@angular/router";
import { seeResultsGuard } from "@app/guards/results,guard";
import { HomeComponent } from "@app/pages/home/home.component";

export enum AppRouteName {
  Home = "",
  Results = "results",
  NotFound = "**",
}

export const AppRoutes: Routes = [
  {
    path: AppRouteName.Home,
    component: HomeComponent,
  },
  {
    path: AppRouteName.Results,
    canActivate: [seeResultsGuard],
    loadComponent: () =>
      import("@app/pages/results/results.component").then(
        (c) => c.ResultsComponent
      ),
  },
  {
    path: AppRouteName.NotFound,
    redirectTo: AppRouteName.Home,
  },
];
