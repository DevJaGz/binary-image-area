import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { AppRouteName } from "@app/constants/app-routes.constant";
import { StateService } from "@app/services/state.service";

/**
 * Guard to validate if there is an image before enter to the results component page
 * @param route - Angular add this value as a route snapshot
 * @returns - True if the can activate the route
 */
export const seeResultsGuard = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const service = inject(StateService);
  const imageFile = service.currentState.imageState.file;
  const hasImageFile = Boolean(imageFile);
  if (hasImageFile) {
    route.data = {
      ...route.data,
      imageFile,
    };
    return true;
  }
  router.navigate([AppRouteName.Home]);
  return false;
};
