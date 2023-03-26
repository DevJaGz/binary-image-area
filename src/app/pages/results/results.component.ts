import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppRouteName } from "@app/constants/app-routes.constant";
import { ImageService } from "@app/services/image.service";
import { LoadingService } from "@app/services/loading.service";
import { StateService } from "@app/services/state.service";

@Component({
  selector: "app-results",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./results.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent implements OnInit {
  constructor(
    private imageService: ImageService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private stateService: StateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const { loadingService, imageService } = this;
    const imageFile = this.route.snapshot.data["imageFile"] as File;
    loadingService.activeLoading("Reading Image...");
    imageService.read(imageFile).subscribe({
      next: (isValid) => {
        if (isValid) {
          this.renderImage();
        } else {
          // TODO: Show a stylized message
          alert("Not valid Image");
          this.returnHome();
        }
        loadingService.deactivateLoading();
      },
    });
  }

  renderImage(): void {
    console.log("render image");
  }

  private returnHome(): void {
    this.stateService.setImageState({
      file: null,
    });
    this.router.navigate([AppRouteName.Home]);
  }
}
