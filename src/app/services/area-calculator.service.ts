import { Injectable } from "@angular/core";
import { FactoryService } from "@app/services/factory.service";
import { ImageValidatorService } from "@app/services/image-validator.service";
import { getImageDataUtil } from "@app/utils/image.util";

@Injectable({
  providedIn: "root",
})
export class AreaCalculatorService {
  /**
   * Number of points to calculate the area
   */
  numDots: number = 10000;

  constructor(
    private imageValidatorService: ImageValidatorService,
    private factoryService: FactoryService
  ) {}

  /**
   * Handle the image are calculation
   * @param canvas - Canvas where is the image
   * @param canvasContext - Canvas context where is the image
   * @returns
   */
  imageArea(
    canvas: HTMLCanvasElement,
    canvasContext: CanvasRenderingContext2D
  ): [number, HTMLCanvasElement] {
    const { factoryService } = this;
    const { width, height } = canvas;
    const [dotCanvas, dotsContext] = factoryService.createCanvas2D();
    dotCanvas.width = width;
    dotCanvas.height = height;
    this.drawRandomPoints(dotsContext, width, height);
    const imageData = this.getImageData(canvasContext, width, height);
    const dotsImageData = this.getImageData(dotsContext, width, height);
    const area = this.calculateArea(imageData, dotsImageData);
    return [area, dotCanvas];
  }

  /**
   * Calculate the area
   * @param imageData - Image data of the image
   * @param dotsImageData - Image data of the points
   * @returns Area in px^2
   */
  private calculateArea(
    imageData: ImageData,
    dotsImageData: ImageData
  ): number {
    const { numDots, imageValidatorService } = this;
    const { data, width, height } = imageData;

    const {
      data: dotsData,
      width: dotsWidth,
      height: dotsHeigth,
    } = dotsImageData;

    const dataLen = data.length;
    const dotsDataLen = dotsData.length;
    let dotsMatached = 0;

    if (
      dataLen === dotsDataLen &&
      width === dotsWidth &&
      height === dotsHeigth
    ) {
      for (let i = 0; i < dataLen; i += 4) {
        const red = data[i];
        const dotsRed = dotsData[i];
        const isBlackPixel = imageValidatorService.isBlackPixel(red);
        const isDotBlackPixel = imageValidatorService.isBlackPixel(
          dotsRed - 255
        );
        if (isBlackPixel && isBlackPixel === isDotBlackPixel) {
          dotsMatached += 1;
        }
      }

      const area = width * height * (dotsMatached / numDots);
      return Number(area.toFixed(2));
    }
    return 0;
  }

  /**
   * Draw the randow points in canvas using its context
   * @param context - Context of the canvas wher is going to be draw the points
   * @param width - Canvas width
   * @param height - Canvas height
   */
  private drawRandomPoints(
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ): void {
    const { numDots } = this;

    for (let i = 0; i < numDots; i++) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);
      context.fillStyle = "red";
      context.fillRect(x, y, 1, 1);
    }
  }

  /**
   * Get the image data of the canvas context
   * @param conext - Canvas context
   * @param width - Canvas width
   * @param height - Canvas height
   * @returns Image data
   */
  private getImageData(
    conext: CanvasRenderingContext2D,
    width: number,
    heigh: number
  ): ImageData {
    return getImageDataUtil(conext, width, heigh);
  }
}
