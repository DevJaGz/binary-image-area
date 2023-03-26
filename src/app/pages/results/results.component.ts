import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
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
export class ResultsComponent implements OnInit, AfterViewInit {
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

  constructor(
    private imageService: ImageService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private stateService: StateService,
    private router: Router,
    private render: Renderer2,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const { loadingService, imageService, cd } = this;
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
        cd.markForCheck();
        loadingService.deactivateLoading();
      },
    });
  }

  ngAfterViewInit(): void {
    const { isImageRead, render, canvas } = this;
    console.log("canvas", canvas);
    render.listen(canvas, "load", this.renderImage);
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
    const { render, canvas, imageService } = this;
    console.log("render image", canvas);
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
