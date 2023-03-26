import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
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
export class ResultsComponent implements OnInit, AfterViewInit {
  /**
   * Flag to notify if the image could be read
   */
  isImageRead = false;

  constructor(
    private imageService: ImageService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private stateService: StateService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const { loadingService, imageService } = this;
    const imageFile = this.route.snapshot.data["imageFile"] as File;
    loadingService.activeLoading("Reading Image...");
    imageService.read(imageFile).subscribe({
      next: (isImageRead) => {
        if (!isImageRead) {
          // TODO: Show a stylized message
          alert("Not valid Image");
          this.returnHome();
        }
        this.isImageRead = isImageRead;
        this.cd.markForCheck();
        loadingService.deactivateLoading();
      },
    });
  }

  ngAfterViewInit(): void {
    const { isImageRead } = this;
    if (isImageRead) {
      this.renderImage();
    }
  }

  /**
   * Called when try another button is clicked
   */
  onTryAnotherBtn(): void {
    this.returnHome();
  }

  /**
   * Render the image
   */
  private renderImage(): void {
    console.log("render image");
  }

  /**
   * Move the user to home
   */
  private returnHome(): void {
    this.stateService.setImageState({
      file: null,
    });
    this.router.navigate([AppRouteName.Home]);
  }
}
