import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router } from "@angular/router";
import { AppRouteName } from "@app/constants/app-routes.constant";
import { LoadingService } from "@app/services/loading.service";
import { StateService } from "@app/services/state.service";
@Component({
  selector: "app-image-loader",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./image-loader.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageLoaderComponent {
  constructor(
    private loadingService: LoadingService,
    private router: Router,
    private stateService: StateService
  ) {}

  /**
   * Called when a file is selected
   * @param eventTarget - Evento coming from the input
   */
  onUploadChange(eventTarget: EventTarget): void {
    const { stateService } = this;
    const inputFile = eventTarget as HTMLInputElement;
    const file = inputFile.files[0];
    if (file) {
      stateService.setImageState({ file });
      this.router.navigate([AppRouteName.Results]);
      this.loadingService.activeLoading("Image uploaded...");
    }
  }
}
