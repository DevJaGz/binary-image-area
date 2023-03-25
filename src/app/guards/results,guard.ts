import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AppRouteName } from "@app/constants/app-routes.constant";
import { StateService } from "@app/services/state.service";

export const seeResultsGuard = () => {
  const router = inject(Router);
  const service = inject(StateService);
  const hasImageFile = Boolean(service.currentState.imageState.file);
  if (hasImageFile) {
    return true;
  }
  router.navigate([AppRouteName.Home]);
  return false;
};
