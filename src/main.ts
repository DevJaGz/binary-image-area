import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { AppComponent } from "@app/app.component";
import { AppRoutes } from "@app/constants/app-routes.constant";

bootstrapApplication(AppComponent, {
  providers: [provideRouter(AppRoutes)],
});
