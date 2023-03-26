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

  /**
   * Handle the service initializing
   */
  private initialized$ = new Subject<boolean>();

  constructor(
    private validatorService: ImageValidatorService,
    private factoryService: FactoryService
  ) {}

  /**
   * Initialize the service
   * @param imageFile - Image to load
   * @returns
   */
  initialize(imageFile: File): Observable<boolean> {
    const { factoryService } = this;
    const image = factoryService.createImage();
    image.src = URL.createObjectURL(imageFile);
    this.image = image;
    this.handleOnLoad();
    this.handleOnError();
    return this.initialized$.asObservable();
  }

  /**
   *  Handle when the uploading of the image has finished
   */
  private handleOnLoad(): void {
    const { image } = this;
    image.onload = () => {
      this.initializeCanvasContext(image);
      if (this.validate()) {
        console.log("valid");
        return;
      }
      console.log("Not valid");

      // this.initialized$.next(true);
      // this.initialized$.complete();
    };
  }

  /**
   *  Handle when the image could not be loaded
   */
  private handleOnError(): void {
    const { image } = this;
    image.onerror = () => {
      this.initialized$.next(false);
      this.initialized$.complete();
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
