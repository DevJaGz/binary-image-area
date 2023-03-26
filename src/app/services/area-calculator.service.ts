import { Injectable } from "@angular/core";
import { FactoryService } from "@app/services/factory.service";
import { ImageValidatorService } from "@app/services/image-validator.service";
import { getImageDataUtil } from "@app/utils/image.util";

@Injectable({
  providedIn: "root",
})
export class AreaCalculatorService {
  numDots: number = 10000;

  constructor(
    private imageValidatorService: ImageValidatorService,
    private factoryService: FactoryService
  ) {}

  imageArea(
    naturalCanvas: HTMLCanvasElement,
    naturalCanvasContext: CanvasRenderingContext2D
  ): [number, HTMLCanvasElement] {
    const { factoryService } = this;
    const { width, height } = naturalCanvas;
    const [dotCanvas, dotsContext] = factoryService.createCanvas2D();
    dotCanvas.width = width;
    dotCanvas.height = height;
    this.drawRandomPoints(dotsContext, width, height);
    const naturalImageData = this.getImageData(
      naturalCanvasContext,
      width,
      height
    );
    const dotsImageData = this.getImageData(dotsContext, width, height);
    const area = this.calculateArea(naturalImageData, dotsImageData);
    return [area, dotCanvas];
  }

  private calculateArea(
    naturalImageData: ImageData,
    dotsImageData: ImageData
  ): number {
    const { numDots, imageValidatorService } = this;
    const {
      data: naturalData,
      width: naturalWidth,
      height: naturalHeigth,
    } = naturalImageData;

    const {
      data: dotsData,
      width: dotsWidth,
      height: dotsHeigth,
    } = dotsImageData;

    const naturalDataLen = naturalData.length;
    const dotsDataLen = dotsData.length;
    let dotsMatached = 0;

    if (
      naturalDataLen === dotsDataLen &&
      naturalWidth === dotsWidth &&
      naturalHeigth === dotsHeigth
    ) {
      for (let i = 0; i < naturalDataLen; i += 4) {
        const naturalRed = naturalData[i];
        const dotsRed = dotsData[i];
        const isNaturalBlackPixel =
          imageValidatorService.isBlackPixel(naturalRed);
        const isDotBlackPixel = imageValidatorService.isBlackPixel(
          dotsRed - 255
        );
        if (isNaturalBlackPixel && isNaturalBlackPixel === isDotBlackPixel) {
          dotsMatached += 1;
        }
      }

      const area = naturalWidth * naturalHeigth * (dotsMatached / numDots);
      console.log("Dots matched", dotsMatached);
      console.log("numDots", numDots);
      console.log("area", area);
      console.log("Iterations", naturalDataLen);
      return Number(area.toFixed(2));
    }
    return 0;
  }

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

  private getImageData(
    conext: CanvasRenderingContext2D,
    width: number,
    heigh: number
  ): ImageData {
    return getImageDataUtil(conext, width, heigh);
  }
}
