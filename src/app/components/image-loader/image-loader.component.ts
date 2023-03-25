import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ImageLoaderService } from "@app/services/image-loader.service";
@Component({
  selector: "app-image-loader",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./image-loader.component.html",
})
export class ImageLoaderComponent {
  constructor(private imageLocaderService: ImageLoaderService) {}

  onUploadChange(eventTarget: EventTarget): void {
    const inputFile = eventTarget as HTMLInputElement;
    const file = inputFile.files[0];
    this.imageLocaderService.upload(file).subscribe({
      next: console.log,
    });
  }
}
