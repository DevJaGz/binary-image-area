import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ReportStatus } from "@app/constants/report.constant";
import { ImageLoaderService } from "@app/services/image-loader.service";
import { LoadingService } from "@app/services/loading.service";
@Component({
  selector: "app-image-loader",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./image-loader.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageLoaderComponent {
  constructor(
    private imageLocaderService: ImageLoaderService,
    private loadingService: LoadingService
  ) {}

  /**
   * Called when a file is selected
   * @param eventTarget - Evento coming from the input
   */
  onUploadChange(eventTarget: EventTarget): void {
    const { loadingService } = this;
    const inputFile = eventTarget as HTMLInputElement;
    const file = inputFile.files[0];
    loadingService.activeLoadingWithProgress(0, "jumm!");
    this.imageLocaderService.upload(file).subscribe({
      next: ({ status, statusCode, file, data, progress }) => {
        if (statusCode === 200) {
          if (status === ReportStatus.InProgress) {
            loadingService.updateProgress(progress);
            console.log("Updating", progress);
          } else if (status === ReportStatus.Done) {
            console.log("Done", progress);
            setTimeout(() => {
              this.uploadFinished(inputFile);
            }, 2000);
          } else {
            this.uploadFinished(inputFile);
          }
        } else {
          this.uploadFinished(inputFile);
        }
      },
    });
  }

  /**
   * Hanlde the actions when the upload has finished
   * @param inputFile - Input in the view
   */
  private uploadFinished(inputFile: HTMLInputElement): void {
    const { loadingService } = this;
    loadingService.deactivateLoading();
    inputFile.value = "";
  }
}
