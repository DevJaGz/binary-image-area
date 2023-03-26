import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ImageService } from "@app/services/image.service";
import { LoadingService } from "@app/services/loading.service";

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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const { loadingService, imageService } = this;
    const imageFile = this.route.snapshot.data["imageFile"] as File;
    loadingService.activeLoading("Reading Image...");
    imageService.initialize(imageFile).subscribe({
      next: (isReady) => {
        if (isReady) {
          this.renderImage();
        } else {
          // TODO: Show message
        }
        loadingService.deactivateLoading();
      },
    });
  }

  renderImage(): void {
    console.log("render image");
  }
}
