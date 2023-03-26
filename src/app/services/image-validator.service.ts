import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ImageValidatorService {
  /**
   *  Check if the image is binary
   * @param imageData - Data from the image
   * @returns - True if is a binary image
   */
  isBinary(imageData: ImageData): boolean {
    return this.checkBinary(imageData);
  }

  /**
   * Check if the pixel is binary
   * @param red - Red value of the pixel
   * @param green - Green value of the pixel
   * @param blue - Blue value of the pixel
   * @returns - True if is a binary pixel
   */
  isPixelBinary(red: number, green: number, blue: number): boolean {
    return this.isSameColor([red, green, blue]);
  }

  /**
   * Check if the data belogns a binary image
   * @param param - Image data
   * @returns - True if is a binary image
   */
  private checkBinary({ data }: ImageData): boolean {
    const dataLen = data.length;

    for (let i = 0; i < dataLen; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];

      if (!this.isSameColor([red, green, blue])) {
        return false;
      }
    }
    return true;
  }

  /**
   * Check if the colors has the same value
   * @param colors - Array of color values to validate
   * @returns - True if has the same value colors
   */
  private isSameColor(colors: number[]): boolean {
    return new Set(colors).size === 1;
  }
}
