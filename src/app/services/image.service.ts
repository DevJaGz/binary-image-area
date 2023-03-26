import { Injectable } from "@angular/core";
import { FactoryService } from "@app/services/factory.service";
import { ImageValidatorService } from "@app/services/image-validator.service";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ImageService {
  /**
   * Image loaded
   */
  image: HTMLImageElement;

  /**
   * Canvas...
   */
  canvas: HTMLCanvasElement;

  /**
   * Canvas context
   */
  canvasContext: CanvasRenderingContext2D;

  constructor(
    private validatorService: ImageValidatorService,
    private factoryService: FactoryService
  ) {}

  /**
   * Read and load the image
   * @param imageFile - Image to load
   * @returns
   */
  read(imageFile: File): Observable<boolean> {
    const { factoryService } = this;
    const image = factoryService.createImage();
    const isImageRead$ = new Subject<boolean>();
    image.src = URL.createObjectURL(imageFile);
    this.image = image;
    this.handleOnLoad(isImageRead$);
    this.handleOnError(isImageRead$);
    return isImageRead$.asObservable();
  }

  /**
   *  Handle when the uploading of the image has finished
   * @param isImageRead$ - Handler that notify if the image was read
   */
  private handleOnLoad(isImageRead$: Subject<boolean>): void {
    const { image } = this;
    image.onload = () => {
      this.initializeCanvasContext(image);
      if (this.validate()) {
        isImageRead$.next(true);
      } else {
        isImageRead$.next(false);
      }
      isImageRead$.complete();
    };
  }

  /**
   *  Handle when the image could not be loaded
   * @param isImageRead$ - Handler that notify if the image was read*
   */
  private handleOnError(isImageRead$: Subject<boolean>): void {
    const { image } = this;
    image.onerror = () => {
      isImageRead$.next(false);
      isImageRead$.complete();
    };
  }

  private validate(): boolean {
    const { validatorService } = this;
    const imageData = this.getImageData();
    const isValid = validatorService.isBinary(imageData);
    return isValid;
  }

  private getImageData(): ImageData {
    const { canvas, canvasContext } = this;
    const imageData = canvasContext.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
    return imageData;
  }

  private initializeCanvasContext(image: HTMLImageElement): void {
    const { factoryService } = this;
    const canvas = factoryService.createCanvas();
    const { width, height } = image;
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, width, height);
    this.canvas = canvas;
    this.canvasContext = context;
  }
}
