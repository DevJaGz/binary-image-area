import { Injectable } from "@angular/core";
import { FactoryService } from "@app/services/factory.service";
import { getImageDataUtil } from "@app/utils/image.util";

@Injectable({
  providedIn: "root",
})
export class AreaCalculatorService {
  constructor(private factoryService: FactoryService) {}

  imageArea(
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ): void {
    this.drawRandomPoints(context, width, height);
    // const imageData = this.getImageData(context, width, height);
  }

  private drawRandomPoints(
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ): void {
    const numDots = 1000;

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
