import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ReportStatus } from "@app/constants/report.constant";
import { ImageLoaderService } from "@app/services/image-loader.service";
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
    private imageLocaderService: ImageLoaderService,
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
    stateService.setLoading({
      isLoading: true,
      loadingLabel: "Loading...",
      progressValue: 0,
      showProgress: true,
    });
    this.imageLocaderService.upload(file).subscribe({
      next: ({ status, statusCode, file }) => {
        if (statusCode === 200) {
          if (status === ReportStatus.InProgress) {
            console.log("Upating", file);
          } else if (status === ReportStatus.Done) {
            console.log("Done", file);
            this.uploadFinished(inputFile);
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
    const { stateService } = this;
    stateService.setLoading({ isLoading: false });
    inputFile.value = "";
  }
}
