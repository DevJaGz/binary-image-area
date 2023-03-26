import { Injectable } from "@angular/core";
import { AreaCalculatorService } from "@app/services/area-calculator.service";
import { FactoryService } from "@app/services/factory.service";
import { ImageValidatorService } from "@app/services/image-validator.service";
import { getImageDataUtil } from "@app/utils/image.util";
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
  naturalCanvas: HTMLCanvasElement;

  /**
   * Canvas context
   */
  naturalCanvasContext: CanvasRenderingContext2D;

  constructor(
    private validatorService: ImageValidatorService,
    private factoryService: FactoryService,
    private areaCalculatorService: AreaCalculatorService
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
   * Handle the rending of the results
   * @param viewCanvas - Canvas to render the results
   * @returns Area
   */
  renderResults(viewCanvas: HTMLCanvasElement): number {
    const [area, dotCanvas] = this.calculateArea();
    this.renderImage(viewCanvas, dotCanvas);
    return area;
  }

  /**
   * Render the results in the view
   * @param viewCanvas - Canvas to render the results
   * @param dotCanvas - Canvas where the dots were draw
   */
  private renderImage(
    viewCanvas: HTMLCanvasElement,
    dotCanvas: HTMLCanvasElement
  ): void {
    const { image, naturalCanvas } = this;
    const { width, height } = image;
    const viewContext = viewCanvas.getContext("2d");
    const canvasWidth = viewCanvas.width;
    const aspectRatio = width / height;
    const heighScaled = canvasWidth / aspectRatio;
    viewCanvas.height = heighScaled;
    viewContext.drawImage(naturalCanvas, 0, 0, canvasWidth, heighScaled);
    viewContext.drawImage(dotCanvas, 0, 0, canvasWidth, heighScaled);
  }

  /**
   * Handle the calculation of the area
   * @returns Area
   */
  private calculateArea(): [number, HTMLCanvasElement] {
    const { areaCalculatorService, naturalCanvas, naturalCanvasContext } = this;
    return areaCalculatorService.imageArea(naturalCanvas, naturalCanvasContext);
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

  /**
   * Validate the image
   * @returns - True if the image is valid
   */
  private validate(): boolean {
    const { validatorService } = this;
    const imageData = this.getImageData();
    const isValid = validatorService.isBinary(imageData);
    return isValid;
  }

  /**
   * Initialize the canvas and canvas context
   * @param image - Image to create the canvas and canvas context
   */
  private initializeCanvasContext(image: HTMLImageElement): void {
    const { factoryService } = this;
    const [canvas, context] = factoryService.createCanvas2D({
      willReadFrequently: true,
    });
    const { width, height } = image;
    canvas.width = width;
    canvas.height = height;
    context.drawImage(image, 0, 0, width, height);
    this.naturalCanvas = canvas;
    this.naturalCanvasContext = context;
  }

  /**
   * Get the image data based on the natural canvas/canvas context
   * @returns - The data in the image
   */
  private getImageData(): ImageData {
    const { naturalCanvas, naturalCanvasContext } = this;
    return getImageDataUtil(
      naturalCanvasContext,
      naturalCanvas.width,
      naturalCanvas.height
    );
  }
}
