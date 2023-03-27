import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
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
export class ResultsComponent implements AfterViewInit {
  @ViewChild("canvasRef") canvasRef: ElementRef<HTMLCanvasElement>;
  /**
   * Flag to notify if the image could be read
   */
  isImageRead = false;

  /**
   * Canvas element in the view
   */
  get canvas(): HTMLCanvasElement {
    const { canvasRef } = this;
    if (canvasRef) {
      return canvasRef.nativeElement;
    }
    return null;
  }

  /**
   * Width of the uploaded image
   */
  get imageWidth(): number {
    const { imageService } = this;
    return imageService.image?.width ?? 0;
  }

  /**
   * Height of the uploaded image
   */
  get imageHeight(): number {
    const { imageService } = this;
    return imageService.image?.height ?? 0;
  }

  /**
   * Area that is shown in the view
   */
  area = null;

  /**
   * Point number that is shown in the view
   */
  points = null;

  constructor(
    private imageService: ImageService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private stateService: StateService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    const { loadingService, imageService, cd } = this;
    const imageFile = this.route.snapshot.data["imageFile"] as File;
    loadingService.activeLoading("Reading Image...");
    imageService.read(imageFile).subscribe({
      next: (isImageRead) => {
        if (!isImageRead) {
          // TODO: Show a stylized message
          alert("Not valid Image");
          this.returnHome();
          loadingService.deactivateLoading();
          return;
        }
        this.renderResults();
        this.isImageRead = isImageRead;
        cd.markForCheck();
        loadingService.deactivateLoading();
      },
    });
  }

  /**
   * Called when try another button is clicked
   */
  onTryAnotherBtn(): void {
    this.returnHome();
  }

  /**
   * Render data in the canvas
   */
  private renderResults(): void {
    const { canvas, imageService } = this;
    const result = imageService.renderResults(canvas);
    const { area, dots: points } = result;
    this.area = area;
    this.points = points;
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
