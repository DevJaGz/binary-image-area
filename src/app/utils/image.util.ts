/**
 * Get the image data based on the canvas data
 * @param canvasContext - Context of the canvas
 * @param canvasWidth - Width of the canvas
 * @param canvasHeight - Height of the canvas
 * @returns - Image data
 */
export const getImageDataUtil = (
  canvasContext: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number
): ImageData => {
  const imageData = canvasContext.getImageData(0, 0, canvasWidth, canvasHeight);
  return imageData;
};
