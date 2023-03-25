import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ReportStatus } from "@app/constants/report.constant";
import { ImageLoaderService } from "@app/services/image-loader.service";
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
    private imageLoaderService: ImageLoaderService,
    private loadingService: LoadingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.readImage();
  }

  private readImage(): void {
    const { loadingService, imageLoaderService } = this;
    loadingService.activeLoadingWithProgress(0, "Loading Image..");
    const imageFile = this.route.snapshot.data["imageFile"] as File;
    imageLoaderService.upload(imageFile).subscribe({
      next: ({ status, statusCode, data, progress }) => {
        if (statusCode === 200) {
          if (status === ReportStatus.InProgress) {
            loadingService.updateProgress(progress);
          } else if (status === ReportStatus.Done) {
            this.loadingService.deactivateLoading();
            // TODO: Show success message to the user
          } else {
            // TODO: Show error message to the user
            this.loadingService.deactivateLoading();
          }
        } else {
          // TODO: Show error message to the user
          this.loadingService.deactivateLoading();
        }
      },
    });
  }
}
