import { Injectable } from "@angular/core";
import { FactoryService } from "@app/services/factory.service";
import { getImageDataUtil } from "@app/utils/image.util";

@Injectable({
  providedIn: "root",
})
export class AreaCalculatorService {
  constructor(private factoryService: FactoryService) {}

  imageArea(image: HTMLImageElement): void {
    const { factoryService } = this;
    const [canvas, context] = factoryService.createCanvas2D({
      willReadFrequently: true,
    });
    const { width, height } = image;
    canvas.width = width;
    canvas.height = height;
    context.drawImage(image, 0, 0, width, height);
    this.drawRandomPoints();
    const imageData = this.getImageData(context, width, height);
  }

  private drawRandomPoints(): void {}

  private getImageData(
    conext: CanvasRenderingContext2D,
    width: number,
    heigh: number
  ): ImageData {
    return getImageDataUtil(conext, width, heigh);
  }
}
