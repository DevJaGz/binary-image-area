import { Injectable } from "@angular/core";
import { IUploadImageReport } from "@app/interfaces/reporter.interface";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FactoryService {
  /**
   * Factory to generate a file reader
   * @returns - File reader
   */
  createFileReader(): FileReader {
    return new FileReader();
  }

  /**
   * Factory to generate a image upload reporter
   * @returns - File reader
   */
  createImageUploadReporter(): Subject<IUploadImageReport> {
    return new Subject<IUploadImageReport>();
  }

  /**
   * Factory to generate an image element
   * @returns - Image element
   */
  createImage(): HTMLImageElement {
    return new Image();
  }

  /**
   * Factory to generate a canvas element
   * @returns - Canva element
   */
  createCanvas(): HTMLCanvasElement {
    return document.createElement("canvas");
  }
}
