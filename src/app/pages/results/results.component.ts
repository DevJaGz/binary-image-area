import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ReportStatus } from "@app/constants/report.constant";
import { ImageLoaderService } from "@app/services/image-loader.service";
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
    private imageLoaderService: ImageLoaderService,
    private loadingService: LoadingService,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    this.readImage();
  }

  private readImage(): void {
    const { loadingService, imageLoaderService } = this;
    loadingService.activeLoadingWithProgress(0, "Loading Image..");
    imageLoaderService.upload(null).subscribe({
      next: ({ status, statusCode, file, data, progress }) => {
        if (statusCode === 200) {
          if (status === ReportStatus.InProgress) {
            loadingService.updateProgress(progress);
          } else if (status === ReportStatus.Done) {
            this.loadingService.deactivateLoading();
          } else {
            this.loadingService.deactivateLoading();
          }
        } else {
          this.loadingService.deactivateLoading();
        }
      },
    });
  }
}
